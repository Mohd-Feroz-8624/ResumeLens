import {
  SecHeader,
  BandSecHeader,
  ExpBlock,
  EduBlock,
  ProjBlock,
  SkillTags,
} from "./resumeComponents.jsx";

export function ResumePreview({ tpl, data }) {
  const a = tpl.accent;
  const name = data.name || "Your Name";
  const jobTitle = data.title || "Professional Title";
  const email = data.email || "email@example.com";
  const phone = data.phone || "+91 00000 00000";
  const loc = data.location || "City, Country";
  const summary =
    data.summary ||
    "A motivated professional with a proven track record of delivering impactful results. Passionate about continuous learning and contributing to team success.";
  const skills = data.skills
    ? data.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const e1 = !!(data.exp1_role || data.exp1_company);
  const e2 = !!(data.exp2_role || data.exp2_company);
  const ed1 = !!(data.edu_degree || data.edu_school);
  const ed2 = !!(data.edu_degree2 || data.edu_school2);
  const ed3 = !!(data.edu_degree3 || data.edu_school3);
  const p1 = !!data.project_1_title;
  const p2 = !!data.project_2_title;

  /* ── Sidebar Layout (ids 6, 8, 13) ── */
  if (tpl.sidebar && !tpl.duoColumn) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100%",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            width: 138,
            background: a,
            color: "#fff",
            padding: "22px 13px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "2.5px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              margin: "0 auto 10px",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 3,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 8,
              textAlign: "center",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 16,
            }}
          >
            {jobTitle}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.18)",
              paddingTop: 11,
              marginBottom: 13,
            }}
          >
            <div
              style={{
                fontSize: 7,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 7,
              }}
            >
              Contact
            </div>
            <div
              style={{
                fontSize: 7.5,
                color: "rgba(255,255,255,0.85)",
                marginBottom: 4,
                wordBreak: "break-all",
              }}
            >
              {email}
            </div>
            <div
              style={{
                fontSize: 7.5,
                color: "rgba(255,255,255,0.85)",
                marginBottom: 4,
              }}
            >
              {phone}
            </div>
            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)" }}>
              {loc}
            </div>
          </div>

          {skills.length > 0 && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.18)",
                paddingTop: 11,
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 7,
                }}
              >
                Skills
              </div>
              {skills.map((s, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 7.5,
                    color: "#fff",
                    background: "rgba(255,255,255,0.14)",
                    borderRadius: 3,
                    padding: "2px 6px",
                    marginBottom: 4,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: "20px 15px",
            background: tpl.bg,
            overflowX: "hidden",
          }}
        >
          <SecHeader a={a} title="Professional Summary" />
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              color: "#374151",
              lineHeight: 1.65,
            }}
          >
            {summary}
          </p>

          {(e1 || e2) && <SecHeader a={a} title="Work Experience" />}
          {e1 && (
            <ExpBlock
              a={a}
              role={data.exp1_role}
              company={data.exp1_company}
              date={data.exp1_date}
              desc={data.exp1_desc}
            />
          )}
          {e2 && (
            <ExpBlock
              a={a}
              role={data.exp2_role}
              company={data.exp2_company}
              date={data.exp2_date}
              desc={data.exp2_desc}
            />
          )}

          {(ed1 || ed2 || ed3) && <SecHeader a={a} title="Education" />}
          {ed1 && (
            <EduBlock
              a={a}
              degree={data.edu_degree}
              school={data.edu_school}
              date={data.edu_date}
              grade={data.edu_grade}
            />
          )}
          {ed2 && (
            <EduBlock
              a={a}
              degree={data.edu_degree2}
              school={data.edu_school2}
              date={data.edu_date2}
              grade={data.edu_grade2}
            />
          )}
          {ed3 && (
            <EduBlock
              a={a}
              degree={data.edu_degree3}
              school={data.edu_school3}
              date={data.edu_date3}
              grade={data.edu_grade3}
            />
          )}

          {(p1 || p2) && <SecHeader a={a} title="Projects" />}
          {p1 && (
            <ProjBlock
              a={a}
              title={data.project_1_title}
              link={data.project_1_link}
              time={data.project_1_time_spent}
              desc={data.project_1_desc}
            />
          )}
          {p2 && (
            <ProjBlock
              a={a}
              title={data.project_2_title}
              link={data.project_2_link}
              time={data.project_2_time_spent}
              desc={data.project_2_desc}
            />
          )}
        </div>
      </div>
    );
  }

  /* ── Modern / Band Header Layout (ids 2, 3) ── */
  if (tpl.id === 2 || tpl.id === 3) {
    return (
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          background: "#fff",
          minHeight: "100%",
        }}
      >
        {/* Colored header band */}
        <div style={{ background: a, padding: "24px 22px 20px" }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
              marginBottom: 5,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: "rgba(255,255,255,0.82)",
              marginBottom: 10,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {jobTitle}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3px 14px",
              fontSize: 8,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <span>{email}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{phone}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{loc}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 22px" }}>
          <BandSecHeader a={a} title="Professional Summary" />
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              color: "#374151",
              lineHeight: 1.65,
            }}
          >
            {summary}
          </p>

          {(e1 || e2) && <BandSecHeader a={a} title="Work Experience" />}
          {e1 && (
            <ExpBlock
              a={a}
              role={data.exp1_role}
              company={data.exp1_company}
              date={data.exp1_date}
              desc={data.exp1_desc}
            />
          )}
          {e2 && (
            <ExpBlock
              a={a}
              role={data.exp2_role}
              company={data.exp2_company}
              date={data.exp2_date}
              desc={data.exp2_desc}
            />
          )}

          {(ed1 || ed2 || ed3) && <BandSecHeader a={a} title="Education" />}
          {ed1 && (
            <EduBlock
              a={a}
              degree={data.edu_degree}
              school={data.edu_school}
              date={data.edu_date}
              grade={data.edu_grade}
            />
          )}
          {ed2 && (
            <EduBlock
              a={a}
              degree={data.edu_degree2}
              school={data.edu_school2}
              date={data.edu_date2}
              grade={data.edu_grade2}
            />
          )}
          {ed3 && (
            <EduBlock
              a={a}
              degree={data.edu_degree3}
              school={data.edu_school3}
              date={data.edu_date3}
              grade={data.edu_grade3}
            />
          )}

          {(p1 || p2) && <BandSecHeader a={a} title="Projects" />}
          {p1 && (
            <ProjBlock
              a={a}
              title={data.project_1_title}
              link={data.project_1_link}
              time={data.project_1_time_spent}
              desc={data.project_1_desc}
            />
          )}
          {p2 && (
            <ProjBlock
              a={a}
              title={data.project_2_title}
              link={data.project_2_link}
              time={data.project_2_time_spent}
              desc={data.project_2_desc}
            />
          )}

          {skills.length > 0 && (
            <>
              <BandSecHeader a={a} title="Skills" />
              <SkillTags a={a} skills={skills} />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── ATS-Optimized Mode (id 9) ── */
  if (tpl.atsMode) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          background: "#ffffff",
          padding: "20px 22px",
          minHeight: "100%",
          color: "#000000",
          lineHeight: 1.6,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: "1px solid #000000",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 3 }}>
            {name}
          </div>
          <div style={{ fontSize: 10, marginBottom: 8, fontWeight: 500 }}>
            {jobTitle}
          </div>
          <div
            style={{
              fontSize: 9,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span>{email}</span>
            <span>|</span>
            <span>{phone}</span>
            <span>|</span>
            <span>{loc}</span>
          </div>
        </div>

        {summary && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 14,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              PROFESSIONAL SUMMARY
            </div>
            <p style={{ margin: 0, fontSize: 9, marginBottom: 10 }}>
              {summary}
            </p>
          </>
        )}

        {(e1 || e2) && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 14,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              WORK EXPERIENCE
            </div>
            {e1 && (
              <ExpBlock
                a="#000000"
                role={data.exp1_role}
                company={data.exp1_company}
                date={data.exp1_date}
                desc={data.exp1_desc}
              />
            )}
            {e2 && (
              <ExpBlock
                a="#000000"
                role={data.exp2_role}
                company={data.exp2_company}
                date={data.exp2_date}
                desc={data.exp2_desc}
              />
            )}
          </>
        )}

        {(ed1 || ed2 || ed3) && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 14,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              EDUCATION
            </div>
            {ed1 && (
              <EduBlock
                a="#000000"
                degree={data.edu_degree}
                school={data.edu_school}
                date={data.edu_date}
                grade={data.edu_grade}
              />
            )}
            {ed2 && (
              <EduBlock
                a="#000000"
                degree={data.edu_degree2}
                school={data.edu_school2}
                date={data.edu_date2}
                grade={data.edu_grade2}
              />
            )}
            {ed3 && (
              <EduBlock
                a="#000000"
                degree={data.edu_degree3}
                school={data.edu_school3}
                date={data.edu_date3}
                grade={data.edu_grade3}
              />
            )}
          </>
        )}

        {(p1 || p2) && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 14,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              PROJECTS
            </div>
            {p1 && (
              <ProjBlock
                a="#000000"
                title={data.project_1_title}
                link={data.project_1_link}
                time={data.project_1_time_spent}
                desc={data.project_1_desc}
              />
            )}
            {p2 && (
              <ProjBlock
                a="#000000"
                title={data.project_2_title}
                link={data.project_2_link}
                time={data.project_2_time_spent}
                desc={data.project_2_desc}
              />
            )}
          </>
        )}

        {skills.length > 0 && (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 14,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              SKILLS
            </div>
            <div
              style={{
                fontSize: 9,
                display: "flex",
                flexWrap: "wrap",
                gap: "3px 8px",
              }}
            >
              {skills.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  /* ── Developer Dark Mode (id 10) ── */
  if (tpl.developer) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100%",
          fontFamily: "'Courier New', monospace",
          background: "#0f0f0f",
          color: "#e0e0e0",
        }}
      >
        <div
          style={{
            width: 140,
            background: a,
            color: "#fff",
            padding: "18px 12px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid " + a,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              margin: "0 auto 8px",
            }}
          >
            &lt;/&gt;
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textAlign: "center",
              color: "#fff",
              marginBottom: 2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 7.5,
              textAlign: "center",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 14,
            }}
          >
            {jobTitle}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 6.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 6,
              }}
            >
              &gt; Contact
            </div>
            <div
              style={{
                fontSize: 7,
                color: "#fff",
                marginBottom: 3,
                wordBreak: "break-all",
              }}
            >
              {email}
            </div>
            <div style={{ fontSize: 7, color: "#fff", marginBottom: 3 }}>
              {phone}
            </div>
            <div style={{ fontSize: 7, color: "#fff" }}>{loc}</div>
          </div>

          {skills.length > 0 && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  fontSize: 6.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 6,
                }}
              >
                &gt; Skills
              </div>
              {skills.slice(0, 6).map((s, i) => (
                <div key={i} style={{ fontSize: 7, color: a, marginBottom: 3 }}>
                  ◆ {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            padding: "16px 14px",
            background: "#1a1a1a",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: a,
              marginBottom: 6,
              borderBottom: `2px solid ${a}`,
              paddingBottom: 4,
            }}
          >
            // ABOUT
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 7.5,
              color: "#b0b0b0",
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {summary}
          </p>

          {(e1 || e2) && (
            <>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  marginTop: 12,
                  marginBottom: 6,
                  borderBottom: `2px solid ${a}`,
                  paddingBottom: 4,
                }}
              >
                // EXPERIENCE
              </div>
              {e1 && (
                <ExpBlock
                  a={a}
                  role={data.exp1_role}
                  company={data.exp1_company}
                  date={data.exp1_date}
                  desc={data.exp1_desc}
                />
              )}
              {e2 && (
                <ExpBlock
                  a={a}
                  role={data.exp2_role}
                  company={data.exp2_company}
                  date={data.exp2_date}
                  desc={data.exp2_desc}
                />
              )}
            </>
          )}

          {(ed1 || ed2 || ed3) && (
            <>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  marginTop: 12,
                  marginBottom: 6,
                  borderBottom: `2px solid ${a}`,
                  paddingBottom: 4,
                }}
              >
                // EDUCATION
              </div>
              {ed1 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree}
                  school={data.edu_school}
                  date={data.edu_date}
                  grade={data.edu_grade}
                />
              )}
              {ed2 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree2}
                  school={data.edu_school2}
                  date={data.edu_date2}
                  grade={data.edu_grade2}
                />
              )}
              {ed3 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree3}
                  school={data.edu_school3}
                  date={data.edu_date3}
                  grade={data.edu_grade3}
                />
              )}
            </>
          )}

          {(p1 || p2) && (
            <>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  marginTop: 12,
                  marginBottom: 6,
                  borderBottom: `2px solid ${a}`,
                  paddingBottom: 4,
                }}
              >
                // PROJECTS
              </div>
              {p1 && (
                <ProjBlock
                  a={a}
                  title={data.project_1_title}
                  link={data.project_1_link}
                  time={data.project_1_time_spent}
                  desc={data.project_1_desc}
                />
              )}
              {p2 && (
                <ProjBlock
                  a={a}
                  title={data.project_2_title}
                  link={data.project_2_link}
                  time={data.project_2_time_spent}
                  desc={data.project_2_desc}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Timeline Layout (id 11) ── */
  if (tpl.timeline) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          background: tpl.bg,
          padding: "20px 24px",
          minHeight: "100%",
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <div
            style={{
              marginBottom: 20,
              paddingBottom: 12,
              borderBottom: `3px solid ${a}`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: a,
                marginBottom: 4,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {jobTitle}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#94a3b8",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span>{email}</span>
              <span>|</span>
              <span>{phone}</span>
              <span>|</span>
              <span>{loc}</span>
            </div>
          </div>

          {summary && (
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: a,
                  marginBottom: 6,
                }}
              >
                Professional Summary
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 8.5,
                  color: "#374151",
                  lineHeight: 1.7,
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {(e1 || e2) && (
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: a,
                  marginBottom: 10,
                }}
              >
                Work Experience
              </div>
              <div style={{ borderLeft: `3px solid ${a}`, paddingLeft: 14 }}>
                {e1 && (
                  <div
                    style={{
                      marginBottom: 12,
                      paddingBottom: 12,
                      borderBottom: `1px solid ${a}20`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {data.exp1_role}
                      </span>
                      <span style={{ fontSize: 8, color: a, fontWeight: 600 }}>
                        {data.exp1_date}
                      </span>
                    </div>
                    <div style={{ fontSize: 8.5, color: a, marginBottom: 3 }}>
                      {data.exp1_company}
                    </div>
                    {data.exp1_desc && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 8,
                          color: "#4b5563",
                          lineHeight: 1.6,
                        }}
                      >
                        {data.exp1_desc}
                      </p>
                    )}
                  </div>
                )}
                {e2 && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {data.exp2_role}
                      </span>
                      <span style={{ fontSize: 8, color: a, fontWeight: 600 }}>
                        {data.exp2_date}
                      </span>
                    </div>
                    <div style={{ fontSize: 8.5, color: a, marginBottom: 3 }}>
                      {data.exp2_company}
                    </div>
                    {data.exp2_desc && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 8,
                          color: "#4b5563",
                          lineHeight: 1.6,
                        }}
                      >
                        {data.exp2_desc}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {(ed1 || ed2 || ed3) && (
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: a,
                  marginBottom: 10,
                }}
              >
                Education
              </div>
              <div style={{ borderLeft: `3px solid ${a}`, paddingLeft: 14 }}>
                {ed1 && (
                  <EduBlock
                    a={a}
                    degree={data.edu_degree}
                    school={data.edu_school}
                    date={data.edu_date}
                    grade={data.edu_grade}
                  />
                )}
                {ed2 && (
                  <EduBlock
                    a={a}
                    degree={data.edu_degree2}
                    school={data.edu_school2}
                    date={data.edu_date2}
                    grade={data.edu_grade2}
                  />
                )}
                {ed3 && (
                  <EduBlock
                    a={a}
                    degree={data.edu_degree3}
                    school={data.edu_school3}
                    date={data.edu_date3}
                    grade={data.edu_grade3}
                  />
                )}
              </div>
            </div>
          )}

          {(p1 || p2) && (
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: a,
                  marginBottom: 10,
                }}
              >
                Projects
              </div>
              <div style={{ borderLeft: `3px solid ${a}`, paddingLeft: 14 }}>
                {p1 && (
                  <ProjBlock
                    a={a}
                    title={data.project_1_title}
                    link={data.project_1_link}
                    time={data.project_1_time_spent}
                    desc={data.project_1_desc}
                  />
                )}
                {p2 && (
                  <ProjBlock
                    a={a}
                    title={data.project_2_title}
                    link={data.project_2_link}
                    time={data.project_2_time_spent}
                    desc={data.project_2_desc}
                  />
                )}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: a,
                  marginBottom: 6,
                }}
              >
                Skills
              </div>
              <SkillTags a={a} skills={skills} />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Academic Layout (id 12) ── */
  if (tpl.academic) {
    return (
      <div
        style={{
          fontFamily: "Georgia, serif",
          background: tpl.bg,
          padding: "22px 24px",
          minHeight: "100%",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: `2px solid ${a}`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: a,
              letterSpacing: "-0.3px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
              marginTop: 3,
              fontStyle: "italic",
            }}
          >
            {jobTitle}
          </div>
          <div
            style={{
              fontSize: 8.5,
              color: "#94a3b8",
              marginTop: 6,
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>{email}</span>
            <span>·</span>
            <span>{phone}</span>
            <span>·</span>
            <span>{loc}</span>
          </div>
        </div>

        {summary && (
          <>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: a,
                borderBottom: `1.5px solid ${a}`,
                paddingBottom: 3,
                margin: "12px 0 6px",
                textTransform: "uppercase",
              }}
            >
              Professional Overview
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 8.5,
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: 10,
              }}
            >
              {summary}
            </p>
          </>
        )}

        {(ed1 || ed2 || ed3) && (
          <>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: a,
                borderBottom: `1.5px solid ${a}`,
                paddingBottom: 3,
                margin: "12px 0 6px",
                textTransform: "uppercase",
              }}
            >
              Academic Credentials
            </div>
            {ed1 && (
              <EduBlock
                a={a}
                degree={data.edu_degree}
                school={data.edu_school}
                date={data.edu_date}
                grade={data.edu_grade}
              />
            )}
            {ed2 && (
              <EduBlock
                a={a}
                degree={data.edu_degree2}
                school={data.edu_school2}
                date={data.edu_date2}
                grade={data.edu_grade2}
              />
            )}
            {ed3 && (
              <EduBlock
                a={a}
                degree={data.edu_degree3}
                school={data.edu_school3}
                date={data.edu_date3}
                grade={data.edu_grade3}
              />
            )}
          </>
        )}

        {(e1 || e2) && (
          <>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: a,
                borderBottom: `1.5px solid ${a}`,
                paddingBottom: 3,
                margin: "12px 0 6px",
                textTransform: "uppercase",
              }}
            >
              Professional Experience
            </div>
            {e1 && (
              <ExpBlock
                a={a}
                role={data.exp1_role}
                company={data.exp1_company}
                date={data.exp1_date}
                desc={data.exp1_desc}
              />
            )}
            {e2 && (
              <ExpBlock
                a={a}
                role={data.exp2_role}
                company={data.exp2_company}
                date={data.exp2_date}
                desc={data.exp2_desc}
              />
            )}
          </>
        )}

        {(p1 || p2) && (
          <>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: a,
                borderBottom: `1.5px solid ${a}`,
                paddingBottom: 3,
                margin: "12px 0 6px",
                textTransform: "uppercase",
              }}
            >
              Publications &amp; Projects
            </div>
            {p1 && (
              <ProjBlock
                a={a}
                title={data.project_1_title}
                link={data.project_1_link}
                time={data.project_1_time_spent}
                desc={data.project_1_desc}
              />
            )}
            {p2 && (
              <ProjBlock
                a={a}
                title={data.project_2_title}
                link={data.project_2_link}
                time={data.project_2_time_spent}
                desc={data.project_2_desc}
              />
            )}
          </>
        )}

        {skills.length > 0 && (
          <>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: a,
                borderBottom: `1.5px solid ${a}`,
                paddingBottom: 3,
                margin: "12px 0 6px",
                textTransform: "uppercase",
              }}
            >
              Core Competencies
            </div>
            <SkillTags a={a} skills={skills} />
          </>
        )}
      </div>
    );
  }

  /* ── Duo Column Layout (id 13) ── */
  if (tpl.duoColumn) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Left side: Skills */}
        <div
          style={{
            width: 130,
            background: a,
            color: "#fff",
            padding: "20px 11px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              margin: "0 auto 8px",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textAlign: "center",
              color: "#fff",
              marginBottom: 1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 8,
              textAlign: "center",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 14,
            }}
          >
            {jobTitle}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 6.8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 6,
              }}
            >
              Contact
            </div>
            <div
              style={{
                fontSize: 7,
                color: "#fff",
                marginBottom: 3,
                wordBreak: "break-all",
              }}
            >
              {email}
            </div>
            <div style={{ fontSize: 7, color: "#fff", marginBottom: 3 }}>
              {phone}
            </div>
            <div style={{ fontSize: 7, color: "#fff" }}>{loc}</div>
          </div>

          {skills.length > 0 && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  fontSize: 6.8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 6,
                }}
              >
                Skills
              </div>
              {skills.map((s, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 7,
                    color: "#fff",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 3,
                    padding: "2px 5px",
                    marginBottom: 3,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side: Content */}
        <div
          style={{
            flex: 1,
            padding: "18px 15px",
            background: tpl.bg,
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: a,
              borderBottom: `1.5px solid ${a}`,
              paddingBottom: 3,
              margin: "0 0 7px",
            }}
          >
            Professional Summary
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              color: "#374151",
              lineHeight: 1.65,
              marginBottom: 10,
            }}
          >
            {summary}
          </p>

          {(e1 || e2) && (
            <>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  borderBottom: `1.5px solid ${a}`,
                  paddingBottom: 3,
                  margin: "12px 0 7px",
                }}
              >
                Work Experience
              </div>
              {e1 && (
                <ExpBlock
                  a={a}
                  role={data.exp1_role}
                  company={data.exp1_company}
                  date={data.exp1_date}
                  desc={data.exp1_desc}
                />
              )}
              {e2 && (
                <ExpBlock
                  a={a}
                  role={data.exp2_role}
                  company={data.exp2_company}
                  date={data.exp2_date}
                  desc={data.exp2_desc}
                />
              )}
            </>
          )}

          {(ed1 || ed2 || ed3) && (
            <>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  borderBottom: `1.5px solid ${a}`,
                  paddingBottom: 3,
                  margin: "12px 0 7px",
                }}
              >
                Education
              </div>
              {ed1 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree}
                  school={data.edu_school}
                  date={data.edu_date}
                  grade={data.edu_grade}
                />
              )}
              {ed2 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree2}
                  school={data.edu_school2}
                  date={data.edu_date2}
                  grade={data.edu_grade2}
                />
              )}
              {ed3 && (
                <EduBlock
                  a={a}
                  degree={data.edu_degree3}
                  school={data.edu_school3}
                  date={data.edu_date3}
                  grade={data.edu_grade3}
                />
              )}
            </>
          )}

          {(p1 || p2) && (
            <>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: a,
                  borderBottom: `1.5px solid ${a}`,
                  paddingBottom: 3,
                  margin: "12px 0 7px",
                }}
              >
                Projects
              </div>
              {p1 && (
                <ProjBlock
                  a={a}
                  title={data.project_1_title}
                  link={data.project_1_link}
                  time={data.project_1_time_spent}
                  desc={data.project_1_desc}
                />
              )}
              {p2 && (
                <ProjBlock
                  a={a}
                  title={data.project_2_title}
                  link={data.project_2_link}
                  time={data.project_2_time_spent}
                  desc={data.project_2_desc}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Classic Centered Layout (ids 1, 4, 5, 7) ── */
  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        background: tpl.bg,
        padding: "22px 24px",
        minHeight: "100%",
      }}
    >
      {/* Centered header */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: 12,
          marginBottom: 4,
          borderBottom: `2.5px solid ${a}`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: a,
            letterSpacing: "-0.3px",
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: "#64748b",
            marginTop: 4,
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          {jobTitle}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            fontSize: 8.5,
            color: "#94a3b8",
            marginTop: 7,
            flexWrap: "wrap",
          }}
        >
          <span>{email}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{phone}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{loc}</span>
        </div>
      </div>

      <SecHeader a={a} title="Professional Summary" />
      <p
        style={{ margin: 0, fontSize: 8.5, color: "#374151", lineHeight: 1.65 }}
      >
        {summary}
      </p>

      {(e1 || e2) && <SecHeader a={a} title="Work Experience" />}
      {e1 && (
        <ExpBlock
          a={a}
          role={data.exp1_role}
          company={data.exp1_company}
          date={data.exp1_date}
          desc={data.exp1_desc}
        />
      )}
      {e2 && (
        <ExpBlock
          a={a}
          role={data.exp2_role}
          company={data.exp2_company}
          date={data.exp2_date}
          desc={data.exp2_desc}
        />
      )}

      {(ed1 || ed2 || ed3) && <SecHeader a={a} title="Education" />}
      {ed1 && (
        <EduBlock
          a={a}
          degree={data.edu_degree}
          school={data.edu_school}
          date={data.edu_date}
          grade={data.edu_grade}
        />
      )}
      {ed2 && (
        <EduBlock
          a={a}
          degree={data.edu_degree2}
          school={data.edu_school2}
          date={data.edu_date2}
          grade={data.edu_grade2}
        />
      )}
      {ed3 && (
        <EduBlock
          a={a}
          degree={data.edu_degree3}
          school={data.edu_school3}
          date={data.edu_date3}
          grade={data.edu_grade3}
        />
      )}

      {(p1 || p2) && <SecHeader a={a} title="Projects" />}
      {p1 && (
        <ProjBlock
          a={a}
          title={data.project_1_title}
          link={data.project_1_link}
          time={data.project_1_time_spent}
          desc={data.project_1_desc}
        />
      )}
      {p2 && (
        <ProjBlock
          a={a}
          title={data.project_2_title}
          link={data.project_2_link}
          time={data.project_2_time_spent}
          desc={data.project_2_desc}
        />
      )}

      {skills.length > 0 && (
        <>
          <SecHeader a={a} title="Skills" />
          <SkillTags a={a} skills={skills} />
        </>
      )}
    </div>
  );
}
