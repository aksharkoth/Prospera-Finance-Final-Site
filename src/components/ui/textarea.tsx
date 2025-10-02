import * as React from 'react'
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <textarea rows={6} {...props} style={{width:'100%',borderRadius:14,border:'1px solid rgba(255,255,255,.35)',background:'transparent',color:'#fff',padding:'.9rem 1rem',fontWeight:700}} />
}
