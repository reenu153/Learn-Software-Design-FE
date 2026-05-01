import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export function DatabaseNode({ id, data }) {
  const { name = "Database" } = data;

  const update = (value) => {
    data?.onChange?.(id, {
      ...data,
      name: value,
    });
  };

  return (
    <motion.div
      className="w-64 bg-white border border-gray-300 shadow-md overflow-hidden"
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER (same gradient style as ClassNode) */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border-b border-gray-300 px-3 py-2 text-center font-bold text-gray-800">
        Database
      </div>

      {/* BODY INPUT (same feel as attributes/methods) */}
      <div className="px-3 py-3">
        <input
          value={name}
          onChange={(e) => update(e.target.value)}
          className="w-full text-center font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-indigo-400"
        />
      </div>

      {/* FOOTER STRIP (matches structured node feel) */}
      <div className="h-1 bg-indigo-200" />

      {/* HANDLES */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-indigo-600"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-indigo-600"
      />
    </motion.div>
  );
}