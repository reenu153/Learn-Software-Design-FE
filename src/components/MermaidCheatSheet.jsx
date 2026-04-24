import React, { useState } from 'react'

export default function MermaidCheatSheet() {
   const [open, setOpen] = useState(false)

   return (
      <div>
         {/* Button to open modal */}
         <h2 onClick={()=> setOpen(true)} className="w-fit px-4 py-2 cursor-pointer bg-primary-300 rounded-lg hover:bg-blue-700 disabled:opacity-50">Open Cheat Sheet</h2>

         {/* Modal */}
         {open && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-6 overflow-y-auto max-h-[80vh]">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold">
                        Mermaid UML Cheat Sheet
                     </h2>
                     <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-black"
                     >
                        ✕
                     </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 text-sm font-mono">
                     <pre className="whitespace-pre-wrap">
                        {`classDiagram

class A {
  +attr1: int
  -attr2: string
  +method1()
}

class B {
  +attr: string
}

class C

%% Relationships
A <|-- B        %% inheritance
A --> C         %% association
A -- B          %% bidirectional
A o-- C         %% aggregation
B *-- C         %% composition
A ..> B         %% dependency

%% Interface
class I {
  <<interface>>
  +doSomething()
}
I <|.. A

%% Enum
class E {
  <<enumeration>>
  X
  Y
  Z
}

%% Multiplicity
A "1" --> "*" C

%% Notes
note for A "Generic class A"
note "General note" as N1
N1 .. B`}
                     </pre>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
