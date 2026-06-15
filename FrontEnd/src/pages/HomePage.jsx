import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


const handleFileChange = (e) => {
  const file = e.target.files[0];

 if (file) {
  setResumeFile(file);
  setIsUploaded(false);
}
};

const HomePage = () => {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
    
  };

  const handleAnalyzeClick = () => {
    uploadSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
    
    const [resumeFile, setResumeFile] = useState(null);
  return (
    <div className="w-[min(1280px,94%)] min-h-full flex flex-col justify-center align-center mx-auto py-9 pb-14 bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-lg max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[680px]:pb-10 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-0">
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] w-9/10  mx-auto gap-[clamp(1.25rem,2vw,2.25rem)] items-center border border-[rgba(148,163,184,0.14)] rounded-[1.35rem] p-[clamp(1.2rem,2vw,2rem)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.96))] shadow-[0_14px_34px_rgba(15,23,42,0.08)] max-[680px]:rounded-2xl max-[680px]:p-2 max-[480px]:rounded-[0.9rem]">
        <div className="flex flex-col gap-[0.95rem]">
          <p className="m-0 w-fit inline-flex items-center gap-2 px-[0.8rem] py-[0.35rem] rounded-full bg-[rgba(224,242,254,0.9)] text-[#075985] text-[0.88rem] font-bold tracking-[0.02em] max-[480px]:text-[0.8rem]">
            <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
            AI-Powered Resume Analysis
          </p>

          <h1 className="mt-1 mb-0 text-[#0f172a] text-[clamp(2rem,4.4vw,3.65rem)] leading-[1.07] font-extrabold max-[680px]:text-[clamp(1.8rem,8vw,2.6rem)]">
            Transform Your Resume with <br />
            <span className="text-[#0891b2]"> AI Intelligence</span>
          </h1>

          <p className="mt-[0.35rem] mb-0 max-w-[60ch] text-gray-900 text-[clamp(1rem,1.4vw,1.08rem)] leading-[1.7] max-[680px]:max-w-none">
            Get instant insights into your resume with Resume Analyzer, and
            increase your chances of landing your dream job.
          </p>

          <div className="mt-[0.4rem] flex flex-wrap gap-[0.8rem] max-[680px]:w-full">
            <button
              type="button"
              className="rounded-xl px-[1.05rem] py-[0.7rem] text-[0.95rem] font-bold border border-transparent cursor-pointer transition-all duration-160 ease hover:-translate-y-0.5 bg-[linear-gradient(135deg,#0891b2,#0ea5e9)] text-white shadow-[0_8px_18px_rgba(8,145,178,0.22)] hover:bg-[linear-gradient(135deg,#0f766e,#0284c7)] max-[680px]:flex-[1_1_100%] max-[480px]:w-full"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              className="rounded-xl px-[1.05rem] py-[0.7rem] text-[0.95rem] font-bold border border-[#cbd5e1] cursor-pointer transition-all duration-160 ease hover:-translate-y-0.5 bg-[rgba(255,255,255,0.88)] text-[#0f172a] hover:bg-[#f8fafc] max-[680px]:flex-[1_1_100%] max-[480px]:w-full"
              onClick={() => navigate("/resume")}
            >
              Create Resume
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center max-lg:-order-1">
          <img
            src="resume_home.jpg"
            alt="Resume Analysis Illustration"
            className="w-[min(100%,470px)] rounded-[1.1rem] object-cover border border-[rgba(226,232,240,0.9)] shadow-[0_14px_25px_rgba(15,23,42,0.1)]"
          />
        </div>
      </section>

      <section
        className="mt-[1.4rem] grid  mx-auto w-9/10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.9rem]"
        ref={uploadSectionRef}
      >
        <article className="border border-[#e2e8f0] rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-180 ease hover:-translate-y-0.75 hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">
            ATS Compatibility Score
          </h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-normal">
            Check how well your resume matches modern applicant tracking
            systems.
          </p>
        </article>
        <article className="border border-[#e2e8f0] rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-180 ease hover:-translate-y-0.75 hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">
            Smart Content Suggestions
          </h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-normal">
            Improve weak bullets, keywords, and phrasing using practical AI
            recommendations.
          </p>
        </article>
        <article className="border border-[#e2e8f0] rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-180 ease hover:-translate-y-0.75 hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">
            Role-Focused Optimization
          </h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-normal">
            Tailor your resume for specific job descriptions and increase
            interview chances.
          </p>
        </article>
      </section>

      <section className="mt-[1.4rem] grid grid-cols-1 w-9/10 mx-auto lg:grid-cols-[0.9fr_1.1fr] gap-4 items-stretch">

  {/* Upload Section */}
  <div
    role="button"
    tabIndex={0}
    aria-label="Upload resume file"
    className="grid place-items-center min-h-80 p-4 border-2 border-dashed border-cyan-300 rounded-2xl bg-gradient-to-br from-white to-cyan-50 shadow-lg"
  >
    {!resumeFile ? (
      <>
        <img
          src="upload.jpg"
          onClick={handleUploadClick}
          alt="upload PDF"
          className="block w-full max-w-[280px] cursor-pointer"
        />

        <h3 className="mt-4 text-xl font-bold text-slate-700">
          Upload Your Resume
        </h3>

        <p className="text-slate-500 text-center">
          PDF, DOC or DOCX supported
        </p>
      </>
    ) : (
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-cyan-200">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <i className="fa-solid fa-file-pdf text-red-600 text-3xl"></i>
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="font-bold text-lg text-slate-800 truncate">
              {resumeFile.name}
            </h3>

            <p className="text-slate-500">
              {(resumeFile.size / 1024).toFixed(2)} KB
            </p>

            <div className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
  <i className="fa-solid fa-circle-check"></i>
  Resume Uploaded Successfully
</div>
          </div>
        </div>

        <button
          onClick={() => {
            setResumeFile(null);
            setIsUploaded(false);
          }}
          className="w-full mt-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
        >
          Remove Resume
        </button>
      </div>
    )}

    <input
      ref={uploadInputRef}
      type="file"
      accept=".pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files[0];

        if (file) {
          setResumeFile(file);
        }
      }}
    />
  </div>

  {/* ATS Section */}
  <div className="flex items-center justify-center min-h-80 gap-4 rounded-2xl p-6 bg-white border border-slate-200 shadow-lg">

    {isUploaded ? (
      <div className="w-full flex flex-col gap-5">

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">
            ATS Compatibility Score
          </h2>

          <div className="text-6xl font-extrabold mt-3">
            82%
          </div>

          <p className="mt-2">
            Excellent Resume Structure
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            Strengths
          </h2>

          <ul className="space-y-2">
            <li>✅ Professional formatting</li>
            <li>✅ Good resume structure</li>
            <li>✅ Relevant experience listed</li>
            <li>✅ Strong education section</li>
            <li>✅ ATS friendly layout</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h2 className="text-xl font-bold text-red-700 mb-3">
            Suggestions
          </h2>

          <ul className="space-y-2">
            <li>⚡ Add more technical keywords</li>
            <li>⚡ Quantify achievements</li>
            <li>⚡ Improve project descriptions</li>
            <li>⚡ Add certifications</li>
            <li>⚡ Use stronger action verbs</li>
          </ul>
        </div>

      </div>
    ) : (
      <div className="w-full">

        <h2 className="text-center text-2xl font-bold text-slate-800">
          Get Your ATS Score
        </h2>

        <div className="flex flex-col gap-4 mt-6">

          <div>
            <h6 className="mb-2 font-semibold">
              Target Role <span className="text-red-600">*</span>
            </h6>

            <input
              type="text"
              placeholder="Target role which you are looking for?"
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <h6 className="mb-2 font-semibold">
              Experience <span className="text-red-600">*</span>
            </h6>

            <input
              type="number"
              placeholder="What is Your Experience?"
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <button
            className="rounded-xl px-5 py-3 mt-3 font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            onClick={() => {
              if (!resumeFile) {
                alert("Please upload a resume first");
                return;
              }

              setIsUploaded(true);
            }}
          >
            Analyze Resume
          </button>

        </div>
      </div>
    )}

  </div>

</section>
    </div>
  );
};

export default HomePage;
