// Mock candidate data for frontend-only application
export const initialCandidates = [
  {
    id: "1",
    name: "Aarav Patel",
    email: "aarav.patel@example.in",
    phone: "+91 98765 43210",
    aadhaar: "XXXX-XXXX-2345",
    role: "Senior Frontend Engineer",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL", "Jest", "Webpack"],
    experience_years: 6,
    location: "Bengaluru, Karnataka",
    salary_min: 2500000,
    salary_max: 3500000,
    current_ctc: 2200000,
    notice_period: "60 days",
    work_mode: "Hybrid",
    languages: ["English", "Hindi", "Gujarati"],
    status: "Interviewing",
    created_at: new Date("2024-01-15").toISOString(),
    education: "B.Tech in Computer Science, IIT Delhi",
    certifications: ["AWS Certified Developer", "React Advanced Certification"],
    linkedin: "https://linkedin.com/in/aaravpatel",
    github: "https://github.com/aaravpatel",
    portfolio: "https://aaravpatel.dev",
    summary: "Passionate frontend engineer with 6 years of experience building scalable web applications. Specialized in React ecosystem and modern JavaScript frameworks.",
    work_experience: [
      {
        company: "TechCorp India",
        role: "Senior Frontend Engineer",
        duration: "Jan 2022 - Present",
        responsibilities: "Leading a team of 5 developers, architecting scalable React applications, implementing CI/CD pipelines, mentoring junior developers."
      },
      {
        company: "StartupXYZ",
        role: "Frontend Developer",
        duration: "Jun 2019 - Dec 2021",
        responsibilities: "Built responsive web applications using React and TypeScript, integrated RESTful APIs, optimized application performance by 40%."
      },
      {
        company: "WebSolutions Ltd",
        role: "Junior Developer",
        duration: "Jul 2018 - May 2019",
        responsibilities: "Developed UI components, fixed bugs, collaborated with design team to implement pixel-perfect interfaces."
      }
    ],
    references: [
      { name: "Rajesh Kumar", designation: "Engineering Manager at TechCorp", contact: "+91 98765 11111" },
      { name: "Priya Singh", designation: "CTO at StartupXYZ", contact: "+91 98765 22222" }
    ],
    notes: "Strong technical skills. Excellent communication. Scheduled for final round on March 15th."
  },
  {
    id: "2",
    name: "Diya Sharma",
    email: "diya.sharma@example.in",
    phone: "+91 99887 76655",
    aadhaar: "XXXX-XXXX-5678",
    role: "Product Manager",
    skills: ["Agile", "JIRA", "Product Strategy", "User Research", "Roadmapping", "Stakeholder Management"],
    experience_years: 8,
    location: "Gurugram, Haryana",
    salary_min: 3000000,
    salary_max: 4500000,
    current_ctc: 2800000,
    notice_period: "90 days",
    work_mode: "Remote",
    languages: ["English", "Hindi"],
    status: "New",
    created_at: new Date("2024-01-20").toISOString(),
    education: "MBA from IIM Ahmedabad, B.E. in Electronics",
    certifications: ["Certified Scrum Product Owner (CSPO)", "Product Management Certificate - Stanford"],
    linkedin: "https://linkedin.com/in/diyasharma",
    github: "",
    portfolio: "",
    summary: "Results-driven Product Manager with 8+ years of experience in B2B SaaS. Led multiple 0-to-1 product launches with strong focus on user-centric design.",
    work_experience: [
      {
        company: "SaaS Giants Inc",
        role: "Senior Product Manager",
        duration: "Mar 2021 - Present",
        responsibilities: "Leading product strategy for enterprise SaaS platform, managing $5M product budget, driving 150% YoY growth, collaborating with cross-functional teams of 20+ members."
      },
      {
        company: "Digital Innovations",
        role: "Product Manager",
        duration: "Aug 2018 - Feb 2021",
        responsibilities: "Launched 3 successful products from 0-to-1, conducted user research with 500+ customers, defined product roadmaps, increased user retention by 35%."
      },
      {
        company: "Tech Startup",
        role: "Associate Product Manager",
        duration: "Jun 2016 - Jul 2018",
        responsibilities: "Assisted in product planning, gathered requirements, created user stories, coordinated with engineering teams."
      }
    ],
    references: [
      { name: "Amit Verma", designation: "VP Product at SaaS Giants", contact: "+91 98765 33333" }
    ],
    notes: "Recently applied. Need to schedule initial screening call."
  },
  {
    id: "3",
    name: "Rohan Gupta",
    email: "rohan.gupta@example.in",
    phone: "+91 91234 56789",
    aadhaar: "XXXX-XXXX-9012",
    role: "UX Designer",
    skills: ["Figma", "Prototyping", "User Testing", "Adobe XD", "Sketch", "Design Systems", "Wireframing"],
    experience_years: 4,
    location: "Mumbai, Maharashtra",
    salary_min: 1500000,
    salary_max: 2200000,
    current_ctc: 1400000,
    notice_period: "Immediate",
    work_mode: "Office",
    languages: ["English", "Hindi", "Marathi"],
    status: "Hired",
    created_at: new Date("2024-02-01").toISOString(),
    education: "Bachelor of Design, NID Ahmedabad",
    certifications: ["Google UX Design Certificate", "Nielsen Norman Group UX Certification"],
    linkedin: "https://linkedin.com/in/rohangupta",
    github: "",
    portfolio: "https://rohangupta.design",
    summary: "Creative UX designer focused on creating intuitive and delightful user experiences. Strong background in user research and interaction design.",
    work_experience: [
      {
        company: "DesignHub",
        role: "Senior UX Designer",
        duration: "Jan 2022 - Mar 2024",
        responsibilities: "Led design for mobile and web applications, conducted user research sessions, created design systems, mentored 2 junior designers."
      },
      {
        company: "Creative Agency",
        role: "UX Designer",
        duration: "Jul 2020 - Dec 2021",
        responsibilities: "Designed user interfaces for 15+ client projects, created wireframes and prototypes, collaborated with developers for implementation."
      }
    ],
    references: [
      { name: "Sneha Patel", designation: "Design Lead at DesignHub", contact: "+91 98765 44444" }
    ],
    notes: "Accepted offer on March 1st. Start date: April 1st. Excellent portfolio and cultural fit."
  },
  {
    id: "4",
    name: "Ananya Reddy",
    email: "ananya.reddy@example.in",
    phone: "+91 88776 65544",
    aadhaar: "XXXX-XXXX-3456",
    role: "Backend Developer",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Microservices", "REST APIs"],
    experience_years: 5,
    location: "Hyderabad, Telangana",
    salary_min: 2000000,
    salary_max: 2800000,
    current_ctc: 1600000,
    notice_period: "30 days",
    work_mode: "Hybrid",
    languages: ["English", "Telugu", "Hindi"],
    status: "Rejected",
    created_at: new Date("2024-02-10").toISOString(),
    education: "M.Tech in Computer Science, IIIT Hyderabad",
    certifications: ["Python Institute PCAP", "Docker Certified Associate"],
    linkedin: "https://linkedin.com/in/ananyareddy",
    github: "https://github.com/ananyareddy",
    portfolio: "",
    summary: "Backend developer with expertise in building high-performance APIs and distributed systems using Python and modern cloud technologies.",
    work_experience: [
      {
        company: "CloudTech Solutions",
        role: "Backend Developer",
        duration: "May 2021 - Present",
        responsibilities: "Developing microservices architecture, optimizing database queries, implementing caching strategies, maintaining 99.9% uptime."
      },
      {
        company: "DataSystems Inc",
        role: "Python Developer",
        duration: "Aug 2019 - Apr 2021",
        responsibilities: "Built REST APIs using FastAPI, integrated third-party services, wrote unit tests, participated in code reviews."
      }
    ],
    references: [
      { name: "Karthik Rao", designation: "Tech Lead at CloudTech", contact: "+91 98765 55555" }
    ],
    notes: "Technical skills were strong but salary expectations were significantly above budget. Rejected on Feb 20th."
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.in",
    phone: "+91 77665 54433",
    aadhaar: "XXXX-XXXX-7890",
    role: "Data Scientist",
    skills: ["Python", "TensorFlow", "SQL", "Machine Learning", "PyTorch", "Data Visualization", "Statistics"],
    experience_years: 3,
    location: "Pune, Maharashtra",
    salary_min: 1800000,
    salary_max: 2400000,
    current_ctc: 1500000,
    notice_period: "45 days",
    work_mode: "Remote",
    languages: ["English", "Hindi", "Punjabi"],
    status: "New",
    created_at: new Date("2024-02-15").toISOString(),
    education: "M.S. in Data Science, BITS Pilani",
    certifications: ["TensorFlow Developer Certificate", "AWS Machine Learning Specialty"],
    linkedin: "https://linkedin.com/in/vikramsingh",
    github: "https://github.com/vikramsingh",
    portfolio: "https://vikramsingh.ai",
    summary: "Data scientist with strong foundation in machine learning and statistical modeling. Experience in deploying ML models to production.",
    work_experience: [
      {
        company: "AI Labs",
        role: "Data Scientist",
        duration: "Jun 2022 - Present",
        responsibilities: "Building ML models for predictive analytics, deploying models to production, analyzing large datasets, creating data visualizations."
      },
      {
        company: "Analytics Firm",
        role: "Junior Data Scientist",
        duration: "Jul 2021 - May 2022",
        responsibilities: "Data preprocessing, feature engineering, model training, creating reports for stakeholders."
      }
    ],
    references: [
      { name: "Dr. Meera Nair", designation: "Head of AI at AI Labs", contact: "+91 98765 66666" }
    ],
    notes: "Impressive academic background. Need to review portfolio projects."
  },
  {
    id: "6",
    name: "Meera Iyer",
    email: "meera.iyer@example.in",
    phone: "+91 99001 12233",
    aadhaar: "XXXX-XXXX-1122",
    role: "DevOps Engineer",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Jenkins", "Monitoring", "Linux", "Docker"],
    experience_years: 7,
    location: "Chennai, Tamil Nadu",
    salary_min: 2800000,
    salary_max: 4000000,
    current_ctc: 2500000,
    notice_period: "60 days",
    work_mode: "Hybrid",
    languages: ["English", "Tamil", "Hindi"],
    status: "Interviewing",
    created_at: new Date("2024-02-20").toISOString(),
    education: "B.E. in Information Technology, Anna University",
    certifications: ["AWS Solutions Architect Professional", "CKA - Certified Kubernetes Administrator"],
    linkedin: "https://linkedin.com/in/meeraiyer",
    github: "https://github.com/meeraiyer",
    portfolio: "",
    summary: "DevOps engineer with 7 years of experience in cloud infrastructure and automation. Expert in AWS and Kubernetes with focus on reliability and scalability.",
    work_experience: [
      {
        company: "CloudScale Inc",
        role: "Senior DevOps Engineer",
        duration: "Jan 2021 - Present",
        responsibilities: "Managing AWS infrastructure for 50+ microservices, implementing IaC with Terraform, setting up monitoring and alerting, reducing deployment time by 70%."
      },
      {
        company: "TechOps Solutions",
        role: "DevOps Engineer",
        duration: "Mar 2019 - Dec 2020",
        responsibilities: "Automated deployment pipelines, managed Kubernetes clusters, implemented security best practices, on-call support."
      },
      {
        company: "IT Services Ltd",
        role: "System Administrator",
        duration: "Jun 2017 - Feb 2019",
        responsibilities: "Server maintenance, backup management, user support, basic scripting for automation."
      }
    ],
    references: [
      { name: "Arjun Krishnan", designation: "DevOps Manager at CloudScale", contact: "+91 98765 77777" },
      { name: "Lakshmi Menon", designation: "CTO at TechOps", contact: "+91 98765 88888" }
    ],
    notes: "Second round completed. Very strong candidate. Team feedback is positive. Moving to final round."
  },
  {
    id: "7",
    name: "Arjun Nair",
    email: "arjun.nair@example.in",
    phone: "+91 98112 23344",
    aadhaar: "XXXX-XXXX-3344",
    role: "Marketing Manager",
    skills: ["SEO", "Content Strategy", "Google Analytics", "Social Media", "Email Marketing", "Growth Hacking"],
    experience_years: 5,
    location: "Noida, UP",
    salary_min: 1500000,
    salary_max: 2000000,
    current_ctc: 1300000,
    notice_period: "30 days",
    work_mode: "Office",
    languages: ["English", "Hindi", "Malayalam"],
    status: "New",
    created_at: new Date("2024-03-01").toISOString(),
    education: "MBA in Marketing, FMS Delhi",
    certifications: ["Google Analytics Certification", "HubSpot Content Marketing Certification"],
    linkedin: "https://linkedin.com/in/arjunnair",
    github: "",
    portfolio: "https://arjunnair.com",
    summary: "Marketing professional with proven track record in digital marketing and growth. Specialized in SEO and content-driven growth strategies.",
    work_experience: [
      {
        company: "GrowthMarketing Co",
        role: "Marketing Manager",
        duration: "Feb 2022 - Present",
        responsibilities: "Leading digital marketing campaigns, managing team of 4, increasing organic traffic by 200%, managing marketing budget of ₹50L."
      },
      {
        company: "Digital Agency",
        role: "Digital Marketing Specialist",
        duration: "May 2019 - Jan 2022",
        responsibilities: "SEO optimization, content creation, social media management, email campaigns, client reporting."
      }
    ],
    references: [
      { name: "Neha Kapoor", designation: "CMO at GrowthMarketing", contact: "+91 98765 99999" }
    ],
    notes: "Application received. Reviewing portfolio and case studies."
  },
  {
    id: "8",
    name: "Sanya Malhotra",
    email: "sanya.m@example.in",
    phone: "+91 97223 34455",
    aadhaar: "XXXX-XXXX-5566",
    role: "Sales Representative",
    skills: ["CRM", "Negotiation", "Lead Generation", "B2B Sales", "Salesforce", "Cold Calling"],
    experience_years: 2,
    location: "Delhi, NCR",
    salary_min: 800000,
    salary_max: 1200000,
    current_ctc: 700000,
    notice_period: "15 days",
    work_mode: "Office",
    languages: ["English", "Hindi"],
    status: "New",
    created_at: new Date("2024-03-05").toISOString(),
    education: "BBA, Delhi University",
    certifications: ["Salesforce Certified Administrator"],
    linkedin: "https://linkedin.com/in/sanyamalhotra",
    github: "",
    portfolio: "",
    summary: "Energetic sales professional with 2 years of B2B sales experience. Strong communication skills and proven ability to exceed sales targets.",
    work_experience: [
      {
        company: "SalesPro Solutions",
        role: "Sales Representative",
        duration: "Mar 2022 - Present",
        responsibilities: "B2B sales, lead generation, client relationship management, consistently exceeding monthly targets by 120%, managing pipeline of 50+ leads."
      },
      {
        company: "StartSales Inc",
        role: "Sales Intern",
        duration: "Jun 2021 - Feb 2022",
        responsibilities: "Cold calling, data entry in CRM, assisting senior sales team, customer support."
      }
    ],
    references: [
      { name: "Rahul Mehta", designation: "Sales Manager at SalesPro", contact: "+91 98765 00000" }
    ],
    notes: "Entry-level position. Good cultural fit based on initial screening."
  }
];
