import { useNavigate } from 'react-router-dom'

export default function moduleCard({ module }) {
   const navigate = useNavigate()

   return (
      <div
         onClick={() => navigate(`/module/${module.module_id}`)}
         className={`
    relative p-5 rounded-2xl border
    transition-all duration-300
    bg-gradient-to-br from-surface to-secondary-50
    shadow-card cursor-pointer min-w-[400px] min-h-[180px]
  `}
      >
         <div className="flex justify-between items-start">
            <div>
               <h3
                  className={`
        text-lg font-extrabold
        text-gray-400"
      `}
               >
                  {module.title}
               </h3>

               <p className="text-sm text-text-muted mt-1 leading-snug line-clamp-3">
                  {module.description}
               </p>
            </div>

            <div
               className="
      text-[12px] font-bold text-center
      bg-secondary-100 text-secondary-600
      px-3 py-1 rounded-full min-w-[80px]
    "
            >
               ⭐ {module.earned_xp} / {module.total_xp} XP
            </div>
         </div>

         <div className="mt-4 flex justify-between items-center text-xs">
            <span className="text-text-muted">
               Status:{' '}
               <span className="font-semibold">
                  {module?.progress_percent
                     ? `${module?.progress_percent}%`
                     : 'Not started'}
               </span>
            </span>
            <span className="text-secondary-500 font-semibold">▶</span>
         </div>
      </div>
   )
}
