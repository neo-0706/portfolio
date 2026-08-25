export interface StackGroup {
  title: string
  eyebrow: string
  items: string[]
}

export const stackGroups: StackGroup[] = [
  {
    eyebrow: '01 / Interface',
    title: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'React Hooks',
      'Tailwind CSS',
      'Bootstrap',
      'Flexbox',
      'CSS Grid',
      'Responsive Design',
    ],
  },
  {
    eyebrow: '02 / Systems',
    title: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Redis', 'AJAX'],
  },
  {
    eyebrow: '03 / Workflow',
    title: 'Tools & Engineering',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Linux', 'n8n', 'WordPress', 'C++'],
  },
]
