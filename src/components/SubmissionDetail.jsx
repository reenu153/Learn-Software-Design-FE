import React, { useEffect, useRef, useMemo } from "react";
import mermaid from "mermaid";
import {
  ReactFlow,
  Background,
  Controls,
  ConnectionMode
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ClassNode from './custom nodes/ClassNode'
import { UMLEdge } from './custom edges/UMLEdge'
import InterfaceNode from './custom nodes/InterfaceNode'
import ComponentNode from './custom nodes/ComponentNode'
import { InterfacePortNode } from './custom nodes/IntefacePort'
import { DatabaseNode } from './custom nodes/Database'
import Markers from "./custom edges/Markers";

import formatFeedback from "../utils/formatter";

export function SubmissionDetail({ submission }) {
  const edgeTypes = {
    uml: UMLEdge,
 }

 const nodeTypes = {
    classNode: ClassNode,
    interfaceNode: InterfaceNode,
    componentNode: ComponentNode,
    interfacePortNode: InterfacePortNode,
    databaseNode: DatabaseNode,
 }

  const diagramRef = useRef(null);

  const isReactFlow = submission?.solution_type === "reactflow";
  
  const reactFlowData = useMemo(() => {
    if (submission?.solution_json)
      return submission.solution_json;

  return null

  }, [submission, isReactFlow]);

  useEffect(() => {
    const renderMermaid = async () => {
      if (
        !submission?.solution_text 
      )
        return;
      try {

        const { svg } = await mermaid.render(
                    "diagram-" + Date.now(),
                    submission.solution_text
                  );
                  diagramRef.current.innerHTML = svg;
      } catch {
        diagramRef.current.innerHTML = "";
      }
    };
    if(!isReactFlow)
    renderMermaid();
  }, [submission, isReactFlow]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="mb-2">
            <strong>Status:</strong>{" "}
            <span
              className={
                submission?.passed
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              {submission?.passed ? "Passed" : "Failed"}
            </span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

         <div className="border rounded bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-md mb-3">
            Diagram
          </h3>

          {isReactFlow ? (
            reactFlowData ? (
              <div className="h-[500px] w-full border rounded overflow-hidden">
                <ReactFlow
                  nodes={reactFlowData.nodes || []}
                  edges={reactFlowData.edges || []}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  connectionMode={ConnectionMode.Loose}                  
                  fitView
                >
                  <Controls />
                  <Background />
                  <Markers />
                </ReactFlow>
              </div>
            ) : (
              <p className="text-gray-500">
                Invalid React Flow data.
              </p>
            )
          ) : (
            <div
              ref={diagramRef}
              className="border rounded p-2 bg-white min-h-[300px] overflow-auto"
            />
          )}
        </div>

        <div className="border rounded bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-md mb-3">
            Feedback
          </h3>

          <div className="text-gray-700 whitespace-pre-line">
            {formatFeedback(
              submission?.ai_feedback
            ) || "No feedback available"}
          </div>
        </div>

       
      </div>
    </div>
  );
}