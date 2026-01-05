import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arcade Studios | Web Development Agency',
    short_name: 'Arcade Studios',
    description: 'Web development agency building modern web applications, digital products, and innovative solutions for startups, agencies, and next-gen brands.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF4500',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}






