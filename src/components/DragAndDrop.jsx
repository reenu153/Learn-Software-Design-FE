import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import {
   ReactFlow,
   Background,
   Controls,
   addEdge,
   useNodesState,
   useEdgesState,
   reconnectEdge,
   ConnectionMode,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Sidebar from './SideBar'
import ClassNode from './custom nodes/ClassNode'
import { UMLEdge } from './custom edges/UMLEdge'
import Markers from './custom edges/Markers'
import InterfaceNode from './custom nodes/InterfaceNode'
import ComponentNode from './custom nodes/ComponentNode'
import { InterfacePortNode } from './custom nodes/IntefacePort'
import { DatabaseNode } from './custom nodes/Database'
import { ShoworHideComp } from './ShoworHideComp'

export default function DragAndDrop({
   setReactFlowInstance,
   activeTab,
   setActiveTab,
   initialGraph,
}) {

   const nodeTypes = {
      classNode: ClassNode,
      interfaceNode: InterfaceNode,
      componentNode: ComponentNode,
      interfacePortNode: InterfacePortNode,
      databaseNode: DatabaseNode,
   }

   const [selectedEdgeType, setSelectedEdgeType] = useState('default')
   const [selectedEdge, setSelectedEdge] = useState(null);

   const [nodes, setNodes, onNodesChange] = useNodesState([])
   const [edges, setEdges, onEdgesChange] = useEdgesState([])
   const [sidebarOpen, setSidebarOpen] = useState(true)

   const flowRef = useRef(null)

   const edgeTypes = useMemo(() => ({
      uml: (props) => (
        <UMLEdge
          {...props}
          selectedEdge={selectedEdge}
        />
      ),
    }), [selectedEdge]); 

   useEffect(() => {
      if (initialGraph?.nodes) {
         setNodes(
            initialGraph.nodes.map((n) => ({
               ...n,
               data: {
                  ...n.data,
                  onChange: (id, changes) =>
                     setNodes((nds) =>
                        nds.map((node) =>
                           node.id === id
                              ? {
                                   ...node,
                                   data: {
                                      ...changes,
                                      onChange: node.data.onChange,
                                   },
                                }
                              : node
                        )
                     ),
               },
            }))
         )
         setEdges(initialGraph.edges ?? [])
      }
   }, [initialGraph])

   const onDrop = useCallback(
      (event) => {
         event.preventDefault()

         const type =
            event.dataTransfer.getData('application/reactflow') || 'classNode'

         const position = {
            x: event.clientX - 250,
            y: event.clientY,
         }

         const schema = nodeSchema[type] || nodeSchema.classNode

         const newNode = {
            id: crypto.randomUUID(),
            type: nodeTypes[type] ? type : 'classNode',
            position,

            data: {
               ...structuredClone(schema),

               onChange: (id, changes) =>
                  setNodes((nds) =>
                     nds.map((n) =>
                        n.id === id
                           ? { ...n, data: { ...n.data, ...changes } }
                           : n
                     )
                  ),
            },
         }

         setNodes((nds) => [...nds, newNode])
      },
      [setNodes]
   )

   const onDragOver = (event) => event.preventDefault()

   const onReconnect = useCallback(
      (oldEdge, newConnection) =>
         setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds)),
      []
   )

   const onConnect = useCallback(
      (connection) => {
         let source, target, sourceHandle, targetHandle

         source = connection.target
         target = connection.source
         sourceHandle = connection.targetHandle?.replace('target', 'source')
         targetHandle = connection.sourceHandle?.replace('source', 'target')

         setEdges((eds) =>
            addEdge(
               {
                  source,
                  target,
                  sourceHandle,
                  targetHandle,
                  type: 'uml',
                  style: { stroke: '#000000', strokeWidth: 2 },

                  data: {
                     umlType: selectedEdgeType,
                     animated: true,
                  },
               },
               eds
            )
         )
      },
      [selectedEdgeType, setEdges]
   )

   return (
      <div className="flex border rounded-lg h-[860px]">
         <div className="relative">
            <Sidebar
               sidebarOpen={sidebarOpen}
               selectedEdgeType={selectedEdgeType}
               setSelectedEdgeType={setSelectedEdgeType}
               activeTab={activeTab}
               setActiveTab={setActiveTab}
            />
           <ShoworHideComp open={sidebarOpen} setOpen={setSidebarOpen} /> 
         </div>
         <div ref={flowRef} className="w-full">
            <ReactFlow
               onInit={setReactFlowInstance}
               nodes={nodes}
               edges={edges}
               nodeTypes={nodeTypes}
               edgeTypes={edgeTypes}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onConnect={onConnect}
               onDrop={onDrop}
               onDragOver={onDragOver}
               fitView
               elementsSelectable
               connectionMode={ConnectionMode.Loose}
               onEdgeClick={(_, edge) => setSelectedEdge(edge.id)}
               edgesFocusable
               defaultEdgeOptions={{
                  animated: true,
                  type: 'smoothstep',
               }}
               deleteKeyCode={['Backspace', 'Delete']}
            >
               <Background />
               <Controls />
               <Markers />
            </ReactFlow>
         </div>
      </div>
   )
}

const nodeSchema = {
   classNode: {
      name: '',
      attributes: [],
      methods: [],
   },

   interfaceNode: {
      name: '',
      mode: 'provided',
   },

   databaseNode: {
      name: '',
   },

   componentNode: {
      name: '',
      ports: [],
   },
}
