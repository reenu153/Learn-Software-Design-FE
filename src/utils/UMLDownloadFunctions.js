
export function generateUMLTextRepresentation(nodes, edges) {
  // Convert nodes into classes
  const classes = nodes.map((node) => {
    const { id, data } = node;

    // Expect node.data to contain: name, attributes (array), methods (array)
    return {
      id,
      name: data.name || "Unnamed",
      attributes: Array.isArray(data.attributes) ? data.attributes : [],
      methods: Array.isArray(data.methods) ? data.methods : [],
    };
  });

  // Convert edges into relations
  const relations = edges.map((edge) => {
    return {
      from: edge.source,
      to: edge.target,
      type: edge.type || "association", // default type
    };
  });

  return {
    umlNodes: classes,
    umlRelations: relations,
  };
}


export function generateUMLTextDescription(nodes, edges) {
  const { umlNodes, umlRelations } = generateUMLTextRepresentation(nodes, edges);
  const classesText = umlNodes
    .map((cls) => {
      const attrText = cls.attributes.length ? cls.attributes.join(", ") : "none";
      const methodText = cls.methods.length ? cls.methods.join(", ") : "none";
      return `Class ${cls.name}:\n  Attributes: ${attrText}\n  Methods: ${methodText}`;
    })
    .join("\n\n");

  const relationsText = umlRelations
    .map((rel) => {
      const fromClass = umlNodes.find((n) => n.id === rel.from)?.name || rel.from;
      const toClass = umlNodes.find((n) => n.id === rel.to)?.name || rel.to;
      return `Relation: ${fromClass} -> ${toClass} [${rel.type}]`;
    })
    .join("\n");

  return `${classesText}\n\n${relationsText}`;
}