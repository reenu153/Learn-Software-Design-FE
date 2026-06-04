import TopicCard from '../components/TopicCard'
import { useEffect, useState } from 'react'
import { fetchLessons } from '../api'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
   const [coursePaths, setCoursePaths] = useState([])
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   useEffect(() => {
      setLoading(true)
      if (!localStorage.getItem('token')) {
         navigate('/login')
      }
      fetchLessons().then((data) => {
         setCoursePaths(data)
         setLoading(false)
      })
   }, [])

   return (
      <div>
         <div className="h-[92vh] w-full p-10 bg-hero bg-contain bg-bottom bg-no-repeat overflow-hidden">
            <header className="mb-10 text-center  text-text">
               <h1
                  className="
    text-4xl font-extrabold
    bg-gradient-to-r from-primary-600 to-secondary-500
    bg-clip-text text-transparent
    tracking-tight
  "
               >
                  Software Design Academy
               </h1>

               <p className="mt-3 text-text-white text-sm sm:text-base max-w-xl mx-auto">
                  Learn software design through interactive, game-like
                  challenges.
               </p>
            </header>

            {loading ? (
               <div className="loader mx-auto" />
            ) : (
               <section className="flex flex-wrap items-center justify-center gap-5">
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
            )}
         </div>
      </div>
   )
}

export default HomeScreen
