"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Briefcase, CheckCircle2, ChevronDown, Code2,
  Globe, Loader2, Mail, MapPin, Rocket, Search, Shield, SlidersHorizontal,
  Star, Upload, Users, X, Zap,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import EmailInput from "@/components/EmailInput";
import GlobalHiringMap from "@/components/GlobalHiringMap";
import { useToast } from "@/context/ToastContext";

/* ─── Country data for phone input ──────────────────────────────── */
const COUNTRIES_PHONE = [
  { code: "IN", name: "India",                dial: "+91"  },
  { code: "US", name: "United States",        dial: "+1"   },
  { code: "GB", name: "United Kingdom",       dial: "+44"  },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia",         dial: "+966" },
  { code: "AU", name: "Australia",            dial: "+61"  },
  { code: "SG", name: "Singapore",            dial: "+65"  },
  { code: "MY", name: "Malaysia",             dial: "+60"  },
  { code: "DE", name: "Germany",              dial: "+49"  },
  { code: "FR", name: "France",               dial: "+33"  },
  { code: "CA", name: "Canada",               dial: "+1"   },
  { code: "BR", name: "Brazil",               dial: "+55"  },
  { code: "ZA", name: "South Africa",         dial: "+27"  },
  { code: "NG", name: "Nigeria",              dial: "+234" },
  { code: "KE", name: "Kenya",                dial: "+254" },
  { code: "PK", name: "Pakistan",             dial: "+92"  },
  { code: "BD", name: "Bangladesh",           dial: "+880" },
  { code: "LK", name: "Sri Lanka",            dial: "+94"  },
  { code: "PH", name: "Philippines",          dial: "+63"  },
  { code: "ID", name: "Indonesia",            dial: "+62"  },
  { code: "TH", name: "Thailand",             dial: "+66"  },
  { code: "VN", name: "Vietnam",              dial: "+84"  },
  { code: "JP", name: "Japan",                dial: "+81"  },
  { code: "KR", name: "South Korea",          dial: "+82"  },
  { code: "CN", name: "China",                dial: "+86"  },
  { code: "QA", name: "Qatar",                dial: "+974" },
  { code: "KW", name: "Kuwait",               dial: "+965" },
  { code: "BH", name: "Bahrain",              dial: "+973" },
  { code: "OM", name: "Oman",                 dial: "+968" },
  { code: "EG", name: "Egypt",                dial: "+20"  },
  { code: "TR", name: "Turkey",               dial: "+90"  },
  { code: "PL", name: "Poland",               dial: "+48"  },
  { code: "NL", name: "Netherlands",          dial: "+31"  },
  { code: "IT", name: "Italy",                dial: "+39"  },
  { code: "ES", name: "Spain",                dial: "+34"  },
  { code: "NZ", name: "New Zealand",          dial: "+64"  },
  { code: "HK", name: "Hong Kong",            dial: "+852" },
  { code: "TW", name: "Taiwan",               dial: "+886" },
  { code: "MA", name: "Morocco",              dial: "+212" },
  { code: "NP", name: "Nepal",                dial: "+977" },
].sort((a, b) => a.name.localeCompare(b.name));

function flagPhone(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)));
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const benefits = [
  {
    icon: Rocket,
    title: "Solve Real Problems",
    desc: "Fleet intelligence decisions affect millions of vehicles and tens of thousands of operators globally. Your code ships to production and changes how organisations manage safety, cost, and efficiency at scale.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    desc: "Distributed team across APAC and MENA. We believe the best people shouldn't have to relocate. Async-friendly culture, documented decisions, and regular virtual collaboration rituals.",
  },
  {
    icon: Star,
    title: "Competitive Growth",
    desc: "Competitive compensation benchmarked to market rates. We invest in learning budgets and internal mobility so your career accelerates here.",
  },
  {
    icon: Zap,
    title: "High Impact",
    desc: "Small, senior team means your decisions reach production fast. No six-month approval chains. Propose an architecture, build it, ship it. The feedback loop is measured in sprints, not quarters.",
  },
];

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  required: string[];
  preferred: string[];
}

