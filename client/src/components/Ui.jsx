// Small presentational pieces that repeat across sections.

export function Eyebrow({ children }) {
  return (
    <p className="mb-[18px] mt-0 text-[11px] font-bold uppercase tracking-[0.19em] text-accent">
      {children}
    </p>
  );
}

export function SectionHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="m-0 font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.1] tracking-[-0.045em]"
    >
      {children}
    </h2>
  );
}

export function TextLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 border-b border-current pb-[5px] text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}