export default function Brand() {
  return (
    <a
      className="inline-flex shrink-0 items-center gap-[11px]"
      href="#home"
      aria-label="FRAME Photography home"
    >
      <span
        className="grid size-[34px] place-items-center border border-text font-display text-[21px] leading-none"
        aria-hidden="true"
      >
        F.
      </span>
      <span className="text-[15px] font-bold tracking-[0.15em]">
        FRAME
        <span className="-mt-1 block text-[8px] font-medium tracking-[0.24em] text-muted">
          VISUAL STORIES
        </span>
      </span>
    </a>
  );
}