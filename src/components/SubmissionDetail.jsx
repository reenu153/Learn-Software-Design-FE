import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

import formatFeedbackToJSX from "../utils/formatFeedback";

export function SubmissionDetail({ submission }) {
  const diagramRef = useRef(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!submission.solution_text) return;

      try {
        const { svg } = await mermaid.render(
          "diagram-" + Date.now(),
          JSON.parse(submission.solution_text)
        );
        diagramRef.current.innerHTML = svg;
       
      } catch {
        diagramRef.current.innerHTML = "";
      }
    };

    renderDiagram();
  }, [submission]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Details</h2>

      <div className="mb-2">
        <strong>Status:</strong>{" "}
        <span
          className={
            submission.passed ? "text-green-600" : "text-red-500"
          }
        >
          {submission.passed ? "Passed" : "Failed"}
        </span>
      </div>

      <div className="mb-2">
        <strong>Grade:</strong> {submission.grade || "N/A"}
      </div>

      <div className="mb-4">
        <strong>Feedback:</strong>
        <p className="mt-1 text-gray-700 whitespace-pre-line">
          {formatFeedbackToJSX(submission?.ai_feedback) || "No feedback available"}
        </p>
      </div>

      <div>
        <strong>Diagram:</strong>
        <div
          ref={diagramRef}
          className="border p-2 mt-2 rounded bg-white"
        />
      </div>
    </div>
  );
}