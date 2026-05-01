// import React from "react";
// import { Handle, Position } from "@xyflow/react";
// import { motion } from "framer-motion";

// export default function ComponentNode({ id, data }) {
//   const {
//     name = "Component",
//     ports = [],
//     onChange,
//   } = data;

//   const updateName = (value) => {
//     onChange(id, { name: value });
//   };

//   const updatePort = (index, value) => {
//     const updated = [...ports];
//     updated[index] = value;
//     onChange(id, { ports: updated });
//   };

//   const addPort = () => {
//     onChange(id, { ports: [...ports, ""] });
//   };

//   return (
//     <div className="relative w-64">
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         className="rounded-2xl border border-slate-300 bg-white shadow-xl overflow-hidden"
//       >
//         {/* HEADER */}
//         <div className="relative border-b bg-slate-100 px-4 py-3">
//           <div className="absolute right-3 top-3 flex flex-col gap-1">
//             <div className="w-5 h-2 bg-slate-500 rounded-sm" />
//             <div className="w-5 h-2 bg-slate-500 rounded-sm" />
//           </div>

//           <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//             Component
//           </div>

//           <input
//             value={name}
//             onChange={(e) => updateName(e.target.value)}
//             placeholder="Component Name"
//             className="w-full bg-transparent mt-1 text-lg font-bold text-slate-800 outline-none placeholder-slate-400"
//           />
//         </div>

//         {/* PORTS LIST */}
//         <div className="p-3 space-y-2">
//           <div className="text-xs font-semibold text-slate-500 uppercase">
//             Ports
//           </div>

//           {ports?.map((port, i) => (
//             <input
//               key={i}
//               value={port}
//               onChange={(e) => updatePort(i, e.target.value)}
//               placeholder="portName"
//               className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
//             />
//           ))}

//           <button
//             onClick={addPort}
//             className="w-full rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium py-2 transition"
//           >
//             + Add Port
//           </button>
//         </div>
//       </motion.div>

//       {/* Standard Handles */}
//       <Handle type="source" position={Position.Top} />
//       <Handle type="target" position={Position.Top} />

//       <Handle type="source" position={Position.Bottom} />
//       <Handle type="target" position={Position.Bottom} />

//       <Handle type="source" position={Position.Left} />
//       <Handle type="target" position={Position.Left} />

//       {/* OUTSIDE LOLLIPOPS */}
//       {ports.map((port, i) => (
//         <div
//           key={i}
//           className="absolute flex items-center"
//           style={{
//             top: `${92 + i * 34}px`,
//             right: "-58px",
//           }}
//         >
//           {/* stem from box */}
//           <div className="w-6 h-[2px] bg-slate-500" />

//           {/* lollipop */}
//           <div className="w-4 h-4 rounded-full border-2 border-slate-500 bg-white" />

//           {/* label */}
//           <span className="ml-2 text-xs text-slate-600 whitespace-nowrap">
//             {port || "Interface"}
//           </span>

//           {/* connect handle */}
//           <Handle
//             type="source"
//             id={`port-${i}`}
//             position={Position.Right}
//             style={{
//               right: -8,
//               top: 8,
//               width: 10,
//               height: 10,
//               background: "transparent",
//               border: "none",
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

const HANDLE_OFFSET = 130; // closer to box now

