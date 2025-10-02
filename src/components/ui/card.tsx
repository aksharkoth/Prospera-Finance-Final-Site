import * as React from 'react'
type CSS = React.CSSProperties
export function Card({className='',style,children}:{className?:string;style?:CSS;children:any}){return <div className={`ghost-card ${className}`} style={style}>{children}</div>}
export function CardHeader({children,style}:{children:any;style?:CSS}){return <div style={{padding:'1.2rem 1.2rem 0 1.2rem', ...(style||{})}}>{children}</div>}
export function CardContent({children,className,style}:{children:any;className?:string;style?:CSS}){return <div className={className} style={{padding:'1.2rem', ...(style||{})}}>{children}</div>}
export function CardTitle({children,className,style}:{children:any;className?:string;style?:CSS}){return <div className={className} style={{fontWeight:900,fontSize:20, ...(style||{})}}>{children}</div>}
