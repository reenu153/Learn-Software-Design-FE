import { motion } from "framer-motion";

export default function Sidebar({ setSelectedEdgeType }) {
  const onNodeDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      
      {/* Nodes Section */}
      <div>
        <motion.h3
          className="font-extrabold text-2xl text-purple-700 mb-3"

          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Nodes
        </motion.h3>


        <motion.button
            className={`w-full text-left bg-purple-50 p-3 rounded-xl shadow-md mb-3 font-semibold text-purple-700`}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px rgba(255,255,255,0.6)`,
            }}
            draggable
            onDragStart={(e) => onNodeDragStart(e, "classNode")}
            whileTap={{ scale: 0.95 }}
          
          >
            Class Node
          </motion.button>
          <motion.button
            className={`w-full text-left bg-purple-50 p-3 rounded-xl shadow-md mb-3 font-semibold text-purple-700`}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px rgba(255,255,255,0.6)`,
            }}
            draggable
            onDragStart={(e) => onNodeDragStart(e, "interfaceNode")}
            whileTap={{ scale: 0.95 }}
        
          >
            Interface Node
          </motion.button>

  
      </div>

      {/* Edges Section */}
      <div>
        <motion.h3
          className="font-extrabold text-2xl text-purple-700 mb-3"
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        >
          Edges
        </motion.h3>

        {[
          { label: "Inheritance →", type: "inheritance", color: "purple" },
          { label: "Composition ◆", type: "composition", color: "pink" },
          { label: "Aggregation ◇", type: "aggregation", color: "indigo" },
          { label: "Dependency ⬌", type: "dependency", color: "yellow" },
        ].map((edge) => (
          <motion.button
            key={edge.type}
            className={`w-full text-left bg-${edge.color}-50 p-3 rounded-xl shadow-md mb-3 font-semibold text-${edge.color}-700`}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px rgba(255,255,255,0.6)`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedEdgeType(edge.type)}
          >
            {edge.label}
          </motion.button>
        ))}
      </div>
    </aside>
  );
}
