import { Component } from '@angular/core';
import { Item } from '../../component/slider/slider.component';

@Component({
  selector: 'app-works',
  standalone: false,
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent {
  /** Client work shipped in a professional setting. */
  readonly projectSlide1: Item[] = [
    {
      title: 'Slowave',
      description:
        'Built the Shopify storefront from scratch with the design team — layouts, custom sections, and a responsive experience, taken from concept through to launch.',
      image: 'projects/slowave.png',
      alt: 'Slowave storefront',
      stack: ['Shopify Liquid', 'CSS', 'JavaScript'],
      link: 'https://slowave.world/',
      role: 'Lead Developer',
      year: '2026',
    },
    {
      title: 'Breach Secure Now',
      description:
        'Started as support developer and grew into the lead. Ongoing development, new sections, troubleshooting, and form integrations that improved how the site captures user data.',
      image: 'projects/breachsecurenow.png',
      alt: 'Breach Secure Now website',
      stack: ['WordPress', 'Elementor', 'PHP', 'JavaScript', 'HubSpot'],
      link: 'https://breachsecurenow.com/',
      role: 'Lead Developer',
      year: '2026',
    },
    {
      title: 'Skyrocket Search Facet',
      description:
        'Developed and implemented the faceted search experience in WordPress and Elementor, working directly with the design team on the interaction and layout.',
      image: 'projects/skyrocket-search.png',
      alt: 'Skyrocket search facet',
      stack: ['WordPress', 'Elementor', 'CSS', 'JavaScript', 'PHP'],
      link: 'https://skyrocket.ph/search/',
      role: 'Lead Developer',
      year: '2026',
    },
    {
      title: 'Nespresso Philippines',
      description:
        'Maintained the Magento storefront across seasonal campaigns — product content and SKU updates, campaign banners and offers, new page sections, and bug fixes.',
      image: 'projects/nespressoph.png',
      alt: 'Nespresso Philippines store',
      stack: ['Magento', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://www.nespresso.ph/',
      role: 'Maintenance Dev',
      year: '2026',
    },
    {
      title: 'Phinma Properties',
      description:
        'Support developer delivering website updates, new sections, and functionality in WordPress and Elementor alongside the development and design teams.',
      image: 'projects/Phinmaproperties.png',
      alt: 'Phinma Properties website',
      stack: ['WordPress', 'Elementor', 'CSS', 'JavaScript', 'PHP'],
      link: 'https://phinmaproperties.com/',
      role: 'Support Developer',
      year: '2026',
    },
  ];

  /** Academic, capstone, and personal builds. */
  readonly projectSlide2: Item[] = [
    {
      title: 'Kayantabe',
      description:
        'Capstone web app that matches volunteers to organisational events using a preselection algorithm I designed from scratch, scoring category preference, distance, and past performance. Role-based dashboards for admins, organisers, and volunteers.',
      image: 'projects/kayantabe.png',
      alt: 'Kayantabe web application',
      stack: ['Laravel', 'Blade', 'PHP', 'MySQL'],
      link: 'https://kayantabe.com/',
      role: 'Full-Stack & QA',
      year: '2025',
    },
    {
      title: 'Xpress',
      description:
        'A GCash-inspired e-wallet. I built the back end: send-money transactions, a transaction log, OTP email verification via NodeMailer, and a dual-database setup using MongoDB for transactions and MySQL for accounts.',
      image: 'projects/xpress_project.png',
      alt: 'Xpress e-wallet application',
      stack: ['Node.js', 'Express', 'Handlebars', 'MongoDB', 'MySQL'],
      link: '',
      role: 'Back-End Dev',
      year: '2024',
    },
    {
      title: 'Codeeworks',
      description:
        'A business site wired to Google Apps Script, using a spreadsheet as a lightweight back end for form submissions and content.',
      image: 'projects/codeeworks.png',
      alt: 'Codeeworks website',
      stack: ['HTML', 'CSS', 'JavaScript', 'Apps Script'],
      link: 'https://codeeworks.bitbucket.io/',
      role: 'Developer',
      year: '2024',
    },
    {
      title: 'Running Ninja',
      description:
        'A browser endless-runner built for fun, inspired by the Chrome offline dinosaur — sprite animation, collision detection, and score tracking in vanilla JavaScript.',
      image: 'projects/runningsprite.png',
      alt: 'Running Ninja browser game',
      stack: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://berlily29.github.io/runningsprite/',
      role: 'Developer',
      year: '2023',
    },
    {
      title: 'Web Calculator',
      description:
        'A clean, keyboard-friendly calculator built in vanilla JavaScript — an early exercise in DOM handling and state.',
      image: 'projects/calculator.png',
      alt: 'Web calculator',
      stack: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://berlily29.github.io/calculator/',
      role: 'Developer',
      year: '2023',
    },
  ];
}
