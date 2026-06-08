import { useEffect, useRef, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

const toItems = (arr) => arr.map((v) => ({ id: crypto.randomUUID(), value: v }))
const toStrings = (items) => items.map((i) => i.value)

const dragState = { current: null }

const ItemList = ({ itemsRef, field, placeholder, focusColor, handlers }) => (
   <div
      className="space-y-2"
      onDragOver={(e) => handlers.onSectionDragOver(e, field)}
      onDrop={(e) => handlers.onDrop(e, itemsRef, field)}
   >
      {itemsRef.current.map((item) => (
         <div
            key={item.id}
            className="flex items-center gap-1"
            draggable
            onDragStart={(e) => handlers.onDragStart(e, itemsRef, field, item)}
            onDragEnd={() => { handlers.onDragEnd() }}
            onDragOver={(e) => handlers.onRowDragOver(e, item.id)}
         >
            <div
               className="nodrag cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing"
               onMouseDown={() => handlers.onGripMouseDown()}
            >
               <GripIcon />
            </div>
            <input
               defaultValue={item.value}
               placeholder={placeholder}
               onChange={(e) => handlers.updateItem(itemsRef, field, item.id, e.target.value)}
               onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlers.addItem(itemsRef, field) } }}
               className={`flex-1 px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-${focusColor}-400 text-gray-700`}
            />
            <button
               onClick={() => handlers.removeItem(itemsRef, field, item.id)}
               className="text-gray-300 hover:text-red-400 transition-colors"
            >
               <TrashIcon />
            </button>
         </div>
      ))}
   </div>
)

export default function ClassNode({ id, data }) {
   const { name = '', attributes = [], methods = [] } = data

   const attrItems = useRef(toItems(attributes))
   const methItems = useRef(toItems(methods))
   const [, bump] = useState(0)
   const forceRender = () => bump(v => v + 1)
   const isDragging = useRef(false)
   const dragOverId = useRef(null)

   const update = (patch) => data?.onChange?.(id, { ...data, ...patch })
   const updateName = (value) => update({ name: value })

   const updateItem = (ref, field, itemId, value) => {
      ref.current = ref.current.map(x => x.id === itemId ? { ...x, value } : x)
      update({ [field]: toStrings(ref.current) })
   }

   const removeItem = (ref, field, itemId) => {
      ref.current = ref.current.filter(x => x.id !== itemId)
      update({ [field]: toStrings(ref.current) })
   }

   const addItem = (ref, field) => {
      ref.current = [...ref.current, { id: crypto.randomUUID(), value: '' }]
      update({ [field]: toStrings(ref.current) })
   }

   const onDragStart = (e, ref, field, item) => {
      isDragging.current = true
      dragState.current = {
         sourceNodeId: id,
         field,
         itemId: item.id,
         value: item.value,
         removeFromSource: () => {
            ref.current = ref.current.filter(x => x.id !== item.id)
            update({ [field]: toStrings(ref.current) })
            forceRender()
         },
      }
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', item.value)
   }

   const onRowDragOver = (e, targetId) => {
      e.preventDefault()
      e.stopPropagation()
      dragOverId.current = targetId
      e.dataTransfer.dropEffect = 'move'
   }

   const onSectionDragOver = (e, field) => {
      const drag = dragState.current
      if (!drag || drag.field !== field) return
      e.preventDefault()
      e.stopPropagation()
      dragOverId.current = null
      e.dataTransfer.dropEffect = 'move'
   }

   const onDrop = (e, ref, field) => {
      e.preventDefault()
      e.stopPropagation()
      const drag = dragState.current
      if (!drag || drag.field !== field) return

      const newItem = { id: crypto.randomUUID(), value: drag.value }
      const items = drag.sourceNodeId === id
         ? ref.current.filter(x => x.id !== drag.itemId)
         : [...ref.current]

      if (dragOverId.current) {
         const idx = items.findIndex(x => x.id === dragOverId.current)
         idx >= 0 ? items.splice(idx, 0, newItem) : items.push(newItem)
      } else {
         items.push(newItem)
      }

      ref.current = items
      update({ [field]: toStrings(ref.current) })
      forceRender()

      if (drag.sourceNodeId !== id) drag.removeFromSource()

      dragState.current = null
      dragOverId.current = null
   }

   const handlers = {
      updateItem,
      removeItem,
      addItem,
      onDragStart,
      onDragEnd: () => { isDragging.current = false },
      onGripMouseDown: () => { isDragging.current = true },
      onRowDragOver,
      onSectionDragOver,
      onDrop,
   }

   return (
      <div onMouseDown={(e) => { if (isDragging.current) e.stopPropagation() }}>
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
               <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">Attributes</p>
               <ItemList
                  itemsRef={attrItems}
                  field="attributes"
                  placeholder="+ attribute: type"
                  focusColor="purple"
                  handlers={handlers}
               />
               <button onClick={() => addItem(attrItems, 'attributes')}
                  className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium">
                  + Add Attribute
               </button>
            </div>

            {/* METHODS */}
            <div className="px-3 py-2">
               <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">Methods</p>
               <ItemList
                  itemsRef={methItems}
                  field="methods"
                  placeholder="+ method(): type"
                  focusColor="indigo"
                  handlers={handlers}
               />
               <button onClick={() => addItem(methItems, 'methods')}
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

const TrashIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
   </svg>
)

const GripIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="19" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="19" r="1" fill="currentColor" stroke="none" />
   </svg>
) 