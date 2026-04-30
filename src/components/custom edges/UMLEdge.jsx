import React from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

const UML_MARKERS = {
    inheritance: "url(#uml-inheritance)",
    realization: "url(#uml-realization)",
    dependency: "url(#uml-dependency)",
    association: "url(#uml-association)",
    aggregation: "url(#uml-aggregation)",
    composition: "url(#uml-composition)",
    component: "url(#uml-component)",
    provided: "url(#uml-provided)",
    required: "url(#uml-required)",
    delegation: "url(#uml-delegation)",
    socket: "url(#uml-socket)",
};

export function UMLEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
  } = props;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const type = data?.umlType;
  const flowEnabled = data?.flow === true;

  const edgeStyleByType = {
    inheritance: {
        strokeDasharray: "0",
      },
    
      realization: {
        strokeDasharray: "6 4",
      },
    
      dependency: {
        strokeDasharray: "4 4",
      },
    
      association: {
        strokeDasharray: "0",
      },
    
      aggregation: {
        strokeDasharray: "10 5",
      },
    
      composition: {
        strokeDasharray: "0",
      },
    
      component: {
        strokeDasharray: "2 3",
      },
    
      provided: {
        strokeDasharray: "0",
      },

      required: {
        strokeDasharray: "3 3",
      },
    
      delegation: {
  
        strokeDasharray: "6 2",
      },

      socket: {
        strokeDasharray: "1 4",
      },
  };

  return (
    <>
      {/* STATIC UML LINE */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "#111",
          strokeWidth: 2,
          animation: "none",
          strokeDasharray: "none",
          ...edgeStyleByType[type] || {},
        }}
        markerEnd={UML_MARKERS[type]}
      />

      {/* OPTIONAL FLOW DOT */}
      {flowEnabled && (
        <circle r="4" fill="red">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={edgePath}
          />
        </circle>
      )}
    </>
  );
}