import { useParams } from 'react-router-dom'
import LessonCard from '../components/LessonCard'
import { useEffect, useState } from 'react'
import { fetchModulesWithProgress } from '../api'

export default function ModulesPage() {
   const { topicId } = useParams()
   const [modules, setModules] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      try {
         fetchModulesWithProgress(topicId).then((data) => {
            setModules(data)
         })
      } catch (e) {
         console.error('Failed to fetch modules:', e)
      }
      setLoading(false)
   }, [topicId])

   return loading ? (
      <div className="w-screen h-screen flex justify-center items-center">
         <div className="loader"></div>
      </div>
   ) : (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-300 to-primary-500">
         <div className="container mx-auto p-6">
            <div className="mb-8">
               <h2
                  className="
              text-3xl sm:text-4xl font-extrabold
              bg-gradient-to-r from-primary-600 to-secondary-500
              bg-clip-text text-transparent
            "
               >
                  Modules
               </h2>

               <p className="mt-2 text-sm text-text-muted max-w-xl">
                  Complete modules to gain XP and unlock the next challenge.
               </p>

               {/* <div className="mt-5 max-w-md">
                  <div className="flex justify-between text-xs text-text-muted mb-1">
                     <span>Topic Progress</span>
                     <span>40%</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-muted overflow-hidden">
                     <div className="h-full w-2/5 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
                  </div>
               </div> */}
            </div>

            <div
               className="
            grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
            gap-6
          "
            >
               {modules?.map((l, index) => (
                  <div
                     key={l.id}
                     className="
                transform transition-all duration-300
                hover:-translate-y-1 hover:scale-[1.02]
              "
                     style={{ animationDelay: `${index * 80}ms` }}
                  >
                     <LessonCard module={l} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
