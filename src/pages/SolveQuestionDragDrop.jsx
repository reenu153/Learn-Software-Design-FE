import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useParams } from 'react-router-dom'
import { evaluateAnswer, fetchQuestionById } from '../api'
import DragAndDrop from '../components/DragAndDrop'
import { FeedbackContent } from '../components/Feedback'
import { ShoworHideComp } from '../components/ShoworHideComp'

export default function SolveQuestionDragDrop() {
   const [reactFlowInstance, setReactFlowInstance] = useState(null)
   const [loading, setLoading] = useState(false)
   const [feedback, setFeedback] = useState({})
   const [showFeedback, setShowFeedback] = useState(true)
   const [activeTab, setActiveTab] = useState('class')
   const [question, setQuestion] = useState([])
   const questionRef = useRef(null)
   const { questionId } = useParams()
   const [showTutorial, setShowTutorial] = useState(false)

   useEffect(() => {
      fetchQuestionById(questionId).then((data) => {
         setQuestion(data)
      })
   }, [questionId])

   useEffect(() => {
      mermaid.initialize({
         startOnLoad: false,
         securityLevel: 'loose',
      })
   }, [])

   useEffect(() => {
      const renderQuestionDiagram = async () => {
         if (question?.starter_diagram) {
            const { svg } = await mermaid.render(
               'diagram-' + Date.now(),
               question.starter_diagram.replace(/\\n/g, '\n').trim()
            )
            questionRef.current.innerHTML = svg
         }
      }
      renderQuestionDiagram()
   }, [question])

   const handleSubmit = async () => {
      setLoading(true)
      setFeedback(null)
      const flow = reactFlowInstance.toObject()

      const payload = {
         solution_type: 'reactflow',
         graph: {
            "nodes": [
              {
                "id": "8f071ef2-53a8-4b44-99c1-9cf5a2cd08f3",
                "type": "classNode",
                "position": {
                  "x": 169.19384464463354,
                  "y": 659.4631753619983
                },
                "data": {
                  "name": "PaymentProcessor",
                  "attributes": [],
                  "methods": [
                    "+processPayment(mode:mode,amount)"
                  ]
                },
                "measured": {
                  "width": 256,
                  "height": 255
                },
                "selected": true,
                "dragging": false
              },
              {
                "id": "e4244743-04d2-40b5-bbd5-428dd6809deb",
                "type": "interfaceNode",
                "position": {
                  "x": 175.99999999999994,
                  "y": 1024
                },
                "data": {
                  "name": "Mode",
                  "mode": "provided",
                  "methods": [
                    "+pay(amt:double)"
                  ]
                },
                "measured": {
                  "width": 240,
                  "height": 163
                },
                "selected": false,
                "dragging": false
              },
              {
                "id": "8f969275-0154-4b2a-bbd6-b717a3fc9d35",
                "type": "classNode",
                "position": {
                  "x": 167.0995430223066,
                  "y": 1300.0110603358119
                },
                "data": {
                  "name": "Creditt Card",
                  "attributes": [
                    "+amt:double"
                  ],
                  "methods": [
                    "+pay(amt:double"
                  ]
                },
                "measured": {
                  "width": 256,
                  "height": 285
                },
                "selected": false,
                "dragging": false
              }
            ],
            "edges": [
              {
                "source": "8f071ef2-53a8-4b44-99c1-9cf5a2cd08f3",
                "target": "e4244743-04d2-40b5-bbd5-428dd6809deb",
                "sourceHandle": "bottom-source",
                "targetHandle": "top-target",
                "type": "uml",
                "style": {
                  "stroke": "#000000",
                  "strokeWidth": 2
                },
                "data": {
                  "umlType": "dependency",
                  "animated": true
                },
                "id": "xy-edge__8f071ef2-53a8-4b44-99c1-9cf5a2cd08f3bottom-source-e4244743-04d2-40b5-bbd5-428dd6809debtop-target"
              },
              {
                "source": "8f969275-0154-4b2a-bbd6-b717a3fc9d35",
                "target": "e4244743-04d2-40b5-bbd5-428dd6809deb",
                "sourceHandle": "top-source",
                "targetHandle": "bottom-target",
                "type": "uml",
                "style": {
                  "stroke": "#000000",
                  "strokeWidth": 2
                },
                "data": {
                  "umlType": "inheritance",
                  "animated": true
                },
                "id": "xy-edge__8f969275-0154-4b2a-bbd6-b717a3fc9d35top-source-e4244743-04d2-40b5-bbd5-428dd6809debbottom-target"
              }
            ],
            "viewport": {
              "x": 131.55363103577702,
              "y": -213.84814720543318,
              "zoom": 0.5027804603656402
            }
          }
         // graph: {
         //    nodes: flow.nodes,
         //    edges: flow.edges,
         //    viewport: flow.viewport,
         // },
      }

      try {
         await new Promise((res) => setTimeout(res, 1500))
         evaluateAnswer(questionId, payload).then((result) => {
            setFeedback(result)
            setShowFeedback(true)
            setLoading(false)
         })
      } catch (e) {
         console.error(e)
         setLoading(false)
      }
   }

   return (
      <div className="p-6 flex flex-col gap-4">
         <div className="bg-gray-100 pb-4 rounded-lg">
               <h2 className="font-bold text-lg mb-2">Question</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>
               {(question?.question_text || 'Loading question...')?.replace(
                  /\\n/g,
                  '\n'
               )}
            </p>
            <div
               className="w-full flex items-center justify-center"
               ref={questionRef}
            />
            {question?.task_description && (
               <p style={{ whiteSpace: 'pre-wrap' }}>
                  {question?.task_description?.replace(/\\n/g, '\n')}
               </p>
            )}
         </div>
         <button
                  onClick={() => setShowTutorial(true)}
                  className="flex w-[220px] items-center gap-1.5 px-3 py-1.5 mb-2 text-xs font-semibold rounded-lg border border-gray-200 hover:border-indigo-200 transition"
               >
                  ▶ See tutorial on editor usage
               </button>
         <div className="flex gap-4 w-[96vw] h-[900px] mb-5">
            <div className="w-full">
               <DragAndDrop
                  key={question?.id}
                  initialGraph={question?.diagram_to_fill || null}
                  setReactFlowInstance={setReactFlowInstance}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
               />
               <div
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-fit my-6 px-4 py-2 cursor-pointer rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 disabled:opacity-50"
               >
                  {loading
                     ? 'Evaluating and generating feedback..'
                     : 'Submit Solution'}
               </div>
            </div>

            {feedback?.feedback && (
               <div className="relative flex">
                  <ShoworHideComp
                     open={showFeedback}
                     setOpen={setShowFeedback}
                     isLeftSide={false}
                  />

                  <div
                     className="overflow-hidden "
                     style={{ width: showFeedback ? '100%' : '0px' }}
                  >
                     <div className="w-[100%] min-w-full h-full overflow-auto">
                        <FeedbackContent feedback={feedback} />
                     </div>
                  </div>
               </div>
            )}
         </div>
         {showTutorial && (
            <div
               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
               onClick={() => setShowTutorial(false)}
            >
               <div
                  className="bg-white rounded-xl p-6 w-[90%] max-w-3xl relative shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     onClick={() => setShowTutorial(false)}
                     className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
                  >
                     ✕
                  </button>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                     Editor Demo
                  </h2>
                  <video className="w-full rounded-lg" controls autoPlay>
                     <source src="/tool tutorial.mp4" type="video/mp4" />
                  </video>
               </div>
            </div>
         )}
      </div>
   )
}
