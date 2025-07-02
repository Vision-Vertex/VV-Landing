import {
  CompanyValues,
  NavItem,
  PartnerItem,
  Services,
  Stats,
  Team,
  Testmonial,
} from '@/types';
import Google from '../../public/partners/image 2.png';
import Icon1 from '../../public/icons/Frame.png';
import Icon2 from '../../public/icons/Group 23.png';
import Icon3 from '../../public/icons/Group 26.png';
import Icon4 from '../../public/icons/image 4.png';
import Icon5 from '../../public/icons/image 5.png';
import Picture1 from '../../public/images/Rectangle 34 (1).png';
import Picture2 from '../../public/images/Rectangle 34.png';
import TestmonialLogos from '../../public/logos/hijrah.webp';
import Team1 from '../../public/assets/team/image (1).png';
import Team2 from '../../public/assets/team/image (2).png';
import Team3 from '../../public/assets/team/image copy.png';
import Partner1 from '../../public/partners/cropped-output-onlinepngtools-2.webp';
import Partner2 from '../../public/partners/jem.png';
import Partner3 from '../../public/partners/photo_2025-06-19 17.40.15.jpeg';
import { UserRound, Users2Icon, icons } from 'lucide-react';
import { slugify } from '@/lib/slugify';
export const navItems: NavItem[] = [
  {
    title: 'Services',
    href: '',
    description: 'Home is here',
    components: [
      {
        service_name: 'A service',
        href: '/service/A',
        description: 'A service',
      },
      {
        service_name: 'B service',
        href: '/service/B',
        description: 'B service',
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
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
  // {
  //   path: Google,
  //   alt: 'Google Logo',
  // },
];

export const services: Services[] = [
  {
    icon: Icon1,
    headline: 'Microsoft Ecosystem Solutions',
    slug: slugify('Microsoft Ecosystem Solutions'),
    small_description:
      'As a certified Microsoft partner, we deliver trusted, enterprise-grade Microsoft 365 solutions.',
    description:
      'We specialize in deploying and optimizing the Microsoft 365 suite—including SharePoint, Power Apps, Power Automate, and Power BI—with certified expertise. From document management to AI-driven automation, we help you maximize productivity while maintaining compliance.',
    button1: '/',
    button2: '/',
    partners: [
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
      {
        path: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google Logo',
        link: 'https://google.com',
      },
    ],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'As an official Microsoft partner, we deliver secure, scalable implementations of SharePoint, Teams, Power Platform, and Azure integrations. Our solutions include workflow automation, data visualization, and seamless cloud migration.',
    cards: [
      {
        icon: Icon1,
        title: 'Official Microsoft Partner',
        description:
          'Certified expertise for reliable implementations.',
      },
      {
        icon: Icon2,
        title: 'End-to-End Power Platform Integration',
        description:
          'Power BI, Apps, Automate & Virtual Agents.',
      },
      {
        icon: Icon3,
        title: 'Enterprise Security & Compliance',
        description:
          'GDPR, HIPAA, and SOC 2-aligned solutions.',
      },
      {
        icon: Icon4,
        title: 'Adoption & Training Programs',
        description:
          'Ensure maximum ROI on your Microsoft investment.',
      },
    ],
  },
  {
    icon: Icon2,
    headline: 'Data Analytics & Business Intelligence',
    slug: slugify('Data Analytics & Business Intelligence'),
    small_description:
      'Advanced analytics and BI solutions for data-driven decision making',
    description:
      'We build custom analytics platforms with Power BI, Tableau, and SQL to uncover insights, predict trends, and automate reporting.',
    button1: '/',
    button2: '/',
    image: Picture1,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'From ETL pipelines to interactive dashboards, we create tailored solutions that turn complex data into clear business value.',
    cards: [
      {
        icon: Icon1,
        title: 'AI-Enhanced Analytics',
        description:
          'Machine learning integration.',
      },
      {
        icon: Icon2,
        title: 'Real-Time Dashboards',
        description:
          'Power BI and custom visualization.',
      },
      {
        icon: Icon3,
        title: 'Data Governance Frameworks',
        description:
          'Quality and security assurance.',
      },
      {
        icon: Icon4,
        title: 'Industry-Specific Models',
        description:
          'Retail, healthcare, and finance templates.',
      },
    ],
  },
  {
    icon: Icon3,
    headline: 'Cloud & DevOps (Azure & AWS) ',
    slug: slugify('Cloud & DevOps (Azure & AWS)'),
    small_description:
      'Azure and AWS solutions with CI/CD pipelines for agile delivery  ',
    description:
      "We design, migrate, and manage cloud environments with infrastructure-as-code and automated deployments.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Full-spectrum cloud services including Kubernetes orchestration, serverless architecture, and cost optimization.',
    cards: [
      {
        icon: Icon1,
        title: 'Azure Expert Certified Team',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'DevSecOps Implementation',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'Multi-Cloud Hybrid Solutions',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: '24/7 Performance Monitoring',
        description:
          '.',
      },
    ],
  },
  {
    icon: Icon4,
    headline: 'AI & Automation',
    slug: slugify('AI & Automation'),
    small_description:
      'AI-driven process automation with RPA and machine learning',
    description:
      'We implement chatbots, document processing AI, and workflow automation to reduce costs and errors.',
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Custom solutions combining Microsoft AI Builder, AWS SageMaker, and UiPath for end-to-end automation.',
    cards: [
      {
        icon: Icon1,
        title: 'Pre-Built Industry Models',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'Seamless Microsoft 365 Integration',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'Process Mining Capabilities',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'Change Management Support',
        description:
          '.',
      },
    ],
  },
  {
    icon: Icon5,
    headline: 'Cybersecurity',
    slug: slugify('Cybersecurity'),
    small_description:
      'Proactive security strategies for cloud and hybrid environments ',
    description:
      "We deliver compliance audits, penetration testing, and 24/7 threat monitoring.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Comprehensive services including Zero Trust implementation, SIEM configuration, and security awareness training.',
    cards: [
      {
        icon: Icon1,
        title: 'Microsoft Security Partner',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'GDPR/HIPAA Compliance Specialists',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'Cloud-Native Protection',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'Incident Response Readiness',
        description:
          '.',
      },
    ],
  },
  {
    icon: Icon5,
    headline: 'Java & Full Stack Development',
    slug: slugify('Java & Full Stack Development'),
    small_description:
      'Robust solutions with Spring Boot, React, and microservices.',
    description:
      "We build scalable web applications with modern Java frameworks and cloud-native architectures.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'End-to-end development services from API design to progressive web apps.',
    cards: [
      {
        icon: Icon1,
        title: 'Java Experts (Spring/Quarkus)',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'React/Angular Specialists',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'CI/CD Pipeline Integration',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'Legacy System Modernization',
        description:
          '.',
      },
    ],
  },
    {
    icon: Icon5,
    headline: 'App Development',
    slug: slugify('Java & Full Stack Development'),
    small_description:
      'From low-code Power Apps to native cross-platform solutions.',
    description:
      "We develop user-centric applications with Flutter, React Native, and .NET MAUI.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Full lifecycle development including UX design, testing, and App Store deployment.',
    cards: [
      {
        icon: Icon1,
        title: 'Power Platform Integration',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'Cross-Platform Capabilities',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'IoT & Wearable Tech Experience',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'App Store Optimization',
        description:
          '.',
      },
    ],
  },
    {
    icon: Icon5,
    headline: 'Training',
    slug: slugify('Training'),
    small_description:
      ' Hands-on programs for Microsoft, cloud, and development skills.',
    description:
      "We offer certification prep and real-world project experience.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Corporate and individual training in Power Platform, Azure, cybersecurity, and more.',
    cards: [
      {
        icon: Icon1,
        title: 'Microsoft Learning Partner',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'Cloud Lab Environments',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'Job Placement Assistance',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'Custom Corporate Programs',
        description:
          '.',
      },
    ],
  },
  {
    icon: Icon5,
    headline: 'Freelancing',
    slug: slugify('Freelancing'),
    small_description:
      'Vetted freelancers for short-term projects.',
    description:
      "Access skilled professionals in development, data, and cloud within 48 hours.",
    button1: '/',
    button2: '/',
    image: Picture2,
    second_headline: 'Why Choose Our Offshore Teams?',
    second_description:
      'Our platform connects you with pre-screened experts for project-based work.',
    cards: [
      {
        icon: Icon1,
        title: 'Rigorous Vetting Process',
        description:
          '.',
      },
      {
        icon: Icon2,
        title: 'Microsoft Technology Experts',
        description:
          '.',
      },
      {
        icon: Icon3,
        title: 'Hourly or Project-Based Contracts',
        description:
          '.',
      },
      {
        icon: Icon4,
        title: 'Dedicated Account Management',
        description:
          '.',
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
      "We are incredibly grateful to Vision5 Tech LLC for developing a customized donation tracking application during one of the most critical times in our organization's history—when we purchased our new center. Their team not only delivered a user-friendly and reliable solution, but they also truly understood our community-driven mission. The application helped us manage and track hundreds of contributions with ease, transparency, and accuracy. It has been a game-changer in our fundraising and reporting efforts. We couldn't be more pleased with the professionalism, responsiveness, and technical expertise of Vision5 Tech. We highly recommend them to any organization looking for trusted IT solutions.",
    name: 'First Hijrah Foundation Board',
    image: TestmonialLogos,
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
    position: 'Vision 5',
    name: 'John Doe',
    linkedin: 'https://www.linkedin.com/in/john-doe-1234567890',
    email: 'john.doe@example.com',
  },
];
