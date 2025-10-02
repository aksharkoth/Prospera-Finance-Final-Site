import * as React from 'react'
export function Badge({children,className,style}:{children:any;className?:string;style?:React.CSSProperties}){
  return <span className={className} style={{display:'inline-flex',alignItems:'center',gap:6,border:'1px solid rgba(255,255,255,.2)',background:'rgba(255,255,255,.08)',padding:'6px 12px',borderRadius:999,fontWeight:800, ...(style||{})}}>{children}</span>
}
