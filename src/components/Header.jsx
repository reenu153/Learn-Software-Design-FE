import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
   const navigate = useNavigate()
   const location = useLocation()

   const isHome = location.pathname === '/'

   const raw = localStorage.getItem('user')
   const user = raw ? JSON.parse(raw) : { name: 'User' }

   const handleBack = () => {
      navigate(-1)
   }

   const handleHome = () => {
      navigate('/')
   }

   const handleLogout = () => {
      if (window.confirm('Logout?')) {
         localStorage.removeItem('token')
         navigate('/login')
      }
   }

   return (
      <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
         {/* Left: Back or Home */}
         <div className="flex items-center justify-center gap-5 px-3">
            {!isHome && (
               <button
                  onClick={handleBack}
                  className="text-[23px] font-semibold rounded-lg bg-gray-100 hover:bg-gray-200"
               >
                  ←
               </button>
            )}
            <button
               onClick={handleHome}
               className="rounded-lg pb-1 text-[25px] font-bold bg-gray-100 hover:bg-gray-200"
            >
               𖠿
            </button>
         </div>

         {/* Right: User + Logout */}
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
               {/* Avatar */}
               <div className="w-8 h-8 rounded-full bg-primary-100 text-white flex items-center justify-center">
                  {user?.charAt(0).toUpperCase()}
               </div>

               {/* Username */}
               <span className="hidden sm:block text-sm font-medium">
                  {user}
               </span>
            </div>

            <button
               onClick={handleLogout}
               className="hidden sm:block font-bold text-sm"
            >
               ➜] Logout
            </button>
         </div>
      </div>
   )
}
