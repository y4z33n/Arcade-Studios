import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Leylak | Digital Solutions Studio',
    short_name: 'Leylak',
    description: 'A full-spectrum digital solutions studio. Every problem your brand faces online — we solve it.',
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






