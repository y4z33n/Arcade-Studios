'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with advanced features',
    image: '/projects/ecommerce.jpg',
    freelancer: 'Sarah Johnson',
    category: 'Web Development',
    skills: ['Next.js', 'React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking application',
    image: '/projects/banking.jpg',
    freelancer: 'Michael Chen',
    category: 'Mobile Development',
    skills: ['React Native', 'TypeScript', 'Firebase'],
  },
  {
    title: 'Brand Identity Design',
    description: 'Complete brand identity package for a tech startup',
    image: '/projects/branding.jpg',
    freelancer: 'Emma Davis',
    category: 'Design',
    skills: ['Branding', 'Logo Design', 'Typography'],
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics and management dashboard for social media',
    image: '/projects/dashboard.jpg',
    freelancer: 'Alex Turner',
    category: 'Web Development',
    skills: ['Vue.js', 'D3.js', 'Python'],
  },
  {
    title: 'Fitness Tracking App',
    description: 'Mobile app for tracking workouts and nutrition',
    image: '/projects/fitness.jpg',
    freelancer: 'Lisa Wang',
    category: 'Mobile Development',
    skills: ['Flutter', 'Firebase', 'UI/UX Design'],
  },
  {
    title: 'Restaurant Website',
    description: 'Responsive website with online ordering system',
    image: '/projects/restaurant.jpg',
    freelancer: 'David Miller',
    category: 'Web Development',
    skills: ['React', 'Node.js', 'Stripe'],
  },
];

export default function Projects() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Projects</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore our portfolio of successful projects and the talented freelancers behind them.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="h-48 w-full bg-gray-200" />
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-purple-600">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-6 text-gray-900">{project.title}</h3>
                <p className="mt-4 text-base text-gray-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-500">Created by {project.freelancer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 