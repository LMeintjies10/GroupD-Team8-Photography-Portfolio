// Replaces the old .container class: centered, max 1440px, fluid gutter.
export default function Container({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-[clamp(20px,5vw,76px)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}