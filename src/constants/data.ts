import {
  CompanyValues,
  NavItem,
  PartnerItem,
  Services,
  Stats,
  Team,
  Quality,
  CaseStudy,
  Testmonial,
} from '@/types';
import Google from '../../public/partners/image 2.png';
import Icon1 from '../../public/icons/Frame.png';
import Icon2 from '../../public/icons/Group 23.png';
import Icon3 from '../../public/icons/Group 26.png';
import Icon4 from '../../public/icons/image 4.png';
import Icon5 from '../../public/icons/image 5.png';
import AiIcon from '../../public/icons/AiIcon.png';
import analyticsIcon from '../../public/icons/analyticsIcon.png';
import appIcon from '../../public/icons/appIcon.png';
import cloudIcon from '../../public/icons/cloudDevOpsIcon.png';
import cybersecurityIcon from '../../public/icons/cybersecurityIcon.png';
import freelancingIcon from '../../public/icons/freelancingIcon.png';
import fullstackIcon from '../../public/icons/fullstack.png';
import microsoft from '../../public/icons/microsoft.png';
import training from '../../public/icons/trainingIcon.png';
import ai from '../../public/services/ai.webp';
import analytics from '../../public/services/analytics.webp';
import app from '../../public/services/app.jpg';
import cloud from '../../public/services/cloud.webp';
import cybersecurity from '../../public/services/cybersecurity.webp';
import freelancing from '../../public/services/freelancing.avif';
import fullstack from '../../public/services/fullstack.avif';
import trainingImg from '../../public/services/training.avif';
import microsoftImg from '../../public/services/microsoftLogo.avif';

// Import department images
import technologyProcurementImg from '../../public/departments/technology-procurement.svg';
import softwareEngineeringImg from '../../public/departments/software-engineering.svg';
import cloudDevOpsImg from '../../public/departments/cloud-devops.svg';
import aiDataImg from '../../public/departments/ai-data-science.svg';
import trainingRDImg from '../../public/departments/training-rd.svg';

// Import beautiful service icons
import technologyProcurementIcon from '../../public/icons/technology-procurement-main.svg';
import softwareEngineeringIcon from '../../public/icons/software-engineering-main.png';
import cloudDevOpsIcon from '../../public/icons/cloud-devops-main.png';
import aiDataIcon from '../../public/icons/ai-data-main.png';
import trainingRDIcon from '../../public/icons/training-rd-main.png';

// Import beautiful card icons
import fullstackDevIcon from '../../public/icons/fullstack-dev.png';
import uiUxDesignIcon from '../../public/icons/ui-ux-design.png';
import qaTestingIcon from '../../public/icons/qa-testing.png';
import productDeliveryIcon from '../../public/icons/product-delivery.png';

import cloudInfrastructureIcon from '../../public/icons/cloud-infrastructure.svg';
import ciCdPipelineIcon from '../../public/icons/ci-cd-pipeline.svg';
import platformEngineeringIcon from '../../public/icons/platform-engineering.png';
import microsoft365Icon from '../../public/icons/microsoft-365.png';

import dataEngineeringIcon from '../../public/icons/data-engineering.png';
import machineLearningIcon from '../../public/icons/machine-learning.svg';
import businessIntelligenceIcon from '../../public/icons/business-intelligence.png';
import businessAnalysisIcon from '../../public/icons/business-analysis.svg';

import technicalTrainingIcon from '../../public/icons/technical-training.png';
import internshipProgramsIcon from '../../public/icons/internship-programs.png';
import researchDevelopmentIcon from '../../public/icons/research-development.svg';
import continuousLearningIcon from '../../public/icons/continuous-learning.png';

// Import procurement card icons
import procurementManagementIcon from '../../public/icons/procurement-management.svg';
import licenseManagementIcon from '../../public/icons/license-management.svg';
import systemsIntegrationIcon from '../../public/icons/systems-integration.svg';
import vendorManagementIcon from '../../public/icons/vendor-management.svg';

