const $=id=>document.getElementById(id), c=window.weddingConfig;
function text(id,v){const e=$(id);if(e)e.textContent=v??""}
function init(){
 const b=c.brideName||"Bride's Name",g=c.groomName||"Groom's Name";
 text("brideHero",b);text("brideCard",b);text("groomHero",g);text("groomCard",g);
 text("heroDate",c.weddingDateDisplay);text("cardDate",c.weddingDateDisplay);text("weekday",c.weddingWeekday);
 const d=new Date(c.weddingDateTime);text("monthYear",isNaN(d)?"MONTH YEAR":d.toLocaleDateString("en-IN",{month:"long",year:"numeric"}).toUpperCase());
 text("venueName",c.venueName);text("venueAddress",c.venueAddress);text("venueDateTime",`${c.weddingDateDisplay} · ${c.ceremonyTime}`);
 text("closingNames",`${b} & ${g}`);text("footerNames",`${b} & ${g}`);$("mapLink").href=c.mapUrl||"https://www.google.com/maps";
 const grid=$("eventGrid");(c.events||[]).forEach(ev=>{const card=document.createElement("article");card.className="event-card";for(const [tag,cls,val] of [["div","icon",ev.icon||"✦"],["h3","",ev.name],["p","",ev.description],["p","event-date",[ev.date,ev.time].filter(Boolean).join(" · ")],["p","",ev.venue]]){if(!val)continue;const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=val;card.appendChild(el)}grid.appendChild(card)});
 updateTimer();setInterval(updateTimer,1000);
}
function updateTimer(){const target=new Date(c.weddingDateTime),now=Date.now();if(isNaN(target))return;let ms=target-now;if(ms<=0){["days","hours","minutes","seconds"].forEach(id=>text(id,"00"));return}const vals=[Math.floor(ms/86400000),Math.floor(ms%86400000/3600000),Math.floor(ms%3600000/60000),Math.floor(ms%60000/1000)];["days","hours","minutes","seconds"].forEach((id,i)=>text(id,String(vals[i]).padStart(2,"0")))}
function reveal(){ $("envelopeScreen").classList.add("hidden");$("invitation").classList.remove("hidden");$("invitation").scrollIntoView({behavior:"smooth"})}
$("openInvite").addEventListener("click",()=>{$("home").classList.add("hidden");$("envelopeScreen").classList.remove("hidden");scrollTo(0,0)});
$("envelopeButton").addEventListener("click",()=>{$("envelopeButton").classList.add("open");setTimeout(reveal,1050)});
$("skipEnvelope").addEventListener("click",reveal);$("backToTop").addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));init();