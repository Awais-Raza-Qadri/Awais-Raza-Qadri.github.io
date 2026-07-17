import { SkillCategory, Experience, Project, Course, Education } from '../types';

export const personalInfo = {
  name: 'Awais Raza Qadri',
  title: 'AI-Assisted Full-Stack Developer | Data Entry & MS Office Specialist',
  email: 'awaisrazaqadri.741422@gmail.com',
  phone: '+92 335 9803167',
  location: 'VPO Kotsarang, Talagang, Punjab, Pakistan',
  github: 'https://github.com/awais-raza-qadri',
  linkedin: 'https://linkedin.com/in/awais-raza-qadri', 
  whatsapp: 'https://wa.me/923359803167',
  profilePicture: '/profile.jpg', // Updated to JPG format as requested
  summary: 'AI-Assisted Full-Stack Developer with practical experience in web development, software management, and digital documentation. Skilled in Python, Django, HTML, CSS, JavaScript, Docker, and MySQL, with strong proficiency in Microsoft Office, data entry, document formatting, spreadsheet management, and administrative support. Experienced in using AI-powered development tools to improve productivity while delivering accurate, organized, and efficient technical solutions.',
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming & Web Backend',
    skills: [{ name: 'Python' }, { name: 'Django' }, { name: 'REST APIs' }, { name: 'JavaScript' }]
  },
  {
    category: 'Frontend Development',
    skills: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript (ES6+)' }, { name: 'Tailwind CSS' }]
  },
  {
    category: 'Database & DevOps',
    skills: [{ name: 'MySQL' }, { name: 'Docker' }, { name: 'Git & GitHub' }]
  },
  {
    category: 'AI Development Tools',
    skills: [{ name: 'ChatGPT' }, { name: 'Claude' }, { name: 'GitHub Copilot' }, { name: 'OpenAI Codex' }]
  },
  {
    category: 'Office & Productivity',
    skills: [{ name: 'Microsoft Word' }, { name: 'Microsoft Excel' }, { name: 'Microsoft PowerPoint' }, { name: 'Data Entry' }, { name: 'Professional Documentation' }]
  },
  {
    category: 'Design Tools',
    skills: [{ name: 'CorelDRAW' }, { name: 'InPage Urdu' }]
  },
  {
    category: 'Professional Skills',
    skills: [{ name: 'Problem Solving' }, { name: 'Client Communication' }, { name: 'Agile Workflows' }, { name: 'Time Management' }]
  }
];

export const experiences: Experience[] = [
  {
    role: 'Software Management & AI-Assisted Full-Stack Developer',
    company: 'BrainWave Labs',
    period: '2025 – Present',
    bullets: [
      'Develop and maintain complex web applications using modern Python, Django, HTML, CSS, and JavaScript configurations.',
      'Use Docker, MySQL, and AI-powered development tools for efficient local development testing, deployment, and debugging workflows.',
      'Troubleshoot multi-layer software issues and collaborate effectively within fast-paced Agile development cycles.'
    ]
  }
];

export const projects: Project[] = [
  {
    title: 'Personal Portfolio Website',
    description: 'A premium responsive web environment developed to showcase profile summaries, technical capabilities, projects, and educational landmarks.',
    bullets: [
      'Built utilizing cutting-edge semantic HTML structures, modern frontend principles, and clean CSS styling parameters.',
      'Optimized with interactive states, fluid motion architectures, and responsive components across all device form factors.',
      'Designed and deployed as a static environment hosted securely through GitHub Pages for continuous availability.'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/awais-raza-qadri/awais-raza-qadri.github.io',
    liveUrl: 'https://awais-raza-qadri.github.io'
  }
];

export const courses: Course[] = [
  {
    title: 'Computer Operator Certification',
    provider: 'InfoTech Institute, Talagang',
    duration: 'Jan – Jun 2025',
    description: 'Comprehensive study of advanced Microsoft Office (Word, Excel & PowerPoint), data entry mechanisms, digital office workflows, CorelDRAW vector layouts, InPage Urdu typesetting, and Windows Administration.'
  },
  {
    title: 'Freelancing Pathway',
    provider: 'DigiSkills.pk (Batch 03)',
    duration: '3 Months',
    description: 'Intensive freelancing business development. Focus areas included professional business communication, proposal optimization, client bidding mechanics, and project pricing methodologies.'
  },
  {
    title: 'Digital Literacy',
    provider: 'DigiSkills.pk (Batch 03)',
    duration: '3 Months',
    description: 'In-depth digital platform operations. Covered cybersecurity fundamentals, online privacy protection measures, global collaboration networks, and productivity tool optimization.'
  }
];

export const educations: Education[] = [
  {
    institution: 'Virtual University of Pakistan',
    period: '2026 – Present',
    degree: 'Bachelor of Information Technology (BSIT)',
    details: 'Currently Enrolled, focus on foundational software engineering paradigms and systems analysis.'
  },
  {
    institution: 'Cambridge International Science College, Talagang',
    period: '2023 – 2025',
    degree: 'Intermediate (Pre-Engineering)',
    details: '72% (A Grade) – BISE Rawalpindi Board'
  },
  {
    institution: 'Allied School, Jhangi Syedan, Islamabad',
    period: '2021 – 2023',
    degree: 'Matriculation (Computer Science)',
    details: '84% (A+ Grade) – FBISE Federal Board'
  }
];