"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
  errorType?: "validation" | "submission";
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTION_VERSION = "2025-09-03";

async function resolveNotionDataSourceId(
  apiKey: string,
  databaseId: string,
): Promise<string> {
  const fromEnv = process.env.NOTION_DATA_SOURCE_ID?.trim();
  if (fromEnv) return fromEnv;

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Notion database lookup failed (${response.status})`);
  }

  const data = (await response.json()) as {
    data_sources?: Array<{ id: string }>;
  };
  const dataSourceId = data.data_sources?.[0]?.id;

  if (!dataSourceId) {
    throw new Error("Notion database has no data sources");
  }

  return dataSourceId;
}

async function appendToNotion(email: string, createdAt: string) {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim();
  const emailProperty =
    process.env.NOTION_EMAIL_PROPERTY?.trim() || "Email";

  if (!apiKey || !databaseId) {
    return false;
  }

  const dataSourceId = await resolveNotionDataSourceId(apiKey, databaseId);

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: {
        type: "data_source_id",
        data_source_id: dataSourceId,
      },
      properties: {
        [emailProperty]: {
          title: [{ text: { content: email } }],
        },
        "Signed Up": {
          date: { start: createdAt },
        },
        Source: {
          rich_text: [{ text: { content: "Landing page" } }],
        },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Notion create page failed (${response.status}): ${detail}`);
  }

  return true;
}

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      errorType: "validation",
    };
  }

  const entry = {
    email,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  try {
    const wroteToNotion = await appendToNotion(entry.email, entry.createdAt);

    if (!wroteToNotion) {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        if (!response.ok) {
          throw new Error(`Webhook responded with ${response.status}`);
        }
      } else {
        const dataDir = path.join(process.cwd(), ".data");
        await mkdir(dataDir, { recursive: true });
        await appendFile(
          path.join(dataDir, "waitlist.jsonl"),
          `${JSON.stringify(entry)}\n`,
          "utf8",
        );
      }
    }
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return {
      status: "error",
      message: "Email submission failed. Try again in a minute.",
      errorType: "submission",
    };
  }

  return {
    status: "success",
    message: "You're on the list. We'll be in touch.",
  };
}
