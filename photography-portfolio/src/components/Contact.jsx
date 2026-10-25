import Container from "./Container.jsx";
import { Eyebrow, SectionHeading } from "./Ui.jsx";

const controlClass =
  "w-full min-w-0 rounded-none border border-input-border bg-paper px-3.5 py-[13px] text-[13px] text-text placeholder:text-[#aaa99f] focus:border-accent";

function Field({ id, label, full = false, children }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${full ? "sm:col-span-full" : ""}`}>
      <label htmlFor={id} className="text-[11px] font-bold tracking-[0.07em]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="mt-[95px] bg-contact py-[clamp(65px,9vw,120px)] sm:mt-[clamp(100px,15vw,180px)]"
      aria-labelledby="contact-title"
    >
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[clamp(35px,8vw,110px)]">
        <div className="max-w-[580px] md:max-w-none">
          <Eyebrow>Have something in mind?</Eyebrow>

          <div className="mb-[22px]">
            <SectionHeading id="contact-title">
              Your story
              <br />
              deserves a <em>frame.</em>
            </SectionHeading>
          </div>

          <p className="m-0 max-w-[360px] text-muted">
            Tell me what you're dreaming up. Whether it's a portrait session, a
            special occasion, or a creative collaboration, let's start with a
            conversation.
          </p>

          <div className="mt-9 border-t border-input-border pt-5">
            <p className="m-0 mb-[5px] text-[11px] uppercase tracking-[0.1em] text-muted">
              Prefer email?
            </p>
            <a
              href="mailto:hello@example.com"
              className="text-sm transition-colors [overflow-wrap:anywhere] hover:text-accent"
            >
              hello@example.com ↗
            </a>
          </div>
        </div>

        <form
          action="mailto:hello@example.com"
          method="post"
          encType="text/plain"
          className="grid grid-cols-1 content-start gap-[19px] sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6"
        >
          <Field id="name" label="Your name *">
            <input
              type="text"
              id="name"
              name="Name"
              placeholder="Jane Smith"
              autoComplete="name"
              required
              className={`${controlClass} min-h-[49px]`}
            />
          </Field>

          <Field id="email" label="Email address *">
            <input
              type="email"
              id="email"
              name="Email"
              placeholder="jane@example.com"
              autoComplete="email"
              required
              className={`${controlClass} min-h-[49px]`}
            />
          </Field>

          <Field id="shoot-type" label="What are we creating?" full>
            <select
              id="shoot-type"
              name="Shoot type"
              defaultValue=""
              required
              className={`${controlClass} min-h-[49px] [&>option]:bg-paper [&>option]:text-text`}
            >
              <option value="" disabled>
                Select a shoot type
              </option>
              <option value="Portraits">Portraits</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Events">Events</option>
              <option value="Brand photography">Brand photography</option>
              <option value="Travel and editorial">Travel / Editorial</option>
              <option value="Other">Something else</option>
            </select>
          </Field>

          <Field id="message" label="Tell me a little more *" full>
            <textarea
              id="message"
              name="Message"
              placeholder="The idea, the location, the feeling you want to capture..."
              required
              className={`${controlClass} min-h-[125px] resize-y`}
            />
          </Field>

          <button
            type="submit"
            className="min-h-[50px] w-full cursor-pointer border-0 bg-accent px-[25px] text-[11px] font-bold uppercase tracking-[0.09em] text-bg transition hover:-translate-y-0.5 hover:bg-accent-hover sm:w-fit"
          >
            Send your enquiry ↗
          </button>

          <p className="-mt-2 mb-0 text-[11px] text-muted sm:col-span-full">
            I'll be in touch to discuss your ideas and availability.
          </p>
        </form>
      </Container>
    </section>
  );
}