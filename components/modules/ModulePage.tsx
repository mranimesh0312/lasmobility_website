import Link from "next/link";
import { ArrowRight, Bell, CalendarCheck, Check, Clock, MonitorSmartphone } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/animations/MotionReveal";
import ModuleScreen from "./ModuleScreen";
import DashCamPreview from "@/components/DashCamPreview";
import { ALL_MODULES, type ModuleContent } from "@/data/liveModules";
import styles from "./ModulePage.module.scss";

/** Sparkline path for the hero panel; the optional band is the safe range. */
function Spark({ series }: { series: ModuleContent["panel"]["series"] }) {
  const W = 320;
  const H = 96;
  const pad = 6;
  const values = series.band ? [...series.points, ...series.band] : series.points;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const x = (i: number) => pad + (i / (series.points.length - 1)) * (W - pad * 2);
  const y = (v: number) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = series.points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(series.points.length - 1)} ${H} L${x(0)} ${H} Z`;
  const last = series.points[series.points.length - 1];
  return (
    <svg className={styles.spark} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {series.band && (
        <rect className={styles.sparkBand} x={0} width={W} y={y(series.band[1])} height={y(series.band[0]) - y(series.band[1])} />
      )}
      <path className={styles.sparkArea} d={area} />
      <path className={styles.sparkLine} d={line} />
      <circle className={styles.sparkDot} cx={x(series.points.length - 1)} cy={y(last)} r={3.5} />
    </svg>
  );
}

const TONE_LABEL = { ok: "OK", warn: "Check", alert: "Alert", info: "Info" } as const;

/**
 * Shared layout for the live hardware modules (fuel, temperature, driver
 * identification): hero with a live instrument panel, what the module
 * records, capabilities, how it works, the real app screen, use cases and
 * the other live modules. All colours come from the theme tokens.
 */
export default function ModulePage({ module: m }: { module: ModuleContent }) {
  const Icon = m.icon;
  const soon = m.status === "soon";
  // Related: the rest of the same family, live ones first.
  const others = ALL_MODULES.filter((o) => o.family === m.family && o.slug !== m.slug)
    .sort((a, b) => Number(a.status === "soon") - Number(b.status === "soon"))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.badges}>
              <span className={styles.chip}>
                <Icon size={14} /> {m.name}
              </span>
              {soon ? (
                <span className={styles.soon}>
                  <Clock size={12} aria-hidden="true" /> In development
                </span>
              ) : (
                <span className={styles.live}>
                  <span className={styles.liveDot} aria-hidden="true" /> {m.family === "hardware" ? "Now live" : "Live in the app"}
                </span>
              )}
            </div>
            <h1 className={styles.title}>
              {m.title[0]} <span className={styles.titleAccent}>{m.title[1]}</span>
            </h1>
            <p className={styles.lead}>{m.lead}</p>
            <ul className={styles.proof}>
              {m.proof.map((p) => (
                <li key={p}>
                  <Check size={15} aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
            <div className={styles.ctas}>
              <Link href="/contact" className={`btn-primary ${styles.cta}`}>
                {soon ? <Bell size={16} /> : <CalendarCheck size={16} />} {soon ? "Register interest" : "Book a demo"}
              </Link>
              {m.screen ? (
                <a href="#in-app" className={`btn-ghost ${styles.cta}`}>
                  See it in the app <ArrowRight size={16} />
                </a>
              ) : (
                <Link href="/features" className={`btn-ghost ${styles.cta}`}>
                  Live features <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {m.heroVisual === "dashcam" ? (
            <MotionReveal className={styles.heroVisual} y={16}>
              <DashCamPreview />
            </MotionReveal>
          ) : (
          <MotionReveal className={styles.panel} y={16}>
            <div className={styles.panelHead}>
              <span>
                <b>{m.panel.vehicle}</b>
                <small>{m.panel.heading}</small>
              </span>
              <span className={styles.demoTag}>{soon ? "Preview" : "Demo data"}</span>
            </div>
            <dl className={styles.readings}>
              {m.panel.readings.map((r) => (
                <div key={r.label} data-tone={r.tone}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.chart}>
              <span className={styles.chartLabel}>
                {m.panel.series.label}
                {m.panel.series.band && (
                  <em>
                    Safe range {m.panel.series.band[0]}–{m.panel.series.band[1]}
                    {m.panel.series.unit}
                  </em>
                )}
              </span>
              <Spark series={m.panel.series} />
            </div>
            <ul className={styles.events}>
              {m.panel.events.map((e) => (
                <li key={e.time + e.text} data-tone={e.tone}>
                  <time>{e.time}</time>
                  <span>{e.text}</span>
                  <b>{TONE_LABEL[e.tone]}</b>
                </li>
              ))}
            </ul>
          </MotionReveal>
          )}
        </div>

        {/* What it records */}
        <ul className={styles.records}>
          {m.records.map(({ icon: RIcon, label, text }) => (
            <li key={label}>
              <span className={styles.recordIcon}>
                <RIcon size={18} />
              </span>
              <span>
                <b>{label}</b>
                <small>{text}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <MotionReveal className={styles.head}>
            <p className={styles.eyebrow}>Capabilities</p>
            <h2 className={styles.h2}>Everything {m.name} needs, in the platform you already use.</h2>
          </MotionReveal>
          <div className={styles.bento}>
            {m.capabilities.map(({ icon: CIcon, title, description }, i) => (
              <MotionReveal key={title} className={`${styles.card} ${i === 0 ? styles.cardFeature : ""}`} delay={Math.min(i, 5) * 0.04} y={14}>
                {i === 0 && <CIcon className={styles.watermark} strokeWidth={1} aria-hidden="true" />}
                <span className={styles.cardIcon}>
                  <CIcon size={i === 0 ? 24 : 18} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`${styles.section} ${styles.sectionDeep}`}>
        <div className={styles.wrap}>
          <MotionReveal className={styles.head}>
            <p className={styles.eyebrow}>How it works</p>
            <h2 className={styles.h2}>From the sensor to a decision.</h2>
          </MotionReveal>
          <ol className={styles.steps}>
            {m.steps.map((s, i) => (
              <MotionReveal key={s.title} as="li" className={styles.step} delay={i * 0.06} y={12}>
                <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </MotionReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Coded app screen */}
      {m.screen && (
      <section id="in-app" className={styles.section}>
        <div className={`${styles.wrap} ${styles.inApp}`}>
          <MotionReveal className={styles.inAppCopy}>
            <p className={styles.eyebrow}>
              <MonitorSmartphone size={14} /> In the LAS Mobility app
            </p>
            <h2 className={styles.h2}>What your team sees.</h2>
            <ul className={styles.checks}>
              {m.inApp.map((t) => (
                <li key={t}>
                  <Check size={16} aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal className={styles.inAppScreen} y={18}>
            <ModuleScreen screen={m.screen} />
          </MotionReveal>
        </div>
      </section>
      )}

      {/* Use cases */}
      <section className={`${styles.section} ${styles.sectionDeep}`}>
        <div className={styles.wrap}>
          <MotionReveal className={styles.head}>
            <p className={styles.eyebrow}>Use cases</p>
            <h2 className={styles.h2}>Where it earns its place.</h2>
          </MotionReveal>
          <div className={styles.cases}>
            {m.useCases.map(({ icon: UIcon, industry, description, outcome }, i) => (
              <MotionReveal key={industry} className={styles.case} delay={i * 0.06} y={14}>
                <span className={styles.cardIcon}>
                  <UIcon size={18} />
                </span>
                <h3>{industry}</h3>
                <p>{description}</p>
                <span className={styles.outcome}>
                  <Check size={14} aria-hidden="true" /> {outcome}
                </span>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other live modules */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{m.family === "hardware" ? "More hardware modules" : "More of the platform"}</p>
          <div className={styles.related}>
            {others.slice(0, 2).map((o) => {
              const OIcon = o.icon;
              return (
                <Link key={o.slug} href={`/features/${o.slug}`} className={styles.relatedCard}>
                  <span className={styles.cardIcon}>
                    <OIcon size={18} />
                  </span>
                  <span>
                    <b>{o.name}</b>
                    <small>{o.status === "soon" ? "In development" : o.proof.slice(0, 2).join(" · ")}</small>
                  </span>
                  <ArrowRight size={16} className={styles.relatedArrow} />
                </Link>
              );
            })}
            <Link href="/features" className={styles.relatedCard}>
              <span>
                <b>All platform features</b>
                <small>Tracking, trips, alerts, maintenance, reports</small>
              </span>
              <ArrowRight size={16} className={styles.relatedArrow} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
