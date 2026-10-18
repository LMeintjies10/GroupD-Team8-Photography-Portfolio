import Brand from "./Brand.jsx";
import Container from "./Container.jsx";

const footerLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-bg">
      <Container className="flex flex-col items-start gap-5 py-[35px] sm:flex-row sm:items-center sm:justify-between sm:gap-7">
        <Brand />

        <p className="m-0 text-xs text-muted">
          Made with intention. Captured with feeling.
        </p>

        <nav className="flex flex-wrap gap-x-5 gap-y-3.5 sm:gap-[22px]" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold transition-colors hover:text-accent"
          >
            Instagram ↗
          </a>
        </nav>
      </Container>

      <Container className="flex flex-col items-start gap-[5px] border-t border-line py-[17px] text-[10px] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-[15px]">
        <p className="m-0">&copy; 2026 FRAME Photography. All rights reserved.</p>
        <a href="#home">Back to top ↑</a>
      </Container>
    </footer>
  );
}