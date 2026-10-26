import Container from "./Container.jsx";

export default function Hero() {
  return (
    <Container as="section" className="pt-[clamp(54px,9vw,120px)]" aria-labelledby="hero-title">
      <div className="mb-5 flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
          Independent Photographer &amp; Visual Storyteller
        </p>
        <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
          Cape Town, South Africa · Available Worldwide
        </p>
      </div>

      <h1
        id="hero-title"
        className="mb-6 max-w-[1050px] font-display text-[clamp(47px,12vw,68px)] font-medium leading-[0.98] tracking-[-0.075em] sm:mb-9 sm:text-[clamp(48px,9.2vw,126px)]"
      >
        Life, in its
        <br />
        most <em className="text-accent">honest</em> frame.
      </h1>

      <div className="mb-[27px] flex flex-col items-start gap-[22px] sm:mb-[42px] sm:flex-row sm:items-end sm:justify-between sm:gap-[30px]">
        <p className="m-0 max-w-[360px] text-sm text-muted">
          Photographs that feel like memories. A collection of people, places,
          and fleeting moments worth holding on to.
        </p>

        <a
          href="#portfolio"
          className="inline-flex min-h-[50px] items-center justify-center gap-5 bg-accent px-[23px] text-[11px] font-bold uppercase tracking-[0.09em] text-bg transition hover:-translate-y-0.5 hover:bg-accent-hover"
        >
          Explore the work <span aria-hidden="true">↘</span>
        </a>
      </div>

      <div className="group relative h-[360px] overflow-hidden bg-image-bg sm:h-[clamp(280px,49vw,650px)]">
        <img
          src="/images/image1.jpg"
          alt="Featured photograph from the FRAME photography collection"
          fetchPriority="high"
          className="size-full object-cover object-[center_47%] transition-transform duration-[800ms] ease-out motion-reduce:transition-none group-hover:scale-[1.025]"
        />
        <span className="absolute right-3 bottom-3 bg-paper px-3.5 py-[9px] text-[10px] font-bold uppercase tracking-[0.12em] text-text sm:right-[22px] sm:bottom-[22px]">
          01 / Finding the light
        </span>
      </div>
    </Container>
  );
}