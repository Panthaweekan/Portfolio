import { Button } from "./ui/button";
import { FileDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/resume.css";
import {
  personalInfo,
  technicalSkills,
  experiences,
  projects,
  education,
} from "@/data/portfolio-data";

function Resume() {
  const navigate = useNavigate();

  return (
    <div className="resume-container">
      <div
        className="no-print"
        style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Button onClick={() => navigate("/")} variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
      </div>

      <div
        className="no-print"
        style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
      >
        <Button asChild>
          <a href="/cv.pdf" download="Panthaweekan_Somngam_CV.pdf">
            <FileDown className="mr-2 h-4 w-4" />
            Export to PDF
          </a>
        </Button>
      </div>

      <div className="page-layout" id="cv">
        {/* HEADER */}
        <div className="page-head">
          <div className="my-name">{personalInfo.name}</div>
          <div className="my-role">{personalInfo.title}</div>
          <div className="contact-info">
            <div className="contact-item">
              {personalInfo.location} &nbsp;|&nbsp; {personalInfo.availability}
            </div>
            <div className="contact-item">
              <a href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </a>
              &nbsp;|&nbsp; {personalInfo.phone}
            </div>
            <div className="contact-item">
              <a href={personalInfo.github}>
                github.com/Panthaweekan
              </a>
              &nbsp;|&nbsp;
              <a href={personalInfo.portfolio}>
                Portfolio
              </a>
            </div>
            <div className="contact-item" style={{ fontSize: '0.85em', color: '#4B5563' }}>
              Languages: {personalInfo.spokenLanguages.join(", ")}
            </div>
          </div>
        </div>

        {/* TECHNICAL SKILLS */}
        <section>
          <div className="page-subheader">Technical Skills</div>
          <div className="skills-grid">
            {technicalSkills.map((category) => (
              <div key={category.name} style={{ display: 'contents' }}>
                <div className="skill-category">{category.name}</div>
                <div className="skill-items">
                  {category.items.map((item) => {
                    const label = item.subtitle
                      ? `${item.label} (${item.subtitle})`
                      : item.label;
                    return label;
                  }).join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section>
          <div className="page-subheader">Professional Experience</div>

          {experiences.map((job, index) => (
            <div key={index} className="job-entry">
              <div className="job-header">
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="company-name">{job.company}</div>
                </div>
                <div className="date-range">{job.period}</div>
              </div>
              <div className="job-location">{job.location}</div>
              <ul>
                {job.highlights.map((bullet, i) => (
                  <li key={i}>{bullet.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section>
          <div className="page-subheader">Education</div>
          <div className="education-header">
            <div>
              <div className="degree-title">{education.degree}</div>
              <div className="institution-name">{education.school}</div>
              <div className="location">
                {education.honours} &nbsp; GPA: {education.gpa}
              </div>
            </div>
            <div className="date-range">Graduated {education.graduated}</div>
          </div>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>Thesis:</strong> <em>{education.thesis}</em>
          </p>
        </section>

        {/* KEY PROJECTS */}
        <section>
          <div className="page-subheader">Key Projects</div>

          {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="project-entry">
              <div className="project-header">
                <div className="project-title">{project.title}</div>
                <div className="date-range">{project.dateRange}</div>
              </div>
              <div className="tech-stack">
                {project.technologies.join(" • ")}
              </div>
              <p>{project.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Resume;
