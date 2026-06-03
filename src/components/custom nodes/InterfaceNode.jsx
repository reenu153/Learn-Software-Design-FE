import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

export default function InterfaceNode({ id, data }) {
   const { name = 'Interface', methods = [] } = data

   const update = (patch) => {
      data?.onChange?.(id, {
         ...data,
         ...patch,
      })
   }

   const updateName = (value) => {
      update({ name: value })
   }

   const remove = (key, index) =>
      data?.onChange?.(id, {
         ...data,
         [key]: data[key].filter((_, i) => i !== index),
      })

   const updateMethod = (index, value) => {
      const updated = [...methods]
      updated[index] = value
      update({ methods: updated })
   }

   const addMethod = () => {
      update({ methods: [...methods, ''] })
   }

   return (
      <div className="relative">
         <motion.div
            className="w-60 rounded-2xl border border-blue-300 bg-gradient-to-b from-blue-50 via-white to-cyan-50 shadow-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
         >
            {/* HEADER */}
            <div className="px-3 py-2 border-b border-blue-200 bg-blue-100 text-center">
               <div className="text-xs font-semibold tracking-widest text-blue-600">
                  &lt;&lt;interface&gt;&gt;
               </div>

               <input
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Interface Name"
                  className="w-full mt-1 bg-transparent text-center font-bold text-blue-800 outline-none placeholder-blue-400"
               />
            </div>

            {/* METHODS */}
            <div className="p-3 space-y-2">
               {methods?.map((method, i) => (
                  <div key={`method-${i}-${method}`} className="flex items-center gap-1">
                     <input
                        defaultValue={method}
                        placeholder="+ method(): type"
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             e.preventDefault()
                            addMethod()
                           }
                         }}
                        onChange={(e) => updateMethod(i, e.target.value)}
                        className="flex-1 px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-indigo-400 text-gray-700"
                     />
                     <button
                        onClick={() => remove('methods', i)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="18"
                           height="18"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <polyline points="3 6 5 6 21 6" />
                           <path d="M19 6l-1 14H6L5 6" />
                           <path d="M10 11v6M14 11v6" />
                           <path d="M9 6V4h6v2" />
                        </svg>
                     </button>
                  </div>
               ))}

               <button
                  onClick={addMethod}
                  className="w-full mt-2 text-sm font-medium rounded-lg px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
               >
                  + Add Method
               </button>
            </div>
         </motion.div>

         {/* HANDLES */}
         <Handle type="target" position={Position.Top} />
         <Handle type="source" position={Position.Bottom} />
         <Handle type="target" position={Position.Left} />
         <Handle type="source" position={Position.Right} />
      </div>
   )
}
