'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    name: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce solutions',
    price: 'Starting from ₹9,999',
  },
  {
    name: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    price: 'Starting from ₹14,999',
  },
  {
    name: 'UI/UX Design',
    description: 'User interface and experience design for digital products',
    price: 'Starting from ₹7,999',
  },
  {
    name: 'Brand Identity',
    description: 'Logo design, brand guidelines, and marketing materials',
    price: 'Starting from ₹5,999',
  },
];

const featuredProjects = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with advanced features',
    image: '/projects/ecommerce.jpg',
    freelancer: 'Sarah Johnson',
    category: 'Web Development',
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking application',
    image: '/projects/banking.jpg',
    freelancer: 'Michael Chen',
    category: 'Mobile Development',
  },
  {
    title: 'Brand Identity Design',
    description: 'Complete brand identity package for a tech startup',
    image: '/projects/branding.jpg',
    freelancer: 'Emma Davis',
    category: 'Design',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Vision, Our Expertise
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a collective of talented freelancers ready to bring your projects to life.
              From web development to design, we have the skills to make your ideas reality.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Get started
              </Link>
              <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900">
                View projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Choose from our range of professional services
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-white p-8 shadow-lg rounded-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
              <p className="mt-4 text-lg font-medium text-purple-600">{service.price}</p>
              <Link
                href={`/contact?service=${service.name}`}
                className="mt-4 inline-flex items-center justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Projects section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Take a look at some of our recent work and the talented freelancers behind them.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="h-48 w-full bg-gray-200" />
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-purple-600">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-6 text-gray-900">{project.title}</h3>
                <p className="mt-4 text-base text-gray-600">{project.description}</p>
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
