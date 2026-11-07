'use strict';
const $=s=>document.querySelector(s);
const art=$('#artwork'),scene=$('#scene'),viewport=$('#viewport'),shots=new Map();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let sceneW=0,sceneH=0,sceneLeft=0,sceneTop=0,drag=null,suppressClick=false,toastTimer;
let activePrivacy=null,noiseFrame=0,lastNoiseTime=0;

function place(){Object.assign(scene.style,{width:sceneW+'px',height:sceneH+'px',left:sceneLeft+'px',top:sceneTop+'px'})}
function layout(){const ratio=2400/1637;sceneW=Math.max(innerWidth,innerHeight*ratio);sceneH=sceneW/ratio;sceneLeft=(innerWidth-sceneW)*(innerWidth<600?.65:.5);sceneTop=innerHeight-sceneH;place()}
function centerOn(box){sceneLeft=Math.min(0,Math.max(innerWidth-sceneW,innerWidth/2-(box.x+box.w/2)/100*sceneW));sceneTop=Math.min(0,Math.max(innerHeight-sceneH,innerHeight/2-(box.y+box.h/2)/100*sceneH));place()}
function ensureVisible(box){const x=sceneLeft+(box.x+box.w/2)/100*sceneW,y=sceneTop+(box.y+box.h/2)/100*sceneH;if(x<65||x>innerWidth-65||y<100||y>innerHeight-120)centerOn(box)}
function regionStyle(element,box){Object.assign(element.style,{left:box.x+'%',top:box.y+'%',width:box.w+'%',height:box.h+'%'})}

// Collection crops and magnifying lenses never reproduce an annotated face.
function drawExact(canvas,object){
 if(!art.naturalWidth)return;
 const b=object.box,w=b.w/100*art.naturalWidth,h=b.h/100*art.naturalHeight,scale=Math.min(1,640/Math.max(w,h));
 canvas.width=Math.max(1,Math.round(w*scale));canvas.height=Math.max(1,Math.round(h*scale));
 const ctx=canvas.getContext('2d');ctx.drawImage(art,b.x/100*art.naturalWidth,b.y/100*art.naturalHeight,w,h,0,0,canvas.width,canvas.height);
 for(const {box:f} of privacyRegions){
  const x=Math.max(b.x,f.x),y=Math.max(b.y,f.y),right=Math.min(b.x+b.w,f.x+f.w),bottom=Math.min(b.y+b.h,f.y+f.h);
  if(right<=x||bottom<=y)continue;
  ctx.fillStyle='#343934';ctx.fillRect((x-b.x)/b.w*canvas.width,(y-b.y)/b.h*canvas.height,(right-x)/b.w*canvas.width,(bottom-y)/b.h*canvas.height);
 }
}

// Larger boxes are underneath smaller, more precise targets, including while hovered.
const orderedObjects=[...objects].sort((a,b)=>b.box.w*b.box.h-a.box.w*a.box.h);
orderedObjects.forEach((o,index)=>{
 const b=o.box,button=document.createElement('button');button.className='object-target'+(b.y>65?' label-above':'');button.dataset.id=o.id;button.setAttribute('aria-label',o.name+' 찍기');regionStyle(button,b);button.style.setProperty('--layer',index+1);
 const lens=document.createElement('canvas');lens.setAttribute('aria-hidden','true');const label=document.createElement('span');label.className='object-label';label.innerHTML=`${o.name}<small>${o.en}</small><b>CLICK TO CAPTURE ↗</b>`;
 button.append(lens,label);o.element=button;o.canvas=lens;
 button.addEventListener('click',e=>{e.stopPropagation();if(!suppressClick){endPrivacy();capture(o)}});
 button.addEventListener('focus',()=>{if(button.matches(':focus-visible')){endPrivacy();ensureVisible(b)}});
 $('#targets').append(button);
});

function paintNoise(region){
 const canvas=region.canvas,ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,frame=ctx.createImageData(w,h);
 for(let i=0;i<frame.data.length;i+=4){const v=43+Math.floor(Math.random()*84);frame.data[i]=v;frame.data[i+1]=v+3;frame.data[i+2]=v;frame.data[i+3]=255}
 ctx.putImageData(frame,0,0);
 ctx.fillStyle='#151c1880';for(let y=0;y<h;y+=4)ctx.fillRect(0,y,w,1);
 for(let i=0;i<3;i++){const y=Math.random()*h;ctx.fillStyle=i%2?'#a1aaa166':'#171c1acc';ctx.fillRect(0,y,w,1+Math.random()*3)}
}
function animateNoise(time){if(!activePrivacy)return;if(time-lastNoiseTime>95){paintNoise(activePrivacy);lastNoiseTime=time}if(!reducedMotion.matches&&!document.hidden)noiseFrame=requestAnimationFrame(animateNoise)}
function endPrivacy(){cancelAnimationFrame(noiseFrame);noiseFrame=0;if(activePrivacy)activePrivacy.element.classList.remove('active');activePrivacy=null;viewport.classList.remove('privacy-active')}
function startPrivacy(region){if(activePrivacy===region)return;endPrivacy();activePrivacy=region;region.element.classList.add('active');viewport.classList.add('privacy-active');objects.forEach(o=>o.element.style.setProperty('--near',0));paintNoise(region);if(!reducedMotion.matches)noiseFrame=requestAnimationFrame(animateNoise)}
privacyRegions.forEach((region,index)=>{
 const button=document.createElement('button');button.className='privacy-target';button.dataset.privacy=region.id;button.setAttribute('aria-label',`프라이버시 영역 ${index+1}`);regionStyle(button,region.box);
 const canvas=document.createElement('canvas');canvas.width=100;canvas.height=Math.max(20,Math.round(100*region.box.h*1637/(region.box.w*2400)));canvas.setAttribute('aria-hidden','true');button.append(canvas);region.element=button;region.canvas=canvas;
 button.addEventListener('pointerenter',e=>{if(!drag?.moved&&e.pointerType!=='touch')startPrivacy(region)});
 button.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch'&&activePrivacy===region)endPrivacy()});
 button.addEventListener('focus',()=>{if(button.matches(':focus-visible')){ensureVisible(region.box);startPrivacy(region)}});
 button.addEventListener('blur',()=>{if(activePrivacy===region&&!button.matches(':hover'))endPrivacy()});
 button.addEventListener('click',e=>{e.stopPropagation();if(!suppressClick)startPrivacy(region)});
 $('#privacy-regions').append(button);
});
reducedMotion.addEventListener('change',()=>{if(activePrivacy){const region=activePrivacy;endPrivacy();startPrivacy(region)}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)endPrivacy()});

