"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    };
  }

  const entry = {
    email,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  try {
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
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    status: "success",
    message: "You're on the list. We'll be in touch.",
  };
}
