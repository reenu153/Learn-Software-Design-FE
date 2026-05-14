import { motion } from 'framer-motion'

export default function Sidebar({
   selectedEdgeType,
   setSelectedEdgeType,
   activeTab,
   setActiveTab,
   sidebarOpen
}) {
   const onNodeDragStart = (event, nodeType) => {
      event.stopPropagation()
      event.dataTransfer.setData('application/reactflow', nodeType)
      event.dataTransfer.effectAllowed = 'move'
   }

   const classEdges = [
      { label: 'Inheritance', type: 'inheritance', icon: '▷' },
      { label: 'Composition', type: 'composition', icon: '◆' },
      { label: 'Aggregation', type: 'aggregation', icon: '◇' },
      { label: 'Dependency', type: 'dependency', icon: '⇢' },
      { label: 'Association', type: 'association', icon: '—' },
      { label: 'Realization', type: 'realization', icon: '⋯▷' },
   ]

   const componentEdges = [
      { label: 'Dependency', type: 'dependency', icon: '⇢' },
      { label: 'Assembly', type: 'assembly', icon: '◖──◯' },
      { label: 'Delegation', type: 'delegation', icon: '→|' },
      { label: 'Provided', type: 'provided', icon: '◯' },
      { label: 'Required', type: 'required', icon: '◖' },
      { label: 'Connection', type: 'connection', icon: '—' },
   ]

   return (
      <aside className={`${sidebarOpen ? 'w-[270px]' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-gray-200 shadow-sm flex flex-col h-full`}>
         <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">UML Toolbox</h2>
            <p className="text-sm text-gray-500 mt-1">
               Build diagrams visually
            </p>
         </div>

         {/* TABS */}
         <div className="px-2 pt-4">
            <div className="bg-gray-100 rounded-xl p-1 flex">
               {['class', 'component'].map((tab) => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                        activeTab === tab
                           ? 'bg-white shadow text-purple-700'
                           : 'text-gray-500'
                     }`}
                  >
                     {tab === 'class' ? 'Class' : 'Component'}
                  </button>
               ))}
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {/* ================= CLASS MODE ================= */}
            {activeTab === 'class' && (
               <>
                  {/* Nodes */}
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Nodes
                     </h3>

                     <div className="space-y-3">
                        {[
                           { label: 'Class', type: 'classNode', icon: '□' },
                           {
                              label: 'Interface',
                              type: 'interfaceNode',
                              icon: '◫',
                           },
                        ].map((node) => (
                           <motion.button
                              key={node.type}
                              draggable
                              onDragStart={(e) => onNodeDragStart(e, node.type)}
                              whileTap={{ scale: 0.97 }}
                              whileHover={{ scale: 1.02 }}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50 hover:border-purple-300 flex justify-between items-center text-sm font-medium"
                           >
                              <span>{node.label}</span>
                              <span className="text-purple-600">
                                 {node.icon}
                              </span>
                           </motion.button>
                        ))}
                     </div>
                  </div>

                  {/* Edges */}
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Relationships
                     </h3>
                     <div className="py-3 border-t border-gray-100 text-xs text-gray-400">
                        Tip: To connect nodes, first select a relationship type.
                        Then drag from a handle (●) on one node to a handle on
                        another node
                     </div>

                     <div className="space-y-3">
                        {classEdges.map((edge) => (
                           <EdgeButton
                              key={edge.type}
                              edge={edge}
                              selected={selectedEdgeType === edge.type}
                              onClick={() => setSelectedEdgeType(edge.type)}
                           />
                        ))}
                     </div>
                  </div>
               </>
            )}

            {/* ================= COMPONENT MODE ================= */}
            {activeTab === 'component' && (
               <>
                  {/* Nodes */}
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Nodes
                     </h3>

                     <div className="space-y-3">
                        {[
                           {
                              label: 'Component',
                              type: 'componentNode',
                              icon: '▣',
                           },
                           {
                              label: 'Interface Port',
                              type: 'interfacePortNode',
                              icon: '◯',
                           },
                           {
                              label: 'Database',
                              type: 'databaseNode',
                              icon: '🛢',
                           },
                        ].map((node) => (
                           <motion.button
                              key={node.type}
                              draggable
                              onDragStart={(e) => onNodeDragStart(e, node.type)}
                              whileTap={{ scale: 0.97 }}
                              whileHover={{ scale: 1.02 }}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 flex justify-between items-center text-sm font-medium"
                           >
                              <span>{node.label}</span>
                              <span className="text-indigo-600">
                                 {node.icon}
                              </span>
                           </motion.button>
                        ))}
                     </div>
                  </div>

                  {/* Connectors */}
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Connectors
                     </h3>

                     <div className="space-y-3">
                        {componentEdges.map((edge) => (
                           <EdgeButton
                              key={edge.type}
                              edge={edge}
                              selected={selectedEdgeType === edge.type}
                              onClick={() => setSelectedEdgeType(edge.type)}
                           />
                        ))}
                     </div>
                  </div>
               </>
            )}
         </div>
      </aside>
   )
}

/* ---------------- Edge Button ---------------- */

function EdgeButton({ edge, selected, onClick }) {
   return (
      <motion.button
         onClick={onClick}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.97 }}
         className={`w-full px-4 py-3 rounded-xl border text-sm font-medium flex justify-between items-center transition ${
            selected
               ? 'bg-primary-50 border-primary-700 text-purple-700'
               : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300'
         }`}
      >
         <span>{edge.label}</span>
         <span>{edge.icon}</span>
      </motion.button>
   )
}
