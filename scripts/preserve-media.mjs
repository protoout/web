// Run manually before retiring Wraptas. Resumes partial files outside public/.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
const mapFile='migration/media-map.json';
const media=JSON.parse(await fs.readFile(mapFile,'utf8'));
await fs.mkdir('.cache/media',{recursive:true});
let stopped=false,active;
process.on('SIGINT',()=>{stopped=true;active?.abort();});
for(const entry of media){
  if(stopped)break;
  if(entry.status==='downloaded')continue;
  const name=crypto.createHash('sha256').update(entry.sourceUrl).digest('hex').slice(0,20)+path.extname(new URL(entry.sourceUrl).pathname);
  const partial=path.join('.cache/media',name+'.part');
  try{
    const offset=await fs.stat(partial).then(s=>s.size).catch(()=>0);
    active=new AbortController();
    const response=await fetch(entry.sourceUrl,{headers:offset?{Range:`bytes=${offset}-`}:{},signal:active.signal});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    if(offset&&response.status===206&&!response.headers.get('content-range')?.startsWith(`bytes ${offset}-`))throw new Error('Unexpected partial response');
    if(!/^video\//.test(response.headers.get('content-type')||''))throw new Error('Expected a video response');
    await pipeline(Readable.fromWeb(response.body),createWriteStream(partial,{flags:offset&&response.status===206?'a':'w'}));
    const bytes=(await fs.stat(partial)).size;
    if(bytes!==entry.sourceBytes)throw new Error(`Size differs from preserved source metadata: ${bytes}`);
    const sha256=crypto.createHash('sha256').update(await fs.readFile(partial)).digest('hex');
    const target=path.join('public/assets',name);
    await fs.rename(partial,target);
    Object.assign(entry,{status:'downloaded',path:'assets/'+name,bytes,sha256});
    delete entry.reason;
    console.log(`Preserved ${name} (${bytes} bytes)`);
  }catch(error){entry.reason=String(error);process.exitCode=1;console.error(`Pending ${name}: ${error}`);}
  await fs.writeFile(mapFile,JSON.stringify(media,null,2)+'\n');
}
// Update only references whose complete original file was saved successfully.
const pagesFile='src/data/pages.json';
const pages=JSON.parse(await fs.readFile(pagesFile,'utf8'));
for(const page of pages)for(const entry of media){
  if(entry.status!=='downloaded')continue;
  for(const attribute of ['src','data-src']){
    for(const fragment of ['', '#t=0.001', '#t=0.001#t=0.001'])
      page.html=page.html.replaceAll(` ${attribute}="${entry.sourceUrl}${fragment}"`,` ${attribute}="__PROTOOUT_BASE__${entry.path}${attribute==='src'?'#t=0.001':''}"`);
  }
}
await fs.writeFile(pagesFile,JSON.stringify(pages));
console.log('Run npm run build and npm run verify before publishing.');