import Picture1 from '../../public/images/Rectangle 34 (1).png';
import Picture2 from '../../public/images/Rectangle 34.png';
import TestmonialLogos from '../../public/logos/hijrah.webp';
import TestmonialLogos2 from '../../public/logos/tinova.webp';
import TestmonialLogos3 from '../../public/logos/jem.webp';
import Team1 from '../../public/assets/team/image (1).png';
import Team2 from '../../public/assets/team/image (2).png';
import Team3 from '../../public/assets/team/image copy.png';
import trust from '../../public/qualities/trust.jpg';
import innovation from '../../public/qualities/innovation.jpg';
import commitment from '../../public/qualities/commitment.jpg';
import thinking from '../../public/qualities/thinking.jpg';
import Partner1 from '../../public/partners/cropped-output-onlinepngtools-2.webp';
import Partner2 from '../../public/partners/jem.png';
import Partner3 from '../../public/partners/tinova.png';
import Partner4 from '../../public/partners/dailyofficesolutions.png';
import Partner5 from '../../public/partners/wagms.png';
import Partner6 from '../../public/partners/TIME.png';
import { UserRound, Users2Icon, icons } from 'lucide-react';
import { slugify } from '@/lib/slugify';
import { FaPaintBrush, FaHandshake, FaRocket, FaUserCheck } from 'react-icons/fa';

export const navItems: NavItem[] = [
  {
    title: 'Services',
    href: '',
    description: 'Home is here',
    components: [
      {
        service_name: 'Technology Procurement & Integration Services',
        href: '/services/Technology-Procurement-Integration-Services',
        description: 'Centralized procurement, vendor management, and systems integration',
      },
      {
        service_name: 'Software Engineering & Product Delivery',
        href: '/services/Software-Engineering-Product-Delivery',
        description: 'Full-stack development for web, mobile, ERP/CRM systems',
      },
      {
        service_name: 'Cloud, DevOps & Platform Engineering',
        href: '/services/Cloud-Devops-Platform-Engineering',
        description: 'Cloud infrastructure management, CI/CD pipelines, and platform engineering',
      },
      {
        service_name: 'AI, Data Science & Business Intelligence',
        href: '/services/Ai-Data-Science-Business-Intelligence',
        description: 'Data collection, engineering, analytics, and AI-powered solutions',
      },
      {
        service_name: 'Training, R&D & Talent Development',
        href: '/services/Training-Rd-Talent-Development',
        description: 'Technical onboarding, upskilling programs, and R&D initiatives',
      },
    ],
    link: false,
  },
  {
    title: 'About Us',
    href: '/about-us',
    link: true,
  },
];

export const partners: PartnerItem[] = [
  {
    path: Partner1,
    alt: 'Partner 1',
  },
  
  {
    path: Partner2,
    alt: 'Partner 2',
  },
  {
    path: Partner3,
    alt: 'Partner 3',
  },
  {
    path: Partner4,
    alt: 'Partner 4',
  },
  
 
];

