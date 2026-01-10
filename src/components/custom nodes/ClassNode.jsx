import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

export default function ClassNode({ id, data }) {
   const { name, attributes, methods, updateNode } = data

   const updateName = (value) => updateNode(id, { name: value })

   const updateAttribute = (i, value) => {
      const copy = [...attributes]
      copy[i] = value
      updateNode(id, { attributes: copy })
   }

   const updateMethod = (i, value) => {
      const copy = [...methods]
      copy[i] = value
      updateNode(id, { methods: copy })
   }
   return (
      <div>
         <motion.div
            className="w-56 bg-gradient-to-b from-purple-50 rounded-md via-pink-50 to-indigo-50 border-2 border-black font-sans shadow-lg"
         >
            {/* CLASS NAME */}
            <motion.input
               placeholder="Class Name"
               value={name}
               onChange={(e) => updateName(e.target.value)}
               className="w-full text-center font-bold border-b-2 border-black p-1 mb-2 outline-none bg-primary-300 rounded-full placeholder-purple-400 rounded-sm text-purple-800"
            />

            {/* ATTRIBUTES */}
            <div className="border-b border-black p-1 mb-2 flex flex-col ">
               {attributes?.map((attr, i) => (
                  <motion.input
                     key={i}
                     placeholder="attribute"
                     value={attr}
                     onChange={(e) => updateAttribute(i, e.target.value)}
                     className="w-full p-1 mb-1 border-none outline-none bg-primary-100 rounded-full placeholder-purple-400 rounded-sm text-purple-700"
                  />
               ))}
               <motion.button
                  onClick={() =>
                     updateNode(id, { attributes: [...attributes, ''] })
                  }
                  className="text-xs mt-1 cursor-pointer bg-pink-200 border border-pink-400 px-2 py-1 rounded-full font-semibold hover:bg-pink-300"
                
               >
                  + attribute
               </motion.button>
            </div>

            {/* METHODS */}
            <div className="p-1 flex flex-col">
               {methods.map((method, i) => (
                  <motion.input
                     key={i}
                     placeholder="method()"
                     value={method}
                     onChange={(e) => updateMethod(i, e.target.value)}
                     className="w-full p-1 mb-1 border-none outline-none bg-primary-100 rounded-sm text-indigo-700"

                  />
               ))}
               <motion.button
                  onClick={() => updateNode(id, { methods: [...methods, ''] })}
                  className="text-xs mt-1 cursor-pointer bg-indigo-200 border border-indigo-400 placeholder-indigo-400 px-2 py-1 rounded-full font-semibold hover:bg-indigo-300"
               >
                  + method
               </motion.button>
            </div>
         </motion.div>
         {/* HANDLES ON ALL SIDES */}
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
