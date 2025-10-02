import * as React from 'react'
export function Button({className='',style,children, ...props}:{className?:string;style?:React.CSSProperties} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button {...props} style={{padding:'.7rem 1rem',borderRadius:14,border:'1px solid rgba(255,255,255,.2)',background:'rgba(255,255,255,.08)',color:'#fff',fontWeight:800, ...(style||{})}} className={className}>{children}</button>
}
