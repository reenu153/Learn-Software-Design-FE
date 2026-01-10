import React from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

export default function InheritanceEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <defs>
        <marker
          id="uml-inheritance"
          viewBox="0 0 20 20"
          markerWidth={20}
          markerHeight={20}
          refX={20}
          refY={10}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0,0 20,10 0,20" fill="white" stroke="black" />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#uml-inheritance)"
      />
    </>
  );
}
