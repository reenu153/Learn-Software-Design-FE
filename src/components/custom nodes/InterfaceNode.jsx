import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export default function InterfaceNode({ id, data }) {
  const {
    name = "Interface",
    methods = [],
  } = data;

  // ✅ unified update function (parent-controlled)
  const update = (patch) => {
    data?.onChange?.(id, {
      ...data,
      ...patch,
    });
  };

  const updateName = (value) => {
    update({ name: value });
  };

  const updateMethod = (index, value) => {
    const updated = [...methods];
    updated[index] = value;
    update({ methods: updated });
  };

  const addMethod = () => {
    update({ methods: [...methods, ""] });
  };

  return (
    <div className="relative">
      <motion.div
        className="w-60 rounded-2xl border border-blue-300 bg-gradient-to-b from-blue-50 via-white to-cyan-50 shadow-xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        {/* HEADER */}
        <div className="px-3 py-2 border-b border-blue-200 bg-blue-100 text-center">
          <div className="text-xs font-semibold tracking-widest text-blue-600">
            &lt;&lt;interface&gt;&gt;
          </div>

          <input
            value={name}
            onChange={(e) => updateName(e.target.value)}
            placeholder="Interface Name"
            className="w-full mt-1 bg-transparent text-center font-bold text-blue-800 outline-none placeholder-blue-400"
          />
        </div>

        {/* METHODS */}
        <div className="p-3 space-y-2">
          {methods?.map((method, i) => (
            <input
              key={i}
              value={method}
              onChange={(e) =>
                updateMethod(i, e.target.value)
              }
              placeholder="+ method()"
              className="w-full px-3 py-1 rounded-lg bg-white border border-blue-100 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-200"
            />
          ))}

          <button
            onClick={addMethod}
            className="w-full mt-2 text-sm font-medium rounded-lg px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
          >
            + Add Method
          </button>
        </div>
      </motion.div>

      {/* HANDLES */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}