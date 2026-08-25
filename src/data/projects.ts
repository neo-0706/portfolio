export type ProjectStatus = 'In Progress' | 'Complete'

export interface Project {
  id: string
  index: string
  name: string
  label?: string
  status?: ProjectStatus
  description: string
  tech: string[]
  github?: string
  visual: 'devflow' | 'taskmanager' | 'climaglass' | 'miniblog' | 'taskflow'
}

export const projects: Project[] = [
  {
    id: 'devflow',
    index: '01',
    name: 'DevFlow',
    label: 'Developer Productivity Platform',
    status: 'In Progress',
    description:
      'A centralized productivity dashboard for development teams to manage project tasks, issues and activity tracking, connecting a modern React frontend with FastAPI backend endpoints.',
    tech: ['React', 'Tailwind CSS', 'React Hooks', 'REST API', 'FastAPI', 'PostgreSQL'],
    visual: 'devflow',
  },
  {
    id: 'react-task-manager',
    index: '02',
    name: 'React Task Manager',
    status: 'In Progress',
    description:
      'A modern task management interface designed to explore component-based architecture, state management with React Hooks and responsive UI development.',
    tech: ['React', 'JavaScript', 'React Hooks', 'Tailwind CSS'],
    visual: 'taskmanager',
  },
  {
    id: 'climaglass',
    index: '03',
    name: 'ClimaGlass',
    description:
      'A weather web application featuring dynamic data fetching, real-time weather information and responsive interface design.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    github: 'https://github.com/neo-0706/ClimaGlass',
    visual: 'climaglass',
  },
  {
    id: 'mini-blog',
    index: '04',
    name: 'Mini Blog',
    description:
      'A client-server web application demonstrating frontend UI rendering and structured communication with a backend API.',
    tech: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    github: 'https://github.com/neo-0706/mini-blog',
    visual: 'miniblog',
  },
  {
    id: 'taskflow',
    index: '05',
    name: 'TaskFlow',
    description:
      'A vanilla JavaScript task management application featuring dynamic DOM manipulation, interactive event handling and task state tracking.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/neo-0706/taskflow',
    visual: 'taskflow',
  },
]
