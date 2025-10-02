import * as React from 'react'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
  return <input {...props} style={{width:'100%',borderRadius:14,border:'1px solid rgba(255,255,255,.35)',background:'transparent',color:'#fff',padding:'.9rem 1rem',fontWeight:700}} />
}
