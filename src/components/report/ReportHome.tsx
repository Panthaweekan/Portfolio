import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { education, experiences, personalInfo, technicalSkills } from '@/data/portfolio-data';
import { Masthead } from './Masthead';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

const sectionTitle = 'text-3xl font-semibold tracking-tight';

export function ReportHome() {
  // Content renders after load, so the browser's own hash jump misses it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:bg-ground focus:p-2"
      >
        Skip to content
      </a>
      <Masthead page="home" />

      <main id="main">
        <div className="mx-auto max-w-[80rem] px-6 md:px-10">
          <section
            aria-labelledby="intro-title"
            className="grid grid-cols-12 gap-x-6 gap-y-10 py-10 md:min-h-[calc(100svh-3.5rem)] md:py-12"
          >
            <div className="col-span-12 flex flex-col justify-center md:col-span-5">
              <h1 id="intro-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                {personalInfo.name}
              </h1>
              <p className="mt-6 text-2xl leading-snug md:text-[1.75rem]">{personalInfo.positioning}</p>
              <p className="mt-6 max-w-measure text-muted">{personalInfo.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={CV_URL}
                  download="Panthaweekan_Somngam_CV.pdf"
                  className="inline-flex h-11 items-center bg-field px-5 font-semibold text-on-field hover:opacity-90"
                >
                  Download CV
                </a>
                <a href={`mailto:${personalInfo.email}`} className="font-semibold underline">
                  Email
                </a>
                <a href={personalInfo.linkedin} className="font-semibold underline">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">{/* Figure 1: Task 6 */}</div>
          </section>

          <section id="systems" aria-labelledby="systems-title" className="border-t border-ink pt-12">
            <h2 id="systems-title" className={sectionTitle}>
              Systems
            </h2>
            <p className="mt-3 max-w-measure text-muted">Each chapter is one system I worked on, newest first.</p>
            {/* Chapters: Task 7 */}
          </section>

          <section id="record" aria-labelledby="record-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="record-title" className={sectionTitle}>
              Record
            </h2>
            <table className="mt-6 w-full text-left">
              <thead className="text-sm text-muted">
                <tr>
                  <th scope="col" className="py-2 pr-6 font-normal">Role</th>
                  <th scope="col" className="py-2 pr-6 font-normal">Employer</th>
                  <th scope="col" className="hidden py-2 pr-6 font-normal md:table-cell">Location</th>
                  <th scope="col" className="py-2 text-right font-normal">Dates</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((e) => (
                  <tr key={e.title} className="border-t border-rule align-top">
                    <td className="py-3 pr-6 font-medium">{e.title}</td>
                    <td className="py-3 pr-6">{e.company}</td>
                    <td className="hidden py-3 pr-6 text-muted md:table-cell">{e.location}</td>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums text-muted">{e.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="skills" aria-labelledby="skills-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="skills-title" className={sectionTitle}>
              Skills
            </h2>
            <dl className="mt-6">
              {technicalSkills.map((c) => (
                <div key={c.name} className="grid grid-cols-12 gap-x-6 border-t border-rule py-3">
                  <dt className="col-span-12 text-sm text-muted sm:col-span-3">{c.name}</dt>
                  <dd className="col-span-12 sm:col-span-9">{c.items.map((i) => i.label).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="education-title" className="border-t border-ink pb-16 pt-12">
            <h2 id="education-title" className={sectionTitle}>
              Education
            </h2>
            <p className="mt-6 font-medium">{education.degree}</p>
            <p className="tabular-nums text-muted">
              {education.school} · {education.honours} · GPA {education.gpa} · {education.graduated}
            </p>
            <p className="mt-3 max-w-measure text-muted">Thesis: {education.thesis}</p>
          </section>
        </div>

        <section id="contact" aria-labelledby="contact-title" className="on-field bg-field text-on-field">
          <div className="mx-auto grid max-w-[80rem] grid-cols-12 gap-x-6 gap-y-8 px-6 py-20 md:px-10">
            <div className="col-span-12 md:col-span-6">
              <h2 id="contact-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
                Contact
              </h2>
              <p className="mt-4 max-w-measure text-on-field-muted">
                I'm based in {personalInfo.location} and open to remote or hybrid roles.
              </p>
            </div>
            <ul className="col-span-12 space-y-3 text-lg md:col-span-6">
              <li><a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a></li>
              <li><a href={personalInfo.linkedin} className="underline">LinkedIn</a></li>
              <li><a href={personalInfo.github} className="underline">GitHub</a></li>
              <li><a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="underline">Download CV (PDF)</a></li>
              <li><Link to="/present" className="underline">Open the presentation</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