function capture(o){if(shots.has(o.id)){showToast(o.name+' · 이미 담은 사물이에요');return}shots.set(o.id,o);o.element.classList.add('captured');o.element.querySelector('b').textContent='CAPTURED ✓';o.element.classList.remove('shot');void o.element.offsetWidth;o.element.classList.add('shot');renderFilm();showToast(o.name+' · 오늘의 시선에 담았어요')}
function showToast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2000)}
function renderFilm(){
 const film=$('#film');film.replaceChildren();if(!shots.size){const p=document.createElement('p');p.className='film-empty';p.textContent='아직 담은 사물이 없어요. 그림 속 물건을 찾아 눌러보세요.';film.append(p)}
 shots.forEach(o=>{const card=document.createElement('button');card.className='shot-card';card.setAttribute('aria-label',o.name+' 위치 보기');const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');drawExact(canvas,o);const label=document.createElement('span');label.textContent=o.name;card.append(canvas,label);card.addEventListener('click',()=>{$('#collection-dialog').close();centerOn(o.box);o.element.focus({preventScroll:true})});film.append(card)});
 $('#count').textContent=$('#dialog-count').textContent=String(shots.size).padStart(2,'0');$('.total').textContent='/ '+objects.length;$('#object-total').textContent=objects.length;$('#reset').disabled=!shots.size;$('#collection').setAttribute('aria-label',`모은 사물 ${shots.size}개 보기`);
}
function clearProximity(){objects.forEach(o=>o.element.style.setProperty('--near',0))}
function updateProximity(e){
 clearProximity();if(e.pointerType==='touch'||activePrivacy)return;
 const nearby=objects.map(o=>{const b=o.box,x=sceneLeft+b.x/100*sceneW,y=sceneTop+b.y/100*sceneH,w=b.w/100*sceneW,h=b.h/100*sceneH;return {o,distance:Math.hypot(Math.max(x-e.clientX,0,e.clientX-x-w),Math.max(y-e.clientY,0,e.clientY-y-h)),area:w*h}}).filter(n=>n.distance<65).sort((a,b)=>a.distance-b.distance||a.area-b.area);
 const chosen=nearby[0]?.distance===0?nearby.slice(0,1):nearby.slice(0,2);chosen.forEach(({o,distance})=>o.element.style.setProperty('--near',Math.max(0,1-distance/65).toFixed(3)));
}
viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;if(!e.target.closest('.privacy-target'))endPrivacy();drag={x:e.clientX,y:e.clientY,sceneLeft,sceneTop,id:e.pointerId,moved:false};suppressClick=false});
viewport.addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>6)drag.moved=true;if(drag.moved){endPrivacy();viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');sceneLeft=Math.min(0,Math.max(innerWidth-sceneW,drag.sceneLeft+dx));sceneTop=Math.min(0,Math.max(innerHeight-sceneH,drag.sceneTop+dy));place();clearProximity();return}}updateProximity(e)});
function stopDrag(e){if(!drag)return;suppressClick=drag.moved;drag=null;viewport.classList.remove('dragging');if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);setTimeout(()=>suppressClick=false,0)}
viewport.addEventListener('pointerup',stopDrag);viewport.addEventListener('pointercancel',stopDrag);viewport.addEventListener('pointerleave',clearProximity);
viewport.addEventListener('click',()=>{endPrivacy();if(document.activeElement instanceof HTMLElement)document.activeElement.blur()});
$('#about').addEventListener('click',()=>{endPrivacy();$('#about-dialog').showModal()});$('#collection').addEventListener('click',()=>{endPrivacy();$('#collection-dialog').showModal()});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()})});
$('#reset').addEventListener('click',()=>{shots.clear();objects.forEach(o=>{o.element.classList.remove('captured','shot');o.element.querySelector('b').textContent='CLICK TO CAPTURE ↗'});renderFilm()});
function ready(){objects.forEach(o=>drawExact(o.canvas,o));renderFilm()}
art.addEventListener('load',ready);if(art.complete&&art.naturalWidth)ready();art.addEventListener('error',()=>{showToast('그림을 불러오지 못했어요. 새로고침해 주세요.');$('#targets').hidden=true;$('#privacy-regions').hidden=true});addEventListener('resize',layout);layout();renderFilm();
