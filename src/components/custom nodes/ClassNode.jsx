import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

export default function ClassNode({ id, data }) {
  const {
    name = "",
    attributes = [],
    methods = [],
  } = data;

  // ✅ unified update function (parent-controlled)
  const update = (patch) => {
    data?.onChange?.(id, {
      ...data,
      ...patch,
    });
  };

  const updateName = (value) =>
    update({ name: value });

  const updateAttribute = (i, value) => {
    const copy = [...attributes];
    copy[i] = value;
    update({ attributes: copy });
  };

  const updateMethod = (i, value) => {
    const copy = [...methods];
    copy[i] = value;
    update({ methods: copy });
  };

  return (
    <div>
      <motion.div
        className="w-64 bg-white border border-gray-300 shadow-md overflow-hidden"
        whileHover={{
          scale: 1.01,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* CLASS NAME */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border-b border-gray-300 px-3 py-2">
          <input
            placeholder="Class Name"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            className="w-full text-center font-bold text-gray-800 bg-transparent outline-none placeholder-gray-400"
          />
        </div>

        {/* ATTRIBUTES */}
        <div className="px-3 py-2 border-b border-gray-200">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            Attributes
          </p>

          <div className="space-y-2">
            {attributes?.map((attr, i) => (
              <input
                key={i}
                value={attr}
                placeholder="+ attribute: type"
                onChange={(e) =>
                  updateAttribute(i, e.target.value)
                }
                className="w-full px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 text-gray-700"
              />
            ))}
          </div>

          <button
            onClick={() =>
              update({
                attributes: [...attributes, ""],
              })
            }
            className="mt-3 w-full text-sm py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition font-medium"
          >
            + Add Attribute
          </button>
        </div>

        {/* METHODS */}
        <div className="px-3 py-2">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            Methods
          </p>

          <div className="space-y-2">
            {methods?.map((method, i) => (
              <input
                key={i}
                value={method}
                placeholder="+ method(): type"
                onChange={(e) =>
                  updateMethod(i, e.target.value)
                }
                className="w-full px-2 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-indigo-400 text-gray-700"
              />
            ))}
          </div>

          <button
            onClick={() =>
              update({
                methods: [...methods, ""],
              })
            }
            className="mt-3 w-full text-sm py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition font-medium"
          >
            + Add Method
          </button>
        </div>
      </motion.div>

      <Handle type="source" id="top-source" position={Position.Top} />
      <Handle type="target" id="top-target" position={Position.Top} />

      <Handle type="source" id="bottom-source" position={Position.Bottom} />
      <Handle type="target" id="bottom-target" position={Position.Bottom} />

      <Handle type="source" id="left-source" position={Position.Left} />
      <Handle type="target" id="left-target" position={Position.Left} />

      <Handle type="source" id="right-source" position={Position.Right} />
      <Handle type="target" id="right-target" position={Position.Right} />

    </div>
  );
}