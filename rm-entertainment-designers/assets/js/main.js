(function(){
"use strict";
var FORM_ENDPOINT="";                       /* paste your form service URL to enable delivery */
var RM_CONTACT={whatsapp:"",phone:"",email:"",instagram:""}; /* shown only when filled */
var B=window.RM_BASE||"",M=window.RM_MEDIA||{sections:{},founders:[]};
var LABEL={"home": "Home", "about": "About", "founders": "Founders", "behind-the-scenes": "Behind the Scenes", "sangeet-entry": "Sangeet Entry", "varmala-entry": "Varmala Entry", "haldi-entry": "Haldi Entry", "choreography": "Choreography", "special-artists": "Special Artists", "virtual-sessions": "Virtual Sessions", "technical-rehearsals": "Technical Rehearsals"};
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var yr=$("#yr");if(yr)yr.textContent=new Date().getFullYear();
/* navigation */
var ddb=$("#ddb"),ddm=$("#ddm"),bg=$("#burger"),mn=$("#mnav"),mxb=$("#mxb"),msub=$("#msub");
function tg(b,m,o){var v=o===undefined?!m.classList.contains("open"):o;m.classList.toggle("open",v);b.setAttribute("aria-expanded",v)}
ddb.onclick=function(){tg(ddb,ddm)};bg.onclick=function(){tg(bg,mn)};
mxb.onclick=function(){tg(mxb,msub);mxb.textContent="Experiences "+(msub.classList.contains("open")?"\u2212":"+")};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&ddm.classList.contains("open")){tg(ddb,ddm,false);ddb.focus()}});
document.addEventListener("click",function(e){if(!e.target.closest(".has"))tg(ddb,ddm,false)});
ddm.addEventListener("focusout",function(e){if(!ddm.parentNode.contains(e.relatedTarget))tg(ddb,ddm,false)});
addEventListener("scroll",function(){$("#hdr").classList.toggle("sm",scrollY>60)},{passive:true});
/* hero media (optional) */
var hm=$("#heroMedia");
if(hm&&M.hero&&M.hero.src){var calm=matchMedia("(prefers-reduced-motion:reduce)").matches||(navigator.connection&&(navigator.connection.saveData||/2g/.test(navigator.connection.effectiveType)));
 if(/\.(mp4|webm)$/i.test(M.hero.src)){hm.innerHTML='<video id="hv" muted loop playsinline poster="'+B+(M.hero.poster||"")+'" aria-label="Showreel, muted"><source src="'+B+M.hero.src+'"></video><button class="pause" type="button">Pause video</button>';
  var v=$("#hv"),pb=$(".pause",hm);if(!calm){v.play().catch(function(){});}else pb.textContent="Play video";
  pb.onclick=function(){if(v.paused){v.play();pb.textContent="Pause video"}else{v.pause();pb.textContent="Play video"}}}
 else hm.innerHTML='<img src="'+B+M.hero.src+'" alt="Performers at a wedding celebration">'}
