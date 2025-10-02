import * as React from 'react'
export function Tabs({value,onValueChange,children}:{value:string;onValueChange:(v:string)=>void;children:any}){
  return <div>{React.Children.map(children as any,(c:any)=> React.isValidElement(c)? React.cloneElement(c,{current:value,onValueChange}):c)}</div>
}
export function TabsList({children,current,onValueChange}:{children:any;current?:string;onValueChange?:(v:string)=>void}){
  return <div style={{display:'inline-flex',gap:10,background:'rgba(255,255,255,.08)',padding:8,borderRadius:999}}>
    {React.Children.map(children as any,(c:any)=> React.isValidElement(c)? React.cloneElement(c,{current,onValueChange}):c)}
  </div>
}
export function TabsTrigger({value,children,current,onValueChange}:{value:string;children:any;current?:string;onValueChange?:(v:string)=>void}){
  const active = current===value
  return <button onClick={()=>onValueChange&&onValueChange(value)} style={{padding:'.45rem .9rem',borderRadius:999,border:'1px solid rgba(255,255,255,.2)',background: active? '#fff':'rgba(0,0,0,.2)',color: active? '#000':'#fff',fontWeight:800}}>{children}</button>
}
export function TabsContent({value,children,current}:{value:string;children:any;current?:string}){
  return current===value? <div style={{marginTop:16}}>{children}</div> : null
}
