import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  inverse?: boolean;
};

export default function FeatureCard({ icon: Icon, title, description, inverse = false }: FeatureCardProps) {
  return (
    <article
      className={`group reveal-card hover-lift rounded-lg border p-6 transition duration-300 ${
        inverse
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-soft"
      }`}
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan ring-1 ring-cyan/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className={`text-lg font-semibold ${inverse ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-3 leading-7 ${inverse ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
    </article>
  );
}
