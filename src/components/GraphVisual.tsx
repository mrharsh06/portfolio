'use client';
import { useState } from 'react';
const nodes = [
  {x:190,y:134,label:'Source code',caption:'Start with the implementation.',type:'source'},
  {x:88,y:242,label:'Dependencies',caption:'Connect the relationships.',type:'dependency'},
  {x:304,y:223,label:'Business rules',caption:'Understand the behavior.',type:'rules'},
  {x:182,y:341,label:'Specifications',caption:'Make the next step explicit.',type:'spec'},
  {x:350,y:355,label:'Evidence',caption:'Keep explanations grounded.',type:'evidence'},
];
export default function GraphVisual(){
 const [selected,setSelected]=useState(0);
 return <div className="graph-visual"><div className="graph-toolbar"><span><i/> CONNECTED THINKING</span><span>HC / 01</span></div><div className="graph-stage"><svg viewBox="0 0 440 440" role="img" aria-label="Conceptual knowledge graph linking source code, dependencies, business rules, specifications and evidence"><defs><radialGradient id="halo"><stop stopColor="#cce8a3" stopOpacity=".22"/><stop offset="1" stopColor="#cce8a3" stopOpacity="0"/></radialGradient></defs><circle cx="220" cy="230" r="190" fill="url(#halo)"/><g className="graph-grid">{[70,140,210,280,350,420].map(v=><path key={v} d={`M${v} 40V420 M30 ${v}H420`}/>)}</g><g className="graph-edges"><path d="M190 134L88 242L182 341L350 355L304 223L190 134L182 341 M88 242L304 223L182 341 M190 134L350 355"/></g><g className="satellites">{[[56,130],[370,95],[390,270],[73,366],[270,70],[230,395],[35,295]].map(([x,y],i)=><g key={i}><path d={`M${x} ${y}L${nodes[i%nodes.length].x} ${nodes[i%nodes.length].y}`}/><circle cx={x} cy={y} r="4"/></g>)}</g>{nodes.map((n,i)=><g key={n.type} className={selected===i?'graph-node selected':'graph-node'}><circle cx={n.x} cy={n.y} r={i===0?30:21}/><circle className="node-dot" cx={n.x} cy={n.y} r="5"/><text x={n.x} y={n.y+44} textAnchor="middle">{n.label}</text></g>)}</svg><div className="graph-buttons" aria-label="Explore the graph">{nodes.map((n,i)=><button key={n.type} className={`node-hit node-${i}`} aria-label={`Explore ${n.label}`} aria-pressed={selected===i} onClick={()=>setSelected(i)} onMouseEnter={()=>setSelected(i)}/>)}</div></div><div className="graph-caption" aria-live="polite"><span>0{selected+1} /</span><p>{nodes[selected].caption}</p><span className="graph-arrow">↗</span></div><div className="graph-footnote">A CONCEPTUAL VIEW OF HOW I THINK ABOUT SYSTEMS</div></div>
}
