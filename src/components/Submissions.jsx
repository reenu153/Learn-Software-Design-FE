import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionSubmissions } from "../api";
import { SubmissionDetail } from "./SubmissionDetail";

export default function Submissions() {
  const [selected, setSelected] = useState(null);
  const { questionId } = useParams()
  const [submissions, setSubmissions] = useState([])
  useEffect(() => {
     fetchQuestionSubmissions(questionId).then((data) => {
        setSubmissions(data)
     })
  }, [questionId])

  return (
    <div className="p-4 flex gap-4">

     { submissions?.length?
     <>
      <div className="w-1/4 border-r pr-4">
        <h2 className="text-lg font-bold mb-4">Submissions</h2>

        { submissions?.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="p-3 mb-2 border rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <div className="flex justify-between">
              <span>
                {new Date(item.created_at).toLocaleTimeString()}
              </span>

              <span
                className={`text-sm font-semibold ${
                  item.passed ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.passed ? "Passed" : "Failed"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-3/4 pl-4">
        {selected ? (
          <SubmissionDetail submission={selected} />
        ) : (
          <div className="text-gray-400">
            Select a submission to view details
          </div>
        )}
      </div>
      </>: <div className="text-gray-400 text-center w-full"> No submissions found for this question.</div>}
    </div>
  );
}

