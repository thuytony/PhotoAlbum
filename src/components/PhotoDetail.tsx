import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { photos } from './PhotoGrid'

interface Comment {
  id: number
  user: string
  avatar: string
  text: string
  date: string
  likes: number
}

interface RelatedPhoto {
  id: number
  imageUrl: string
  title: string
}

export default function PhotoDetail() {
  const { id } = useParams()
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/profile-1502809342504-1b9b81ac12b6',
      text: "The composition in this photo is absolutely stunning! The way you've captured the light and shadow creates such depth.",
      date: '2024-02-10',
      likes: 12,
    },
    {
      id: 2,
      user: 'Mike Thomson',
      avatar: 'https://images.unsplash.com/profile-1441298803695-accd94000cac',
      text: 'Love the mood in this shot. What camera settings did you use?',
      date: '2024-02-09',
      likes: 8,
    },
  ])

  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [relatedRef, relatedInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Find the photo from our sample data
  const photo = photos.find((p) => p.id === Number(id))

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Photo not found</h2>
          <Link
            to="/photos"
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Back to gallery
          </Link>
        </div>
      </div>
    )
  }

  const relatedPhotos: RelatedPhoto[] = photos
    .filter((p) => p.id !== photo.id)
    .slice(0, 3)

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      user: 'You',
      avatar: 'https://images.unsplash.com/profile-1446404465118-3a53b909cc82',
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div 
        ref={contentRef}
        className={`container mx-auto px-4 py-8 transform ${
          contentInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } transition-all duration-1000`}
      >
        <nav className="flex items-center justify-between mb-8">
          <Link
            to="/photos"
            className="inline-flex items-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Back to gallery
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isSaved
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {isSaved ? '⭐' : '☆'} {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isLiked
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {isLiked ? '❤️' : '🤍'} {photo.likes + (isLiked ? 1 : 0)}
            </button>
          </div>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-2">{photo.title}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <span>📸 f/2.8</span>
                  <span>⚡ 1/1000s</span>
                  <span>📏 ISO 100</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">
                About this photo
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                This stunning shot was captured during the golden hour, when the light was perfect for
                highlighting the natural beauty of the scene. The composition draws the viewer's eye
                through the frame, creating a sense of depth and wonder.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-white">
                Comments ({comments.length})
              </h2>
              
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-zinc-900 dark:text-white">
                            {comment.user}
                          </span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {formatDate(comment.date)}
                          </span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {comment.text}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                            ❤️ {comment.likes}
                          </button>
                          <button className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={relatedRef}
          className={`mt-16 transform ${
            relatedInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-1000 delay-300`}
        >
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
            More like this
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPhotos.map((relatedPhoto) => (
              <Link
                key={relatedPhoto.id}
                to={`/photos/${relatedPhoto.id}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={relatedPhoto.imageUrl}
                  alt={relatedPhoto.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white">
                    {relatedPhoto.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}