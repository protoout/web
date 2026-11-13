import fs from 'node:fs';
import path from 'node:path';
const dist=path.resolve('dist'),base=(process.env.PAGES_BASE||'/').replace(/\/?$/,'/');
const failedAssets=JSON.parse(fs.readFileSync('migration/asset-map.json','utf8')).filter(a=>a.status==='failed').map(a=>a.sourceUrl.replaceAll('&amp;','&'));
const remoteCssWarnings=new Set();
const pages=JSON.parse(fs.readFileSync('src/data/pages.json','utf8')),errors=[],missing=new Map();
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const htmlFiles=walk(dist).filter(f=>f.endsWith('.html'));
for(const p of pages)if(!fs.existsSync(path.join(dist,p.path,'index.html')))errors.push(`Missing page ${p.path}`);
for(const file of htmlFiles){
 const html=fs.readFileSync(file,'utf8');
 if(!/<meta\s+name="robots"\s+content="[^"]*noindex/.test(html))errors.push(`Missing noindex ${file}`);
 if(html.includes('__PROTOOUT_BASE__'))errors.push(`Unresolved base token ${file}`);
 if(/<script[^>]+src="[^"]*(?:googletagmanager|google-analytics|connect.facebook|_next\/)/.test(html))errors.push(`Original analytics/runtime ${file}`);
 for(const m of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)){
  const u=m[1].replaceAll('&amp;','&');if(u.startsWith('#')||/^(?:https?:|mailto:|tel:|data:|javascript:|about:)/.test(u))continue;
  if(!u.startsWith(base)){errors.push(`Wrong base ${u}`);continue;}
  let rel;try{rel=decodeURIComponent(u.slice(base.length).split(/[?#]/)[0]);}catch{errors.push(`Invalid URL ${u}`);continue;}
  const target=path.join(dist,rel);
  if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html'))){
   if(/(?:assets\/|_astro\/)/.test(rel))errors.push(`Missing local asset ${u}`);
   else {const refs=missing.get(u)||[];refs.push(path.relative(dist,file));missing.set(u,refs);}
  }
 }
 for(const m of html.matchAll(/<img\b[^>]*\bsrc="(https?:[^\"]+)"/g))errors.push(`Remote image ${m[1]}`);
 for(const m of html.matchAll(/url\(\s*["']?(https?:[^\s)"']+)/g))failedAssets.includes(m[1])?remoteCssWarnings.add(m[1]):errors.push(`Remote CSS asset ${m[1]}`);
}
const robots=fs.readFileSync(path.join(dist,'robots.txt'),'utf8');
if(!/User-agent: \*[\s\S]*?Allow: \//.test(robots))errors.push('Search bot cannot read noindex');
if(!fs.existsSync(path.join(dist,'llms.txt')))errors.push('Missing llms.txt');
if(fs.existsSync(path.join(dist,'sitemap.xml')))errors.push('Preview should not advertise sitemap');
const assets=walk(path.join(dist,'assets')),bytes=assets.reduce((n,f)=>n+fs.statSync(f).size,0);
for(const f of assets)if(fs.statSync(f).size>100*1024*1024)errors.push(`Asset exceeds GitHub file limit ${f}`);
const report={base,pages:pages.length,htmlFiles:htmlFiles.length,assetFiles:assets.length,assetBytes:bytes,unavailableSourceCssAssets:[...remoteCssWarnings],errors:[...new Set(errors)],linksOutsideCopy:[...missing].map(([url,sources])=>({url,sources}))};
fs.writeFileSync('migration/build-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({base,pages:pages.length,htmlFiles:htmlFiles.length,assets:assets.length,assetMB:Math.round(bytes/1e6),errors:report.errors.length,knownUnavailableCssAssets:remoteCssWarnings.size,linksOutsideCopy:missing.size}));
if(missing.size)errors.push('Unexpected internal links outside the copied route set');
if(errors.length){console.error(report.errors.slice(0,15).join('\n'));process.exit(1);}
