import TopicCard from '../components/TopicCard'
import { useEffect, useState } from 'react'
import { fetchLessons } from '../api'

const HomeScreen = () => {
   const [coursePaths, setCoursePaths] = useState([])

   useEffect(() => {
      fetchLessons().then((data) => {
         setCoursePaths(data)
      })
   }, [])

   return (
      <div>
         <div className="min-h-screen p-10 bg-gradient-to-br from-primary-100 via-secondary-300 to-primary-500">
            <header className="mb-10 text-center  text-text">
               <h1
                  className="
    text-4xl sm:text-5xl font-extrabold
    bg-gradient-to-r from-primary-600 to-secondary-500
    bg-clip-text text-transparent
    tracking-tight
  "
               >
                  Software Design Academy
               </h1>

               <p className="mt-3 text-text-muted text-sm sm:text-base max-w-xl mx-auto">
                  Learn software design through interactive, game-like
                  challenges.
               </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {coursePaths.map((t, index) => (
                  <div
                     key={t.id}
                     className="
        transform transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.02]
      "
                     style={{ animationDelay: `${index * 80}ms` }}
                  >
                     <TopicCard topic={t} />
                  </div>
               ))}
            </section>
         </div>
      </div>
   )
}

export default HomeScreen
