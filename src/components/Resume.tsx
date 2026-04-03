import { Button } from "./ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Resume() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 overflow-hidden">
      {/* Header Bar */}
      <header className="flex-none h-16 w-full flex items-center justify-between px-6 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 z-10">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
          <div className="h-4 w-px bg-zinc-700 hidden sm:block"></div>
          <span className="text-zinc-200 font-medium text-sm hidden sm:block">
            Curriculum Vitae
          </span>
        </div>

        <Button
          asChild
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-900/20 transition-all border border-indigo-500/50"
        >
          <a href={`${import.meta.env.BASE_URL}cv.pdf`} download="Panthaweekan_Somngam_CV.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </header>

      {/* PDF Viewer Container */}
      <main className="flex-1 w-full bg-zinc-950 p-4 sm:p-8 flex justify-center items-center overflow-hidden">
        <div className="w-full max-w-5xl h-full shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 relative group">
          {/* Fallback overlay (visible before load or if object fails) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-900 -z-10">
            <Download className="h-12 w-12 text-zinc-700 mb-4" />
            <h3 className="text-xl font-medium text-zinc-300 mb-2">Native PDF Viewer Unavailable</h3>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6">
              Your browser limits inline PDF viewing. Please download the document to view it.
            </p>
          </div>

          {/* Native Viewer */}
          <object
            data={`${import.meta.env.BASE_URL}cv.pdf`}
            type="application/pdf"
            className="w-full h-full z-10 relative bg-white"
          >
            {/* Iframe fallback for object */}
            <iframe
              src={`${import.meta.env.BASE_URL}cv.pdf`}
              className="w-full h-full border-none bg-white"
              title="Resume PDF Viewer"
            >
              <p className="text-zinc-500 text-sm p-8 text-center">
                PDF cannot be displayed. You can download it using the button above.
              </p>
            </iframe>
          </object>
        </div>
      </main>
    </div>
  );
}

export default Resume;
