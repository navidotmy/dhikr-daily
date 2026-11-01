import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('data.js'),ctx);
vm.runInNewContext(read('mathurat.js'),ctx);
const entries=new Map(ctx.window.DHIKR_DATA.map(v=>[v.id,v]));
const col=new Map(ctx.window.DHIKR_COLLECTIONS.map(v=>[v.id,v]));
const short=[...Array.from({length:9},(_,i)=>i+1),...Array.from({length:18},(_,i)=>i+23),44,45,47];
const long=Array.from({length:49},(_,i)=>i+1);
for(const [id,seq] of [['mathurat-s',short],['mathurat-s-evening',short],['mathurat-k',long],['mathurat-k-evening',long]]){
 const c=col.get(id);assert(c,'Missing '+id);
 assert(!c.booklet,'Native reading mode required for '+id);
 assert.equal(c.items.length,seq.length);
 c.items.forEach((key,i)=>{
  const n=Number((key.match(/^ma(\d{2})/)||[])[1]);
  assert.equal(n,seq[i],id+' step '+(i+1));
  assert(entries.get(key)?.ar?.trim(),id+' Arabic missing for '+key);
  if(id.endsWith('-evening')&&[26,27,28,29,49].includes(n))assert(key.endsWith('e'),'Evening variant missing '+key);
  if(!id.endsWith('-evening'))assert(!key.endsWith('e'),'Wrong morning variant '+key);
 });
 assert(col.has('mathurat-booklet-'+id),'Optional booklet absent '+id);
}
assert.equal(ctx.window.DHIKR_MATHURAT_META.verifiedSequenceAgainstAkuIslam,true);
console.log('PASS: Aku Islam Sughra/Kubra morning/evening sequence, Arabic text and variants.');