const jobs: Job[] = [
  {
    id: "sde-ui-ux",
    title: "Software Developer — UI/UX",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3–6 years",
    overview:
      "Build pixel-perfect, accessible, performant UIs for our fleet intelligence platform used by operators in 50+ countries. You will own the design system, set the bar for component quality, and work directly with product and design to translate Figma mocks into production-grade React components.",
    responsibilities: [
      "Own and evolve the component library and design system tokens",
      "Translate complex Figma designs into responsive, accessible React components",
      "Build and maintain real-time dashboard UIs handling live GPS telemetry streams",
      "Conduct performance audits and implement optimisations (code splitting, lazy loading, Core Web Vitals)",
      "Ensure cross-browser compatibility across Chrome, Safari, Firefox, and Edge",
      "Define and run A/B experiments to validate UX improvements with data",
      "Collaborate closely with backend engineers on API contract design and integration",
      "Champion WCAG 2.1 AA accessibility standards across all surfaces",
    ],
    required: [
      "React and Next.js (App Router)",
      "TypeScript — strict mode, no implicit any",
      "Tailwind CSS or CSS-in-JS (Emotion / styled-components)",
      "Figma design handoff and design token workflows",
      "Accessibility fundamentals (WCAG, ARIA, screen-reader testing)",
      "Component-driven development and design system principles",
    ],
    preferred: [
      "Framer Motion for production animation",
      "Data visualisation: D3.js, Recharts, or Victory",
      "Mobile-first responsive design at scale",
      "Experience with Storybook or similar component catalogues",
      "Web performance profiling (Lighthouse, Chrome DevTools)",
    ],
  },
  {
    id: "sde-fullstack",
    title: "Software Developer — Full-Stack",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "4–8 years",
    overview:
      "Own end-to-end features across our Next.js frontend and Node.js/Go backend, integrating real-time GPS data, AI services, and third-party fleet APIs. You will design APIs, write robust server-side logic, and ship full features from database schema to polished UI.",
    responsibilities: [
      "Design and implement REST and GraphQL APIs consumed by web and mobile clients",
      "Build real-time WebSocket pipelines for live vehicle telemetry feeds",
      "Optimise PostgreSQL and Redis queries for sub-100ms P99 latency",
      "Define CI/CD pipelines in GitHub Actions and own the deployment process",
      "Conduct thorough code reviews and contribute to architecture decision records",
      "Integrate third-party fleet APIs (telematics providers, mapping services)",
      "Write comprehensive unit and integration test suites (Jest, Vitest)",
      "Lead system design discussions for new platform capabilities",
    ],
    required: [
      "React/Next.js on the frontend (App Router experience a plus)",
      "Node.js or Go for backend services",
      "PostgreSQL — schema design, indexing, query optimisation",
      "REST and GraphQL API design",
      "Docker for local development and production containers",
      "Git-based collaboration (branching strategies, PR hygiene)",
    ],
    preferred: [
      "Apache Kafka or NATS for event-driven messaging",
      "Redis for caching and pub/sub",
      "Kubernetes for orchestration",
      "IoT/GPS integration experience (MQTT, NMEA, OBD-II)",
      "Experience with time-series databases (TimescaleDB, InfluxDB)",
    ],
  },
  {
    id: "sde-golang",
    title: "Software Developer — GoLang",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3–7 years",
    overview:
      "Build the high-throughput backend services that process millions of GPS telemetry events per day, power real-time alerting, and serve our AI analytics pipeline. You will design mission-critical microservices where correctness and performance are non-negotiable.",
    responsibilities: [
      "Design and implement high-throughput microservices in Go",
      "Build event-driven architectures using Kafka or NATS for telemetry ingestion",
      "Expose gRPC and REST APIs consumed by frontend, mobile, and partner systems",
      "Develop telemetry ingestion pipelines capable of handling burst traffic at scale",
      "Instrument services with Prometheus metrics and Grafana dashboards",
      "Profile CPU and memory bottlenecks and implement targeted optimisations",
      "Write production-grade tests including race-condition and load tests",
      "Contribute to on-call rotation and post-incident reviews",
    ],
    required: [
      "Go — 3+ years of professional production experience",
      "PostgreSQL and TimescaleDB for time-series telemetry storage",
      "Message queues: Kafka or NATS",
      "Docker and Kubernetes for containerised deployments",
      "REST and gRPC API design",
      "Linux proficiency (systemd, networking fundamentals)",
    ],
    preferred: [
      "Real-time systems design (low-latency, high-throughput)",
      "IoT protocols: MQTT, CoAP, NMEA parsing",
      "Cloud-native: AWS EKS or GCP GKE",
      "Distributed systems patterns (sagas, outbox, CQRS)",
      "OpenTelemetry for distributed tracing",
    ],
  },
  {
    id: "sales-apac",
    title: "Sales Executive — APAC",
    department: "Sales",
    location: "Singapore / Remote",
    type: "Full-time",
    experience: "4–8 years",
    overview:
      "Own new business development and strategic account expansion across Southeast Asia, Australia, and East Asia for our fleet intelligence SaaS platform. You will build a territory from prospecting through close, managing complex multi-stakeholder deals with logistics and transport operators.",
    responsibilities: [
      "Own the full sales cycle: prospecting, qualification, demo, proposal, negotiation, and close",
      "Conduct compelling product demonstrations tailored to fleet operator pain points",
      "Develop and manage a healthy pipeline in CRM (HubSpot/Salesforce) with disciplined forecasting",
      "Build strategic relationships with regional system integrators and channel partners",
      "Achieve and exceed quarterly new ARR and expansion targets",
      "Represent LAS Mobility at regional trade shows, fleet conferences, and industry events",
      "Collaborate with Customer Success to ensure smooth handoffs and healthy retention",
      "Provide structured market feedback to Product on regional competitive dynamics",
    ],
    required: [
      "4+ years of B2B SaaS sales — demonstrated quota attainment",
      "Experience selling into fleet, logistics, transport, or supply chain verticals preferred",
      "CRM proficiency: HubSpot or Salesforce pipeline management",
      "Strong English communication — written, verbal, and presentation",
      "Ability to manage complex, multi-stakeholder enterprise sales cycles",
    ],
    preferred: [
      "Fleet management, telematics, or supply chain SaaS background",
      "Mandarin, Bahasa Indonesia, or Bahasa Malaysia as an additional language",
      "Experience selling to enterprise and mid-market in SEA, ANZ, or East Asia",
      "SaaS pricing and packaging negotiation experience",
    ],
  },
  {
    id: "sales-mena",
    title: "Sales Executive — MENA",
    department: "Sales",
    location: "Dubai / Remote",
    type: "Full-time",
    experience: "4–8 years",
    overview:
      "Drive revenue growth across the Middle East and North Africa by selling LAS Mobility's fleet intelligence platform to logistics operators, government fleets, and enterprise transport organisations. You will navigate complex enterprise and government procurement processes while building a scalable partner ecosystem.",
    responsibilities: [
      "Lead enterprise deal cycles from prospecting through to signed contracts",
      "Engage C-suite and senior procurement stakeholders across private and public sector accounts",
      "Respond to RFPs and government tenders with compelling technical and commercial proposals",
      "Maintain accurate pipeline reporting and forecasting in CRM",
      "Build and develop a partner network of regional system integrators and value-added resellers",
      "Collaborate with implementation and CS teams to ensure seamless customer onboarding",
      "Represent LAS Mobility at GITEX, Seatrade, and other regional industry events",
      "Provide competitive intelligence and market feedback to leadership",
    ],
    required: [
      "4+ years of enterprise SaaS sales with proven quota attainment",
      "Strong MENA market knowledge — cultural fluency and regional business practices",
      "Arabic or exceptional English communication skills (C2 level)",
      "Experience managing government and public sector procurement cycles",
      "CRM pipeline management and accurate forecasting",
    ],
    preferred: [
      "Fleet, telematics, or logistics technology background",
      "Public sector / government fleet sales in UAE, KSA, Qatar, or Egypt",
      "Existing network within MENA logistics and transport associations",
      "Experience with RFP/RFQ response writing",
    ],
  },
  {
    id: "devops",
    title: "DevOps / Platform Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    experience: "3–6 years",
    overview:
      "Own our cloud infrastructure, CI/CD pipelines, and platform reliability. We run on AWS and process millions of GPS telemetry events daily — uptime is everything. You will ensure the platform scales gracefully under load, recovers automatically from failure, and costs less than yesterday.",
    responsibilities: [
      "Manage and evolve Kubernetes clusters (EKS/GKE) for production and staging environments",
      "Author and maintain Terraform IaC for all cloud resources",
      "Design and improve CI/CD pipelines in GitHub Actions — build, test, scan, deploy",
      "Configure and own the observability stack: Prometheus, Grafana, alerting, PagerDuty",
      "Implement security hardening: network policies, RBAC, secrets management (Vault/SSM)",
      "Drive cloud cost optimisation — rightsizing, spot instances, reserved capacity",
      "Respond to on-call incidents, conduct root-cause analyses, and eliminate toil",
      "Contribute to SOC2 compliance controls and audit evidence collection",
    ],
    required: [
      "Kubernetes — cluster management, RBAC, networking, storage",
      "Terraform for infrastructure-as-code",
      "AWS or GCP (EKS, RDS, S3, VPC, IAM)",
      "Docker — multi-stage builds, image optimisation",
      "CI/CD pipelines (GitHub Actions, GitLab CI, or CircleCI)",
      "Linux administration and shell scripting",
    ],
    preferred: [
      "Helm chart development",
      "ArgoCD or Flux for GitOps deployments",
      "EKS / GKE production experience",
      "Full observability stack: OpenTelemetry, Jaeger, Grafana Loki",
      "SOC2 or ISO 27001 compliance implementation",
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "4–7 years",
    overview:
      "Own the product roadmap for our fleet intelligence platform, working closely with engineering, sales, and customer success to ship features that operators love. You will be the connective tissue between customer insight and production code — setting context, unblocking teams, and measuring outcomes.",
    responsibilities: [
      "Conduct discovery interviews with fleet operators to surface unmet needs",
      "Write clear, actionable PRDs and acceptance criteria that engineers can build against",
      "Prioritise the roadmap using a mix of customer value, business impact, and technical feasibility",
      "Run sprint planning, grooming, and retrospectives with engineering pods",
      "Define and track KPIs for every feature shipped — adoption, retention, error rates",
      "Lead competitive analysis and maintain a view of the fleet tech landscape",
      "Coordinate go-to-market plans with Sales, CS, and Marketing for major launches",
      "Serve as the voice of the customer in architecture and design reviews",
    ],
    required: [
      "4+ years of product management at a SaaS company",
      "Data-driven decision making — comfortable with analytics tools and SQL",
      "Exceptional written and verbal communication for PRDs, roadmaps, and stakeholder updates",
      "Proven track record of collaborating with engineering teams to ship on schedule",
      "Experience translating qualitative research into quantitative product requirements",
    ],
    preferred: [
      "Fleet, logistics, IoT, or transport domain knowledge",
      "SQL proficiency for self-serve data analysis",
      "Prior experience in a high-growth startup (Series A–C)",
      "Mobile product management experience",
    ],
  },
  {
    id: "csm",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "3–6 years",
    overview:
      "Own the post-sale relationship for a portfolio of fleet operator accounts, driving adoption, expansion, and renewal for LAS Mobility's platform. You will be the strategic partner our customers call first — proactively identifying risk, celebrating wins, and connecting operator outcomes to platform value.",
    responsibilities: [
      "Lead structured onboarding programmes ensuring customers go live on time and at full scope",
      "Conduct regular QBRs to review health metrics, usage trends, and upcoming renewals",
      "Build and maintain customer health scores using platform usage data and sentiment signals",
      "Identify churn risk early and coordinate internal escalations to resolve issues",
      "Discover expansion opportunities and collaborate with Sales on upsell and cross-sell",
      "Deliver training sessions (live and recorded) on new platform features",
      "Escalate product bugs and feature requests with full context to the Product team",
      "Contribute to the knowledge base, onboarding playbooks, and CS team processes",
    ],
    required: [
      "3+ years as a CSM or Account Manager at a SaaS company",
      "Strong data analysis skills — able to build health dashboards and interpret usage trends",
      "Excellent written and verbal communication with enterprise stakeholders",
      "Proactive customer-facing presence — comfortable leading QBRs and executive briefings",
    ],
    preferred: [
      "Fleet, logistics, or transport domain knowledge",
      "Gainsight, ChurnZero, or Totango platform experience",
      "Experience working with distributed fleets or field operations teams",
    ],
  },

  /* ── Human Resources ── */
  {
    id: "hr-executive",
    title: "HR Executive",
    department: "Human Resources",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "2–4 years",
    overview:
      "Support day-to-day HR operations for a fast-scaling SaaS company spanning APAC and MENA. You will own employee lifecycle processes, coordinate onboarding, maintain HR records, and help create a culture where every team member feels supported and informed.",
    responsibilities: [
      "Manage end-to-end employee lifecycle: onboarding, confirmation, transfers, exits",
      "Maintain accurate HRIS records and generate monthly HR analytics reports",
      "Coordinate payroll inputs and liaise with the finance team for monthly processing",
      "Administer leave, attendance, and compliance tracking across geographies",
      "Support performance management cycles — goal-setting, mid-year reviews, appraisals",
      "Organize company-wide engagement initiatives, virtual events, and recognition programmes",
      "Ensure statutory compliance — PF, ESI, gratuity, and labour law requirements",
      "Act as the first point of contact for employee queries and grievance escalations",
    ],
    required: [
      "2+ years of generalist HR experience in a technology company",
      "Working knowledge of Indian labour laws, PF, ESI, and payroll basics",
      "Proficiency in HRIS tools (Zoho People, Darwinbox, or equivalent)",
      "Strong interpersonal and communication skills — empathetic and professional",
      "High attention to detail in documentation and record management",
    ],
    preferred: [
      "Experience supporting distributed or remote-first teams",
      "Familiarity with ESOP administration",
      "MBA in Human Resources or equivalent postgraduate qualification",
      "Experience in a Series A–C stage startup environment",
    ],
  },
  {
    id: "talent-acquisition",
    title: "Talent Acquisition Specialist",
    department: "Human Resources",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3–5 years",
    overview:
      "Own the full-cycle recruiting function for a high-growth fleet intelligence SaaS company hiring across engineering, sales, and operations globally. You will build talent pipelines, craft compelling candidate experiences, and partner with hiring managers to close top talent faster than the competition.",
    responsibilities: [
      "Manage full-cycle hiring: sourcing, screening, interviewing, offer negotiation, and closure",
      "Build proactive talent pipelines for critical roles across engineering, sales, and operations",
      "Partner with hiring managers to define role requirements, interview panels, and evaluation criteria",
      "Craft compelling job descriptions and employer brand content for LinkedIn and job boards",
      "Drive structured interview processes with consistent scoring rubrics and bias-reduction practices",
      "Track and report on recruiting metrics: time-to-fill, offer acceptance rate, pipeline conversion",
      "Build relationships with hiring partners, universities, and specialist communities",
      "Coordinate candidate onboarding with the HR Executive to ensure seamless transitions",
    ],
    required: [
      "3+ years of talent acquisition experience — technology or SaaS company preferred",
      "Proven ability to source and close passive candidates via LinkedIn Recruiter and Boolean search",
      "ATS proficiency (Greenhouse, Lever, or equivalent)",
      "Strong stakeholder management — comfortable influencing hiring managers at all levels",
      "Experience hiring across multiple geographies and time zones",
    ],
    preferred: [
      "Experience recruiting engineering and technical roles at growth-stage startups",
      "Knowledge of APAC and MENA talent markets",
      "Employer branding content creation on LinkedIn and social platforms",
      "Data-driven recruiting: fluency in funnel analytics and pipeline metrics",
    ],
  },

  /* ── Operations ── */
  {
    id: "fleet-ops-manager",
    title: "Fleet Operations Manager",
    department: "Operations",
    location: "Dubai / Bangalore",
    type: "Full-time",
    experience: "5–9 years",
    overview:
      "Lead the operational delivery of LAS Mobility's platform for enterprise fleet clients across MENA and APAC. You will bridge the gap between technology and field operations, ensure SLA adherence, and drive continuous process improvement that translates into measurable client outcomes.",
    responsibilities: [
      "Own operational delivery metrics: SLA adherence, uptime, response times, and resolution rates",
      "Develop and maintain Standard Operating Procedures for fleet implementation and support",
      "Coordinate cross-functional teams — engineering, CS, and field technicians — on client escalations",
      "Conduct capacity planning and resource allocation for active fleet deployments",
      "Lead regular operational reviews with enterprise clients and present performance dashboards",
      "Identify bottlenecks in implementation and support workflows and drive systematic improvements",
      "Partner with Product on operational requirements and field-reported issues",
      "Manage third-party vendor relationships: hardware suppliers, telematics integrators, and logistics partners",
    ],
    required: [
      "5+ years in fleet management, telematics operations, or SaaS delivery management",
      "Strong analytical skills — comfortable building and interpreting operational dashboards",
      "Experience managing cross-functional teams across multiple time zones",
      "Proven track record of driving process improvements in a client-facing operations role",
      "Excellent stakeholder communication — executive reporting and field coordination",
    ],
    preferred: [
      "Deep knowledge of fleet telematics hardware and GPS tracking systems",
      "Experience with MENA logistics or government fleet operations",
      "PMP or PRINCE2 project management certification",
      "Familiarity with IoT protocols and device management platforms",
    ],
  },
  {
    id: "operations-executive",
    title: "Operations Executive",
    department: "Operations",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "1–3 years",
    overview:
      "Support the smooth execution of platform deployments, client onboarding, and internal operations across LAS Mobility's growing global customer base. You will coordinate between teams, track delivery milestones, and ensure that every client goes live on time and at full scope.",
    responsibilities: [
      "Coordinate client onboarding schedules, device installation timelines, and go-live milestones",
      "Maintain operational trackers and provide daily status updates to the Fleet Operations Manager",
      "Liaise with customer success, engineering, and field teams to resolve deployment blockers",
      "Process vendor invoices, purchase orders, and hardware dispatches accurately and on time",
      "Manage internal tooling: helpdesk tickets, CRM updates, and operations dashboards",
      "Prepare reports on operational KPIs, client status, and issue resolution progress",
      "Support RFP responses with operational data, case studies, and process documentation",
      "Assist with vendor management, contract coordination, and logistics planning",
    ],
    required: [
      "1–3 years of experience in operations, project coordination, or customer delivery",
      "High proficiency in productivity tools: Google Workspace, Notion, Jira, or Asana",
      "Strong organisational skills — ability to manage multiple tasks and deadlines simultaneously",
      "Excellent written and verbal communication skills",
      "Analytical mindset — comfortable working with spreadsheets and operational data",
    ],
    preferred: [
      "Exposure to fleet management, telematics, or logistics technology",
      "Experience with CRM tools (HubSpot or Salesforce)",
      "Prior experience in a fast-paced startup or scale-up environment",
    ],
  },

  /* ── KAM ── */
  {
    id: "key-account-manager",
    title: "Key Account Manager",
    department: "KAM",
    location: "Dubai / Singapore / Remote",
    type: "Full-time",
    experience: "4–7 years",
    overview:
      "Own strategic enterprise accounts for LAS Mobility's fleet intelligence platform, driving retention, adoption, and revenue expansion across your portfolio. You will serve as the primary executive relationship holder for named accounts and translate client outcomes into growth opportunities.",
    responsibilities: [
      "Manage a portfolio of 15–25 strategic enterprise accounts across MENA and APAC",
      "Develop and execute joint success plans tied to measurable fleet KPIs for each account",
      "Lead quarterly business reviews presenting ROI metrics, platform usage, and expansion roadmaps",
      "Identify upsell and cross-sell opportunities and collaborate with Sales to close expansion revenue",
      "Negotiate contract renewals and multi-year agreements with C-suite and procurement teams",
      "Act as the escalation point for critical issues and drive resolution through internal teams",
      "Provide structured account intelligence to Product, CS, and Sales leadership",
      "Maintain accurate account health scores, risk flags, and expansion pipeline in CRM",
    ],
    required: [
      "4+ years of key account management or strategic customer success at a SaaS company",
      "Demonstrated success in driving NRR growth above 110% across an enterprise portfolio",
      "Strong executive presence — comfortable presenting ROI analysis to C-suite stakeholders",
      "CRM proficiency: Salesforce or HubSpot account and pipeline management",
      "Experience managing complex, multi-stakeholder relationships in enterprise accounts",
    ],
    preferred: [
      "Fleet, logistics, telematics, or supply chain SaaS domain experience",
      "MENA or APAC enterprise account management background",
      "Multilingual: Arabic, Mandarin, or Bahasa as additional languages",
      "Experience with account-based marketing collaboration",
    ],
  },
  {
    id: "enterprise-account-manager",
    title: "Enterprise Account Manager",
    department: "KAM",
    location: "Riyadh / Dubai / Remote",
    type: "Full-time",
    experience: "5–9 years",
    overview:
      "Lead the commercial and relationship strategy for LAS Mobility's largest enterprise accounts — government fleets, national logistics operators, and multinational transport groups. You will own revenue outcomes, manage executive relationships, and position LAS Mobility as a long-term strategic partner.",
    responsibilities: [
      "Own commercial accountability for a defined portfolio of enterprise and government accounts",
      "Develop multi-year account strategies aligned to client digital transformation agendas",
      "Lead executive relationship mapping and engagement at Minister, CxO, and VP levels",
      "Structure and negotiate large-scale contracts, MSAs, and public sector framework agreements",
      "Collaborate with pre-sales, implementation, and product teams to deliver integrated client solutions",
      "Run executive business reviews with full P&L visibility and forward-looking expansion proposals",
      "Identify white-space expansion opportunities across subsidiaries, regions, and use cases",
      "Represent LAS Mobility at industry councils, fleet associations, and government advisory forums",
    ],
    required: [
      "5+ years of enterprise or strategic account management in technology or SaaS",
      "Proven track record managing accounts with ACV >$500K and multi-year contract cycles",
      "Deep understanding of enterprise procurement, RFP, and government tendering processes",
      "Executive stakeholder management experience — board and C-suite engagement",
      "Strong commercial acumen: contract structuring, margin analysis, and commercial negotiation",
    ],
    preferred: [
      "Experience with GCC government or public sector technology accounts",
      "Fleet, transport, or smart city technology background",
      "Arabic language proficiency for MENA-based accounts",
      "MBA or equivalent advanced business qualification",
    ],
  },

  /* ── Accounts & Finance ── */
  {
    id: "accounts-executive",
    title: "Accounts Executive",
    department: "Accounts & Finance",
    location: "Bangalore",
    type: "Full-time",
    experience: "2–4 years",
    overview:
      "Handle day-to-day accounting operations, ensure compliance with statutory requirements, and maintain accurate financial records for LAS Mobility's India entity and global subsidiaries. You will work closely with the Finance Manager to deliver timely monthly closes and audit-ready books.",
    responsibilities: [
      "Process accounts payable and receivable, including vendor invoices, client billing, and collections",
      "Prepare and post journal entries, bank reconciliations, and intercompany transactions",
      "Manage GST, TDS, PF, and other statutory filings on schedule",
      "Assist with monthly, quarterly, and annual financial close processes",
      "Maintain fixed asset register and manage depreciation schedules",
      "Liaise with external auditors, tax advisors, and statutory authorities",
      "Support preparation of MIS reports and financial dashboards for leadership",
      "Maintain accurate records in accounting software (Zoho Books, Tally, or equivalent)",
    ],
    required: [
      "2–4 years of accounting experience — technology or startup company preferred",
      "Strong working knowledge of Indian accounting standards (Ind AS) and GST",
      "Proficiency in Tally ERP, Zoho Books, or equivalent accounting software",
      "Accurate and detail-oriented — zero tolerance for reconciliation errors",
      "B.Com or M.Com; CA Inter or CMA Inter preferred",
    ],
    preferred: [
      "Experience with multi-currency accounting and cross-border transactions",
      "Familiarity with SaaS revenue recognition principles (Ind AS 115)",
      "Exposure to ERP systems: SAP, Oracle NetSuite, or QuickBooks",
      "Experience in a Series A–C stage startup with rapid growth",
    ],
  },
  {
    id: "finance-manager",
    title: "Finance Manager",
    department: "Accounts & Finance",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "6–10 years",
    overview:
      "Lead the finance function for LAS Mobility, owning financial planning, reporting, controls, and fundraising support. You will be a strategic partner to the CEO and leadership team, providing financial insight that drives business decisions and supports the company's growth trajectory.",
    responsibilities: [
      "Lead monthly, quarterly, and annual financial close and external audit processes",
      "Own the annual budgeting process, quarterly reforecast, and board-level financial reporting",
      "Build and maintain financial models for scenario planning, fundraising, and M&A diligence",
      "Manage statutory compliance across India, UAE, Singapore, and UK entities",
      "Establish and maintain financial controls, approval workflows, and audit trails",
      "Partner with Revenue and Sales Operations on ARR tracking, billings, and collections",
      "Lead investor relations support — data room management, due diligence, cap table maintenance",
      "Build and develop the accounting and finance team as the company scales",
    ],
    required: [
      "CA (Chartered Accountant) qualification — mandatory",
      "6+ years of post-qualification experience, including 2+ years in a managerial role",
      "Deep expertise in Ind AS, GST, direct tax, and transfer pricing",
      "Experience managing multi-entity group accounting and consolidation",
      "Strong financial modelling skills — advanced Excel and/or Google Sheets",
    ],
    preferred: [
      "Prior experience at a SaaS company or high-growth technology startup",
      "Exposure to Series A–C fundraising processes and investor data rooms",
      "NetSuite, Xero, or SAP implementation or migration experience",
      "Working knowledge of UAE VAT, Singapore GST, and UK corporation tax",
    ],
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    department: "Accounts & Finance",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "2–5 years",
    overview:
      "Build the financial intelligence layer for LAS Mobility's leadership team — delivering actionable analysis on revenue, costs, unit economics, and market opportunity. You will own the FP&A function, maintain financial models, and translate data into strategic recommendations.",
    responsibilities: [
      "Build and maintain detailed financial models: P&L, balance sheet, cash flow, and DCF",
      "Own SaaS metrics reporting: ARR, MRR, churn, LTV, CAC, payback period, and NRR",
      "Prepare monthly management accounts and variance analysis against budget and forecast",
      "Conduct market sizing, competitive benchmarking, and commercial opportunity analysis",
      "Support fundraising and board reporting with investor-grade financial decks",
      "Partner with Sales and CS teams on deal economics, pricing analysis, and quota modelling",
      "Automate financial reporting workflows using Python, SQL, or BI tools",
      "Maintain the company's data warehouse and financial dashboards (Metabase, Looker, or Tableau)",
    ],
    required: [
      "2–5 years of FP&A or financial analysis experience — technology company preferred",
      "Advanced Excel / Google Sheets financial modelling (three-statement, DCF, scenario analysis)",
      "Strong understanding of SaaS business model and subscription unit economics",
      "SQL proficiency — comfortable writing queries against business databases",
      "Bachelor's in Finance, Economics, or Engineering; MBA/CFA a strong plus",
    ],
    preferred: [
      "Experience with BI tools: Looker, Metabase, Power BI, or Tableau",
      "Python for financial data analysis and automation",
      "Prior experience at a SaaS company, investment bank, or venture-backed startup",
      "Exposure to Series A–C fundraising and investor relations processes",
    ],
  },
];

const deptColors: Record<string, string> = {
  Engineering:         "rgba(14,206,206,0.15)",
  Sales:               "rgba(99,102,241,0.15)",
  Infrastructure:      "rgba(245,158,11,0.15)",
  Product:             "rgba(34,197,94,0.15)",
  "Customer Success":  "rgba(236,72,153,0.15)",
  "Human Resources":   "rgba(168,85,247,0.15)",
  Operations:          "rgba(249,115,22,0.15)",
  KAM:                 "rgba(20,184,166,0.15)",
  "Accounts & Finance":"rgba(234,179,8,0.15)",
};
const deptText: Record<string, string> = {
  Engineering:         "#0ECECE",
  Sales:               "#818CF8",
  Infrastructure:      "#F59E0B",
  Product:             "#22C55E",
  "Customer Success":  "#EC4899",
  "Human Resources":   "#A855F7",
  Operations:          "#F97316",
  KAM:                 "#14B8A6",
  "Accounts & Finance":"#EAB308",
};

/* ─────────────────────────────────────────
   APPLICATION MODAL
───────────────────────────────────────── */

const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function ApplyModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES_PHONE.find((c) => c.code === "IN")!
  );
  const [countryOpen, setCountryOpen]   = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [file, setFile]         = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus]     = useState<"idle" | "loading" | "success">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const countryRef   = useRef<HTMLDivElement>(null);
  const searchRef    = useRef<HTMLInputElement>(null);

  const filteredCountries = COUNTRIES_PHONE.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dial.includes(countrySearch)
  );

  // Focus search when country dropdown opens
  useEffect(() => { if (countryOpen) searchRef.current?.focus(); }, [countryOpen]);

  // Close country dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus trap & Escape key
  useEffect(() => {
    firstInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_MIME.includes(f.type)) return "Only PDF, DOC, and DOCX files are accepted.";
    if (f.size > MAX_FILE_BYTES) return `File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum 5 MB.`;
    return null;
  }, []);

  const handleFileSelect = useCallback((f: File) => {
    const err = validateFile(f);
    setFileError(err);
    setFile(err ? null : f);
  }, [validateFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  }, [handleFileSelect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!file) { setFileError("Please upload your resume."); return; }

    setStatus("loading");
    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("email", email);
    fd.append("phone", `${selectedCountry.dial} ${phone}`.trim());
    fd.append("linkedin", linkedin);
    fd.append("portfolio", portfolio);
    fd.append("coverLetter", coverLetter);
    fd.append("jobTitle", job.title);
    fd.append("resume", file);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        addToast(data?.error ?? "We could not submit your application right now. Please try again or contact support@lasmobility.com.", "error");
        setStatus("idle");
      } else {
        setStatus("success");
      }
    } catch {
      addToast("We could not submit your application right now. Please try again or contact support@lasmobility.com.", "error");
      setStatus("idle");
    }
  };

  const content = (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(6,14,26,0.8)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${job.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-5 rounded-t-2xl"
          style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent-text)" }}>
              Apply Now
            </p>
            <h2 className="mt-0.5 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {job.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition hover:opacity-60"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle2 className="h-16 w-16" style={{ color: "var(--accent-text)" }} />
            </motion.div>
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Application Received!
            </h3>
            <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              Thank you for applying. We have received your application and will get back to you shortly.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              A confirmation has been sent to your email address.
            </p>
            <button onClick={onClose} className="btn-primary mt-2 rounded-xl px-6 py-2.5 text-sm">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="px-6 py-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Full Name <span style={{ color: "var(--accent-text)" }}>*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{
                  background: "var(--bg-base)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Email Address <span style={{ color: "var(--accent-text)" }}>*</span>
              </label>
              <EmailInput
                value={email}
                onChange={setEmail}
                placeholder="jane@company.com"
                required
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Phone Number <span style={{ color: "var(--accent-text)" }}>*</span>
              </label>
              <div className="flex gap-2">
                {/* Country selector */}
                <div className="relative shrink-0" ref={countryRef}>
                  <button
                    type="button"
                    onClick={() => setCountryOpen((v) => !v)}
                    className="flex h-full min-h-[42px] items-center gap-1.5 rounded-xl px-3 text-sm outline-none transition"
                    style={{
                      background: "var(--bg-base)",
                      border: `1px solid ${countryOpen ? "var(--accent)" : "var(--border)"}`,
                      color: "var(--text-primary)",
                      minWidth: "90px",
                    }}
                  >
                    <span className="text-base leading-none">{flagPhone(selectedCountry.code)}</span>
                    <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      {selectedCountry.dial}
                    </span>
                    <ChevronDown
                      className="h-3 w-3 shrink-0"
                      style={{
                        color: "var(--text-muted)",
                        transform: countryOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>

                  {countryOpen && (
                    <div
                      className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl shadow-2xl"
                      style={{
                        background: "var(--bg-deep)",
                        border: "1px solid var(--border-accent)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Search */}
                      <div className="p-2" style={{ borderBottom: "1px solid var(--border)" }}>
                        <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "var(--bg-card)" }}>
                          <Search className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                          <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search country or code…"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="flex-1 bg-transparent text-xs outline-none"
                            style={{ color: "var(--text-primary)" }}
                          />
                        </div>
                      </div>
                      {/* List */}
                      <ul className="max-h-48 overflow-y-auto py-1">
                        {filteredCountries.length === 0 && (
                          <li className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>No results</li>
                        )}
                        {filteredCountries.map((c) => (
                          <li key={c.code + c.dial}>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:opacity-80"
                              style={{
                                background:
                                  selectedCountry.code === c.code
                                    ? "var(--accent-glow)"
                                    : "transparent",
                                color: "var(--text-primary)",
                              }}
                              onClick={() => {
                                setSelectedCountry(c);
                                setCountryOpen(false);
                                setCountrySearch("");
                              }}
                            >
                              <span className="w-5 shrink-0 text-base leading-none">{flagPhone(c.code)}</span>
                              <span className="flex-1 truncate text-xs" style={{ color: "var(--text-secondary)" }}>{c.name}</span>
                              <span className="shrink-0 text-xs font-bold" style={{ color: "var(--accent-text)" }}>{c.dial}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Number input */}
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="min-w-0 flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                  style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                LinkedIn Profile URL
                <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/janesmith"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Portfolio / Website URL
                <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://janesmith.dev"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Cover Letter
                <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--text-muted)" }}>(optional, 500 char max)</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value.slice(0, 500))}
                rows={4}
                placeholder="Tell us why you're excited about this role and what makes you a great fit..."
                className="w-full resize-none rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
              <p className="mt-1 text-right text-xs" style={{ color: "var(--text-muted)" }}>
                {coverLetter.length}/500
              </p>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Resume / CV <span style={{ color: "var(--accent-text)" }}>*</span>
              </label>
              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                className="flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-8 text-center cursor-pointer transition"
                style={{
                  border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
                  background: dragging ? "var(--accent-glow)" : "var(--bg-base)",
                }}
              >
                {file ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "var(--accent-text)" }} />
                    <div className="text-left">
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{file.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); setFileError(null); }}
                      className="ml-2 rounded p-0.5 hover:opacity-60"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-7 w-7" style={{ color: "var(--text-muted)" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        Drag & drop or <span style={{ color: "var(--accent-text)" }}>browse files</span>
                      </p>
                      <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        PDF, DOC, DOCX — max 5 MB
                      </p>
                    </div>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
              />
              {fileError && (
                <p className="mt-2 text-xs" style={{ color: "#EF4444" }}>{fileError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
            >
              {status === "loading" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
              ) : (
                <>Submit Application</>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

/* ─────────────────────────────────────────
   JOB CARD
───────────────────────────────────────── */

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      {/* Card header */}
      <div className="px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: deptColors[job.department] ?? "var(--accent-glow)",
                  color: deptText[job.department] ?? "var(--accent-text)",
                }}
              >
                {job.department}
              </span>
            </div>
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {job.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <MapPin className="h-3.5 w-3.5" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <Briefcase className="h-3.5 w-3.5" /> {job.type}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <Users className="h-3.5 w-3.5" /> {job.experience}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition hover:opacity-80"
              style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--bg-base)" }}
              aria-expanded={expanded}
            >
              {expanded ? "Hide Details" : "View Details"}
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <button
              onClick={() => onApply(job)}
              className="btn-primary flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Overview (always visible) */}
        <p className="mt-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {job.overview}
        </p>
      </div>

      {/* Expanded JD */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="jd"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--border)" }}
          >
            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2">
              <JDSection title="Responsibilities" items={job.responsibilities} icon={<Code2 className="h-4 w-4" style={{ color: "var(--accent-text)" }} />} />
              <JDSection title="Required Skills" items={job.required} icon={<Shield className="h-4 w-4" style={{ color: "var(--accent-text)" }} />} />
              <JDSection title="Nice to Have" items={job.preferred} icon={<Star className="h-4 w-4" style={{ color: "var(--accent-text)" }} />} />
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => onApply(job)}
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold"
              >
                Apply for this Role <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function JDSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent-text)" }} />
            <span className="text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */

/* ── Derive unique filter options from job data ── */
const ALL_DEPTS    = Array.from(new Set(jobs.map((j) => j.department))).sort();
const ALL_TYPES    = Array.from(new Set(jobs.map((j) => j.type))).sort();
const ALL_LOCS     = Array.from(new Set(
  jobs.flatMap((j) => j.location.split(" / "))
)).sort();

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mounted, setMounted] = useState(false);

  /* Search & filter state */
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter]   = useState("All");
  const [locFilter,  setLocFilter]    = useState("All");
  const [typeFilter, setTypeFilter]   = useState("All");

  useEffect(() => { setMounted(true); }, []);

  /* Filtered jobs */
  const q = searchQuery.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = deptFilter === "All" || job.department === deptFilter;
    const matchesType = typeFilter === "All" || job.type === typeFilter;
    const matchesLoc  = locFilter  === "All" || job.location.toLowerCase().includes(locFilter.toLowerCase());
    const matchesQuery = !q || [
      job.title, job.department, job.location, job.overview,
      ...job.responsibilities, ...job.required, ...job.preferred,
    ].some((s) => s.toLowerCase().includes(q));
    return matchesDept && matchesType && matchesLoc && matchesQuery;
  });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: "var(--bg-deep)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% -10%, var(--accent-glow), transparent)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                border: "1px solid var(--border-accent)",
                color: "var(--accent-text)",
                background: "var(--accent-glow)",
              }}
            >
              We&apos;re Hiring
            </span>

            <h1
              className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              Build the Future of{" "}
              <span className="gradient-text">Fleet Intelligence</span>
            </h1>

            <p
              className="mt-6 mx-auto max-w-2xl text-lg leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              We&apos;re tackling hard engineering and go-to-market problems in mobility — from processing
              millions of GPS telemetry events in real time to winning enterprise deals across APAC and
              MENA. Join a small, senior team where what you ship reaches production fast and affects
              operators at scale.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#roles"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
              >
                <Briefcase className="h-5 w-5" />
                See Open Roles
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold transition hover:opacity-80"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  background: "var(--bg-card)",
                }}
              >
                Learn About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Join Us ── */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why LAS Mobility"
            title="Why engineers and sellers choose us"
            description="We move fast, ship real software, and give you the context to make decisions. Here's what that looks like in practice."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Hiring Map ── */}
      <GlobalHiringMap />

      {/* ── Open Positions ── */}
      <section id="roles" className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Open Positions"
            title="Join a team building the future of fleet"
            description={`${jobs.length} open roles across engineering, sales, operations, HR, finance, and more.`}
          />

          {/* ── Search & Filter Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-3"
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-shadow focus-within:shadow-lg"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
            >
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by title, skill, department, or location — e.g. "GoLang", "Finance", "Remote"'
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 rounded-full p-0.5 opacity-50 transition hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter:
              </span>

              {/* Department */}
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold outline-none transition cursor-pointer"
                style={{
                  background: deptFilter !== "All" ? "var(--accent-glow)" : "var(--bg-card)",
                  border: `1px solid ${deptFilter !== "All" ? "var(--border-accent)" : "var(--border)"}`,
                  color: deptFilter !== "All" ? "var(--accent-text)" : "var(--text-secondary)",
                }}
              >
                <option value="All">All Departments</option>
                {ALL_DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>

              {/* Location */}
              <select
                value={locFilter}
                onChange={(e) => setLocFilter(e.target.value)}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold outline-none transition cursor-pointer"
                style={{
                  background: locFilter !== "All" ? "var(--accent-glow)" : "var(--bg-card)",
                  border: `1px solid ${locFilter !== "All" ? "var(--border-accent)" : "var(--border)"}`,
                  color: locFilter !== "All" ? "var(--accent-text)" : "var(--text-secondary)",
                }}
              >
                <option value="All">All Locations</option>
                {ALL_LOCS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>

              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold outline-none transition cursor-pointer"
                style={{
                  background: typeFilter !== "All" ? "var(--accent-glow)" : "var(--bg-card)",
                  border: `1px solid ${typeFilter !== "All" ? "var(--border-accent)" : "var(--border)"}`,
                  color: typeFilter !== "All" ? "var(--accent-text)" : "var(--text-secondary)",
                }}
              >
                <option value="All">All Types</option>
                {ALL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              {/* Active filter count + clear */}
              {(deptFilter !== "All" || locFilter !== "All" || typeFilter !== "All" || searchQuery) && (
                <button
                  onClick={() => { setDeptFilter("All"); setLocFilter("All"); setTypeFilter("All"); setSearchQuery(""); }}
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  Clear all
                </button>
              )}

              {/* Results count */}
              <span className="ml-auto text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"} found
              </span>
            </div>
          </motion.div>

          {/* Job list */}
          <div className="mt-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <JobCard job={job} onApply={setSelectedJob} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl py-16 text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <Search className="h-8 w-8" style={{ color: "var(--text-muted)" }} />
                  <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    No roles match your search
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Try different keywords or clear the filters
                  </p>
                  <button
                    onClick={() => { setDeptFilter("All"); setLocFilter("All"); setTypeFilter("All"); setSearchQuery(""); }}
                    className="btn-primary mt-2 rounded-xl px-5 py-2 text-xs font-semibold"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Don't see your role ── */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center sm:flex-row sm:text-left"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--accent-glow)" }}
              >
                <Mail className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
              </span>
              <div>
                <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                  Don&apos;t see your role?
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  We&apos;re always looking for exceptional talent. Send us your profile.
                </p>
              </div>
            </div>
            <a
              href="mailto:support@lasmobility.com"
              className="btn-primary shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              support@lasmobility.com
            </a>
          </motion.div>
        </div>
      </section>

      <CTASection />

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {mounted && selectedJob && (
          <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
