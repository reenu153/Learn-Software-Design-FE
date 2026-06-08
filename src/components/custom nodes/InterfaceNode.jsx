import { useRef } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

const toItems = (arr) => arr.map((v) => ({ id: crypto.randomUUID(), value: v }))
const toStrings = (items) => items.map((i) => i.value)

export default function InterfaceNode({ id, data }) {
   const { name = 'Interface', methods = [] } = data

   // Stable method IDs
   const methodItems = useRef(toItems(methods))

   const update = (patch) => {
      data?.onChange?.(id, {
         ...data,
         ...patch,
      })
   }

   const updateName = (value) => {
      update({ name: value })
   }

   const updateMethod = (itemId, value) => {
      methodItems.current = methodItems.current.map((m) =>
         m.id === itemId ? { ...m, value } : m
      )

      update({
         methods: toStrings(methodItems.current),
      })
   }

   const removeMethod = (itemId) => {
      methodItems.current = methodItems.current.filter(
         (m) => m.id !== itemId
      )

      update({
         methods: toStrings(methodItems.current),
      })
   }

   const addMethod = () => {
      methodItems.current = [
         ...methodItems.current,
         {
            id: crypto.randomUUID(),
            value: '',
         },
      ]

      update({
         methods: toStrings(methodItems.current),
      })
   }

   const TrashIcon = () => (
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
   )

   return (
      <div className="relative">
         <motion.div
            className="w-60 rounded-2xl border border-blue-300 shadow-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
         >
            {/* HEADER */}
            <div className="px-3 py-2 border-b borderindigo-700 text-center">
               <div className="text-xs font-semibold tracking-widest text-blue-600">
                  &lt;&lt;interface&gt;&gt;
               </div>

               <input
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Interface Name"
                  className="w-full mt-1 bg-transparent text-center font-bold text-indigo-700 outline-none placeholder-blue-400"
               />
            </div>

            {/* METHODS */}
            <div className="p-3 space-y-2">
               {methodItems.current.map((method) => (
                  <div key={method.id} className="flex items-center gap-1">
                     <input
                        defaultValue={method.value}
                        placeholder="+ method(): type"
                        onChange={(e) =>
                           updateMethod(method.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault()
                              addMethod()
                           }
                        }}
                        className="flex-1 px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-indigo-400 text-gray-700"
                     />

                     <button
                        onClick={() => removeMethod(method.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                     >
                        <TrashIcon />
                     </button>
                  </div>
               ))}

               <button
                  onClick={addMethod}
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium"
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