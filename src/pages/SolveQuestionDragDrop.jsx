import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useParams } from 'react-router-dom'
import { evaluateAnswer2, fetchQuestionById } from '../api'
import formatFeedback from '../utils/formatter'
import DragAndDrop from '../components/DragAndDrop'

export default function SolveQuestionDragDrop() {
   const [reactFlowInstance, setReactFlowInstance] = useState(null)
   const [loading, setLoading] = useState(false)
   const [feedback, setFeedback] = useState({})
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
         evaluateAnswer2(questionId, payload).then((result) => {
            setFeedback(result)
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
            {question?.task_description && <p style={{ whiteSpace: 'pre-wrap' }}>{question?.task_description?.replace(
                  /\\n/g,
                  '\n')}</p>}
         </div>

         <div className="flex gap-4">
            <DragAndDrop
               initialGraph={question?.diagram_to_fill||{}}
               setReactFlowInstance={setReactFlowInstance}
               activeTab={activeTab}
               setActiveTab={setActiveTab}
            />
         </div>

         <div
            onClick={handleSubmit}
            disabled={loading}
            className="w-fit px-4 py-2 cursor-pointer bg-primary-300 rounded-lg hover:bg-blue-700 disabled:opacity-50"
         >
            {loading ? 'Evaluating...' : 'Submit'}
         </div>

         {loading && (
            <div className="text-blue-500 animate-pulse">
               Generating feedback...
            </div>
         )}

         {feedback?.feedback && (
            <div className="p-4 border rounded-lg bg-gray-50">
               <div className="mb-2">
                  <strong>Status:</strong>{' '}
                  <span
                     className={
                        feedback.passed ? 'text-green-600' : 'text-red-500'
                     }
                  >
                     {feedback.passed ? 'Passed' : 'Failed'}
                  </span>
               </div>

               {feedback?.grade && (
                  <div className="mb-2">
                     <strong>Grade:</strong> {feedback.grade}
                  </div>
               )}

               <div>
                  <strong>Feedback:</strong>
                  <p className="mt-1 whitespace-pre-line">
                     {formatFeedback(feedback.feedback)}
                  </p>
               </div>
            </div>
         )}
      </div>
   )
}
