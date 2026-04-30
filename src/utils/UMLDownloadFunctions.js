export default function generateText(graph) {
   const { nodes = [], edges = [] } = graph

   const clean = (s) =>
      (s || '')
         .replace(/\s+/g, '_')
         .replace(/[^\w_]/g, '')
         .toLowerCase()

   const nodeMap = new Map()

   const nodesText = nodes.map((n) => {
      const name = clean(n.data?.name || n.id)
      nodeMap.set(n.id, name)

      switch (n.type) {
         case 'classNode':
            return `CLASS ${name} | attrs: ${(n.data?.attributes || []).join(', ') || 'none'} | methods: ${(n.data?.methods || []).join(', ') || 'none'}`

         case 'componentNode':
            return `COMPONENT ${name} | ports: ${(n.data?.ports || []).join(', ') || 'none'}`

         case 'interfaceNode':
         case 'interfacePortNode':
            return `INTERFACE ${name}`

         case 'databaseNode':
            return `DATABASE ${name}`

         default:
            return `NODE ${name} (${n.type})`
      }
   })

   const edgeLines = edges.map((e) => {
      const source = nodeMap.get(e.source)
      const target = nodeMap.get(e.target)

      const type = e.data?.umlType || 'association'

      return `
  RELATIONSHIP:
  source: ${source}
  target: ${target}
  type: ${type}
  `
   })

   return [...nodesText, '', ...edgeLines].join('\n')
}
