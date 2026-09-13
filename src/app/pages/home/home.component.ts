import {
  Component,
  PLATFORM_ID,
  Inject,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Role {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
}

interface StackGroup {
  icon: string;
  label: string;
  items: string[];
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  /** Desktop default keeps SSR output aligned with the common case. */
  windowWidth = 1280;

  /** Rotating headline word. */
  readonly rotatingWords = ['WordPress', 'Shopify', 'Angular', 'Laravel', 'Next.js'];
  rotatingIndex = 0;
  rotatingOut = false;

  private timer?: ReturnType<typeof setInterval>;
  private readonly isBrowser: boolean;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return;
    }

    // Cycle the headline word outside Angular, nudging change detection only
    // on the two frames that actually change the view.
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.zone.run(() => {
          this.rotatingOut = true;
          this.cdr.markForCheck();
        });

        setTimeout(() => {
          this.zone.run(() => {
            this.rotatingIndex = (this.rotatingIndex + 1) % this.rotatingWords.length;
            this.rotatingOut = false;
            this.cdr.markForCheck();
          });
        }, 420);
      }, 2800);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (this.isBrowser) {
      this.windowWidth = (event.target as Window).innerWidth;
    }
  }

  get isMobile(): boolean {
    return this.windowWidth < 768;
  }

  get currentWord(): string {
    return this.rotatingWords[this.rotatingIndex];
  }

  /* ------------------------------------------------------------------
     Content
     ------------------------------------------------------------------ */

  readonly stats = [
    { value: '10+', label: 'Projects shipped', icon: 'rocket_launch' },
    { value: '3', label: 'Lead developer roles', icon: 'workspace_premium' },
    { value: '4', label: 'Teams collaborated with', icon: 'groups' },
    { value: 'Magna', label: 'Cum Laude, 2025', icon: 'school' },
  ];

  readonly timeline: Role[] = [
    {
      title: 'Junior Web Developer',
      company: 'Skyrocket Studios',
      period: 'Mar 2026 — Present',
      current: true,
      points: [
        'Lead developer for Slowave, driving the Shopify build end to end from concept to launch.',
        'Lead developer for BreachSecureNow — ongoing maintenance, new sections, and form integrations that improved user data capture.',
        'Maintained Nespresso Philippines through seasonal campaigns: SKU updates, campaign imagery, and new page sections.',
        'Implemented SEO recommendations from crawls and integrated GA / HubSpot events and CTAs for tracking.',
      ],
      tags: ['WordPress', 'Shopify', 'Elementor Pro', 'PHP', 'GA4', 'HubSpot'],
    },
    {
      title: 'Junior SEO Web Support',
      company: 'OOM Singapore',
      period: 'Jun 2025 — Dec 2025',
      points: [
        'Managed SEO tasks across multiple client websites in Shopify, WordPress, and Wix alongside Account Managers.',
        'Shipped content and UI changes aligned with SEO best practice, and monitored results in Search Console.',
        'Handled backups, theme file changes, and staging support through cPanel and FTP.',
        'Regularized on my 3rd month for outstanding performance.',
      ],
      tags: ['SEO', 'Shopify', 'WordPress', 'cPanel', 'Search Console'],
    },
    {
      title: 'Full-Stack Angular Developer Trainee',
      company: 'Clark Outsourcing',
      period: 'Jun 2024 — Sep 2024',
      points: [
        'Delivered task tickets on the company HRIS, focused on user experience and responsive design.',
        'Performed database migrations and built CRUD functionality.',
        'Worked with senior developers on training, feedback, and workflow alignment.',
      ],
      tags: ['Angular', 'TypeScript', 'CRUD', 'Responsive Design'],
    },
    {
      title: 'SEO / Web Developer',
      company: 'Channel A Media',
      period: 'Jun 2023 — Dec 2023',
      points: [
        'Built a website for a real business owner as part of a four-person team, targeting first-page Google ranking.',
      ],
      tags: ['SEO', 'Web Development'],
    },
  ];

  readonly stackGroups: StackGroup[] = [
    {
      icon: 'code',
      label: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'Next.js', 'TailwindCSS', 'Bootstrap'],
    },
    {
      icon: 'dns',
      label: 'Backend',
      items: ['Node.js', 'Express.js', 'Laravel', 'PHP'],
    },
    {
      icon: 'storage',
      label: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
      icon: 'web',
      label: 'CMS & Builders',
      items: ['WordPress', 'Shopify', 'Elementor Pro', 'Magento'],
    },
    {
      icon: 'insights',
      label: 'Analytics & Tracking',
      items: ['Google Analytics', 'Google Tag Manager', 'Search Console', 'HubSpot'],
    },
    {
      icon: 'build',
      label: 'Infrastructure & Tools',
      items: ['Git', 'GitHub', 'cPanel', 'WHM', 'Cloudways', 'Postman', 'Figma'],
    },
  ];

  readonly certifications = [
    { name: 'JavaScript Essentials 1', issuer: 'Cisco', year: '2024' },
    { name: 'CyberOps Associate', issuer: 'Cisco', year: '2023' },
    { name: 'System Administration I', issuer: 'Red Hat', year: '2022' },
    { name: 'Introduction to IoT', issuer: 'Cisco', year: '2021' },
  ];

  readonly achievements = [
    'Magna Cum Laude — Holy Angel University, 2025',
    "Dean's List — 7 semesters",
    "President's List — A.Y. 2024",
    'Academic Scholarship Recipient — A.Y. 2024-2025',
  ];

  /** Primary logos rendered in the first marquee row. */
  readonly webDev = [
    { src: 'html.png', alt: 'HTML5' },
    { src: 'css.png', alt: 'CSS3' },
    { src: 'js.png', alt: 'JavaScript' },
    { src: 'angular.png', alt: 'Angular' },
    { src: 'nodejs.png', alt: 'Node.js' },
    { src: 'express.png', alt: 'Express.js' },
    { src: 'php.png', alt: 'PHP' },
    { src: 'laravel.png', alt: 'Laravel' },
    { src: 'wordpress.png', alt: 'WordPress' },
  ];

  /** Secondary logos rendered in the reversed marquee row. */
  readonly sources = [
    { src: 'mysql.png', alt: 'MySQL' },
    { src: 'mongodb.png', alt: 'MongoDB' },
    { src: 'git.png', alt: 'Git' },
    { src: 'postman.png', alt: 'Postman' },
    { src: 'python.png', alt: 'Python' },
    { src: 'java.png', alt: 'Java' },
    { src: 'jira.png', alt: 'Jira' },
    { src: 'handlebars.png', alt: 'Handlebars' },
    { src: 'appscript.png', alt: 'Google Apps Script' },
  ];
}
