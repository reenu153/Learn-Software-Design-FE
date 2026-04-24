export default function formatFeedbackToJSX(raw) {
   let data = raw
   if (!data) return <p>No feedback available</p>
   try {
      while (typeof data === 'string') {
         data = JSON.parse(data)
      }
   } catch {
      return <p>{raw}</p>
   }

   function render(obj, indent = 0) {
      return Object.entries(obj)?.map(([key, value], idx) => (
         <div
            key={idx}
            style={{ marginLeft: indent * 12, marginBottom: '10px' }}
         >
            <div style={{ fontWeight: '600' }}>{cleanKey(key)}</div>

            <div>
               {Array.isArray(value) ? (
                  <ul>
                     {value.map((item, i) => (
                        <li key={i}>{item}</li>
                     ))}
                  </ul>
               ) : typeof value === 'object' && value !== null ? (
                  render(value, indent + 1)
               ) : (
                  <p style={{ margin: '4px 0' }}>{value}</p>
               )}
            </div>
         </div>
      ))
   }

   return <div>{render(data)}</div>
}

function cleanKey(key) {
   return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
}
