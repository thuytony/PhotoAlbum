import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

// Sample photo data - replace with your actual data source
export const photos = [
  {
    id: 1,
    title: 'Mountain Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    likes: 245,
    comments: 12,
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    likes: 189,
    comments: 8,
  },
  {
    id: 3,
    title: 'City Lights',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    likes: 324,
    comments: 15,
  },
]

export default function PhotoGrid() {
  const [selectedLayout, setSelectedLayout] = useState<'grid' | 'fullscreen'>('grid')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Latest Photos</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedLayout('grid')}
            className={`px-3 py-1 rounded ${
              selectedLayout === 'grid'
                ? 'bg-zinc-800 dark:bg-white text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setSelectedLayout('fullscreen')}
            className={`px-3 py-1 rounded ${
              selectedLayout === 'fullscreen'
                ? 'bg-zinc-800 dark:bg-white text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
            }`}
          >
            Full
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className={`grid gap-4 animate-fade-in ${
          selectedLayout === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {photos.map((photo) => (
          <Link
            key={photo.id}
            to={`/photos/${photo.id}`}
            className="relative overflow-hidden rounded-lg group"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{photo.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span>❤️ {photo.likes}</span>
                  <span>💬 {photo.comments}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}