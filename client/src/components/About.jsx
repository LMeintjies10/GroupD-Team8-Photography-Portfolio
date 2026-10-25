import Container from "./Container.jsx";
import { Eyebrow, SectionHeading, TextLink } from "./ui.jsx";

export default function About() {
  return (
    <Container
      as="section"
      id="about"
      className="grid grid-cols-1 gap-[35px] pt-[clamp(100px,15vw,190px)] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-[clamp(35px,8vw,110px)]"
      aria-labelledby="about-title"
    >
      <div className="relative min-w-0">
        <img
          src="/images/image5.jpg"
          alt="A glimpse behind the lens"
          loading="lazy"
          className="h-[400px] w-full bg-image-bg object-cover object-[center_40%] sm:h-[clamp(330px,48vw,570px)]"
        />
        <span className="absolute right-0 bottom-[25px] bg-paper px-[17px] py-3 text-[10px] font-bold tracking-[0.1em] text-text sm:-right-3">
          BEHIND THE LENS · 01
        </span>
      </div>

      <div className="max-w-[510px] py-0 sm:py-[25px]">
        <Eyebrow>A little about me</Eyebrow>

        <div className="mb-6">
          <SectionHeading id="about-title">
            Not just pictures.
            <br />
            <em>A feeling.</em>
          </SectionHeading>
        </div>

        <p className="mb-[15px] mt-0 text-muted">
          I'm an independent photographer drawn to natural light, genuine
          connection, and the beauty in imperfect moments. My approach is
          simple: create space for real stories to unfold.
        </p>

        <p className="mb-[15px] mt-0 text-muted">
          From personal portraits to brand campaigns, every frame begins with
          curiosity and ends with a story worth telling.
        </p>

        <div className="mt-[15px]">
          <TextLink href="#contact">
            Let's make something meaningful <span aria-hidden="true">↗</span>
          </TextLink>
        </div>
      </div>
    </Container>
  );
}