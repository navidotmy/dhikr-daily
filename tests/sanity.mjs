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
const manifest=JSON.parse(read('manifest.webmanifest'));assert(manifest.icons.length>=2);
const sw=read('service-worker.js');assert(sw.includes("'./hisn-full.json'"),'Hisn corpus must be offline cached');
for(const asset of ['./index.html','./app.js','./data.js','./styles.css','./hisn-full.json','./service-worker.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png']){
 const path=new URL('../'+asset.slice(2),import.meta.url);assert(fs.existsSync(path),`Missing ${asset}`)
}
assert(read('app.js').includes('loadBundledHisn()'));
assert(read('app.js').includes("readerMode:'guided'"));
console.log(`Dhikr Daily sanity checks passed: ${data.length} curated records; ${cols.length} paths; ${chapters.length} Hisnul Muslim chapters; ${total} Arabic entries.`);
