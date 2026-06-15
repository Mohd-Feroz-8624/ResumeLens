import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-[min(1280px,94%)] rounded-lg mx-auto border-t-2 border-gray-700/50 bg-gray-800/80 backdrop-blur-sm px-4 py-8 sm:px-6 lg:px-8 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-12">
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex w-full flex-col gap-4 md:w-2/5">
            <span className="text-xl font-bold text-white tracking-wide">ResumeLens</span>
            <p className="text-sm leading-6 text-gray-400 md:max-w-sm">
              ResumeLens evaluates your resume with an ATS score and helps you
              create optimized, job-ready resumes.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:w-3/5 lg:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Company</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/home")}>Home</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/resume")}>Create Resume</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/analysis")}>Analysis</li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Social</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white">Twitter</li>
                <li className="cursor-pointer transition hover:text-white">Instagram</li>
                <li className="cursor-pointer transition hover:text-white">LinkedIn</li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Legal</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/terms")}>Terms &amp; Conditions</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/terms")}>Privacy Policy</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/contact")}>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-gray-700/40 pt-6 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <p>
            &copy; 2026 All rights reserved to{" "}
            <a href="/home" className="text-cyan-400 transition hover:text-cyan-300 hover:underline">ResumeLens</a>
          </p>
          <p className="flex items-center justify-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{" "}
            <a href="/home" className="text-cyan-400 transition hover:text-cyan-300 hover:underline">ResumeLens</a>{" "}Team
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
