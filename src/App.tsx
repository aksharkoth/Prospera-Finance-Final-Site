import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  Area, AreaChart,
  BarChart, Bar,
  Brush
} from "recharts";
import { ChevronRight, Calendar, Cpu, Brain, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const routes = ["home","platform","operations","case-studies","about","simulator","book"] as const;
type Route = (typeof routes)[number];

export default function ProsperaFinanceSite(){
  const [route,setRoute] = useState<Route>("home");
  useEffect(()=>{window.scrollTo({top:0,behavior:"instant" as any})},[route]);
  return (
    <div style={{minHeight:'100vh', background:'#060b19', color:'#fff'}}>
      <SiteNav route={route} onNav={setRoute} />
      {route === "home" && <Home onCTAClick={()=> setRoute("book")} onLearnMore={()=> setRoute("platform")} onOps={()=> setRoute("operations")} onSim={()=> setRoute("simulator")} />}
      {route === "platform" && <Platform />}
      {route === "operations" && <Operations />}
      {route === "case-studies" && <CaseStudies />}
      {route === "about" && <About />}
      {route === "simulator" && <Simulator />}
      {route === "book" && <Book />}
      <SiteFooter onNav={setRoute} />
    </div>
  );
}

function SiteNav({route,onNav}:{route:Route; onNav:(r:Route)=>void}){
  const items:{ key:Route; label:string }[] = [
    { key:"home", label:"Home" },
    { key:"platform", label:"ML Forecasting" },
    { key:"operations", label:"Operations" },
    { key:"case-studies", label:"Case Studies" },
    { key:"about", label:"About" },
    { key:"simulator", label:"Earnings Optimizer" },
  ];
  return (
    <div style={{position:'sticky',top:0,zIndex:50, backdropFilter:'blur(6px)', borderBottom:'1px solid rgba(255,255,255,.1)', background:'rgba(0,0,0,.5)'}}>
      <div className="container">
        <div style={{display:'flex',height:68,alignItems:'center',justifyContent:'space-between', gap:16}}>
          <div style={{display:'flex',gap:12,alignItems:'center', whiteSpace:'nowrap'}}>
            <div style={{height:34,width:34,borderRadius:12, background:'rgba(34,211,238,.15)', display:'grid', placeItems:'center'}}><Brain size={18} color="#99f6e4" /></div>
            <span style={{fontWeight:800,letterSpacing:.3,fontSize:18}}>Prospera Finance</span>
          </div>
          <div className="navwrap">
            {items.map(it=> (
              <Button key={it.key} onClick={()=> onNav(it.key)} style={{marginLeft:8}}>{it.label}</Button>
            ))}
            <Button onClick={()=> onNav("book")} style={{marginLeft:8}}>Book</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onCTAClick, onLearnMore, onOps, onSim }:{ onCTAClick:()=>void; onLearnMore:()=>void; onOps:()=>void; onSim:()=>void }){
  return (
    <main>
      <section style={{position:'relative',overflow:'hidden', padding:'4.5rem 0 2rem 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <div style={{display:'inline-flex',gap:8, border:'1px solid rgba(165,243,252,.4)', background:'rgba(165,243,252,.1)', color:'#a5f3fc', borderRadius:999, padding:'6px 12px', fontSize:12}}>
              Engineered ML forecasting
            </div>
            <h1 style={{marginTop:18,fontSize:64,fontWeight:900,letterSpacing:-.8,backgroundImage:'linear-gradient(90deg,#a5f3fc,#fff,#93c5fd)',WebkitBackgroundClip:'text',color:'transparent'}}>Prospera Finance</h1>
            <p style={{marginTop:12, fontSize:22, color:'#cffafe', maxWidth:900, marginInline:'auto'}}>Predict earnings, optimize outcomes, and operate with confidence. Clear, explainable forecasts feed decisions across buys, labor, pricing and cash—so variance is anticipated, not explained after the fact.</p>
            <div style={{marginTop:18, display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap'}}>
              <Button onClick={onCTAClick}>Book a consultation <Calendar size={16}/></Button>
              <Button onClick={onLearnMore}>See the platform <ChevronRight size={16}/></Button>
              <Button onClick={onSim}>Try the optimizer</Button>
            </div>
            <div style={{marginTop:30}}><LiveForecastRibbon /></div>
          </motion.div>
        </div>
      </section>

      <section className="container" style={{padding:'1.5rem 0 0'}}>
        <KpiRow />
      </section>

      <section style={{padding:'2.5rem 0'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:18}}>
          <div className="ghost-card hover-pop" style={{padding:'1.6rem'}}>
            <div style={{fontSize:22,fontWeight:900, marginBottom:6}}>Our Mission</div>
            <p style={{color:'#cffafe', fontSize:16, lineHeight:1.7}}>Prospera’s mission is to embed accurate, explainable forecasting into the weekly rhythm of every finance team we serve. We turn predictions into decisions—so inventory buys, labor schedules, pricing and cash planning all move in sync with a living signal. We believe operators deserve clarity, not lagging reports.</p>
          </div>
          <div className="ghost-card hover-pop" style={{padding:'1.6rem'}}>
            <div style={{fontSize:22,fontWeight:900, marginBottom:6}}>Our Vision</div>
            <p style={{color:'#cffafe', fontSize:16, lineHeight:1.7}}>We’re building a finance stack where variance is anticipated rather than explained. Enterprise-grade forecasting and optimization—governed, observable, and tailored—should be accessible to growth companies. Prospera exists to make that a reality and to compound decision quality over time.</p>
          </div>
        </div>
        <div className="container" style={{marginTop:18}}>
          <div className="ghost-card hover-pop" style={{padding:'1.6rem'}}>
            <div style={{fontSize:22,fontWeight:900, marginBottom:6}}>About Prospera</div>
            <p style={{color:'#cffafe', fontSize:16, lineHeight:1.7}}>We are a product-led team that partners deeply with operators. Our approach blends rigorous modeling (Prophet/ARIMA/XGBoost), a curated feature store, and scenario tooling with day-one practicality—CSV/API outputs, clear explainability, and playbooks that connect the signal to actions. The outcome is resilient earnings: faster pivots, tighter execution, and less guesswork.</p>
          </div>
        </div>
      </section>

      <section style={{padding:'2.2rem 0 3rem', borderTop:'1px solid rgba(255,255,255,.1)'}}>
        <TestimonialsCarousel />
      </section>
    </main>
  );
}

// Live graph
function LiveForecastRibbon(){
  const base = useMemo(()=> makeDemoSeries({ noise:0.06, trend:1.004, seasonality:0.12 }), []);
  const [series, setSeries] = useState(base.slice(-24).map((d,i)=> ({...d, t:`T${i+1}`})));
  useEffect(()=>{
    let level = base[base.length-1].forecast as number;
    let t = 25;
    const id = setInterval(()=>{
      level = level * 1.004;
      const s = 1 + 0.12 * Math.sin((2*Math.PI*t)/12);
      const actual = level * s * (1 + (Math.random()-0.5)*0.06);
      const next = [...series.slice(1), { t:`T${t}`, actual, forecast: level * s }];
      setSeries(next);
      t = t+1;
    }, 900);
    return ()=> clearInterval(id);
  },[series, base]);
  return (
    <Card className="ghost-card hover-pop" style={{maxWidth:980, margin:'0 auto'}}>
      <CardHeader><CardTitle style={{display:'flex',justifyContent:'center',gap:8,alignItems:'center'}}><Cpu size={18}/> Forecast Outlook</CardTitle></CardHeader>
      <CardContent>
        <div style={{height:280}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="t" stroke="#e5e7eb" />
              <YAxis stroke="#e5e7eb" />
              <Tooltip contentStyle={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#22d3ee" fillOpacity={0.15} name="Actuals" />
              <Line type="monotone" dataKey="forecast" stroke="#a78bfa" dot={false} name="Forecast" />
              <Brush dataKey="t" height={18} stroke="#22d3ee" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function KpiRow(){
  const items = [
    { label: "Clients", value: "5+ partnered" },
    { label: "Forecast horizon", value: "12 months" },
    { label: "Avg MAPE", value: "< 4%" },
    { label: "Payback", value: "6–8 weeks" },
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:16}}>
      {items.map((k,idx)=> (
        <div key={idx} className="ghost-card hover-pop" style={{padding:'1.2rem', textAlign:'center'}}>
          <div style={{fontSize:12,color:'#a5f3fc',fontWeight:800,letterSpacing:1}}>{k.label}</div>
          <div style={{fontSize:28,fontWeight:900,marginTop:4}}>{k.value}</div>
        </div>
      ))}
    </div>
  );
}

function TestimonialsCarousel(){
  const items = [
    { company:"Altum TS", quote:"Prospera Finance’s ML forecasting gave us clarity to plan ahead and reduced financial uncertainty.", person:"Operations Manager" },
    { company:"Cybersphere", quote:"With Prospera Finance, our planning became sharper and scalable, giving us confidence to grow.", person:"Chief Technology Officer" },
    { company:"Suvidha", quote:"They streamlined our cash flow and uncovered growth opportunities we had overlooked.", person:"Project Director" },
    { company:"RapidIT Consulting", quote:"Prospera’s forecasting models boosted efficiency and made budgeting far more precise.", person:"VP of Technology" },
    { company:"Biryani World", quote:"Their insights transformed how we track revenue and helped us grow consistently month after month.", person:"Restaurant Owner" },
  ];
  const [i, setI] = useState(0);
  const next = ()=> setI((v)=> (v+1)%items.length);
  const prev = ()=> setI((v)=> (v-1+items.length)%items.length);
  useEffect(()=>{ const id = setInterval(next, 5000); return ()=> clearInterval(id); },[]);
  const it = items[i];
  return (
    <div className="container" style={{maxWidth:1100}}>
      <div className="ghost-card" style={{padding:'1.2rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Button onClick={prev}><ArrowLeft size={16}/></Button>
          <div style={{textAlign:'center', maxWidth:760, margin:'0 auto'}}>
            <div style={{fontWeight:900, fontSize:18}}>{it.company}</div>
            <p style={{marginTop:6, color:'#cffafe', fontSize:16}}>“{it.quote}”</p>
            <div style={{marginTop:4, fontSize:12, color:'#a5f3fc', fontWeight:800}}>{it.person}</div>
            <div style={{marginTop:10, display:'flex',gap:6,justifyContent:'center'}}>
              {items.map((_, idx)=> (<span key={idx} style={{height:6,width:24,borderRadius:999, background: idx===i? '#fff':'rgba(255,255,255,.35)'}}/>))}
            </div>
          </div>
          <Button onClick={next}><ArrowRightIcon size={16}/></Button>
        </div>
      </div>
    </div>
  );
}

function Platform(){
  const [tab,setTab]=useState("cashflow");
  const demo = useMemo(()=> makePlatformDemos(),[]);
  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container" style={{display:'grid',gap:24}}>
        <header style={{maxWidth:980}}>
          <h2 style={{fontSize:36,fontWeight:900}}>Prospera ML Forecasting Platform — Teaser</h2>
          <p style={{marginTop:10,color:'#cffafe'}}>Forecast, plan, and optimize earnings. This public demo is intentionally minimal—production deployments include richer features, governance, and optimization tuned to your business. Accuracy is continuously measured (MAPE/SMAPE/WAPE) and monitored for drift. Buttons below switch preview datasets.</p>
          <div style={{marginTop:10,display:'flex',gap:10,flexWrap:'wrap'}}>
            <Badge>Prophet/ARIMA/XGBoost</Badge><Badge>Feature store & drift monitoring</Badge><Badge>Scenario planning UI</Badge><Badge>API & CSV outputs</Badge>
          </div>
        </header>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList><TabsTrigger value="cashflow">Cash-Flow</TabsTrigger><TabsTrigger value="demand">Demand</TabsTrigger><TabsTrigger value="cogs">COGS</TabsTrigger></TabsList>
          <TabsContent value="cashflow"><PreviewBlock title="13-week Cash-Flow" subtitle="Collections, disbursements, ending cash" demo={demo.cashflow} /></TabsContent>
          <TabsContent value="demand"><PreviewBlock title="SKU Demand" subtitle="Promo & weather drivers" demo={demo.demand} /></TabsContent>
          <TabsContent value="cogs"><PreviewBlock title="COGS Forecast" subtitle="Lead times + commodity indices" demo={demo.cogs} /></TabsContent>
        </Tabs>
        <section style={{marginTop:18}}>
          <Card className="ghost-card">
            <CardHeader><CardTitle style={{color:'#fff'}}>Engineering & Accuracy</CardTitle></CardHeader>
            <CardContent>
              <p style={{color:'#cffafe',marginBottom:12}}>This preview uses simplified data, but our production stack runs governed pipelines, champion/challenger models and continuous backtests. The chart below demonstrates rolling-origin accuracy and confidence envelopes.</p>
              <div style={{height:260}}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={makeBacktestDemo()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis dataKey="t" stroke="#e5e7eb" />
                    <YAxis stroke="#e5e7eb" />
                    <Tooltip contentStyle={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
                    <Legend />
                    <Area type="monotone" dataKey="actual" name="Actuals" stroke="#22d3ee" fillOpacity={0.12} />
                    <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#a78bfa" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginTop:12}}>
                <div className="ghost-card" style={{padding:12}}><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>MAPE</div><div style={{fontSize:20,fontWeight:900}}>&lt; 4%</div></div>
                <div className="ghost-card" style={{padding:12}}><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>SMAPE</div><div style={{fontSize:20,fontWeight:900}}>≈ 5%</div></div>
                <div className="ghost-card" style={{padding:12}}><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>Backtest</div><div style={{fontSize:20,fontWeight:900}}>12x rolling</div></div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function PreviewBlock({ title, subtitle, demo }:{ title:string; subtitle:string; demo:{ data:any[]; series:{ key:string; name:string; }[] } }){
  return (
    <Card className="ghost-card hover-pop">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <div style={{color:'#cffafe', marginTop:-6, marginBottom:10}}>{subtitle}</div>
        <div style={{height:320}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demo.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="t" stroke="#e5e7eb" /><YAxis stroke="#e5e7eb" />
              <Tooltip contentStyle={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
              <Legend />
              {demo.series.map((s,i)=> <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={["#ffffff","#22d3ee","#a78bfa","#f97316"][i%4]} dot={false} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function Operations(){
  const steps = [
    { t: "Week 0–1", title:"Kickoff & Data Connect", detail:"Connect ERP/POS/e‑com. Define targets and success metrics.", bullets:[
      "Data mapping: chart of accounts, entities, currency, time.",
      "Quick history pull (12–24 mo) and initial QA report.",
      "Agree on targets (earnings, cash, demand) and guardrails."
    ]},
    { t: "Week 1–2", title:"Data QA & Feature Store", detail:"Outlier handling, schema checks, calendar/promos/macros engineered.", bullets:[
      "Anomaly detection & reconciliation to ledger",
      "Imputation policy and late-arriving data handling",
      "Feature store seeds: seasonality, promos, macro, weather"
    ]},
    { t: "Week 2–4", title:"Champion/Challenger Modeling", detail:"ARIMA · Prophet · XGBoost with rolling-origin backtests.", bullets:[
      "12x rolling-origin backtests and error decomposition",
      "Hyperparam search with time-aware CV",
      "Explainability pack: drivers, partial dependency"
    ]},
    { t: "Week 4–5", title:"Pilot Dashboards", detail:"Earnings, cash and demand in weekly exec view. Variance alerts online.", bullets:[
      "MAPE/SMAPE scorecards and alerts",
      "Scenario planner wired to drivers",
      "User acceptance & success metrics review"
    ]},
    { t: "Week 5–6", title:"Go-Live", detail:"API/CSV delivery, scenario UI and playbooks for buys, labor, pricing.", bullets:[
      "Handover of runbook & SLOs (99.5%)",
      "Champion→production; challenger watching",
      "Quarterly review & retrain cadence set"
    ]},
  ];
  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container" style={{display:'grid',gap:24}}>
        <header style={{maxWidth:980}}>
          <h2 style={{fontSize:36,fontWeight:900}}>Operations — From the CEO’s Desk</h2>
          <p style={{marginTop:10,color:'#cffafe'}}>Our promise is impact in weeks, not quarters. We stand up governed data pipelines, champion/challenger models, and an operator-first UX. Every engagement measures accuracy (MAPE/SMAPE/WAPE), business lift (turns, margin), and execution speed. The dashed rail below outlines the first six weeks—open each phase for depth.</p>
        </header>
        <div className="dashline"></div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5,minmax(0,1fr))', gap:16}}>
          {steps.map((s,i)=> (
            <details key={i} className="ghost-card hover-pop">
              <summary style={{listStyle:'none', cursor:'pointer', padding:'1.2rem'}}>
                <div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>{s.t}</div>
                <div style={{fontWeight:900,fontSize:18}}>{s.title}</div>
                <div style={{color:'#cffafe',fontSize:14}}>{s.detail}</div>
              </summary>
              <div style={{padding:'0 1.2rem 1.2rem 1.2rem', color:'#cffafe', fontSize:14}}>
                <ul>
                  {s.bullets.map((b,idx)=> (<li key={idx}>{b}</li>))}
                </ul>
              </div>
            </details>
          ))}
        </div>
        <Card className="ghost-card">
          <CardHeader><CardTitle>Program Impact Preview</CardTitle></CardHeader>
          <CardContent>
            <div style={{height:280}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={makeDemoSeries({ noise:0.05, trend:1.006, seasonality:0.12 }).slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="t" stroke="#e5e7eb" />
                  <YAxis stroke="#e5e7eb" />
                  <Tooltip contentStyle={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
                  <Area type="monotone" dataKey="actual" name="Trajectory" stroke="#22d3ee" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function CaseStudies(){
  const caption = "We apply Prospera’s forecasting engine to client data, then validate against realized results. Below are six anonymized case studies. Click a card to open a detailed view with forecast vs. actual and the full narrative.";
  const cases = [
    { key: "c1", client:"Anonymous Case Study #1", impact:"Inventory turns +14%", detail:"Retail demand forecasting; buys aligned to signal." },
    { key: "c2", client:"Anonymous Case Study #2", impact:"Margin +3.1%", detail:"Cash + demand unified; labor & purchasing synchronized." },
    { key: "c3", client:"Anonymous Case Study #3", impact:"Promo ROI +19%", detail:"Baseline vs incremental lift; cadence tuned." },
    { key: "c4", client:"Anonymous Case Study #4", impact:"WAPE 4.5% at launch", detail:"Multi-entity forecasting with SSO and API delivery." },
    { key: "c5", client:"Anonymous Case Study #5", impact:"Working capital −22%", detail:"Inventory optimization from weekly cash forecasts." },
    { key: "c6", client:"Anonymous Case Study #6", impact:"Service level +6pts", detail:"COGS & lead-time modeling reduced stockouts." },
  ];
  const [open,setOpen] = useState<string|null>(null);
  const meta:any = {
    c1: { title: "Anonymous Case Study #1", before: makeDemoSeries({ noise:0.08, trend:1.0, seasonality:0.1 }), after: makeDemoSeries({ noise:0.05, trend:1.01, seasonality:0.12 }), story:`A mid-market retailer connected ERP, POS and promo data. Prospera established a clean demand signal, reduced overbuys, and aligned purchasing to the forecast. Inventory turns improved and excess days on hand dropped.` },
    c2: { title: "Anonymous Case Study #2", before: makeDemoSeries({ noise:0.07, trend:1.0, seasonality:0.12 }), after: makeDemoSeries({ noise:0.05, trend:1.008, seasonality:0.12 }), story:`A restaurant group unified cash and demand forecasting. Labor schedules and vendor payments were timed to inflows. Margin expanded and payroll timing smoothed.` },
    c3: { title: "Anonymous Case Study #3", before: makeDemoSeries({ noise:0.1, trend:1.0, seasonality:0.15 }), after: makeDemoSeries({ noise:0.06, trend:1.012, seasonality:0.15 }), story:`A DTC brand separated baseline from promo lift and optimized cadence/discount. ROI increased as promos ran where the forecast predicted true incremental demand.` },
    c4: { title: "Anonymous Case Study #4", before: makeDemoSeries({ noise:0.06, trend:1.0, seasonality:0.08 }), after: makeDemoSeries({ noise:0.04, trend:1.006, seasonality:0.1 }), story:`A multi-entity operator adopted SSO and API delivery. Rollups across entities showed reliable WAPE at launch with drift monitoring and champion/challenger rotation.` },
    c5: { title: "Anonymous Case Study #5", before: makeDemoSeries({ noise:0.09, trend:1.0, seasonality:0.1 }), after: makeDemoSeries({ noise:0.06, trend:1.01, seasonality:0.12 }), story:`Weekly cash visibility, purchasing alignment and lead-time modeling drove lower working capital and steadier operations.` },
    c6: { title: "Anonymous Case Study #6", before: makeDemoSeries({ noise:0.07, trend:1.0, seasonality:0.12 }), after: makeDemoSeries({ noise:0.05, trend:1.008, seasonality:0.12 }), story:`A supply chain program used COGS and lead-time models to prevent stockouts; service level increased while expediting fell.` },
  };
  const openMeta = open? meta[open]:null;

  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container" style={{textAlign:'center'}}>
        <header style={{maxWidth:980, margin:'0 auto'}}>
          <h2 style={{fontSize:36,fontWeight:900}}>Case Studies</h2>
          <p style={{marginTop:10,color:'#cffafe'}}>{caption}</p>
        </header>
        <div style={{marginTop:22, display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:16}}>
          {cases.map(c=> (
            <div key={c.key} className="ghost-card hover-pop" style={{padding:'1.2rem', cursor:'pointer', background:'rgba(15,23,42,.6)'}} onClick={()=> setOpen(c.key)}>
              <div style={{fontWeight:900,fontSize:16}}>{c.client}</div>
              <div style={{fontSize:18,fontWeight:900,marginTop:6}}>{c.impact}</div>
              <p style={{color:'#cffafe'}}>{c.detail}</p>
              <div style={{fontSize:12,color:'#a5f3fc'}}>Click to open</div>
            </div>
          ))}
        </div>

        {openMeta && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.7)', display:'grid', placeItems:'center', zIndex:60}} onClick={()=> setOpen(null)}>
            <div style={{width:'min(1100px,95vw)', maxHeight:'90vh', overflow:'auto', background:'#0b1120', border:'1px solid rgba(255,255,255,.2)', borderRadius:20}} onClick={(e)=> e.stopPropagation()}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', padding:'1.2rem'}}>
                <div style={{fontSize:20,fontWeight:900}}>{openMeta.title}</div>
                <Button onClick={()=> setOpen(null)}>Close</Button>
              </div>
              <div style={{padding:'0 1.2rem 1.2rem'}}>
                <div style={{display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:16}}>
                  <div className="ghost-card" style={{padding:'1.2rem'}}>
                    <div style={{fontWeight:800, marginBottom:8}}>Before</div>
                    <div style={{height:240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={openMeta.before.slice(-24)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)"/>
                          <XAxis dataKey="t" stroke="#e5e7eb"/><YAxis stroke="#e5e7eb"/>
                          <Tooltip contentStyle={{background:'#0b1120',border:'1px solid rgba(255,255,255,0.2)',color:'white'}}/>
                          <Legend/>
                          <Line type="monotone" dataKey="actual" name="Actuals" stroke="#ffffff" dot={false}/>
                          <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#22d3ee" dot={false}/>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="ghost-card" style={{padding:'1.2rem'}}>
                    <div style={{fontWeight:800, marginBottom:8}}>After</div>
                    <div style={{height:240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={openMeta.after.slice(-24)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)"/>
                          <XAxis dataKey="t" stroke="#e5e7eb"/><YAxis stroke="#e5e7eb"/>
                          <Tooltip contentStyle={{background:'#0b1120',border:'1px solid rgba(255,255,255,0.2)',color:'white'}}/>
                          <Legend/>
                          <Line type="monotone" dataKey="actual" name="Actuals" stroke="#ffffff" dot={false}/>
                          <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#22d3ee" dot={false}/>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <p style={{marginTop:14, color:'#e6fbff', fontWeight:600}}>{openMeta.story}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function About(){
  const team = [
    { role:"Founder | Chief Executive Officer", name:"Akshar Kothapalli", img:"https://media.licdn.com/dms/image/v2/D4D03AQFAZfQ-p_YHsg/profile-displayphoto-scale_400_400/B4DZmnVn0XH4Ag-/0/1759449087863?e=1762387200&v=beta&t=oNUE9YCRefbCRIKnyFgwVvX96mIQj7a2KdElzu0dlPk", bio:"Founder & builder. Leads product, strategy, and client outcomes. Mission: make advanced forecasting accessible and practical for operators." },
    { role:"Chief Financial Officer", name:"Siddanth Baddevolu", img:"https://media.licdn.com/dms/image/v2/D4E03AQEUG7HxecFyEw/profile-displayphoto-shrink_400_400/B4EZPq3bzXHgAg-/0/1734812223040?e=1762387200&v=beta&t=bloWpPztQLoP8lSpob6B6LmG_C8sBNHu_pVR81iK6us", bio:"Financial strategy and FP&A design. Optimizes cash, manages risk, and operationalizes value realization." },
    { role:"Chief Operating Officer", name:"Praval Goli", img:"https://cdn.theorg.com/d61e9329-a610-4f17-95bc-f42298e04b45_thumb.jpg", bio:"Operations and delivery excellence. Orchestrates onboarding, integrations, process improvement and execution." },
  ];
  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container">
        <header style={{maxWidth:980}}>
          <h2 style={{fontSize:36,fontWeight:900}}>About Us</h2>
          <p style={{marginTop:10, color:'#cffafe'}}>We partner with ambitious businesses to operationalize ML forecasts across earnings, cash, and growth.</p>
        </header>
        <div style={{marginTop:22, display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:16}}>
          {team.map((m,i)=> (
            <Card key={i} className="ghost-card hover-pop"><CardContent>
              <img src={m.img} style={{height:200,width:200,objectFit:'cover',borderRadius:18,border:'1px solid rgba(255,255,255,.1)'}}/>
              <div style={{marginTop:12}}>
                <div style={{fontSize:18,fontWeight:900}}>{m.name}</div>
                <div style={{color:'#a5f3fc',fontWeight:800,fontSize:12}}>{m.role}</div>
                <p style={{color:'#cffafe'}}>{m.bio}</p>
              </div>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function Simulator(){
  const [rev, setRev] = useState(5000000);
  const [cogs, setCogs] = useState(60);
  const [season, setSeason] = useState("medium");
  const [goal, setGoal] = useState(18);
  const sim = useMemo(()=> runEarningsSimulation({ revenue:rev, cogsPct:cogs, seasonality:season as any, marginGoal:goal }), [rev,cogs,season,goal]);
  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container" style={{display:'grid',gap:24}}>
        <header style={{maxWidth:980}}>
          <h2 style={{fontSize:36,fontWeight:900}}>Earnings Optimizer Simulator</h2>
          <p style={{marginTop:10,color:'#cffafe'}}>Estimate how forecasting and optimization can move your bottom line. This is a teaser—the deployed Prospera optimizer personalizes drivers, constraints and objectives to your business.</p>
        </header>
        <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:16, alignItems:'start'}}>
          <Card className="ghost-card hover-pop">
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent>
              <div style={{display:'grid',gap:14}}>
                <div><div style={{display:'flex',justifyContent:'space-between'}}><label>Annual revenue</label><span style={{color:'#a5f3fc'}}>${rev.toLocaleString()}</span></div><input type="range" min={500000} max={20000000} step={500000} value={rev} onChange={(e)=> setRev(parseInt((e.target as any).value))} style={{width:'100%'}}/></div>
                <div><div style={{display:'flex',justifyContent:'space-between'}}><label>Average COGS %</label><span style={{color:'#a5f3fc'}}>{cogs}%</span></div><input type="range" min={30} max={85} step={1} value={cogs} onChange={(e)=> setCogs(parseInt((e.target as any).value))} style={{width:'100%'}}/></div>
                <div>
                  <div style={{fontWeight:800, marginBottom:8}}>Seasonality</div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:8}}>
                    <Button onClick={()=> setSeason('low')}>Low</Button>
                    <Button onClick={()=> setSeason('medium')}>Med</Button>
                    <Button onClick={()=> setSeason('high')}>High</Button>
                  </div>
                </div>
                <div><div style={{display:'flex',justifyContent:'space-between'}}><label>Desired margin goal</label><span style={{color:'#a5f3fc'}}>{goal}%</span></div><input type="range" min={5} max={35} step={1} value={goal} onChange={(e)=> setGoal(parseInt((e.target as any).value))} style={{width:'100%'}}/></div>
                <div className="ghost-card" style={{padding:'1.2rem'}}>
                  <div style={{fontSize:12,color:'#a5f3fc'}}>How it works</div>
                  <p style={{color:'#cffafe',fontSize:14}}>We simulate forecast-informed actions that reduce COGS, align labor, and adjust promotion cadence. Actual deployments include richer optimization and constraints (supply, lead times, service levels).</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="ghost-card hover-pop">
            <CardHeader><CardTitle>Projected Impact</CardTitle></CardHeader>
            <CardContent>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:16, marginBottom:14}}>
                <div className="ghost-card" style={{padding:'1.2rem'}}><div style={{fontSize:12,color:'#a5f3fc'}}>Baseline profit</div><div style={{fontSize:26,fontWeight:900}}>${sim.baselineProfit.toLocaleString()}</div></div>
                <div className="ghost-card" style={{padding:'1.2rem'}}><div style={{fontSize:12,color:'#a5f3fc'}}>Optimized profit</div><div style={{fontSize:26,fontWeight:900}}>${sim.optimizedProfit.toLocaleString()}</div></div>
                <div className="ghost-card" style={{padding:'1.2rem'}}><div style={{fontSize:12,color:'#a5f3fc'}}>Variance reduction</div><div style={{fontSize:26,fontWeight:900}}>{(sim.varianceReduction*100).toFixed(0)}%</div></div>
              </div>
              <div style={{height:320}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sim.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis dataKey="t" stroke="#e5e7eb" />
                    <YAxis stroke="#e5e7eb" />
                    <Tooltip contentStyle={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
                    <Legend />
                    <Line type="monotone" dataKey="baseline" name="Baseline Earnings" stroke="#ffffff" dot={false} />
                    <Line type="monotone" dataKey="optimized" name="Optimized Earnings" stroke="#22d3ee" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Book(){
  const [sent, setSent] = useState(false);
  return (
    <main style={{padding:'3.2rem 0'}}>
      <div className="container" style={{maxWidth:980}}>
        <Card className="ghost-card hover-pop">
          <CardHeader><CardTitle style={{fontSize:30}}>Book a Consultation</CardTitle></CardHeader>
          <CardContent>
            {!sent ? (
              <form onSubmit={(e)=> { e.preventDefault(); setSent(true); }} style={{display:'grid',gap:18}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:16}}>
                  <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>Full Name</div><Input required placeholder="Jane Doe" /></div>
                  <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>Email</div><Input required type="email" placeholder="jane@company.com" /></div>
                </div>
                <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>Company (and role)</div><Input required placeholder="Company Inc. — Director of Finance" /></div>
                <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>What business decisions would you like forecasting to improve?</div><Textarea placeholder="E.g., inventory buys, labor scheduling, promo cadence, cash planning…" /></div>
                <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>What systems/tools should we connect to? (ERP, POS, e-commerce, data warehouse)</div><Input placeholder="QuickBooks, NetSuite, Shopify, Snowflake, S3…" /></div>
                <div><div style={{fontSize:12,color:'#a5f3fc',fontWeight:800}}>Anything else we should know before the call?</div><Textarea placeholder="Context, timelines, challenges, constraints, stakeholders…" /></div>
                <Button type="submit" style={{width:'100%'}}>Request meeting <Calendar size={16}/></Button>
                <p style={{fontSize:12, color:'#cffafe'}}>We’ll follow up to schedule a 20-minute discovery. No commitment.</p>
              </form>
            ) : (
              <div style={{textAlign:'center'}}>
                <h4 style={{fontSize:22,fontWeight:900}}>Thanks! Your request was received.</h4>
                <p style={{color:'#cffafe'}}>We’ll email you shortly to schedule a 20-minute discovery call.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function SiteFooter({ onNav }:{ onNav:(r:Route)=>void }){
  return (
    <footer style={{marginTop:28, borderTop:'1px solid rgba(255,255,255,.1)', background:'rgba(0,0,0,.4)'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:18, padding:'2.2rem 0'}}>
        <div>
          <div style={{display:'flex',gap:8,alignItems:'center',fontWeight:900}}><Brain size={18}/>Prospera Finance</div>
          <p style={{color:'#cffafe'}}> </p>
        </div>
        <div>
          <div style={{fontWeight:900, marginBottom:8}}>Company</div>
          <ul style={{color:'#cffafe'}}>
            <li><a onClick={()=>onNav("about")}>About</a></li>
            <li><a onClick={()=>onNav("case-studies")}>Case Studies</a></li>
            <li><a onClick={()=>onNav("book")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <div style={{fontWeight:900, marginBottom:8}}>Product</div>
          <ul style={{color:'#cffafe'}}>
            <li><a onClick={()=>onNav("platform")}>Forecasting Platform</a></li>
            <li><a onClick={()=>onNav("simulator")}>Earnings Optimizer</a></li>
            <li><a onClick={()=>onNav("operations")}>Operations</a></li>
          </ul>
        </div>
        <div>
          <div style={{fontWeight:900, marginBottom:8}}>Legal</div>
          <ul style={{color:'#cffafe'}}>
            <li>© {new Date().getFullYear()} Prospera Finance</li>
            <li>All rights reserved.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* Data helpers */
function makeDemoSeries({ noise, trend, seasonality }:{ noise:number; trend:number; seasonality:number }){
  const out:any[] = []; let level = 100;
  for(let t=1;t<=48;t++){ level = level * trend; const s = 1 + seasonality * Math.sin((2 * Math.PI * t) / 12); const val = level * s * (1 + (Math.random()-0.5) * noise); out.push({ t:`P${t}`, actual:val, forecast:level*s }); }
  return out;
}
function makePlatformDemos(){
  const to52 = (arr:any[])=>{ const out:any[]=[]; let i=0; while(out.length<52){ const d = arr[i%arr.length]; out.push({...d,t:`W${out.length+1}`}); i++; } return out; };
  return {
    cashflow: { data: to52(makeDemoSeries({ noise:0.05, trend:1.002, seasonality:0.1 })), series:[{ key:"actual", name:"Actuals" },{ key:"forecast", name:"Forecast" }] },
    demand: { data: to52(makeDemoSeries({ noise:0.07, trend:1.004, seasonality:0.15 })), series:[{ key:"actual", name:"Actuals" },{ key:"forecast", name:"Forecast" }] },
    cogs: { data: to52(makeDemoSeries({ noise:0.04, trend:1.001, seasonality:0.08 })), series:[{ key:"actual", name:"Actuals" },{ key:"forecast", name:"Forecast" }] },
  };
}
function makeBacktestDemo(){
  return makeDemoSeries({ noise:0.05, trend:1.003, seasonality:0.12 });
}
function runEarningsSimulation({ revenue, cogsPct, seasonality, marginGoal }:{ revenue:number; cogsPct:number; seasonality:"low"|"medium"|"high"; marginGoal:number }){
  const seasonAmp = seasonality === "low" ? 0.05 : seasonality === "high" ? 0.2 : 0.12;
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const baseline = months.map((m)=> { const s = 1 + seasonAmp * Math.sin((2*Math.PI*m)/12); const revM = (revenue/12) * s; const cogsM = revM * (cogsPct/100); const gross = revM - cogsM; return { t:`M${m}`, baseline: gross }; });
  const optimized = baseline.map((b,i)=> { const cogsImprove = Math.min(0.04, Math.max(0.01, 0.03 + seasonAmp*0.1)); const demandUplift = 0.01 + seasonAmp*0.05; const g = b.baseline * (1 + demandUplift) * (1 + cogsImprove); return { t:b.t, optimized: g }; });
  const series = baseline.map((b,i)=> ({ t:b.t, baseline: Math.round(b.baseline), optimized: Math.round(optimized[i].optimized) }));
  const baselineProfit = Math.round(series.reduce((a,x)=> a+x.baseline,0));
  const optimizedProfit = Math.round(series.reduce((a,x)=> a+x.optimized,0));
  const varianceReduction = 0.2;
  return { series, baselineProfit, optimizedProfit, varianceReduction };
}
