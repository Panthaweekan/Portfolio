import type { ComponentType, ReactNode } from 'react';
import { experiences, personalInfo, projects } from '@/data/portfolio-data';
import { FigureOne } from '@/components/report/FigureOne';
import { LayerFigure } from '@/components/report/LayerFigure';
import { Divider } from './Divider';
import { contents, OUTLINE, pageOf, TOTAL_PAGES, type SlideId } from './outline';
import { SlideFrame } from './SlideFrame';

const project = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`missing project ${id}`);
  return p;
};
const strip = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const PORTRAIT = `${import.meta.env.BASE_URL}present-icons/portrait.jpg`;
const currentRole = experiences[0];

const Headline = ({ children }: { children: ReactNode }) => (
  <h2 className="text-[72px] font-semibold leading-[1.05] tracking-tight">{children}</h2>
);

function Column({ title, meta, items }: { title: string; meta?: string; items: string[] }) {
  return (
    <div className="border-t border-ink pt-6">
      <h3 className="text-[40px] font-semibold">{title}</h3>
      {meta && <p className="mt-2 text-[22px] tabular-nums text-muted">{meta}</p>}
      <ul className="mt-6 space-y-5 text-[32px] leading-snug">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="relative h-full bg-ground text-ink">
      <div className="flex h-full w-[1200px] flex-col px-[120px] pb-[56px] pt-[96px]">
        <div className="my-auto">
          <h1 className="text-[140px] font-semibold leading-[0.98] tracking-tight">
            Panthaweekan
            <br />
            Somngam
          </h1>
          <p className="mt-10 max-w-[22ch] text-[52px] leading-tight">{personalInfo.positioning}</p>
          <p className="mt-8 text-[32px] text-muted">
            {currentRole.title} · {currentRole.company} · {currentRole.location.split(',')[0]}
          </p>
        </div>
        <div className="flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
          <span>Portfolio talk · {personalInfo.cvUpdated}</span>
          <span>
            p. {pageOf('title')} / {TOTAL_PAGES}
          </span>
        </div>
      </div>
      <img
        src={PORTRAIT}
        alt="Illustrated portrait of Panthaweekan Somngam"
        className="absolute right-0 top-0 h-full w-[720px] object-cover"
      />
    </div>
  );
}

