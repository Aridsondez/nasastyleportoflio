// Portfolio data structure

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  name: string;
  status: 'ACTIVE' | 'LIVE' | 'WIP' | 'COMPLETED';
  description: string;
  features: string[];
  techStack: string[];
  github?: string;
  demo?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const experiences: Experience[] = [
  {
    id: 'nextera',
    company: 'NextEra Energy x Everbright',
    role: 'Software Engineer, Intern',
    period: 'May 2025 - August 2025',
    location: 'San Francisco, CA',
    description: 'Built production analytics pipeline serving 30,000+ solar customers',
    achievements: [
      'Architected async task queue with AWS SQS',
      'Reduced query latency: 8.5s → 2.1s (75% improvement)',
      'Maintained 99.9% uptime for production system',
    ],
    techStack: ['Django', 'PostgreSQL', 'AWS SQS', 'Datadog', 'Docker'],
  },
  {
    id: 'luro',
    company: 'Luro - YC Track',
    role: 'Software Engineer',
    period: 'Jan 2025 - Present',
    location: 'Remote',
    description: 'Real-time AI assistant supporting 10k+ concurrent users',
    achievements: [
      'Built real-time collaboration features',
      'Optimized for high concurrency with WebSockets',
      'Implemented AI-powered workflow automation',
    ],
    techStack: ['Next.js', 'WebSockets', 'Redis', 'AI APIs'],
  },
  {
    id: 'jacobs',
    company: 'Jacobs Engineering',
    role: 'Software Engineer Intern',
    period: 'Aug 2024 - Jan 2025',
    location: 'Remote',
    description: 'Data pipeline processing 50k+ readings/hour',
    achievements: [
      'Built ETL pipelines for sensor data processing',
      'Implemented monitoring and alerting systems',
      'Optimized database queries for high-throughput operations',
    ],
    techStack: ['Python', 'PostgreSQL', 'AWS', 'Airflow'],
  },
];

export const projects: Project[] = [
  {
    id: 'sqs-lite',
    name: 'SQS-Lite',
    status: 'ACTIVE',
    description: 'A Go-based distributed message queue implementing AWS SQS semantics with PostgreSQL as the persistence layer.',
    features: [
      'At-least-once delivery semantics',
      'Visibility timeout & exponential backoff',
      'Dead-letter queue handling',
      '10,000+ msg/s throughput',
      '99.95% availability',
    ],
    techStack: ['Go', 'PostgreSQL', 'Docker', 'Prometheus'],
    metrics: [
      { label: 'Throughput', value: '10,000+ msg/s' },
      { label: 'Availability', value: '99.95%' },
      { label: 'Latency', value: '<100ms p95' },
    ],
  },
  {
    id: 'cortex-search',
    name: 'CortexSearch',
    status: 'LIVE',
    description: 'High-performance search engine with semantic search capabilities',
    features: [
      'Vector embeddings for semantic search',
      'Real-time indexing',
      'Distributed architecture',
      'Sub-100ms query latency',
    ],
    techStack: ['Rust', 'Qdrant', 'FastAPI', 'Redis'],
  },
  {
    id: 'browser-agent',
    name: 'Browser Agent',
    status: 'WIP',
    description: 'AI-powered browser automation agent for web interactions',
    features: [
      'Natural language task execution',
      'Multi-step workflow automation',
      'Smart element detection',
    ],
    techStack: ['Python', 'Playwright', 'OpenAI API', 'LangChain'],
  },
];

export const skills = {
  languages: ['Go', 'Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL'],
  backend: ['Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'MongoDB'],
  cloud: ['AWS', 'Docker', 'Kubernetes', 'Vercel', 'Railway'],
  tools: ['Git', 'Linux', 'Prometheus', 'Datadog', 'WebSockets'],
  concepts: ['Distributed Systems', 'Message Queues', 'Real-time Systems', 'API Design'],
};

export const contact = {
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  location: 'Florida, USA',
};

export const funFacts = [
  { label: 'Hackathons Survived', value: '15+' },
  { label: 'Lines of Code', value: 'Too many' },
  { label: 'Favorite Stack', value: 'Go + Postgres' },
  { label: 'Coffee Consumed', value: '∞' },
  { label: 'Sleep Schedule', value: "What's that?" },
];
