import { useRef } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

const toItems = (arr) => arr.map((v) => ({ id: crypto.randomUUID(), value: v }))
const toStrings = (items) => items.map((i) => i.value)

export default function ClassNode({ id, data }) {
   const { name = '', attributes = [], methods = [] } = data

   // Initialize stable items once — never re-derived from props
   const attrItems = useRef(toItems(attributes))
   const methItems = useRef(toItems(methods))

   const update = (patch) => {
      data?.onChange?.(id, { ...data, ...patch })
   }

   const updateName = (value) => update({ name: value })

   const updateAttribute = (itemId, value) => {
      attrItems.current = attrItems.current.map((a) =>
         a.id === itemId ? { ...a, value } : a
      )
      update({ attributes: toStrings(attrItems.current) })
   }

   const updateMethod = (itemId, value) => {
      methItems.current = methItems.current.map((m) =>
         m.id === itemId ? { ...m, value } : m
      )
      update({ methods: toStrings(methItems.current) })
   }

   const removeAttribute = (itemId) => {
      attrItems.current = attrItems.current.filter((a) => a.id !== itemId)
      update({ attributes: toStrings(attrItems.current) })
   }

   const removeMethod = (itemId) => {
      methItems.current = methItems.current.filter((m) => m.id !== itemId)
      update({ methods: toStrings(methItems.current) })
   }

   const addAttribute = () => {
      attrItems.current = [...attrItems.current, { id: crypto.randomUUID(), value: '' }]
      update({ attributes: toStrings(attrItems.current) })
   }

   const addMethod = () => {
      methItems.current = [...methItems.current, { id: crypto.randomUUID(), value: '' }]
      update({ methods: toStrings(methItems.current) })
   }

   const TrashIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <polyline points="3 6 5 6 21 6" />
         <path d="M19 6l-1 14H6L5 6" />
         <path d="M10 11v6M14 11v6" />
         <path d="M9 6V4h6v2" />
      </svg>
   )

   return (
      <div>
         <motion.div
            className="w-64 bg-white border border-gray-300 shadow-md overflow-hidden"
            whileHover={{ scale: 1.01, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
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
                  {attrItems.current.map((attr) => (
                     <div key={attr.id} className="flex items-center gap-1">
                        <input
                           defaultValue={attr.value}
                           placeholder="+ attribute: type"
                           onChange={(e) => updateAttribute(attr.id, e.target.value)}
                           onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAttribute() } }}
                           className="w-full px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 text-gray-700"
                        />
                        <button onClick={() => removeAttribute(attr.id)}
                           className="text-gray-300 hover:text-red-400 transition-colors">
                           <TrashIcon />
                        </button>
                     </div>
                  ))}
               </div>
               <button onClick={addAttribute}
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium">
                  + Add Attribute
               </button>
            </div>

            {/* METHODS */}
            <div className="px-3 py-2">
               <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Methods
               </p>
               <div className="space-y-2">
                  {methItems.current.map((method) => (
                     <div key={method.id} className="flex items-center">
                        <input
                           defaultValue={method.value}
                           placeholder="+ method(): type"
                           onChange={(e) => updateMethod(method.id, e.target.value)}
                           onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMethod() } }}
                           className="flex-1 px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-indigo-400 text-gray-700"
                        />
                        <button onClick={() => removeMethod(method.id)}
                           className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                           <TrashIcon />
                        </button>
                     </div>
                  ))}
               </div>
               <button onClick={addMethod}
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium">
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