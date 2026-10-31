import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const window={};vm.runInNewContext(read('data.js'),{window});
const data=window.DHIKR_DATA,cols=window.DHIKR_COLLECTIONS;
assert(Array.isArray(data)&&data.length>=28,'Expected curated supplications');
assert(Array.isArray(cols)&&cols.length>=10,'Expected curated reading paths');
const ids=new Set(data.map(x=>x.id));assert.equal(ids.size,data.length,'Duplicate starter IDs');
for(const it of data){assert(it.id&&it.ar&&it.ref&&it.en&&it.msText,`Missing core content: ${it.id}`);assert(it.repeat>=1);}
for(const c of cols){for(const id of c.items)assert(ids.has(id),`Unknown collection reference: ${c.id}/${id}`)}
const hisn=JSON.parse(read('hisn-full.json'));
const chapters=Object.entries(hisn).filter(([,v])=>Array.isArray(v?.Adhkar));
const total=chapters.reduce((acc,[,v])=>acc+v.Adhkar.length,0);
assert.equal(chapters.length,133,'Expected 133 Arabic Hisnul Muslim chapters');
assert.equal(total,302,'Expected 302 corpus entries');
for(const [title,v] of chapters){assert(title.trim());for(const it of v.Adhkar)assert(it.Text&&it.Reference!==undefined,'Incomplete Arabic record')}

// Al-Ma’thurat: draft secondary-source paths; exact reference app comparison pending.
vm.runInNewContext(read('mathurat.js'),{window});
const mathIds=new Set(window.DHIKR_DATA.map(x=>x.id));
assert.equal(mathIds.size,window.DHIKR_DATA.length,'Duplicate IDs after Al-Ma’thurat load');
const expectedMath={'mathurat-s':32,'mathurat-s-evening':32,'mathurat-k':43,'mathurat-k-evening':43};
for(const [id,len] of Object.entries(expectedMath)){
 const c=window.DHIKR_COLLECTIONS.find(x=>x.id===id);
 assert(c&&c.draft,'Missing provisional four-way Al-Ma’thurat path: '+id);
 assert.equal(c.items.length,len,'Sequence length '+id);
 assert.equal(new Set(c.items).size,len,'Duplicate reference inside '+id);
 for(const itemId of c.items)assert(mathIds.has(itemId),'Missing Arabic entry '+itemId);
}
assert.notEqual(window.DHIKR_DATA.find(x=>x.id==='mat-p-21').ar,window.DHIKR_DATA.find(x=>x.id==='mat-e-21').ar);
assert.notEqual(window.DHIKR_DATA.find(x=>x.id==='mat-p-42').ar,window.DHIKR_DATA.find(x=>x.id==='mat-e-42').ar);
for(const it of window.DHIKR_DATA.filter(x=>x.id.startsWith('mat-'))) {
 assert(it.ar&&it.repeat>=1&&it.ref,'Missing Al-Ma’thurat content: '+it.id);
 assert(!/[\\u0590-\\u05ff]/.test(it.ar),'Unexpected script character in '+it.id);
}
assert(read('index.html').includes('./mathurat.js'),'Missing Mathurat script');
assert(read('service-worker.js').includes("'./mathurat.js'"),'Mathurat must be cached offline');
const manifest=JSON.parse(read('manifest.webmanifest'));assert(manifest.icons.length>=2);
const sw=read('service-worker.js');assert(sw.includes("'./hisn-full.json'"),'Hisn corpus must be offline cached');
for(const asset of ['./index.html','./app.js','./data.js','./mathurat.js','./styles.css','./hisn-full.json','./service-worker.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png']){
 const path=new URL('../'+asset.slice(2),import.meta.url);assert(fs.existsSync(path),`Missing ${asset}`)
}
assert(read('app.js').includes('loadBundledHisn()'));
assert(read('app.js').includes("readerMode:'guided'"));
console.log(`Dhikr Daily sanity checks passed: ${data.length} curated records; ${cols.length} paths; ${chapters.length} Hisnul Muslim chapters; ${total} Arabic entries.`);
