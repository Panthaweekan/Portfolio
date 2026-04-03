import { Button } from "./ui/button";
import { FileDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../styles/resume.css";

function Resume() {
  const navigate = useNavigate();

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

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
        <Button onClick={handlePrint}>
          <FileDown className="mr-2 h-4 w-4" />
          Export to PDF
        </Button>
      </div>

      <div className="page-layout" id="cv">
        {/* HEADER */}
        <div className="page-head">
          <div className="my-name">Panthaweekan Somngam</div>
          <div className="my-role">Software Engineer</div>
          <div className="contact-info">
            <div className="contact-item">
              Bangkok, Thailand (GMT+7) &nbsp;|&nbsp; Open to Remote
            </div>
            <div className="contact-item">
              <a href="mailto:panthaweekansomngam@gmail.com">
                panthaweekansomngam@gmail.com
              </a>
              &nbsp;|&nbsp; +66 946359510
            </div>
            <div className="contact-item">
              <a href="https://github.com/Panthaweekan">
                github.com/Panthaweekan
              </a>
              &nbsp;|&nbsp;
              <a href="https://panthaweekan.github.io/Portfolio/">
                Portfolio
              </a>
            </div>
            <div className="contact-item" style={{ fontSize: '0.85em', color: '#4B5563' }}>
              Languages: English (Intermediate), Thai (Native)
            </div>
          </div>
        </div>

        {/* TECHNICAL SKILLS */}
        <section>
          <div className="page-subheader">Technical Skills</div>
          <div className="skills-grid">
            <div className="skill-category">Languages</div>
            <div className="skill-items">
              Go (primary) • TypeScript • JavaScript • Ruby • Python • SQL • HTML/CSS
            </div>

            <div className="skill-category">Backend</div>
            <div className="skill-items">
              Fiber/Gin • Ruby on Rails • NodeJS • RESTful APIs • gRPC • Microservices Architecture • Rust (Intermediate) • Haskell
            </div>

            <div className="skill-category">Frontend</div>
            <div className="skill-items">
              React • TypeScript • Vite • Tailwind CSS • PWA • TanStack • Shadcn • NextJS
            </div>

            <div className="skill-category">API Gateway</div>
            <div className="skill-items">
              Kong API Gateway Best Practices • API Routing • Rate Limiting • Zero-Downtime Deployment
            </div>

            <div className="skill-category">Databases</div>
            <div className="skill-items">
              PostgreSQL • Redis • Database Design • Indexing • Database-Driven Architecture
            </div>

            <div className="skill-category">Cloud/DevOps</div>
            <div className="skill-items">
              Kubernetes • Docker • AWS • Jenkins CI/CD • HashiCorp Vault • Linux
            </div>

            <div className="skill-category">Monitoring</div>
            <div className="skill-items">
              Prometheus • Grafana • Kibana (ELK Stack)
            </div>

            <div className="skill-category">AI Agent Tooling</div>
            <div className="skill-items">
              Prompt Engineering • Agentic Workflow Design
            </div>

            <div className="skill-category">Practices</div>
            <div className="skill-items">
              Agile/Scrum • TDD • Code Review • Git • AI-Driven Development • SDLC • Functional Programming
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section>
          <div className="page-subheader">Professional Experience</div>

          <div className="job-entry">
            <div className="job-header">
              <div>
                <div className="job-title">Associate Software Engineer</div>
                <div className="company-name">SCB TechX</div>
              </div>
              <div className="date-range">May 2025 - Present</div>
            </div>
            <div className="job-location">Bangkok, Thailand (Hybrid)</div>

            <ul>
              <li>
                Designed and developed an API Gateway microservice in Go (Fiber/FastHTTP) to replace legacy CA Layer 7 gateway on-premise, preserving complex routing logic while integrating with Kong upstream, enabling zero-downtime deployment for SCB Easy (10M+ users)
              </li>
              <li>
                Architected the gateway with hexagonal architecture and DDD, decoupling routing, authentication, and logging into SOLID-aligned domains for independent testing and safer deployments
              </li>
              <li>
                Integrated AI agent tools as a core part of the engineering workflow, applying them across code generation, refactoring, architecture review, and documentation to accelerate delivery on complex features
              </li>
              <li>
                Designed and developed internal enterprise tools, including an Inventory Asset Management platform with asset requests, RBAC, financial reporting, and centralized asset data
              </li>
              <li>
                Maintained internal service tools such as Overtime Request and Employee Timesheet workflows, streamlining HR operations across the organization
              </li>
            </ul>
          </div>

          <div className="job-entry">
            <div className="job-header">
              <div>
                <div className="job-title">
                  Full Stack Developer (Work-Study Scholarship)
                </div>
                <div className="company-name">
                  Chiang Mai University, Faculty of Engineering
                </div>
              </div>
              <div className="date-range">2023 - 2025</div>
            </div>
            <div className="job-location">Chiang Mai, Thailand</div>

            <ul>
              <li>
                Designed and deployed production web applications serving 500+ active users, from stakeholder requirements through Docker-based deployment
              </li>
              <li>
                Built RESTful backend APIs in Go (Fiber) with React/TypeScript frontend and PostgreSQL, consistently applying hexagonal architecture and TDD
              </li>
              <li>
                Developed <em>SD-Booking</em> (room reservation with real-time PWA notifications), <em>SD-Letter</em> (multi-stage certificate approval workflow), and <em>LongPlan</em> (algorithmic study-plan validator using graph algorithms)
              </li>
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <div className="page-subheader">Education</div>
          <div className="education-header">
            <div>
              <div className="degree-title">
                Bachelor of Engineering in Computer Engineering
              </div>
              <div className="institution-name">Chiang Mai University</div>
              <div className="location">Second-Class Honours &nbsp; GPA: 3.32/4.00</div>
            </div>
            <div className="date-range">Graduated 2025</div>
          </div>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>Thesis:</strong> <em>LongPlan — Study Plan Validator</em> (algorithmic validation with graph algorithms and curriculum rule enforcement)
          </p>
        </section>

        {/* KEY PROJECTS */}
        <section>
          <div className="page-subheader">Key Projects</div>

          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                Custom Hybrid API Gateway Solution
              </div>
              <div className="date-range">2025 - Present</div>
            </div>
            <div className="tech-stack">
              Go • Fiber/FastHTTP • PostgreSQL • Redis • Kong • Kubernetes • Microservice
            </div>
            <p>
              Bridged on-premise CA Layer 7 logic with cloud-native Kong, enabling incremental deployment with zero downtime.
            </p>
          </div>

          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                Inventory Asset Management System
              </div>
              <div className="date-range">2025</div>
            </div>
            <div className="tech-stack">
              Ruby on Rails • React • PostgreSQL • REST APIs • Docker
            </div>
            <p>
              Enterprise asset-tracking platform with request/return workflows, role-based access control.
            </p>
          </div>

          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                SD-Booking (Room Reservation System)
              </div>
              <div className="date-range">2023 - 2024</div>
            </div>
            <div className="tech-stack">
              Go • React • TypeScript • PWA • Webhooks
            </div>
            <p>
              Real-time room booking platform with role-based access, admin dashboard, and push notifications via webhooks.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
