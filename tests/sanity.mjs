import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const window={};vm.runInNewContext(read('data.js'),{window});
vm.runInNewContext(read('mathurat.js'),{window});
const paths=new Map(window.DHIKR_COLLECTIONS.map(c=>[c.id,c]));
assert.equal(paths.get('mathurat-s').items.length,30);
assert.equal(paths.get('mathurat-s-evening').items.length,30);
assert.equal(paths.get('mathurat-k').items.length,49);
assert.equal(paths.get('mathurat-k-evening').items.length,49);
assert.notEqual(paths.get('mathurat-s').items[13],paths.get('mathurat-s-evening').items[13],'Expected morning/evening Arabic variants');
assert(paths.get('mathurat-k').items.includes('ma48'));
assert(!paths.get('mathurat-s').items.includes('ma48'));
const m25=window.DHIKR_DATA.find(x=>x.id==='ma25');assert(m25.ar.startsWith('قُلْ أَعُوذُ'));
assert(window.DHIKR_DATA.find(x=>x.id==='ma49e').ar.startsWith('اللَّهُمَّ إِنَّ هَذَا'));

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

// Additional collection integrity checks for version 2.1.
const mathRows=window.DHIKR_DATA.filter(x=>x.id.startsWith('ma') && !x.id.startsWith('mat-') && (x.id.length===4 || x.id.length===5));
assert.equal(mathRows.length,54,'49 main steps plus 5 evening alternates expected');
for(const it of mathRows) assert(it.ar&&it.ref&&it.repeat>=1,'Missing Mathurat text: '+it.id);
for(const c of window.DHIKR_COLLECTIONS.filter(c=>c.id.startsWith('mathurat-'))){
 assert.equal(new Set(c.items).size,c.items.length,'Repeated item ID in '+c.id);
 assert(c.draft,'Collection must be labelled pending edition verification: '+c.id);
}
assert(read('index.html').includes('./mathurat.js'),'Missing mathurat script');

const manifest=JSON.parse(read('manifest.webmanifest'));assert(manifest.icons.length>=2);
const sw=read('service-worker.js');assert(sw.includes("'./mathurat.js'"),'Mathurat data must be offline cached');assert(sw.includes("'./hisn-full.json'"),'Hisn corpus must be offline cached');
for(const asset of ['./index.html','./app.js','./data.js','./mathurat.js','./styles.css','./hisn-full.json','./service-worker.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png']){
 const path=new URL('../'+asset.slice(2),import.meta.url);assert(fs.existsSync(path),`Missing ${asset}`)
}
assert(read('app.js').includes('loadBundledHisn()'));
assert(read('app.js').includes("readerMode:'guided'"));
console.log(`Dhikr Daily sanity checks passed: ${data.length} curated records; ${cols.length} paths; ${chapters.length} Hisnul Muslim chapters; ${total} Arabic entries.`);
