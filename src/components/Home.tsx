import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const featuredAlbums = [
  {
    id: 1,
    title: 'Urban Landscapes',
    description: 'A collection of city views and architectural marvels',
    coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    photoCount: 12,
    date: 'February 10, 2024',
    photographer: {
      name: 'Alex Rivers',
      avatar: 'https://images.unsplash.com/profile-1446404465118-3a53b909cc82',
      bio: 'Capturing urban stories through my lens',
    },
  },
  {
    id: 2,
    title: 'Natural Wonders',
    description: 'Exploring the beauty of nature through photography',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    photoCount: 8,
    date: 'February 8, 2024',
    photographer: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/profile-1446404465118-3a53b909cc82',
      bio: 'Nature and wildlife photographer',
    },
  },
  {
    id: 3,
    title: 'Coastal Dreams',
    description: 'Serene moments captured along the shoreline',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    photoCount: 15,
    date: 'February 5, 2024',
    photographer: {
      name: 'Mike Thomson',
      avatar: 'https://images.unsplash.com/profile-1441298803695-accd94000cac',
      bio: 'Chasing waves and perfect light',
    },
  },
];

export default function Home() {
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [albumsRef, albumsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden" ref={heroRef}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4)',
            transform: heroInView ? 'scale(1)' : 'scale(1.1)',
            transition: 'transform 1.5s ease-out',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div
          className={`relative h-full flex items-center justify-center text-center px-6 transform ${
            heroInView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Capture Your Story
            </h1>
            <p className="text-xl md:text-2xl text-zinc-200 mb-10">
              Every photograph tells a unique story. Share yours with the world.
            </p>
            <Link
              to="/photos"
              className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-100 transition-colors"
            >
              Start Exploring
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      {/* Featured Albums Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        ref={albumsRef}
      >
        <h2
          className={`text-4xl font-bold text-zinc-900 dark:text-white mb-16 text-center transform ${
            albumsInView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          } transition-all duration-1000 delay-300 ease-out`}
        >
          Featured Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredAlbums.map((album, index) => (
            <article
              key={album.id}
              className={`bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-xl transform ${
                albumsInView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              } transition-all duration-1000 hover:scale-[1.02]`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {album.title}
                  </h3>
                  <p className="text-zinc-200">{album.photoCount} photos</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={album.photographer.avatar}
                    alt={album.photographer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-zinc-900 dark:text-white">
                      {album.photographer.name}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {album.photographer.bio}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                  {album.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {album.date}
                  </span>
                  <Link
                    to={`/photos`}
                    className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    View Album →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
