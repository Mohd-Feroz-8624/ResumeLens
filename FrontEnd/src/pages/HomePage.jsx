import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
<<<<<<< HEAD
  TrendingUp,
  Lightbulb,
  Target,
  CheckCircle2,
=======
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
>>>>>>> 974e8c3fea383f7b75579f6775293aa541af8aea
  UploadCloud,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "ATS Compatibility Score",
    desc: "Check how well your resume matches modern applicant tracking systems.",
    color: "#0891b2",
  },
  {
    icon: Lightbulb,
    title: "Smart Content Suggestions",
    desc: "Improve weak bullets, keywords, and phrasing using practical AI recommendations.",
    color: "#7c3aed",
  },
  {
    icon: Target,
    title: "Role-Focused Optimization",
    desc: "Tailor your resume for specific job descriptions and increase interview chances.",
    color: "#0f766e",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");

  const handleUploadClick = () => uploadInputRef.current?.click();

  const handleAnalyzeClick = () => {
    uploadSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    setUploadedFile(file);
    setIsUploaded(false);
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("Please upload a resume first");
      return;
    }

    setIsUploaded(true);
  };

  return (
    <div className="mx-auto w-[min(1280px,92%)] py-9 pb-14 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:px-3 max-[480px]:py-4">
      <section className="mb-6 grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] max-[680px]:p-5 max-[480px]:rounded-xl max-[480px]:p-4">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-900/40 px-4 py-1.5 text-sm font-semibold text-cyan-400">
            <CheckCircle2 className="h-4 w-4" />
            AI-Powered Resume Analysis
          </span>

          <h1 className="text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.07] text-white max-[680px]:text-[clamp(1.8rem,8vw,2.6rem)]">
            Transform Your Resume with{" "}
            <span className="text-cyan-400">AI Intelligence</span>
          </h1>

          <p className="max-w-[60ch] text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.7] text-gray-300 max-[680px]:max-w-none">
            Get instant insights into your resume with Resume Analyzer, and
            increase your chances of landing your dream job.
          </p>

          <div className="flex flex-wrap gap-3 max-[680px]:w-full">
            <button
              type="button"
              className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5 max-[680px]:flex-[1_1_100%]"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 max-[680px]:flex-[1_1_100%]"
              onClick={() => navigate("/resume")}
            >
              Create Resume
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center max-lg:-order-1">
          <img
            src="resume_home.jpg"
            alt="Resume Analysis Illustration"
            className="w-[min(100%,470px)] rounded-xl border border-white/10 object-cover shadow-[0_14px_25px_rgba(0,0,0,0.35)]"
          />
        </div>
      </section>
<<<<<<< HEAD
      {/* Feature cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {features.map((f) => {
          const Icon = f.icon;
=======

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

>>>>>>> 974e8c3fea383f7b75579f6775293aa541af8aea
          return (
            <article
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20 max-[480px]:rounded-xl"
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: `${feature.color}33`, color: feature.color }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mb-2 text-sm font-bold text-white">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-gray-400">{feature.desc}</p>
            </article>
          );
        })}
      </section>
<<<<<<< HEAD
      {/* Upload + ATS form */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 items-stretch"
=======

      <section
>>>>>>> 974e8c3fea383f7b75579f6775293aa541af8aea
        ref={uploadSectionRef}
        className="grid grid-cols-1 gap-4 items-stretch lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload resume file"
          className="grid min-h-72 place-items-center rounded-2xl border-2 border-dashed border-cyan-700/40 bg-white/5 p-4 backdrop-blur-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-cyan-500 max-[680px]:min-h-52 max-[480px]:rounded-xl"
          onClick={handleUploadClick}
        >
          {!uploadedFile ? (
            <>
              <div className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-cyan-700/40 p-6 hover:border-cyan-500/60 hover:bg-white/10">
                <UploadCloud className="h-8 w-8 text-cyan-400" />
                <p className="text-sm font-semibold text-white">
                  Click to upload resume
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX supported</p>
              </div>
              <input
                ref={uploadInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <>
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <p className="text-sm font-semibold text-green-400">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">Click to change file</p>
            </>
          )}
        </div>

        <div className="flex min-h-72 items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm max-lg:flex-col max-[680px]:min-h-52 max-[480px]:rounded-xl">
          {isUploaded ? (
            <>
              <div className="w-full flex-1 min-w-0 rounded-xl bg-linear-to-b from-green-500/90 to-green-700/90 p-4">
                <p className="mb-3 text-sm font-semibold text-white">
                  Requirements Found
                </p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {[
                    "Contact information present",
                    "Professional summary included",
                    "Work experience listed",
                    "Education section found",
                    "Skills section detected",
                    "Action verbs used",
                    "Clean formatting structure",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full flex-1 min-w-0 rounded-xl bg-linear-to-b from-red-400/90 to-red-600/90 p-4">
                <p className="mb-3 text-sm font-semibold text-white">Suggestions</p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {[
                    `Add metrics for ${targetRole || "your role"}`,
                    "Include LinkedIn profile URL",
                    "Add missing industry keywords",
                    "Quantify your achievements",
                    "Expand the skills section",
                    "Tailor summary to job description",
                    "Add relevant certifications",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="w-full max-w-xl">
              <h2 className="text-center text-2xl font-bold text-white">
                Get Your ATS Score
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <h6 className="mb-2 font-semibold text-white">
                    Target Role <span className="text-red-400">*</span>
                  </h6>
                  <input
                    type="text"
                    placeholder="Target role which you are looking for?"
                    className="w-full rounded-lg border border-white/15 bg-white/5 p-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-500"
                    value={targetRole}
                    onChange={(event) => setTargetRole(event.target.value)}
                  />
                </div>

                <div>
                  <h6 className="mb-2 font-semibold text-white">
                    Experience <span className="text-red-400">*</span>
                  </h6>
                  <input
                    type="number"
                    placeholder="Years of experience?"
                    className="w-full rounded-lg border border-white/15 bg-white/5 p-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-500"
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="mt-2 rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
<<<<<<< HEAD
      </div>
=======
      </section>
>>>>>>> 974e8c3fea383f7b75579f6775293aa541af8aea
    </div>
  );
};

export default HomePage;
