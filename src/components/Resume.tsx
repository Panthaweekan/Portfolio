import { personalInfo } from '@/data/portfolio-data';
import { Masthead } from './report/Masthead';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

function Resume() {
  return (
    <div className="flex h-screen flex-col">
      <Masthead page="resume" />
      <main className="mx-auto flex w-full max-w-[80rem] flex-1 flex-col px-6 pb-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Appendix: Curriculum Vitae{' '}
            <span className="font-normal tabular-nums text-muted">{personalInfo.cvUpdated}</span>
          </h1>
          <a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="text-sm font-semibold underline">
            Download PDF
          </a>
        </div>
        <div className="relative flex-1 border border-rule bg-white">
          <object data={CV_URL} type="application/pdf" className="h-full w-full">
            <iframe src={CV_URL} title="Curriculum Vitae (PDF)" className="h-full w-full border-0">
              <p className="p-8 text-center text-muted">
                This browser can't show the PDF inline.{' '}
                <a href={CV_URL} download="Panthaweekan_Somngam_CV.pdf" className="underline">
                  Download it instead.
                </a>
              </p>
            </iframe>
          </object>
        </div>
      </main>
    </div>
  );
}

export default Resume;
