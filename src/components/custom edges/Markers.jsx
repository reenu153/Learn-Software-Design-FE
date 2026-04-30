export default function Markers(){
return(<svg style={{ position: "absolute", width: 0, height: 0 }}>
  <defs>
    <marker
      id="uml-inheritance"
      viewBox="0 0 12 12"
      refX="12"
      refY="6"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
    >
      <path d="M0,0 L12,6 L0,12 Z" fill="#fff" stroke="#111" />
    </marker>

    <marker
  id="uml-composition"
  viewBox="0 0 12 12"
  refX="12"
  refY="6"
  markerWidth="12"
  markerHeight="12"
  orient="auto"
>
  <path
    d="M6,0 L12,6 L6,12 L0,6 Z"
    fill="#111"
    stroke="#111"
  />
</marker>

<marker
  id="uml-aggregation"
  viewBox="0 0 12 12"
  refX="12"
  refY="6"
  markerWidth="12"
  markerHeight="12"
  orient="auto"
  markerUnits="strokeWidth"
>
  <path
    d="M6,0 L12,6 L6,12 L0,6 Z"
    fill="#fff"
    stroke="#111"
    strokeWidth="1"
  />
</marker>
<marker
  id="uml-dependency"
  viewBox="0 0 10 10"
  refX="10"
  refY="5"
  markerWidth="8"
  markerHeight="8"
  orient="auto"
  markerUnits="strokeWidth"
>
  <path
    d="M0,0 L10,5 L0,10 Z"
    fill="#111"
  />
</marker>

<marker
    id="uml-provided"
    viewBox="0 0 20 20"
    markerWidth="12"
    markerHeight="12"
    refX="10"
    refY="10"
  >
    <circle cx="10" cy="10" r="6" fill="white" stroke="black" />
  </marker>

  {/* REQUIRED INTERFACE (socket) */}
  <marker
    id="uml-required"
    viewBox="0 0 20 20"
    markerWidth="12"
    markerHeight="12"
    refX="10"
    refY="10"
  >
    <rect
      x="4"
      y="4"
      width="12"
      height="12"
      fill="white"
      stroke="black"
    />
  </marker>

  {/* DELEGATION (internal forwarding arrow) */}
  <marker
    id="uml-delegation"
    viewBox="0 0 20 20"
    markerWidth="14"
    markerHeight="14"
    refX="18"
    refY="10"
    orient="auto"
  >
    <path
      d="M0,0 L20,10 L0,20"
      fill="none"
      stroke="black"
      strokeWidth="1.5"
    />
  </marker>

  {/* SOCKET CONNECTION (filled square endpoint) */}
  <marker
    id="uml-socket"
    viewBox="0 0 20 20"
    markerWidth="12"
    markerHeight="12"
    refX="10"
    refY="10"
  >
    <rect
      x="5"
      y="5"
      width="10"
      height="10"
      fill="black"
    />
  </marker>

  <marker
    id="uml-realization"
    viewBox="0 0 20 20"
    markerWidth="16"
    markerHeight="16"
    refX="18"
    refY="10"
    orient="auto"
  >
    <polygon points="0,0 20,10 0,20" fill="white" stroke="black" />
  </marker>

  {/* COMPONENT CONNECTOR (assembly link) */}
  <marker
    id="uml-component"
    viewBox="0 0 20 20"
    markerWidth="14"
    markerHeight="14"
    refX="18"
    refY="10"
    orient="auto"
  >
    <circle cx="10" cy="10" r="4" fill="black" />
  </marker>
  </defs>
</svg>)
}