export const services: Services[] = [
  {
    icon: technologyProcurementIcon,
    headline: 'Technology Procurement & Integration Services',
    slug: slugify('Technology Procurement & Integration Services'),
    small_description:
      'Centralized procurement, vendor management, and systems integration for seamless technology deployment.',
    description:
      'We provide comprehensive technology procurement and integration services that streamline your technology acquisition process. From vendor management and license sales to systems integration and deployment, we ensure smooth transitions from purchase to production with reduced costs and improved efficiency.',
    button1: '/contact-us',
    button2: '/services',
    image: technologyProcurementImg,
    second_headline: 'Why Choose Our Technology Procurement Team?',
    second_description:
      'From centralized procurement to turnkey systems integration, we reduce lead times, manage costs, and ensure compliant, efficient technology deployments with comprehensive vendor and license management.',
    cards: [
      {
        icon: procurementManagementIcon,
        title: 'Procurement & Vendor Management',
        description:
          'Centralized procurement with preferred suppliers and negotiated contracts.',
      },
      {
        icon: licenseManagementIcon,
        title: 'License Management & Sales',
        description:
          'Software license sales and lifecycle management for cloud & on-prem.',
      },
      {
        icon: systemsIntegrationIcon,
        title: 'Systems Integration & Deployment',
        description:
          'Turnkey integration with installation, testing, and handover.',
      },
      {
        icon: vendorManagementIcon,
        title: 'Vendor & Contract Management',
        description:
          'Negotiation, SLAs, warranty claims, and compliance management.',
      },
    ],
  },
  {
    icon: softwareEngineeringIcon,
    headline: 'Software Engineering & Product Delivery',
    slug: slugify('Software Engineering & Product Delivery'),
    small_description:
      'Full-stack development for web, mobile, ERP/CRM systems with UI/UX design and QA testing.',
    description:
      'We deliver comprehensive software solutions across web, mobile, and enterprise platforms. Our team combines full-stack development expertise with UI/UX design and rigorous QA testing to build intuitive, user-centered products that drive business value.',
    button1: '/contact-us',
    button2: '/services',
    image: softwareEngineeringImg,
    second_headline: 'Why Choose Our Software Engineering Team?',
    second_description:
      'From concept to deployment, we handle every aspect of software development with modern technologies, agile methodologies, and a focus on delivering scalable, maintainable solutions.',
    cards: [
      {
        icon: fullstackDevIcon,
        title: 'Full-Stack Development',
        description:
          'Web, mobile, and enterprise applications.',
      },
      {
        icon: uiUxDesignIcon,
        title: 'UI/UX Design & Prototyping',
        description:
          'User-centered design with modern tools.',
      },
      {
        icon: qaTestingIcon,
        title: 'QA Testing & Automation',
        description:
          'Test-driven development and CI/CD pipelines.',
      },
      {
        icon: productDeliveryIcon,
        title: 'Product Delivery',
        description:
          'End-to-end project management and deployment.',
      },
    ],
  },
  {
    icon: cloudDevOpsIcon,
    headline: 'Cloud, DevOps & Platform Engineering',
    slug: slugify('Cloud, DevOps & Platform Engineering'),
    small_description:
      'Cloud infrastructure management, CI/CD pipelines, and platform engineering solutions.',
    description:
      'We design, implement, and manage cloud environments with automated CI/CD pipelines, infrastructure-as-code, and platform engineering best practices. Our expertise spans Azure, AWS, and hybrid cloud solutions.',
    button1: '/contact-us',
    button2: '/services',
    image: cloudDevOpsImg,
    second_headline: 'Why Choose Our Cloud & DevOps Team?',
    second_description:
      'From infrastructure automation to platform engineering, we ensure your applications are scalable, secure, and efficiently deployed with modern DevOps practices.',
    cards: [
      {
        icon: cloudInfrastructureIcon,
        title: 'Cloud Infrastructure Management',
        description:
          'Azure, AWS, and hybrid cloud solutions.',
      },
      {
        icon: ciCdPipelineIcon,
        title: 'CI/CD Pipelines & Automation',
        description:
          'GitHub Actions and automated deployments.',
      },
      {
        icon: platformEngineeringIcon,
        title: 'Platform Engineering',
        description:
          'Internal platform support and management.',
      },
      {
        icon: microsoft365Icon,
        title: 'Microsoft 365 Integration',
        description:
          'Seamless productivity tool integration.',
      },
    ],
  },
  {
    icon: aiDataIcon,
    headline: 'AI, Data Science & Business Intelligence',
    slug: slugify('AI, Data Science & Business Intelligence'),
    small_description:
      'Data collection, engineering, analytics, and AI-powered solutions for business intelligence.',
    description:
      'We transform raw data into actionable insights through advanced analytics, machine learning, and AI-powered solutions. Our team builds intelligent systems that drive data-driven decision making and business growth.',
    button1: '/contact-us',
    button2: '/services',
    image: aiDataImg,
    second_headline: 'Why Choose Our AI & Data Science Team?',
    second_description:
      'From data engineering to predictive modeling, we create intelligent solutions that uncover patterns, predict trends, and automate complex business processes.',
    cards: [
      {
        icon: dataEngineeringIcon,
        title: 'Data Engineering & Analytics',
        description:
          'ETL pipelines and data processing.',
      },
      {
        icon: machineLearningIcon,
        title: 'Machine Learning & AI Solutions',
        description:
          'Custom ML models and AI applications.',
      },
      {
        icon: businessIntelligenceIcon,
        title: 'Business Intelligence & Dashboards',
        description:
          'Power BI and custom visualizations.',
      },
      {
        icon: businessAnalysisIcon,
        title: 'Business Analysis',
        description:
          'Requirements gathering and analysis.',
      },
    ],
  },
  {
    icon: trainingRDIcon,
    headline: 'Training, R&D & Talent Development',
    slug: slugify('Training, R&D & Talent Development'),
    small_description:
      'Technical onboarding, upskilling programs, and R&D initiatives.',
    description:
      'We build the next generation of tech talent through comprehensive training programs, hands-on experience, and continuous learning opportunities. Our R&D initiatives drive innovation and keep us at the forefront of technology.',
    button1: '/contact-us',
    button2: '/services',
    image: trainingRDImg,
    second_headline: 'Why Choose Our Training & R&D Team?',
    second_description:
      'From technical onboarding to advanced skill development, we create learning experiences that prepare individuals for successful careers in technology while fostering innovation through research and development.',
    cards: [
      {
        icon: technicalTrainingIcon,
        title: 'Technical Training & Upskilling',
        description:
          'Comprehensive learning programs.',
      },
      {
        icon: internshipProgramsIcon,
        title: 'Internship & Shadowing Programs',
        description:
          'Hands-on experience and mentorship.',
      },
      {
        icon: researchDevelopmentIcon,
        title: 'Research & Development',
        description:
          'Innovation and technology exploration.',
      },
      {
        icon: continuousLearningIcon,
        title: 'Continuous Learning Culture',
        description:
          'Ongoing development and experimentation.',
      },
    ],
  },
];
export const stats: Stats[] = [
  {
    name: 'Business',
    number: 2245341,
    icon: Users2Icon,
  },
  {
    name: 'Business',
    number: 46328,
    icon: Users2Icon,
  },
  {
    name: 'Business',
    number: 828867,
    icon: Users2Icon,
  },
  {
    name: 'Business',
    number: 1926436,
    icon: Users2Icon,
  },
];
export const testmonial: Testmonial[] = [
  {
    quote:
      "We are incredibly grateful to Vision Vertex Solutions LLC for developing a customized donation tracking application during one of the most critical times in our organization's history—when we purchased our new center. Their team not only delivered a user-friendly and reliable solution, but they also truly understood our community-driven mission. The application helped us manage and track hundreds of contributions with ease, transparency, and accuracy. It has been a game-changer in our fundraising and reporting efforts. We couldn't be more pleased with the professionalism, responsiveness, and technical expertise of Vision Vertex Solutions. We highly recommend them to any organization looking for trusted IT solutions.",
    name: 'First Hijrah Foundation Board',
    image: TestmonialLogos,
  },
   {
    quote:
      "We are incredibly grateful to Vision Vertex Solutions LLC for developing a customized donation tracking application during one of the most critical times in our organization's history—when we purchased our new center. Their team not only delivered a user-friendly and reliable solution, but they also truly understood our community-driven mission. The application helped us manage and track hundreds of contributions with ease, transparency, and accuracy. It has been a game-changer in our fundraising and reporting efforts. We couldn't be more pleased with the professionalism, responsiveness, and technical expertise of Vision Vertex Solutions. We highly recommend them to any organization looking for trusted IT solutions.",
    name: 'Tinova',
    image: TestmonialLogos2,
  },
  {
    quote:
      "We are incredibly grateful to Vision Vertex Solutions LLC for developing a customized donation tracking application during one of the most critical times in our organization's history—when we purchased our new center. Their team not only delivered a user-friendly and reliable solution, but they also truly understood our community-driven mission. The application helped us manage and track hundreds of contributions with ease, transparency, and accuracy. It has been a game-changer in our fundraising and reporting efforts. We couldn't be more pleased with the professionalism, responsiveness, and technical expertise of Vision Vertex Solutions. We highly recommend them to any organization looking for trusted IT solutions.",
    name: 'JS',
    image: TestmonialLogos3,
  },
];

