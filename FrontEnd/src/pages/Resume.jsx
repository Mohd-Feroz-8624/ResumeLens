import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Save, Download } from "lucide-react";
import { TEMPLATES, EMPTY } from "../assets/templates";
import { TemplateThumbnail } from "../assets/TemplateThumbnail";
import { ResumePreview } from "../assets/ResumePreview";

const Resume = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const sliderRef = useRef(null);
  const previewRef = useRef(null);

  const tpl = TEMPLATES.find((t) => t.id === selectedId);
  const a = tpl.accent;

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const scroll = (dir) => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: dir * 100, behavior: "smooth" });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name || "Untitled Resume",
          template: tpl.name,
          data,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save resume:", err);
      alert("Failed to save resume. Please make sure you are logged in.");
    }
  };

  const handleDownload = () => {
    const node = previewRef.current;
    if (!node) return;
    const win = window.open("", "_blank");
    win.document.write(
      `<!DOCTYPE html><html><head><title>${data.name || "Resume"}</title>` +
        `<style>*{box-sizing:border-box;margin:0;padding:0}body{margin:0;padding:0;background:white}` +
        `@media print{@page{margin:0;size:A4 portrait}}</style></head>` +
        `<body>${node.innerHTML}</body></html>`,
    );
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 11px",
    fontSize: 13,
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    outline: "none",
    fontFamily: "system-ui, sans-serif",
    color: "#1e293b",
    background: "#fff",
    transition: "border-color 0.15s",
  };
  const labelCss = {
    fontSize: 11,
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 4,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };
  const sectionHead = {
    fontSize: 12,
    fontWeight: 700,
    color: a,
    borderBottom: `2px solid ${a}`,
    paddingBottom: 6,
    marginBottom: 14,
    marginTop: 20,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  return (
    <div className="mx-auto flex min-h-screen w-[min(1280px,94%)] flex-col justify-center rounded-lg bg-linear-to-br from-gray-900 via-gray-800 to-black pb-5 font-sans max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[680px]:pb-10 max-[480px]:w-full max-[480px]:px-0 max-[480px]:py-4">
      {/* Step 1: Template slider */}
      <div className="border-b border-white/10 px-7 py-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
          Step 1 — Choose a template
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div
            ref={sliderRef}
            className="flex flex-1 gap-3 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none]"
          >
            {TEMPLATES.map((t) => (
              <TemplateThumbnail
                key={t.id}
                tpl={t}
                selected={selectedId === t.id}
                onClick={() => setSelectedId(t.id)}
              />
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step 2: Editor + Preview */}
      <div className="m-4 flex flex-col lg:flex-row  gap-4 ">
        {/* Left: Input form */}
        <div className="w-full overflow-y-auto rounded-lg border-2 border-slate-200 bg-white p-5 lg:w-1/2 lg:max-h-[calc(110vh-10px)]">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — Fill in your details
          </div>
          <div className="mb-4.5 text-xs text-slate-400">
            Your resume updates live as you type
          </div>
          {/* Personal */}
          <div style={sectionHead}>Personal Info</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Full name</label>
              <input
                style={inputStyle}
                placeholder="John Doe"
                value={data.name}
                onChange={set("name")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Job title</label>
              <input
                style={inputStyle}
                placeholder="Software Engineer"
                value={data.title}
                onChange={set("title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Email</label>
              <input
                style={inputStyle}
                placeholder="john@email.com"
                value={data.email}
                onChange={set("email")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Phone</label>
              <input
                style={inputStyle}
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={set("phone")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Location</label>
              <input
                style={inputStyle}
                placeholder="Hyderabad, India"
                value={data.location}
                onChange={set("location")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Summary */}
          <div style={sectionHead}>Summary</div>
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Write a short professional summary..."
            value={data.summary}
            onChange={set("summary")}
            onFocus={(e) => (e.target.style.borderColor = a)}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          {/* Education */}
          <div style={sectionHead}>Education</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="B.Tech Computer Science"
                value={data.edu_degree}
                onChange={set("edu_degree")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="Osmania University"
                value={data.edu_school}
                onChange={set("edu_school")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2018 – 2022"
                value={data.edu_date}
                onChange={set("edu_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>CGPA</label>
              <input
                style={inputStyle}
                placeholder="8.5"
                value={data.edu_grade}
                onChange={set("edu_grade")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <div style={sectionHead}>Education 2</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="Intermediate / 12th"
                value={data.edu_degree2}
                onChange={set("edu_degree2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="Board / College Name"
                value={data.edu_school2}
                onChange={set("edu_school2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2016 – 2018"
                value={data.edu_date2}
                onChange={set("edu_date2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Marks / Percentage</label>
              <input
                style={inputStyle}
                placeholder="92%"
                value={data.edu_grade2}
                onChange={set("edu_grade2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <div style={sectionHead}>Education 3</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="SSC / 10th"
                value={data.edu_degree3}
                onChange={set("edu_degree3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="School Name"
                value={data.edu_school3}
                onChange={set("edu_school3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2014 – 2016"
                value={data.edu_date3}
                onChange={set("edu_date3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>GPA / Percentage</label>
              <input
                style={inputStyle}
                placeholder="95%"
                value={data.edu_grade3}
                onChange={set("edu_grade3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Project 1 */}
          <div style={sectionHead}>Project 1</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Title</label>
              <input
                style={inputStyle}
                placeholder="Project Title"
                value={data.project_1_title}
                onChange={set("project_1_title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Duration</label>
              <input
                style={inputStyle}
                placeholder="4 Months"
                value={data.project_1_time_spent}
                onChange={set("project_1_time_spent")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Demo Link</label>
              <input
                style={inputStyle}
                placeholder="https://demo-project.com"
                value={data.project_1_link}
                onChange={set("project_1_link")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="What did you build or achieve?"
                value={data.project_1_desc}
                onChange={set("project_1_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Project 2 */}
          <div style={sectionHead}>Project 2</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Title</label>
              <input
                style={inputStyle}
                placeholder="Project Title"
                value={data.project_2_title}
                onChange={set("project_2_title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Duration</label>
              <input
                style={inputStyle}
                placeholder="3 Months"
                value={data.project_2_time_spent}
                onChange={set("project_2_time_spent")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Demo Link</label>
              <input
                style={inputStyle}
                placeholder="https://demo-project.com"
                value={data.project_2_link}
                onChange={set("project_2_link")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Key responsibilities and wins"
                value={data.project_2_desc}
                onChange={set("project_2_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Experience 1 */}
          <div style={sectionHead}>Experience 1</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Role</label>
              <input
                style={inputStyle}
                placeholder="Frontend Developer"
                value={data.exp1_role}
                onChange={set("exp1_role")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Company</label>
              <input
                style={inputStyle}
                placeholder="Acme Corp"
                value={data.exp1_company}
                onChange={set("exp1_company")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Date range</label>
              <input
                style={inputStyle}
                placeholder="Jan 2022 – Present"
                value={data.exp1_date}
                onChange={set("exp1_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="What did you build or achieve?"
                value={data.exp1_desc}
                onChange={set("exp1_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Experience 2 */}
          <div style={sectionHead}>Experience 2</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Role</label>
              <input
                style={inputStyle}
                placeholder="Junior Developer"
                value={data.exp2_role}
                onChange={set("exp2_role")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Company</label>
              <input
                style={inputStyle}
                placeholder="Startup Inc."
                value={data.exp2_company}
                onChange={set("exp2_company")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Date range</label>
              <input
                style={inputStyle}
                placeholder="Jun 2020 – Dec 2021"
                value={data.exp2_date}
                onChange={set("exp2_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Key responsibilities and wins"
                value={data.exp2_desc}
                onChange={set("exp2_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Skills */}
          <div style={sectionHead}>Skills</div>
          <div>
            <label style={labelCss}>Skills (comma separated)</label>
            <input
              style={inputStyle}
              placeholder="React, TypeScript, Node.js, Figma"
              value={data.skills}
              onChange={set("skills")}
              onFocus={(e) => (e.target.style.borderColor = a)}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
        </div>

        {/* Right: Live preview */}
        <div className="flex flex-col gap-3 w-full rounded-lg bg-white p-6 lg:w-1/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="text-sm font-bold text-slate-900">
                Live Preview
              </div>
              <div className="text-xs text-slate-400">
                Template:{" "}
                <span style={{ color: a, fontWeight: 600 }}>{tpl.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="cursor-pointer flex items-center justify-center gap-1.5 self-end rounded-lg border px-4 py-2 text-[13px] font-semibold transition"
                  style={{
                    borderColor: a,
                    color: saved ? "#fff" : a,
                    background: saved ? a : "#fff",
                  }}
                >
                  <Save className="h-3.5 w-3.5" />
                  {saved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer flex items-center justify-center gap-1.5 self-end rounded-lg border-none px-5 py-2 text-[13px] font-semibold text-white"
                  style={{ background: a }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* A4 paper preview */}
          <div
            ref={previewRef}
            className="h-100vh min-h-120 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
          >
            <ResumePreview tpl={tpl} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
 