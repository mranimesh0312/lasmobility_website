import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  inverse?: boolean;
};

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card group rounded-xl p-6 transition duration-300">
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: "var(--accent-glow)", color: "var(--accent-text)" }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h3>
      <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>{description}</p>
    </article>
  );
}
