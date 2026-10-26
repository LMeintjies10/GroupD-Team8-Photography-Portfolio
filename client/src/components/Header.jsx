import Brand from "./Brand.jsx";
import Container from "./Container.jsx";

const links = [
  { href: "#home", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
];

export default function Header({ user, onSignIn, onSignOut }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg" id="home">
      <Container
        className="flex flex-col items-start justify-center gap-[17px] py-5 sm:min-h-[86px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0"
      >
        <Brand />

        <nav
          className="flex w-full flex-wrap items-center justify-start gap-x-[19px] gap-y-3 sm:w-auto sm:justify-end sm:gap-[clamp(18px,3vw,42px)]"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[11px] font-semibold transition-colors hover:text-accent sm:text-xs after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-right after:scale-x-0 after:bg-accent after:transition-transform hover:after:origin-left hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="border border-text px-[11px] py-2 text-[11px] font-semibold transition-colors hover:bg-text hover:text-bg sm:px-[17px] sm:py-3 sm:text-xs"
          >
            Book a Shoot ↗
          </a>

          <a href="#contact" className="...">Book a Shoot ↗</a>

          {user ? (
            <span className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="text-muted">Hi, {user.name}</span>
              <button type="button" onClick={onSignOut} className="cursor-pointer underline hover:text-accent">
                Sign out
              </button>
            </span>
          ) : (
            <button type="button" onClick={onSignIn} className="cursor-pointer text-[11px] font-semibold underline hover:text-accent sm:text-xs">
              Sign in
            </button>
          )}

        </nav>
      </Container>
    </header>
  );
}