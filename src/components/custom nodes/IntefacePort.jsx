import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export function InterfacePortNode({ id, data }) {
  const {
    name = "Interface",
    mode = "provided",
  } = data;

  const symbol = mode === "provided" ? "○" : "◖";

  const update = (patch) => {
    data?.onChange?.(id, { ...data, ...patch });
  };

  return (
    <motion.div
      className="w-64 bg-white border border-gray-300 shadow-md overflow-hidden"
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">

        <span
          className="text-purple-600 text-lg cursor-pointer"
          onClick={() =>
            update({
              mode: mode === "provided" ? "required" : "provided",
            })
          }
        >
          {symbol}
        </span>

        <input
          value={name}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full text-center font-bold text-gray-800 bg-transparent outline-none placeholder-gray-400"
        />
      </div>

      {/* BODY (same structure style as ClassNode) */}
      <div className="px-3 py-3 text-sm text-gray-600">
        Interface Port Node
      </div>

      {/* HANDLES */}
      <Handle
        type={mode === "provided" ? "source" : "target"}
        position={Position.Right}
        className="w-2 h-2 bg-purple-500"
      />
    </motion.div>
  );
}