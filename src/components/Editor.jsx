import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { evaluateAnswer, fetchQuestionById, fetchQuestionSubmissions } from '../api'
import MermaidPage from './Mermaid'
import MermaidCheatSheet from './MermaidCheatSheet'

export default function Editor() {
   const { questionId } = useParams()
   const [questions, setQuestions] = useState([])
   const [tab, setTab] = useState('Question')
   const [result, setResult] = useState(null)
   const [code, setCode] = useState()
   const [submissions, setSubmissions] = useState([])
   useEffect(() => {
      fetchQuestionById(questionId).then((data) => {
         setQuestions(data)
      })

      fetchQuestionSubmissions(questionId).then((data) => {
         setSubmissions(data)
      })
   }, [questionId])

   const onSubmit = () => {
      evaluateAnswer(questions.id, JSON.stringify(code)).then((result) => {
         setResult(result)
         setTab('Feedback')
      })
   }

   return (
      <div className="flex h-screen w-screen overflow-auto bg-gradient-to-b from-primary-50 to-primary-100">
         <div className="flex flex-col w-1/3 min-w-56 p-4 flex flex-col gap-6 bg-gradient-to-b from-purple-100 via-pink-100 to-indigo-100 shadow-lg rounded-xl">
            <div className="flex cursor-pointer items-center justify-between">
               <div
                  className="cursor-pointer border-1 text-[16px] font-bold"
                  onClick={() => {
                     setTab('Question')
                  }}
               >
                  {'Question'}
               </div>
             {!!result?.feedback &&  (<div
                  className="cursor-pointer text-[16px] font-bold"
                  onClick={() => {
                     setTab('Feedback')
                  }}
               > 
                  {'Feedback'}
               </div>)}
               <div
                  className="rounded-full px-[12px] py-[8px] flex items-end justify-center bg-primary-700 text-white font-bold cursor-pointer hover:bg-primary-800"
                  onClick={() => {
                     onSubmit()
                  }}
               >
                  Submit
               </div>
            </div>
            <div className="h-[85%]">
               <div className="overflow-auto h-full p-[10px]">
                  <pre className="text-wrap">
                     {tab === 'Question'
                        ? questions?.question_text
                        : result?.feedback}
                  </pre>
               </div>
            </div>
         </div>
            <div className="w-full">
               <div className='flex items-center justify-start gap-2'>
               <MermaidCheatSheet />
               {submissions?.length && (<div
                  className="rounded-full px-[12px] py-[8px] flex items-end justify-center bg-primary-700 text-white font-bold cursor-pointer hover:bg-primary-800"
                  onClick={() => {
                     
                  }}
               >
                  Show Previous Submissions
               </div>)}
               </div>
               
               <MermaidPage code={code} setCode={setCode} />
            </div>
      </div>
   )
}