export const company_values: CompanyValues[] = [
  {
    title: 'Mission',
    small_description:
      'Elevating business success through forward-thinking IT solutions, professional training, and technology partnerships.',
    description:
      "Our company's mission focuses on elevating business success through forward-thinking IT solutions, professional training, and strategic technology partnerships. This mission highlights a results-driven approach, aiming to enhance organizational outcomes for clients by providing proactive and innovative technology solutions that keep them ahead of the competition. Professional training is a key component, empowering clients with the knowledge and skills necessary to maximize the effectiveness of the IT solutions implemented. Moreover, the emphasis on forming technology partnerships signifies a collaborative spirit, where the company works closely with clients and technology providers to create a supportive ecosystem that fosters shared goals and mutual success. Together, these elements position the company as a leader in delivering comprehensive IT services that drive meaningful advancements for businesses.",
  },
  {
    title: 'Vision',
    small_description:
      'Empowering growth through innovative IT solutions, expert consulting, and a culture of continuous development.',
    description:
      "Our company's vision is centered on empowering growth through innovative IT solutions, expert consulting, and fostering a culture of continuous development. This vision underscores the commitment to not only enhance client capabilities but also to drive their long-term success in a rapidly evolving technological landscape. By prioritizing innovation, the company aims to develop cutting-edge tools and systems that address both current and future client needs. Expert consulting plays a crucial role in this vision, as it ensures that clients receive tailored guidance to navigate complex IT challenges effectively. Additionally, the emphasis on a culture of continuous development reflects a dedication to ongoing learning and improvement, benefiting both employees and clients alike.",
  },
];

