import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Lumen" },
    { name: "description", content: "Smart AI feedback to get your dream job!" },
  ];
}

export default function Home() {
  return <main>
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Analyze Your Applications & Resume Score</h1>
        <h2>Review your submissions and get AI-powered feedback.</h2>
      </div>

      {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      )}
    </section>
  </main>
}
