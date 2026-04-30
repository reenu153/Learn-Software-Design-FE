import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export default function ComponentNode({ id, data }) {
  const {
    name = "Component",
    ports = [],
    onChange,
  } = data;

  const updateName = (value) => {
    onChange(id, { name: value });
  };

  const updatePort = (index, value) => {
    const updated = [...ports];
    updated[index] = value;
    onChange(id, { ports: updated });
  };

  const addPort = () => {
    onChange(id, { ports: [...ports, ""] });
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-64 rounded-2xl border border-slate-300 bg-white shadow-xl overflow-hidden"
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

          {ports?.map((port, i) => (
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

      {/* Handles */}
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Top} />

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Bottom} />

      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Left} />

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}