import { useParams, useNavigate } from 'react-router-dom'
import { fetchModuleById, fetchQuestions } from '../api'
import { useEffect, useState } from 'react'

const QuestionsByModulePage = () => {
   const { moduleId } = useParams()
   const navigate = useNavigate()
   const [module, setModule] = useState({})
   const [questions, setQuestions] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
      fetchModuleById(moduleId).then((data) => {
         setModule(data[0])
      })
      fetchQuestions(moduleId).then((data) => {
         setQuestions(data)
      })
      setLoading(false);
   }, [moduleId])

   return (
     loading? <div className='h-full flex items-center justify-center'> Loading..</div> : ( <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-300 to-primary-500 p-6">
         <h1 className="text-2xl font-bold text-primary-700">{module.title}</h1>
         <h2 className="text-l text-text-muted mt-2 mb-6">
            {module.description}
         </h2>

         {questions?.map((question) => (
            <div className="bg-white rounded-lg shadow p-6 cursor-pointer" key={question.id}  onClick={() => navigate(`/module/${question.id}/editor`)}>    
                  <pre className="text-gray-800 mt-4 text-wrap">
                     {question.question_text}
                  </pre>
                  {(question?.task_description || question?.starter_diagram ) && <div> ... View More </div>}
                  <div className="mt-6 flex gap-3">
                     <button
                        onClick={() => navigate(`/module/${question.id}/editor`)}
                        className="px-4 py-2 border-black border-[1px] rounded-[5px]"
                     >
                        Start Challenge
                     </button>
                     <button
                        onClick={(e) =>{ navigate(`/${question.id}/submissions`); e.stopPropagation()}}
                        className="px-4 py-2 border rounded"
                     >
                        Previous Submissions
                     </button>
                  </div>
            </div>
         ))}
      </div>)
   )
}

export default QuestionsByModulePage
