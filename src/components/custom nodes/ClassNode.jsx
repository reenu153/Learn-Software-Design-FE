import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

export default function ClassNode({ id, data }) {
   const { name = '', attributes = [], methods = [] } = data

   const update = (patch) => {
      data?.onChange?.(id, {
         ...data,
         ...patch,
      })
   }

   const remove = (key, index) =>
    {
        data?.onChange?.(id, {
         ...data,
         [key]: data[key].filter((_, i) => i !== index),
      })
   }
   const updateName = (value) => update({ name: value })

   const updateAttribute = (i, value) => {
      const copy = [...attributes]
      copy[i] = value
      update({ attributes: copy })
   }

   const updateMethod = (i, value) => {
      const copy = [...methods]
      copy[i] = value
      update({ methods: copy })
   }

   return (
      <div>
         <motion.div
            className="w-64 bg-white border border-gray-300 shadow-md overflow-hidden"
            whileHover={{
               scale: 1.01,
               boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            }}
         >
            {/* CLASS NAME */}
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border-b border-gray-300 px-3 py-2">
               <input
                  placeholder="Class Name"
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                  className="w-full text-center font-bold text-gray-800 bg-transparent outline-none placeholder-gray-400"
               />
            </div>

            {/* ATTRIBUTES */}
            <div className="px-3 py-2 border-b border-gray-200">
               <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Attributes
               </p>

               <div className="space-y-2">
                  {attributes?.map((attr, i) => (
                     <div key={i} className="flex items-center gap-1">
                        <input
                           defaultValue={attr}
                           placeholder="+ attribute: type"
                           onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                update({
                        attributes: [...attributes, ''],
                     })
                              }
                            }}
                           onChange={(e) => updateAttribute(i, e.target.value)}
                           className="w-full px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 text-gray-700"
                        />
                        <button
                           onClick={() => remove('attributes', i)}
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
               </div>

               <button
                  onClick={() =>
                     update({
                        attributes: [...attributes, ''],
                     })
                  }
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium"
               >
                  + Add Attribute
               </button>
            </div>

            {/* METHODS */}
            <div className="px-3 py-2">
               <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Methods
               </p>

               <div className="space-y-2">
                  {methods?.map((method, i) => (
                     <div key={i} className="flex items-center">
                        <input
                           defaultValue={method}
                           placeholder="+ method(): type"
                           onChange={(e) => updateMethod(i, e.target.value)}
                           onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                update({ methods: [...methods, ''] })
                              }
                            }}
                           className="flex-1 px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-indigo-400 text-gray-700"
                        />
                        <button
                           onClick={() => remove('methods', i)}
                           className="p-1 text-gray-300 hover:text-red-400 transition-colors"
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
               </div>

               <button
                  onClick={() =>
                     update({
                        methods: [...methods, ''],
                     })
                  }
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium"
               >
                  + Add Method
               </button>
            </div>
         </motion.div>

         <Handle type="source" id="top-source" position={Position.Top} />
         <Handle type="target" id="top-target" position={Position.Top} />

         <Handle type="source" id="bottom-source" position={Position.Bottom} />
         <Handle type="target" id="bottom-target" position={Position.Bottom} />

         <Handle type="source" id="left-source" position={Position.Left} />
         <Handle type="target" id="left-target" position={Position.Left} />

         <Handle type="source" id="right-source" position={Position.Right} />
         <Handle type="target" id="right-target" position={Position.Right} />
      </div>
   )
}