/* video grids */
var vd=$("#vd"),vp=$("#vp"),last;
$$("[data-videos]").forEach(function(c){
 var h="";c.dataset.videos.split(",").forEach(function(k){(M.sections[k]||[]).forEach(function(x,i){
  var lab=LABEL[k]||k,n=i+1,ttl=esc(x.title||"Video "+n);
  if(x.src){h+='<figure class="vt" data-k="'+k+'"><button type="button" data-k="'+k+'" data-i="'+i+'" aria-label="Play video: '+ttl+' ('+esc(lab)+')">'+(x.poster?'<img src="'+B+x.poster+'" alt="" loading="lazy">':'')+'<span class="play">Play video</span></button><figcaption><strong>'+ttl+'</strong><span>'+esc(lab)+'</span></figcaption></figure>'}
  else{h+='<figure class="vt" data-k="'+k+'"><div class="tile" role="img" aria-label="Placeholder for '+esc(lab)+' video '+n+'"></div><figcaption><strong>Video '+n+' (coming soon)</strong><span>'+esc(lab)+'</span></figcaption></figure>'}
 })});c.innerHTML=h;
 c.addEventListener("click",function(e){var b=e.target.closest("button[data-k]");if(!b)return;last=b;var m=M.sections[b.dataset.k][b.dataset.i];vp.src=B+m.src;vp.poster=m.poster?B+m.poster:"";vd.showModal();vp.play().catch(function(){})});
});
function closeV(){vp.pause();vp.removeAttribute("src");vp.load();if(vd.open)vd.close();if(last)last.focus()}
$("#vx").onclick=closeV;vd.onclose=function(){vp.pause();if(last)last.focus()};vd.onclick=function(e){if(e.target===vd)closeV()};
$$(".filters button").forEach(function(b){b.onclick=function(){$$(".filters button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});$$(".vt").forEach(function(f){f.hidden=!(b.dataset.f==="all"||f.dataset.k===b.dataset.f)})}});
/* founders */
var fo=$("#founders");
if(fo){var fl=(M.founders&&M.founders.length)?M.founders:[{},{}];fo.innerHTML=fl.map(function(f){var e=!f.name;return '<article class="fc'+(e?" empty":"")+'"><div class="pic"><div>'+(f.photo?'<img src="'+B+f.photo+'" alt="'+esc(f.name||"Founder")+'" loading="lazy">':'')+'</div></div><h3>'+esc(f.name||"Founder name")+'</h3><p class="role">'+esc(f.role||"Role")+'</p><p>'+esc(f.bio||"A short biography will appear here.")+'</p></article>'}).join("")}
/* contact links + form */
var cl=$("#contactLinks");
if(cl){var L=[["WhatsApp",RM_CONTACT.whatsapp],["Phone",RM_CONTACT.phone&&"tel:"+RM_CONTACT.phone],["Email",RM_CONTACT.email&&"mailto:"+RM_CONTACT.email],["Instagram",RM_CONTACT.instagram]].filter(function(x){return x[1]});cl.innerHTML=L.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>'}).join(" &nbsp; ")}
var f=$("#enq");
if(f){var busy=false,pre=new URLSearchParams(location.search).get("service");
 $$("[name=svc]",f).forEach(function(c){if(c.dataset.slug===pre)c.checked=true});
 var nd=$("#nd"),dt=$("#date");nd.onchange=function(){dt.disabled=nd.checked;if(nd.checked)dt.value=""};
 f.addEventListener("submit",function(e){
  e.preventDefault();if(busy)return;
  $$(".err",f).forEach(function(x){x.textContent=""});$$("[aria-invalid]",f).forEach(function(x){x.removeAttribute("aria-invalid")});
  var er=[];function bad(id,msg,eid){er.push([id,msg]);$("#e-"+(eid||id)).textContent=msg;var el=$("#"+id);if(el&&el.setAttribute)el.setAttribute("aria-invalid","true")}
  var g=function(n){return f.elements[n].value.trim()},pref=g("pref"),em=g("email"),ph=g("phone");
  if(!g("name"))bad("name","Enter your name.");
  if(!pref)bad("pref","Choose how you\u2019d like us to reach you.");
  if(em&&!/^\S+@\S+\.\S+$/.test(em))bad("email","Enter an email address like name@example.com.");
  else if(pref==="Email"&&!em)bad("email","Enter your email address, since you prefer email.");
  if((pref==="Phone call"||pref==="WhatsApp")&&!ph)bad("phone","Enter your phone number, since you prefer a call or WhatsApp.");
  if(pref==="Any"&&!em&&!ph)bad("email","Enter an email address or phone number.");
  if(!$("[name=svc]:checked",f))bad("svs","Choose at least one service.","svc");
  if(!f.elements.consent.checked)bad("consent","Please tick the box so we can contact you.");
  var sm=$("#sum");
  if(er.length){sm.hidden=false;sm.innerHTML="<strong>Please fix the following:</strong><ul>"+er.map(function(x){return '<li><a href="#" data-t="'+x[0]+'">'+x[1]+'</a></li>'}).join("")+"</ul>";
   $$("a",sm).forEach(function(a){a.onclick=function(ev){ev.preventDefault();var t=$("#"+a.dataset.t);(t.querySelector("input")||t).focus()}});sm.focus();return}
  sm.hidden=true;var btn=$("#go"),res=$("#res");busy=true;btn.disabled=true;btn.textContent="Sending\u2026";
  var data={};new FormData(f).forEach(function(v,k){if(k!=="svc")data[k]=v});data.services=$$("[name=svc]:checked",f).map(function(x){return x.value});
  var p=FORM_ENDPOINT?fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)}).then(function(r){if(!r.ok)throw new Error("failed")}):Promise.reject(new Error("nc"));
  p.then(function(){res.className="res";res.innerHTML="<strong>Enquiry received.</strong> Thank you. We\u2019ll get in touch using your preferred method. This is not a booking confirmation.";f.reset()})
   .catch(function(x){res.className="res warn";res.innerHTML=x.message==="nc"?"<strong>Your enquiry has not been sent.</strong> Delivery isn\u2019t connected yet. Your answers are still in the form.":"<strong>We couldn\u2019t send your enquiry.</strong> Check your connection and try again. Your answers are still in the form."})
   .then(function(){busy=false;btn.disabled=false;btn.textContent="Send Enquiry";res.scrollIntoView({block:"nearest"})});
 });}
})();
