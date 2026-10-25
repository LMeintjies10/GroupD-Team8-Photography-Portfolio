// Controlled: the parent owns `active`, this just reports clicks.
export default function FilterBar({ categories, active, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter photographs by category"
      className="mb-6 flex flex-wrap gap-2"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={`cursor-pointer border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
              isActive
                ? "border-text bg-text text-bg"
                : "border-line text-muted hover:border-accent hover:text-text"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}