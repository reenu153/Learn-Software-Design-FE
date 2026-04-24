import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useParams } from 'react-router-dom'
import { evaluateAnswer, fetchQuestionById, fetchQuestionSubmissions } from '../api'
import MermaidCheatSheet from "../components/MermaidCheatSheet";
import formatFeedbackToJSX from "../utils/formatFeedback";


export default function SolveQuestion() {
  const [code, setCode] = useState(`classDiagram
class A {
}`);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
  });
  const [question, setQuestion] = useState([])
  const diagramRef = useRef(null);
  const questionRef = useRef(null);
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
  if(question?.starter_diagram){
    const {svg} = await mermaid.render(  "diagram-" + Date.now(),
    question.starter_diagram.replace(/\\n/g, "\n").trim());
    questionRef.current.innerHTML = svg;
  }
}
renderQuestionDiagram()
 }, [question])

  useEffect(() => {
    const renderDiagram = async () => {
      if (!code) return;

      try {
        const { svg } = await mermaid.render(
          "diagram-" + Date.now(),
          code
        );

        diagramRef.current.innerHTML = svg;
      } catch {
        diagramRef.current.innerHTML = "";
      }
    };

    renderDiagram();
  }, [code]);


  const handleSubmit = async () => {
    setLoading(true);
    setFeedback(null);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      evaluateAnswer(questionId, JSON.stringify(code)).then((result) => {
        setFeedback(result)
        setLoading(false);
     })
     

    } catch (e) {
      console.error(e);
      setLoading(false);
    }

    
  };

  return (
    <div className="p-6 flex flex-col gap-4">

      
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center gap-2 mb-4">
        <h2 className="font-bold text-lg mb-2">Question</h2>
        <MermaidCheatSheet />
        </div>
        <p>
          {question?.question_text || "Loading question..."}
        </p>
        <div className="w-full flex items-center justify-center" ref={questionRef}/>
        {question?.task_description && (<p>{question?.task_description}</p>)}
      </div>

      <div className="flex gap-4 h-[400px]">


        <textarea
          className="w-1/3 p-3 border rounded-lg font-mono text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

 
        <div
          ref={diagramRef}
          className="w-2/3 border rounded-lg p-2 bg-white overflow-auto"
        />
      </div>


      <div
        onClick={handleSubmit}
        disabled={loading}
        className="w-fit px-4 py-2 cursor-pointer bg-primary-300 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Evaluating..." : "Submit"}
      </div>

      {loading && (
        <div className="text-blue-500 animate-pulse">
          Generating feedback...
        </div>
      )}


      {feedback?.feedback && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="mb-2">
            <strong>Status:</strong>{" "}
            <span
              className={
                feedback.passed ? "text-green-600" : "text-red-500"
              }
            >
              {feedback.passed ? "Passed" : "Failed"}
            </span>
          </div>

        {feedback?.grade &&  <div className="mb-2">
            <strong>Grade:</strong> {feedback.grade}
          </div>}

          <div>
            <strong>Feedback:</strong>
            <p className="mt-1 whitespace-pre-line">{formatFeedbackToJSX(feedback.feedback)}</p>
          </div>
        </div>
      )}
    </div>
  );
}