function ContentsSlide() {
  return (
    <SlideFrame id="contents">
      <Headline>Contents</Headline>
      <ol className="mt-14 border-t border-ink">
        {contents().map((c) => (
          <li key={c.title} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-6">
            <span className="col-span-1 text-[40px] tabular-nums text-muted">{c.numeral}</span>
            <span className="col-span-9 text-[56px] font-semibold tracking-tight">{c.title}</span>
            <span className="col-span-2 text-right text-[40px] tabular-nums">p. {c.page}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function FinopsDivider() {
  return <Divider id="finops" subtitle="One LLM call becomes money" dates={`${project('finops').dateRange} · SCB TechX`} />;
}

function FinopsDiscovery() {
  return (
    <SlideFrame id="finops-discovery">
      <Headline>I started with the spec.</Headline>
      <div className="mt-14 grid grid-cols-12 gap-x-6">
        <p className="col-span-6 border-t border-ink pt-6 text-[52px] leading-tight">
          Before any code, I wrote the requirements, the module spec and the service topology for the product owner and
          the engineering manager.
        </p>
        <div className="col-span-5 col-start-8 border-t border-ink pt-6">
          <h3 className="text-[32px] font-semibold">The design call</h3>
          <p className="mt-4 text-[32px] leading-snug">
            Budget enforcement stays inside the platform. The engine observes and reports.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

function FinopsFigure() {
  return (
    <SlideFrame id="finops-figure">
      <FigureOne slide />
    </SlideFrame>
  );
}

function FinopsBuilt() {
  return (
    <SlideFrame id="finops-built">
      <Headline>What I built, and how we work</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <Column
          title="Built, with two teammates"
          items={[
            'A Go cost engine: OpenTelemetry usage signals from Kafka, priced with exact integer money at the rate in force.',
            "Attribution to each customer's organisation tree, multi-tenant on PostgreSQL.",
            'The console dashboard, from organisation down to one step of one run.',
          ]}
        />
        <Column
          title="How we work"
          items={[
            'Architecture decision records',
            'Test-first, with a coverage gate',
            'Hexagonal layers held by lint',
            'AI-assisted pull-request review',
          ]}
        />
      </div>
    </SlideFrame>
  );
}

function GatewayDivider() {
  return (
    <Divider
      id="gateway"
      subtitle="Replacing a legacy gateway behind Kong"
      dates={`${project('gateway').dateRange} · handed over Sep 2026`}
    />
  );
}

function GatewayFix() {
  const gateway = project('gateway');
  return (
    <SlideFrame id="gateway-fix">
      <Headline>From an appliance to a service</Headline>
      <div className="mt-10 grid grid-cols-2 gap-x-16">
        <Column
          title="The pain with the legacy gateway"
          items={[
            'Licences, not pods: capacity cost money',
            'A proprietary appliance, no GitOps',
            'Token logic trapped inside the gateway',
            'Hard to test: changes meant editing the appliance',
          ]}
        />
        <Column
          title="The fix I worked on"
          items={[
            'A Go token service behind Kong',
            'Prototyped: config sync with diff and rollback',
            'Prototyped: per-service circuit breaking',
            'Both aimed at a phased rollout, 30+ services',
          ]}
        />
      </div>
      {gateway.visualArch && (
        <LayerFigure number={2} title="API gateway" layers={gateway.visualArch} size="slide" />
      )}
    </SlideFrame>
  );
}

function EarlierDivider() {
  return <Divider id="earlier" subtitle="From faculty tools to enterprise workflows" dates="2023 – 2025" />;
}

function EarlierTwoUp() {
  const assets = project('assets');
  const booking = project('sd-booking');
  return (
    <SlideFrame id="earlier-two-up">
      <Headline>Two systems I built before FinOps</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <Column
          title="Enterprise asset platform"
          meta={`${assets.subtitle} · ${assets.dateRange}`}
          items={[
            'Built to replace Excel and MS Forms for the asset lifecycle',
            'Four request lifecycles, approval chains per role and step',
            'Six roles on Azure AD single sign-on; Excel and CSV reports',
          ]}
        />
        <Column
          title="SD-Booking"
          meta={`${booking.subtitle} · ${booking.dateRange}`}
          items={[
            'Real-time room booking used across the faculty',
            'Role-based access and booking conflict detection',
            'Adopted for daily scheduling, and still in use today',
          ]}
        />
      </div>
    </SlideFrame>
  );
}

const STEPS = [
  ['Write the spec first', 'FinOps: requirements, module spec and topology before the engine.'],
  ['Keep the core hexagonal and tested', 'Gateway and FinOps keep business logic free of infrastructure.'],
  ['Ship in small, reviewed steps', 'FinOps: test-first changes through AI-assisted review.'],
  ['Own it after it ships', 'SD-Booking: adopted by the faculty and still in daily use.'],
] as const;

function HowIWork() {
  return (
    <SlideFrame id="how-i-work">
      <Headline>How I work</Headline>
      <ol className="mt-12 border-t border-ink">
        {STEPS.map(([step, example], i) => (
          <li key={step} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-6">
            <span className="col-span-1 text-[40px] tabular-nums text-muted">{i + 1}</span>
            <span className="col-span-5 text-[40px] font-semibold leading-tight">{step}</span>
            <span className="col-span-6 text-[32px] leading-snug text-muted">{example}</span>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function CloseSlide() {
  return (
    <SlideFrame id="close">
      <div className="grid h-full grid-cols-12 gap-x-6">
        <h2 className="col-span-6 self-center text-[140px] font-semibold leading-none tracking-tight">Questions?</h2>
        <ul className="col-span-6 col-start-7 self-center space-y-6 whitespace-nowrap text-[36px]">
          <li>{personalInfo.email}</li>
          <li>{strip(personalInfo.linkedin)}</li>
          <li>{strip(personalInfo.github)}</li>
          <li>{strip(personalInfo.portfolio)}</li>
          <li className="text-muted">CV: {strip(personalInfo.portfolio)}/resume</li>
        </ul>
      </div>
    </SlideFrame>
  );
}

const COMPONENTS: Record<SlideId, ComponentType> = {
  title: TitleSlide,
  contents: ContentsSlide,
  finops: FinopsDivider,
  'finops-discovery': FinopsDiscovery,
  'finops-figure': FinopsFigure,
  'finops-built': FinopsBuilt,
  gateway: GatewayDivider,
  'gateway-fix': GatewayFix,
  earlier: EarlierDivider,
  'earlier-two-up': EarlierTwoUp,
  'how-i-work': HowIWork,
  close: CloseSlide,
};

export const SLIDES = OUTLINE.map((s) => ({ id: s.id, title: s.title, Component: COMPONENTS[s.id] }));
