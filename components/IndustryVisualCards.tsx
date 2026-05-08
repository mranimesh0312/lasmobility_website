import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  { title: "Energy Fleets", image: "/industry-energy.svg", alt: "Energy fleet tanker vehicle illustration" },
  { title: "Supply Chain", image: "/industry-logistics.svg", alt: "Supply chain and logistics vehicle illustration" },
  { title: "Emergency Mobility", image: "/industry-emergency.svg", alt: "Emergency response vehicle illustration" }
];

export default function IndustryVisualCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <Link key={card.title} href="/industries" className="reveal-card hover-lift group overflow-hidden rounded-lg bg-ink shadow-soft">
          <Image src={card.image} alt={card.alt} width={620} height={720} className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-5">
            <div>
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold text-cyan">Learn More</p>
            </div>
            <ArrowRight className="h-5 w-5 text-cyan transition group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </div>
  );
}