function LollipopHandle({ id, type, position, label, slotIndex }) {
  const isProvided = type === "source";
  const r = 6;
  const stick = 18;

  const isTop = position === Position.Top;
  const isBottom = position === Position.Bottom;
  const isLeft = position === Position.Left;
  const isRight = position === Position.Right;
  const isHorizontal = isLeft || isRight;

  const spacing = 42;
  const slotShift = slotIndex * spacing;

  const wrapperStyle = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: 6,

    ...(isTop && {
      top: 40,
      left: HANDLE_OFFSET + 34 + slotShift,
      flexDirection: "column",
    }),

    ...(isBottom && {
      bottom: 40,
      left: HANDLE_OFFSET + 34 + slotShift,
      flexDirection: "column-reverse",
    }),

    ...(isLeft && {
      left: 4,
      top: HANDLE_OFFSET + 28 + slotShift,
      flexDirection: "row",
    }),

    ...(isRight && {
      right: 4,
      top: HANDLE_OFFSET + 28 + slotShift,
      flexDirection: "row-reverse",
    }),
  };

  const symW = isHorizontal ? stick + r * 2 + 2 : 16;
  const symH = isHorizontal ? 16 : stick + r * 2 + 2;

  let x1, y1, x2, y2, cx, cy, arcD;

  if (isRight) {
    x1 = 0; y1 = 8; x2 = stick; y2 = 8;
    cx = stick + r; cy = 8;
    arcD = `M${cx},${8-r} A${r},${r} 0 0,1 ${cx},${8+r}`;
  }

  if (isLeft) {
    x1 = symW; y1 = 8; x2 = r; y2 = 8;
    cx = r; cy = 8;
    arcD = `M${r},${8-r} A${r},${r} 0 0,0 ${r},${8+r}`;
  }

  if (isTop) {
    x1 = 8; y1 = symH; x2 = 8; y2 = r;
    cx = 8; cy = r;
    arcD = `M${8-r},${r} A${r},${r} 0 0,1 ${8+r},${r}`;
  }

  if (isBottom) {
    x1 = 8; y1 = 0; x2 = 8; y2 = stick;
    cx = 8; cy = stick + r;
    arcD = `M${8-r},${stick+r} A${r},${r} 0 0,0 ${8+r},${stick+r}`;
  }

  const labelStyle = {
    fontSize: 10,
    color: "#64748b",
    whiteSpace: "nowrap",
    width: 70,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "monospace",
    textAlign: "center",
  };

  return (
    <div style={wrapperStyle}>
      <span style={labelStyle}>{label || `port${slotIndex}`}</span>

      <Handle
        type={type}
        position={position}
        id={id}
        style={{
          position: "relative",
          transform: "none",
          inset: "auto",
          width: 8,
          height: 8,
          background: "transparent",
          border: "none",
        }}
      />

      <svg width={symW} height={symH} style={{ display: "block" }}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#94a3b8"
          strokeWidth={1.5}
        />

        {isProvided ? (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#6366f1"
            strokeWidth={1.5}
          />
        ) : (
          <path
            d={arcD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={1.5}
          />
        )}
      </svg>
    </div>
  );
}

const EDGES = [
  Position.Right,
  Position.Bottom,
  Position.Left,
  Position.Top,
];

export default function ComponentNode({ id, data }) {
  const { name = "Component", ports = [], onChange } = data;

  const updateName = (v) => onChange(id, { name: v });

  const updatePort = (i, v) => {
    const updated = [...ports];
    updated[i] = v;
    onChange(id, { ports: updated });
  };

  const addPort = () => onChange(id, { ports: [...ports, ""] });

  return (
    <div
      style={{
        padding: HANDLE_OFFSET,
        position: "relative",
        display: "inline-block",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-64 border border-slate-300 bg-white shadow-xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="relative border-b bg-slate-100 px-4 py-3">
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <div className="w-5 h-2 bg-slate-500 rounded-sm" />
            <div className="w-5 h-2 bg-slate-500 rounded-sm" />
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Component
          </div>

          <input
            value={name}
            onChange={(e) => updateName(e.target.value)}
            placeholder="Component Name"
            className="w-full bg-transparent mt-1 text-lg font-bold text-slate-800 outline-none placeholder-slate-400"
          />
        </div>

        {/* PORTS */}
        <div className="p-3 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">
            Ports
          </div>

          {ports.map((port, i) => (
            <input
              key={i}
              value={port}
              onChange={(e) => updatePort(i, e.target.value)}
              placeholder="portName"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
          ))}

          <button
            onClick={addPort}
            className="w-full rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium py-2 transition"
          >
            + Add Port
          </button>
        </div>
      </motion.div>

      {ports.map((port, i) => (
        <LollipopHandle
          key={i}
          id={`port-${i}`}
          type={i % 2 === 0 ? "source" : "target"}
          position={EDGES[i % EDGES.length]}
          label={port}
          slotIndex={Math.floor(i / EDGES.length)}
        />
      ))}
    </div>
  );
}