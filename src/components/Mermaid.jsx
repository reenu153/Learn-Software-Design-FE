import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export default function MermaidPage({code, setCode}) {
   const diagramRef = useRef()

   useEffect(() => {
      mermaid.initialize({
         startOnLoad: false,
         securityLevel: 'loose',
      })
   }, [])

   useEffect(() => {
      const renderDiagram = async () => {
         if (!diagramRef.current) return

         try {
            diagramRef.current.innerHTML = ''

            const id =
               'mermaid-diagram-' + Math.random().toString(36).substring(7)

            const { svg } = await mermaid.render(id, code)

            diagramRef.current.innerHTML = svg
         } catch (err) {
            console.error('Mermaid render error:', err)
         }
      }

      renderDiagram()
   }, [code])

   return (
      <div
         className="flex gap-[20px] p-[20px] h-full"
         style={{ display: 'flex', gap: '20px' }}
      >
         <textarea
            value={code}
            className='w-1/3 h-full overflow-auto p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setCode(e.target.value)}
         />

         <div className='overflow-auto' ref={diagramRef} style={{ width: '60%' }} />
      </div>
   )
}
