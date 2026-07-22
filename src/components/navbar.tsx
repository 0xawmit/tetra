import { Logo } from "@/components/logo";
import { siteLinks } from "@/lib/site";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="flex w-full items-center justify-between px-2 sm:px-4">
      <a href="/" className="transition-opacity hover:opacity-80">
        <Logo />
      </a>

      <nav
        aria-label="Primary"
        className="flex items-center gap-5 sm:gap-7"
      >
        <a
          href={siteLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tetra on Telegram"
          className="text-nav-ink transition-opacity hover:opacity-70"
        >
          <TelegramIcon className="h-[1.125rem] w-[1.125rem]" />
        </a>
        <a
          href={siteLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tetra on X"
          className="text-nav-ink transition-opacity hover:opacity-70"
        >
          <XIcon className="h-[1.125rem] w-[1.125rem]" />
        </a>
      </nav>
    </header>
  );
}
