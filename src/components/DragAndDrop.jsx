import { useCallback, useRef, useState, useEffect } from 'react'
import {
   ReactFlow,
   Background,
   Controls,
   addEdge,
   useNodesState,
   useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Sidebar from './SideBar'
import InheritanceEdge from './custom edges/InheritenceEdge'
import CompositionEdge from './custom edges/CompositionEdge'
import AggregationEdge from './custom edges/AggregationEdge'
import UMLClassNode from './custom nodes/ClassNode'
import * as htmlToImage from 'html-to-image'
import { generateUMLTextDescription } from '../utils/UMLDownloadFunctions'
import { useParams } from 'react-router-dom'
import { lessons } from '../data/lessons'

export default function DragAndDrop() {
   const edgeTypes = {
      inheritance: InheritanceEdge,
      composition: CompositionEdge,
      aggregation: AggregationEdge,
   }

   const nodeTypes = {
      umlClass: UMLClassNode,
   }

   const [selectedEdgeType, setSelectedEdgeType] = useState('default')

   const [nodes, setNodes, onNodesChange] = useNodesState([])
   const [edges, setEdges, onEdgesChange] = useEdgesState([])

   const flowRef = useRef(null)

   const onDrop = useCallback(
      (event) => {
         event.preventDefault()
         const type = event.dataTransfer.getData('application/reactflow')

         const position = {
            x: event.clientX - 250,
            y: event.clientY,
         }

         const newNode = {
            id: crypto.randomUUID(),
            type: 'umlClass',
            position,
            data: {
               name: '',
               attributes: [''],
               methods: [''],
               updateNode: (id, changes) =>
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

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.key === 'Delete') {
            // delete selected nodes
            setNodes((nds) => nds.filter((n) => !n.selected))

            // delete selected edges
            setEdges((eds) => eds.filter((e) => !e.selected))
         }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
   }, [setNodes, setEdges])

   const onDragOver = (event) => event.preventDefault()

   const onConnect = useCallback(
      (params) => {
         setEdges((eds) =>
            addEdge(
               {
                  ...params,
                  type: selectedEdgeType,
               },
               eds
            )
         )
      },
      [selectedEdgeType, setEdges]
   )

   const downloadPng = () => {
      if (!flowRef.current) return

      htmlToImage
         .toPng(flowRef.current, {
            filter: () => true,
            cacheBust: true,
            skipFonts: true,
            backgroundColor: '#ffffff',
         })
         .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'diagram.png'
            link.href = dataUrl
            link.click()
         })
         .catch((err) => console.error('Error exporting:', err))
   }

   const { lessonId } = useParams()
   const lesson = lessons.find((l) => l.id === lessonId) || {}
   const [open, setOpen] = useState(true)

   return (
      <div className="flex h-screen w-screen bg-gradient-to-b from-primary-50 to-primary-100">
         <div className="flex flex-col w-56 min-w-56 p-4 flex flex-col gap-6 bg-gradient-to-b from-purple-100 via-pink-100 to-indigo-100 shadow-lg rounded-xl">
            {open ? (
               <div
                  className="cursor-pointer text-[16px] font-bold mb-2"
                  onClick={() => {
                     setOpen(false)
                  }}
               >
                  Hide Question
               </div>
            ) : (
               <div
                  className="cursor-pointer font-bold mb-2   left-1/2"
                  onClick={() => setOpen(true)}
               >
                  Show Question
               </div>
            )}
            <div className='h-[85%]'>
            <Sidebar setSelectedEdgeType={setSelectedEdgeType} />
            </div>
           
            <div className="w-full rounded-full px-[12px] py-[8px] flex items-end justify-center bg-primary-700 text-white font-bold cursor-pointer hover:bg-primary-800"
                  onClick={() => {
                     downloadPng()
                     console.log(generateUMLTextDescription(nodes, edges))
                  }}>
                    Submit
            </div>
         </div>

         {open && (
            <div className="w-1/2 overflow-auto p-[10px]">
               <pre className="text-wrap">{lesson.question}</pre>
            </div>
         )}
            <div
               ref={flowRef}
               className="w-full"
            >
               <ReactFlow
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
               >
                  <Background />
                  <Controls />
               </ReactFlow>

         </div>
      </div>
   )
}
