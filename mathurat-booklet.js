/* Dhikr Daily Al-Ma'thurat booklet sequence. Page order recovered from the user-provided Android APK's SlidingFragment static page lists, not guessed from filename order. */
(()=>{'use strict';
const ROOT='./mathurat/pages/';
const KUBRA=['page1_kubra',...Array.from({length:26},(_,i)=>`page${i+2}`)];
const SUGHRA=['page1_sughra',2,3,4,5,6,15,16,17,18,19,20,21,23,28,25,26,27].map(x=>typeof x==='number'?`page${x}`:x);
const SEQUENCES={kubra:KUBRA,sughra:SUGHRA};
const KEY='dhikr-mathurat-apk-v1';
const $=q=>document.querySelector(q);
const params=new URLSearchParams(location.search);
const safe=(value,valid,fallback)=>valid.includes(value)?value:fallback;
let edition=safe(params.get('edition'),['sughra','kubra'],'sughra');
let period=safe(params.get('period'),['pagi','petang'],'pagi');
let style='page';let zoom=100;let awake=null;let index=0;let busy=false;
const readJSON=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v&&typeof v==='object'?v:fallback}catch{return fallback}};
let saved=readJSON(KEY,{});
let preferences=readJSON('dhikr-daily-v1',{}).settings||{};
const scope=()=>`${edition}-${period}`;
const pages=()=>SEQUENCES[edition];
const notes={ms:'Nota: Risalah asal memaparkan lafaz pagi dan petang pada sebahagian halaman. Sila pilih lafaz yang sepadan dengan waktu bacaan anda. Paparan ini ialah imej halaman; kawalan saiz fon teks biasa tidak mengubah imej. Gunakan zum untuk membesarkan halaman.',en:'Note: The original booklet includes morning and evening alternatives on some pages. Read the wording appropriate to your chosen time. This is a scanned-page view, so normal text font settings do not affect it; use zoom instead.'};
function applyTheme(){const theme=preferences.theme||'system';document.documentElement.dataset.theme=theme;let accent=({emerald:'#176b5a',ocean:'#2868a5',plum:'#86639d',terracotta:'#b16a4e',olive:'#788046',rose:'#a95f75'})[preferences.accent]||'#176b5a';if(preferences.accent==='custom'&&/^#[0-9a-f]{6}$/i.test(preferences.customAccent||''))accent=preferences.customAccent;document.documentElement.style.setProperty('--accent',accent);document.documentElement.style.setProperty('--reading-font',preferences.textSize||16+'px');document.documentElement.classList.toggle('high-contrast',!!preferences.highContrast)}
function restore(){const value=saved[scope()];index=Math.min(Math.max(0,Number.isInteger(value?.index)?value.index:0),pages().length-1)}
function persist(){saved[scope()]={...saved[scope()],index,updated:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(saved))}
function setVariant(e,p){edition=e;period=p;restore();const query=new URLSearchParams({edition,period});history.replaceState(null,'',`?${query}`);draw()}
function imageSrc(name){return ROOT+name+'.webp'}
function pageNumber(name){return name.startsWith('page1_')?'Cover':name.replace('page','')}
function languages(){return preferences.lang==='en'?'en':'ms'}
function draw(){const ms=languages()==='ms';let list=pages();if(index>=list.length)index=list.length-1;
 $('#title').textContent=`Al-Ma’thurat ${edition==='sughra'?'Sughra':'Kubra'} · ${period==='pagi'?(ms?'Pagi':'Morning'):(ms?'Petang':'Evening')}`;
 $('#note').textContent=notes[languages()];
 $('#edition').value=edition;$('#period').value=period;$('#mode').value=style;
 $('#position').textContent=`${index+1} / ${list.length}`;
 $('#page-label').textContent=(ms?'Halaman risalah ':'Booklet page ')+pageNumber(list[index]);
 $('#progress').style.width=`${((index+1)/list.length)*100}%`;
 $('#prev').disabled=index===0;$('#next').textContent=index===list.length-1?(ms?'Selesai ✓':'Finish ✓'):(ms?'Seterusnya →':'Next →');
 $('#zoom').value=zoom;$('#zoom-label').textContent=zoom+'%';
 $('#page-image').src=imageSrc(list[index]);$('#page-image').alt=`Al-Ma’thurat ${edition} ${pageNumber(list[index])}`;
 $('#page-image').style.width=`${zoom}%`;
 $('#reading-page').hidden=style!=='page';$('#reading-stream').hidden=style!=='continuous';
 if(style==='continuous'){
   $('#reading-stream').innerHTML=list.map((name,i)=>`<figure class="sheet"><img src="${imageSrc(name)}" loading="${i<2?'eager':'lazy'}" alt="${edition} page ${pageNumber(name)}"><figcaption>${ms?'Halaman':'Page'} ${i+1} / ${list.length} · ${pageNumber(name)}</figcaption></figure>`).join('');
 }
 $('#completed').hidden=!saved[scope()]?.completed;
 document.title=`Al-Ma’thurat ${edition} ${period} — Dhikr Daily`;
 persist();
}
function next(){if(index>=pages().length-1){saved[scope()]={...saved[scope()],completed:new Date().toISOString()};persist();draw();return;}index++;persist();draw();window.scrollTo({top:0,behavior:'instant'})}
function previous(){index=Math.max(0,index-1);persist();draw();window.scrollTo({top:0,behavior:'instant'})}
function syncSetting(){preferences=readJSON('dhikr-daily-v1',{}).settings||{};applyTheme();draw()}
$('#edition').addEventListener('change',e=>setVariant(e.target.value,period));
$('#period').addEventListener('change',e=>setVariant(edition,e.target.value));
$('#mode').addEventListener('change',e=>{style=e.target.value;draw()});
$('#prev').addEventListener('click',previous);$('#next').addEventListener('click',next);
$('#zoom').addEventListener('input',e=>{zoom=+e.target.value;$('#zoom-label').textContent=zoom+'%';$('#page-image').style.width=`${zoom}%`});
$('#restart').addEventListener('click',()=>{if(confirm(languages()==='ms'?'Mula bacaan dari halaman pertama?':'Restart from the first page?')){index=0;delete saved[scope()]?.completed;persist();draw();}});
$('#print').addEventListener('click',()=>window.print());
$('#awake').addEventListener('click',async()=>{if(!('wakeLock'in navigator)){alert('Screen wake lock is unavailable on this device.');return;}try{if(awake){await awake.release();awake=null}else{awake=await navigator.wakeLock.request('screen')}$('#awake').setAttribute('aria-pressed',String(!!awake));$('#awake').textContent=awake?'◉ Screen awake':'◯ Keep screen awake';}catch(e){console.warn(e)}});
window.addEventListener('storage',e=>{if(e.key==='dhikr-daily-v1')syncSetting()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&awake){awake.release();awake=null;$('#awake').setAttribute('aria-pressed','false')}});
document.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea'))return;if(e.key==='ArrowRight'){next()}else if(e.key==='ArrowLeft'){previous()}});
let startX=0,startY=0;$('#reading-page').addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY},{passive:true});$('#reading-page').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>85&&Math.abs(dx)>Math.abs(dy)*1.5){if(dx<0)next();else previous()}},{passive:true});
applyTheme();restore();draw();
})();
