/** Site outbound links — update these when handles/URLs are final. */
export const siteLinks = {
  x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/tetra_trade",
  telegram:
    process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/tetra_trade",
} as const;
