import{w as u}from"./index-4b1c8d92.js";function f(e,t){return Math.floor(Math.random()*(t-e+1))+e}async function l(e){return new Promise(t=>setTimeout(t,e))}function p(e){return new Intl.DateTimeFormat("default",{minute:"numeric",second:"numeric"}).format(new Date(e))}function i(){const{subscribe:e,update:t}=u({size:null,theme:null});return{subscribe:e,setSize:n=>t(r=>({...r,size:n})),setTheme:n=>t(r=>({...r,theme:n}))}}function m(){const{subscribe:e,set:t,update:n}=u([]);return{subscribe:e,add:(r,o)=>n(s=>(s[r]=o,s)),updateByIndex:(r,o)=>n(s=>s.map((a,c)=>r===c?{...a,...o}:a)),updateByKeys:(r,o)=>n(s=>s.map(a=>r.includes(a.key)?{...a,...o}:a)),reset:()=>t([])}}const b=u("settings"),w=i(),y=m(),h=u(0),g=u(0);export{g as a,y as b,l as c,h as m,f as r,w as s,p as t,b as v};