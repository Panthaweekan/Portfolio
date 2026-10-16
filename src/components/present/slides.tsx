import type { ComponentType, ReactNode } from 'react';
import { experiences, personalInfo, projects } from '@/data/portfolio-data';
import { FigureOne } from '@/components/report/FigureOne';
import { LayerFigure } from '@/components/report/LayerFigure';
import { Divider } from './Divider';
import { contents, DECKS, pageOf, totalOf, type DeckId, type DeckSlideId } from './outline';
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

// A ruled list of short statements, each with an optional bold lead-in.
function Points({ items }: { items: readonly { lead?: string; text: string }[] }) {
  return (
    <ul className="mt-14 border-t border-ink">
      {items.map(({ lead, text }) => (
        <li key={text} className="border-b border-rule py-6 text-[32px] leading-snug">
          {lead && <span className="font-semibold">{lead} </span>}
          {text}
        </li>
      ))}
    </ul>
  );
}

function TitleSlide({ id, label, positioning }: { id: 'title' | 'about-title'; label: string; positioning: ReactNode }) {
  return (
    <div className="relative h-full bg-ground text-ink">
      <div className="flex h-full w-[1200px] flex-col px-[120px] pb-[56px] pt-[96px]">
        <div className="my-auto">
          <h1 className="text-[140px] font-semibold leading-[0.98] tracking-tight">
            Panthaweekan
            <br />
            Somngam
          </h1>
          <p className="mt-10 max-w-[22ch] text-[52px] leading-tight">{positioning}</p>
          <p className="mt-8 text-[32px] text-muted">
            {currentRole.title} · {currentRole.company} · {currentRole.location.split(',')[0]}
          </p>
        </div>
        <div className="flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
          <span>{label} · {personalInfo.cvUpdated}</span>
          <span>
            p. {pageOf(id)} / {totalOf(id)}
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

function ContentsSlide({ id, deck, heading }: { id: 'contents' | 'about-agenda'; deck: DeckId; heading: string }) {
  const rows = contents(deck);
  return (
    <SlideFrame id={id}>
      <Headline>{heading}</Headline>
      <ol className="mt-14 border-t border-ink">
        {rows.map((c) => (
          <li
            key={c.title}
            // ponytail: six rows (the agenda) only fit with tighter rows; five keep the original rhythm
            className={rows.length > 5 ? 'grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-4' : 'grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-6'}
          >
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

function CloseSlide({ id, headline, note }: { id: 'close' | 'about-close'; headline: ReactNode; note?: string }) {
  return (
    <SlideFrame id={id}>
      <div className="grid h-full grid-cols-12 gap-x-6">
        <h2 className="col-span-6 self-center text-[140px] font-semibold leading-none tracking-tight">{headline}</h2>
        <ul className="col-span-6 col-start-7 self-center space-y-6 whitespace-nowrap text-[36px]">
          <li>{personalInfo.email}</li>
          <li>{strip(personalInfo.linkedin)}</li>
          <li>{strip(personalInfo.github)}</li>
          <li>{strip(personalInfo.portfolio)}</li>
          <li className="text-muted">CV: {strip(personalInfo.portfolio)}/resume</li>
          {note && <li className="whitespace-normal pt-4 text-[22px] text-muted">{note}</li>}
        </ul>
      </div>
    </SlideFrame>
  );
}

// ── About me deck (/present/recruiter) ──

function AboutWhy() {
  return (
    <SlideFrame id="about-why">
      <Headline>I want to build products that solve a real problem, and keep growing.</Headline>
      <Points
        items={[
          { lead: "Solve the user's problem.", text: 'Start from what actually hurts.' },
          { lead: 'Built to grow.', text: 'Easy to extend and scale as needs change.' },
          { lead: 'Worth keeping.', text: 'Software with lasting value, not a one-off.' },
        ]}
      />
    </SlideFrame>
  );
}

function AboutStart() {
  return (
    <SlideFrame id="about-start" caption="B.Eng. Computer Engineering · Second-Class Honours · 2025">
      <Headline>I practised working with product owners while I was still a student.</Headline>
      <p className="mt-6 text-[22px] tabular-nums text-muted">
        Work-study scholarship · Faculty of Engineering, Chiang Mai University · 2023 – 2025
      </p>
      <Points
        items={[
          {
            text: 'I wanted to learn two things: turning a pain point into requirements and a design, and building the whole stack: back end, front end, Docker and networking.',
          },
          {
            text: 'We were a team of two. I was the full-stack developer and PM; a friend was the UX/UI designer and BA.',
          },
        ]}
      />
    </SlideFrame>
  );
}

function AboutUsers() {
  return (
    <SlideFrame id="about-users" caption="Built with Go · React · TypeScript · PostgreSQL · Docker">
      <Headline>We shipped two apps the faculty used.</Headline>
      <div className="mt-14 grid grid-cols-2 gap-x-16">
        <Column
          title="Certificate approvals"
          items={['A paper process became a multi-stage online workflow.', 'Turnaround went from weeks to days.']}
        />
        <Column
          title="SD-Booking"
          items={[
            'The room booking system the faculty uses for daily scheduling, still in use today.',
            'It stops two people booking the same room.',
          ]}
        />
      </div>
    </SlideFrame>
  );
}

function AboutSpec() {
  return (
    <SlideFrame id="about-spec" caption="Built with Go · Kafka · PostgreSQL · AWS · Next.js">
      <Headline>First, everyone agrees on what we are building.</Headline>
      <Points
        items={[
          { text: 'At SCB TechX I ran discovery for the AI cost management module of our agentic AI platform.' },
          { text: 'I wrote the requirements, module spec and service design for the product owner and engineering manager.' },
          { text: 'Every feature has acceptance criteria, so we know how to check it is right before we build it.' },
        ]}
      />
    </SlideFrame>
  );
}

// Stage, and who signs it off when a person does.
const FLOW: readonly (readonly [stage: string, gate?: string])[] = [
  ['Requirement'],
  ['PRD', 'Product owner, engineering manager'],
  ['Design spec', 'The team'],
  ['Stories'],
  ['Tasks'],
  ['Tests'],
  ['Code'],
  ['Review', 'Merge: a reviewer'],
  ['Deliver'],
];

function AboutFlow() {
  return (
    <SlideFrame
      id="about-flow"
      caption="With a small team, AI agents do the drafting. A person signs off at each gate, and each sprint repeats the loop."
    >
      <Headline>AI drafts. People decide.</Headline>
      <p className="mt-6 text-[32px] leading-snug">
        I set this up for the team, so everyone agrees on scope and on how each feature is tested.
      </p>
      <ol className="mt-12 grid grid-cols-9 gap-x-3">
        {FLOW.map(([stage, gate], i) => (
          <li key={stage} className="border-t border-ink pt-4">
            <span className="block text-[22px] tabular-nums text-muted">{i + 1}</span>
            <span className={gate ? 'mt-2 block text-[28px] font-semibold leading-tight' : 'mt-2 block text-[28px] font-medium leading-tight text-muted'}>
              {stage}
              {i === FLOW.length - 1 && <span aria-hidden> ↺</span>}
            </span>
            {gate && (
              <span className="mt-6 block border-t border-rule pt-3 text-[22px] leading-snug">
                <span className="block font-semibold">Signed off</span>
                {gate}
              </span>
            )}
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}

function AboutReview() {
  return (
    <SlideFrame id="about-review">
      <Headline>What happens when AI writes code faster than people can review it?</Headline>
      <Points
        items={[
          { lead: 'One standard.', text: 'I wrote reusable AI skills for repeated work and shared them with the team.' },
          { lead: 'Tests come first.', text: 'Every change must pass its tests and a coverage gate.' },
          {
            lead: 'AI reviews, people verify.',
            text: 'I built an AI-assisted review workflow, reviewer agents plus a verifier. The team adopted it, and it catches bugs human reviewers missed.',
          },
        ]}
      />
    </SlideFrame>
  );
}

const TOOLKIT = [
  ['Back end', 'Go · Ruby on Rails · PostgreSQL · Kafka', 'The services and data behind a product'],
  ['Front end', 'React · Next.js · TypeScript', 'The screens people use'],
  ['Cloud & ops', 'AWS · Docker · Kubernetes · Kong', 'Where it runs, and how it stays up'],
  ['Quality', 'Test-first · CI/CD · OpenTelemetry · Prometheus', 'How we know it works'],
  ['AI tools', 'Claude Code (daily) · also used Codex and Gemini', 'How I plan, build and review with AI'],
] as const;

function AboutToolkit() {
  return (
    <SlideFrame id="about-toolkit" caption="Full list in my CV">
      <Headline>What I build with</Headline>
      <ul className="mt-10 border-t border-ink">
        {TOOLKIT.map(([area, tools, gloss]) => (
          <li key={area} className="grid grid-cols-12 items-baseline gap-x-6 border-b border-rule py-4">
            <span className="col-span-3 text-[40px] font-semibold">{area}</span>
            <span className="col-span-9">
              <span className="block text-[32px] leading-snug">{tools}</span>
              <span className="block text-[22px] text-muted">{gloss}</span>
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function AboutOutside() {
  return (
    <SlideFrame id="about-outside">
      <Headline>Outside work, I stream games and build tools for my own problems.</Headline>
      <Points
        items={[
          { lead: 'Twitch game streaming,', text: 'and a chat text-to-speech bot I built for it, with Thai and English voices.' },
          {
            lead: 'FitJourney:',
            text: 'a fitness app I built because no single tool tracked my workouts, meals and body metrics together.',
          },
        ]}
      />
    </SlideFrame>
  );
}

function AboutNext() {
  return (
    <SlideFrame id="about-next">
      <Headline>Next, I want to help teams bring AI into real work.</Headline>
      <Points
        items={[
          { text: 'I already work AI-first: AI helps me find ideas, plan, write specs, build, test and deliver.' },
          { text: 'I believe this is how most software work will be done from now on.' },
          { text: "I want a role where I bring that into other teams' daily work." },
        ]}
      />
    </SlideFrame>
  );
}

const RECRUITER: Record<DeckSlideId<'recruiter'>, ComponentType> = {
  'about-agenda': () => <ContentsSlide id="about-agenda" deck="recruiter" heading="Agenda" />,
  'about-now': () => <Divider id="about-now" subtitle="How I work with a team and AI" dates="2025 – now · SCB TechX" />,
  'about-before': () => (
    <Divider
      id="about-before"
      subtitle="Where I learned to work with product owners"
      dates="2023 – 2025 · Faculty of Engineering"
    />
  ),
  'about-self': () => <Divider id="about-self" subtitle="Why I build, and what I do outside work" dates="Beyond the CV" />,
  'about-title': () => (
    <TitleSlide
      id="about-title"
      label="About me"
      positioning={
        <>
          I build software that solves real problems, and I work <span className="whitespace-nowrap">AI-first</span> to do
          it.
        </>
      }
    />
  ),
  'about-why': AboutWhy,
  'about-start': AboutStart,
  'about-users': AboutUsers,
  'about-spec': AboutSpec,
  'about-flow': AboutFlow,
  'about-review': AboutReview,
  'about-toolkit': AboutToolkit,
  'about-outside': AboutOutside,
  'about-next': AboutNext,
  'about-close': () => (
    <CloseSlide
      id="about-close"
      headline={
        <>
          Thank you.
          <br />
          Questions?
        </>
      }
      note={`Technical deep dive: ${strip(personalInfo.portfolio)}/present/technical`}
    />
  ),
};

const TECHNICAL: Record<DeckSlideId<'technical'>, ComponentType> = {
  title: () => <TitleSlide id="title" label="Portfolio talk" positioning={personalInfo.positioning} />,
  contents: () => <ContentsSlide id="contents" deck="technical" heading="Contents" />,
  finops: FinopsDivider,
  'finops-discovery': FinopsDiscovery,
  'finops-figure': FinopsFigure,
  'finops-built': FinopsBuilt,
  gateway: GatewayDivider,
  'gateway-fix': GatewayFix,
  earlier: EarlierDivider,
  'earlier-two-up': EarlierTwoUp,
  'how-i-work': HowIWork,
  close: () => <CloseSlide id="close" headline="Questions?" />,
};

const COMPONENTS: Record<DeckId, Record<string, ComponentType>> = { recruiter: RECRUITER, technical: TECHNICAL };

export function slidesFor(deck: DeckId) {
  const slides: readonly { id: string; title: string }[] = DECKS[deck];
  return slides.map((s) => ({ id: s.id, title: s.title, Component: COMPONENTS[deck][s.id] }));
}

