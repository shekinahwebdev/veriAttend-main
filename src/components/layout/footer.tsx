import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { Logo } from "@/components/brand/logo";
import { SOCIAL_LINKS } from "@/lib/social-links";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Documentation" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="mark" size="sm" href="/" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Attendance. Verified. Smarter. Simpler. Modern attendance management
              for universities and higher education institutions.
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:patriciashilohkanneh12@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  patriciashilohkanneh12@gmail.com
                </a>
              </li>
              <li>Built for educational institutions worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VeriAttend. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & developed by{" "}
            <span className="font-medium text-foreground">Patricia Shiloh Kanneh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