export const team: Team[] = [
  {
    image: Team1,
    position: 'Vision 1',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
  {
    image: Team2,
    position: 'Vision 2',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
  {
    image: Team3,
    position: 'Vision 3',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
  {
    image: Team1,
    position: 'Vision 4',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
  {
    image: Team2,
    position: 'Vision Vertex',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
];
export const qualities: Quality[] = [
  {
    icon: FaPaintBrush,
    title: 'Creative Thinking',
    description: 'We bring bold ideas and fresh perspectives to every project.',
    image: thinking,
  },
  {
    icon: FaHandshake,
    title: 'Client Commitment',
    description: 'Strong partnerships are at the heart of what we do.',
    image: commitment, 
  },
  {
    icon: FaRocket,
    title: 'Innovation & Insight',
    description: 'We continuously seek new ways to solve challenges.',
    image: innovation,
  },
  {
    icon: FaUserCheck,
    title: 'Integrity & Trust',
    description: 'Our work is rooted in honesty, transparency, and results.',
    image: trust,
  },
];
export const caseStudies: CaseStudy[] = [
  {
    content:
      'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
  },
  {
    content:
      'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
  },
  {
    content:
      'For a logistics company, we automated their lead gen with email flows, increasing qualified leads by 120%.',
  },
];

export const startupStats = [
  {
    icon: 'Target',
    number: "100%",
    label: "Focus",
    description: "Dedicated to excellence"
  },
  {
    icon: 'Zap',
    number: "24/7",
    label: "Energy",
    description: "Always ready to serve"
  },
  {
    icon: 'Heart',
    number: "100+",
    label: "Passion",
    description: "Hours of dedication"
  },
  {
    icon: 'Rocket',
    number: "10x",
    label: "Growth",
    description: "Rapidly expanding"
  }
];
