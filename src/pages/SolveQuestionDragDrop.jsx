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
            nodes: flow.nodes,
            edges: flow.edges,
            viewport: flow.viewport,
         },
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
         <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center gap-2 mb-4">
               <h2 className="font-bold text-lg mb-2">Question</h2>
            </div>
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

         <div className="flex gap-4 w-[96vw] h-[900px]">
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
                  className="w-[150px] mt-6 px-4 py-2 cursor-pointer bg-primary-300 rounded-lg hover:bg-primary-500 disabled:opacity-50"
               >
                  {loading ? 'Evaluating...' : 'Submit Solution'}
               </div>

               {loading && (
                  <div className="text-blue-500 animate-pulse">
                     Generating feedback...
                  </div>
               )}
            </div>

            {feedback?.feedback && (
               <div className="relative flex">
               <ShoworHideComp open={showFeedback} setOpen={setShowFeedback} isLeftSide={false} />
             
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
      </div>
   )
}
