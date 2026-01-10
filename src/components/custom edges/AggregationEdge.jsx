import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

export default function AggregationEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

  // React Flow gives you correct src/tgt coordinates
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
          id="uml-aggregation"
          viewBox="0 0 20 20"
          markerWidth={20}
          markerHeight={20}
          refX={20}       // ensures marker appears at end (target)
          refY={10}
          orient="auto"   // 🔥 auto rotates to match path direction
          markerUnits="strokeWidth"
        >
          <polygon
            points="0,10 10,0 20,10 10,20"
            fill="white"
            stroke="black"
          />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="black"
        strokeWidth="2"
       markerEnd="url(#uml-aggregation)"
      />
    </>
  );
}