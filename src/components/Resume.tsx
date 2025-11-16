import { Button } from "./ui/button";
import { FileDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../styles/resume.css";

export function Resume() {
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
          <div className="my-role">Associate Software Engineer</div>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong>&nbsp;
              <a href="mailto:panthaweekansomngam@gmail.com">
                panthaweekansomngam@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <strong>Phone:</strong>&nbsp;+66 946359510
            </div>
            <div className="contact-item">
              <strong>GitHub:</strong>&nbsp;
              <a href="https://github.com/Panthaweekan">
                github.com/Panthaweekan
              </a>
            </div>
            <div className="contact-item">
              <strong>Portfolio:</strong>&nbsp;
              <a href="https://panthaweekan.github.io/Portfolio/">
                panthaweekan.github.io/Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL SUMMARY */}
        <section>
          <div className="page-subheader">Professional Summary</div>
          <p style={{ marginBottom: "0.75rem" }}>
            Associate Software Engineer with expertise in enterprise API gateway
            infrastructure, cloud migration, and full-stack web development.
            Currently contributing to SCB TechX's digital transformation
            initiatives, specializing in hybrid cloud architecture and API
            gateway solutions using CA Layer 7 and Kong API Gateway. Experienced
            in building scalable web applications with modern technologies
            including Go, TypeScript, Ruby on Rails, and React.
          </p>
          <p>
            Passionate about clean code architecture and sustainable software
            design, with extensive experience implementing Hexagonal
            Architecture, Domain-Driven Design, and SOLID principles across
            production systems. Strong advocate for microservices patterns, with
            hands-on experience building production-grade systems that serve
            real users.
          </p>
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

            <div className="tech-stack">
              <strong>Technologies & knowledge:</strong> API Gateway
              architecture • Kong API Gateway • Go • Fiber Framework • Ruby on
              Rails • React • TypeScript • Microservices
            </div>

            <ul>
              <li>
                Designed, developed, and maintained enterprise API gateway
                infrastructure across hybrid environments, including CA Layer 7
                API Gateway and Kong API Gateway for both on-premise and
                cloud-based systems
              </li>
              <li>
                Collaborated cross-functionally on cloud migration initiatives,
                ensuring seamless transition of API gateway logic and
                maintaining service continuity during the migration process
              </li>
              <li>
                Developed and architected a full-stack Inventory Asset
                Management System (Ruby on Rails, React, TypeScript) featuring
                full CRUD operations, asset request/return workflows, and a
                centralized database serving as a single source of truth for
                company-wide asset tracking
              </li>
              <li>
                Led the experimental development of a custom API gateway
                solution that preserved existing CA Layer 7 logic while
                integrating Kong API Gateway best practices. Designed a hybrid
                architecture—implemented in Go using the Fiber (fasthttp)
                framework—that combined the strengths of both platforms through
                a database event-driven design
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
                  Chiang Mai University - Faculty of Engineering
                </div>
              </div>
              <div className="date-range">2023 - 2025</div>
            </div>
            <div className="job-location">Chiang Mai, Thailand</div>

            <div className="tech-stack">
              <strong>Technologies:</strong> Go • Fiber Framework • TypeScript •
              React • Vite • Tailwind CSS • PostgreSQL • Docker • Hexagonal
              Architecture • Event-Driven Design
            </div>

            <ul>
              <li>
                Designed and developed multiple production-grade internal web
                applications for faculty administration and student services,
                serving over 2,000 active users across the engineering faculty
              </li>
              <li>
                Conducted regular meetings with faculty stakeholders,
                administrators, and end-users to gather requirements, provide
                technical consultation, and deliver solutions aligned with
                business needs
              </li>
              <li>
                Built full-stack applications using Go with Fiber framework for
                backend RESTful APIs, React with TypeScript for frontend,
                PostgreSQL for database, and Docker for containerization and
                deployment
              </li>
              <li>
                Consistently applied Hexagonal Architecture principles and SOLID
                design patterns to ensure all applications were maintainable,
                testable, and scalable for future enhancements
              </li>
              <li>
                Successfully deployed and maintained multiple applications in
                production environments, handling incident response and
                implementing continuous improvements based on user feedback
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
              <div className="location">GPA: 3.32 / 4.0</div>
            </div>
            <div className="date-range">Graduated 2025</div>
          </div>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>Relevant Coursework:</strong> Software Engineering, Database
            Systems, Web Application Development, Data Structures & Algorithms,
            Computer Networks, Operating Systems, Artificial Intelligence,
            Machine Learning, Computer Vision
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>Thesis Project:</strong> LongPlan - Study Plan Validator
            (Thesis project utilizing algorithmic validation and curriculum rule
            enforcement)
          </p>
        </section>

        {/* TECHNICAL SKILLS */}
        <section>
          <div className="page-subheader">Technical Skills</div>
          <div className="skills-grid">
            <div className="skill-category">Programming Languages</div>
            <div className="skill-items">
              Go (Primary) • TypeScript (Primary) • Ruby • Python • Java • C++ •
              Haskell • OCaml • Rust (Learning)
            </div>

            <div className="skill-category">API Gateway & Integration</div>
            <div className="skill-items">
              CA Layer 7 API Gateway • Kong API Gateway • RESTful APIs •
              Microservices Architecture •
            </div>

            <div className="skill-category">Backend Frameworks</div>
            <div className="skill-items">
              Go Fiber • Ruby on Rails • Node.js • Express.js
            </div>

            <div className="skill-category">Frontend Development</div>
            <div className="skill-items">
              React • TypeScript • Vite • Tailwind CSS • HTML5 • CSS3 •
              Responsive Design • PWA
            </div>

            <div className="skill-category">Databases & Storage</div>
            <div className="skill-items">
              PostgreSQL • MySQL • Database Design • Indexing Strategies
            </div>

            <div className="skill-category">DevOps & Infrastructure</div>
            <div className="skill-items">
              Docker • Docker Compose • Linux • Git • GitHub • CI/CD Pipelines •
              Cloud Migration • Hybrid Cloud Architecture
            </div>

            <div className="skill-category">Software Architecture</div>
            <div className="skill-items">
              Hexagonal Architecture (Ports & Adapters) • Domain-Driven Design
              (DDD) • Microservices • SOLID Principles
            </div>

            <div className="skill-category">AI & Machine Learning</div>
            <div className="skill-items">
              Text Classification (RNN, GRU, LSTM) • Computer Vision (CNN) •
              TensorFlow • PyTorch • Model Training & Evaluation
            </div>

            <div className="skill-category">Development Practices</div>
            <div className="skill-items">
              Clean Code • Code Review • Version Control • Agile Methodologies •
              Test-Driven Development (TDD) • Documentation
            </div>
          </div>
        </section>

        {/* KEY PROJECTS */}
        <section>
          <div className="page-subheader">Key Projects & Portfolio</div>

          {/* Project 1: Inventory Asset Management System */}
          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                Inventory Asset Management System
              </div>
              <div className="date-range">2025</div>
            </div>
            <div className="project-description">
              Enterprise-grade full-stack asset management solution with
              centralized tracking and workflow automation
            </div>

            <div className="tech-stack">
              <strong>Tech Stack:</strong> Ruby on Rails • React • TypeScript •
              PostgreSQL • RESTful APIs
            </div>

            <ul>
              <li>
                Developed and architected a full-stack Inventory Asset
                Management System (Ruby on Rails, React, TypeScript) featuring
                full CRUD operations, asset request/return workflows, and a
                centralized database serving as a single source of truth for
                company-wide asset tracking
              </li>
            </ul>
          </div>

          {/* Project 2: Custom Hybrid API Gateway Solution */}
          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                Custom Hybrid API Gateway Solution
              </div>
              <div className="date-range">2025</div>
            </div>
            <div className="project-description">
              Experimental API gateway combining CA Layer 7 and Kong best
              practices with database-driven architecture
            </div>

            <div className="tech-stack">
              <strong>Tech Stack:</strong> Go • Fiber Framework (fasthttp) •
              PostgreSQL • Database-Driven Architecture • CA Layer 7 API Gateway
              • Kong API Gateway • Microservices
            </div>

            <ul>
              <li>
                Led the experimental development of a custom API gateway
                solution that preserved existing CA Layer 7 logic while
                integrating Kong API Gateway best practices
              </li>
              <li>
                Designed a hybrid architecture—implemented in Go using the Fiber
                (fasthttp) framework—that combined the strengths of both
                platforms through a database event-driven design
              </li>
            </ul>
          </div>

          {/* Project 3: SD-Booking */}
          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                SD-Booking — Room Reservation System
              </div>
              <div className="date-range">2023 - 2025</div>
            </div>
            <div className="project-description">
              Enterprise room booking platform with role-based access control
              and real-time notification system
            </div>

            <div className="tech-stack">
              <strong>Tech Stack:</strong> Go • Fiber Framework • TypeScript •
              React • Vite • Tailwind CSS • PostgreSQL • Docker • Hexagonal
              Architecture • PWA • WebHooks
            </div>

            <ul>
              <li>
                Designed and developed following Hexagonal Architecture
                principles using Go, TypeScript, React, Vite, Tailwind CSS, and
                PostgreSQL with production deployment on Docker
              </li>
              <li>
                Supports status checks, bookings, and admin approvals with
                real-time updates
              </li>
              <li>
                Admins manage room data, permissions, and allocations through
                intuitive dashboard
              </li>
              <li>
                Integrated Web Hook-based PWA notifications via SDQueue to
                reduce user wait time
              </li>
            </ul>
          </div>

          {/* Project 4: LongPlan */}
          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                LongPlan — Study Plan Validator
              </div>
              <div className="date-range">2023 - 2025</div>
            </div>
            <div className="project-description">
              Algorithmic study plan validation system enforcing complex
              curriculum rules and graduation requirements (Senior Thesis
              Project)
            </div>

            <div className="tech-stack">
              <strong>Tech Stack:</strong> Go • Fiber Framework • TypeScript •
              React • PostgreSQL • Graph Algorithms • Rule Engine • Hexagonal
              Architecture • Docker
            </div>

            <ul>
              <li>
                Validates subject prerequisites, credits, and graduation rules
                following student's enrolled courses and curriculum
              </li>
              <li>
                Provides a user-friendly interface for students to view and plan
                their academic progression
              </li>
            </ul>
          </div>

          {/* Project 5: SD-Letter */}
          <div className="project-entry">
            <div className="project-header">
              <div className="project-title">
                SD-Letter — Certificate Request System
              </div>
              <div className="date-range">2023 - 2025</div>
            </div>
            <div className="project-description">
              Digital certificate request workflow system with multi-stage
              approval process and automated notifications
            </div>

            <div className="tech-stack">
              <strong>Tech Stack:</strong> Go • Fiber Framework • TypeScript •
              React • PostgreSQL • WebHooks • Docker • Hexagonal Architecture
            </div>

            <ul>
              <li>
                Supports interaction between Admin and Student about Certificate
                Request (Approved, Rejected, Resubmitted, Published)
              </li>
              <li>
                Uses Web Hooks to push notifications via SDQueue for real-time
                status updates
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
