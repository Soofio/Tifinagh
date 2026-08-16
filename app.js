/* Données pédagogiques — à enrichir/corriger selon la convention retenue. */
const letters = [
["ⴰ","a","ا"],["ⴱ","b","ب"],["ⴳ","g","ⴳ / گ"],["ⴳⵯ","gw","ⴳⵯ"],["ⴷ","d","د"],
["ⴹ","ḍ","ض"],["ⴻ","e","ⴻ"],["ⴼ","f","ف"],["ⴽ","k","ك"],["ⵀ","h","ه"],
["ⵃ","ḥ","ح"],["ⵄ","ɛ","ع"],["ⵅ","x","خ"],["ⵇ","q","ق"],["ⵉ","i","ي"],
["ⵊ","j","ج"],["ⵍ","l","ل"],["ⵎ","m","م"],["ⵏ","n","ن"],["ⵔ","r","ر"],
["ⵕ","ṛ","ر"],["ⵙ","s","س"],["ⵚ","ṣ","ص"],["ⵛ","c","ش"],["ⵜ","t","ت"],
["ⵟ","ṭ","ط"],["ⵡ","w","و"],["ⵢ","y","ي"],["ⵣ","z","ز"],["ⵥ","ẓ","ظ"]
].map(([t,l,a])=>({t,l,a}));

/* Exemples de mots pour la V1. Les formes latines/arabe peuvent être enrichies
   selon la convention éditoriale que tu souhaites utiliser. */
const words = [
 {t:"ⴰⵎⴰⵣⵉⵖ", l:"amazigh", a:"أمازيغ"},
 {t:"ⵜⴰⵎⴰⵣⵉⵖⵜ", l:"tamazight", a:"تمازيغت"},
 {t:"ⴰⵣⵓⵍ", l:"azul", a:"أزول"},
 {t:"ⵜⴰⴼⵓⵢⵜ", l:"tafuyt", a:"تافويت"},
 {t:"ⴰⴼⵓⵙ", l:"afus", a:"أفوس"}
];

const $=s=>document.querySelector(s);
const navItems=[
 ["home","Accueil"],["alphabet","Alphabet"],["cards","Cartes"],["quiz","Quiz"],["words","Mots"]
];
let mode="home", cardIndex=0, cardShow=false, quiz=null, wordIndex=0, score=JSON.parse(localStorage.tifinaghScore||'{"quiz":0,"total":0,"words":0}');
let deferredPrompt=null;

function save(){localStorage.tifinaghScore=JSON.stringify(score)}
function speak(text){
 if(!("speechSynthesis" in window)){alert("La synthèse vocale n'est pas disponible sur cet appareil.");return}
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);
 u.lang="zgh-MA";
 u.rate=.75;
 speechSynthesis.speak(u);
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function renderNav(){
 $("#nav").innerHTML=navItems.map(([id,label])=>`<button class="${mode===id?"active":""}" onclick="setMode('${id}')">${label}</button>`).join("");
}
function setMode(m){mode=m;renderNav();render()}
function render(){
 const main=$("#main");
 if(mode==="home") main.innerHTML=home();
 if(mode==="alphabet") main.innerHTML=alphabet();
 if(mode==="cards") main.innerHTML=cards();
 if(mode==="quiz"){ if(!quiz) newQuiz(); main.innerHTML=quizView(); }
 if(mode==="words") main.innerHTML=wordsView();
}
function home(){return `
<section class="hero"><h1>ⵜⵉⴼⵉⵏⴰⵖ</h1><p>Apprends à lire le tifinagh du tamazight standard marocain, étape par étape.</p></section>
<div class="stats">
<div class="card stat"><b>${letters.length}</b><span class="muted">lettres</span></div>
<div class="card stat"><b>${score.quiz}/${score.total}</b><span class="muted">quiz réussis</span></div>
<div class="card stat"><b>${score.words}</b><span class="muted">mots réussis</span></div>
</div>
<div class="section-title"><h2>Par où commencer ?</h2></div>
<div class="grid">
<div class="card"><h3>📚 Alphabet</h3><p class="muted">Explore chaque caractère avec latin, arabe et audio.</p><button class="primary" onclick="setMode('alphabet')">Découvrir</button></div>
<div class="card"><h3>🧠 Cartes</h3><p class="muted">Mémorise progressivement les correspondances.</p><button class="primary" onclick="setMode('cards')">Commencer</button></div>
<div class="card"><h3>🎯 Quiz</h3><p class="muted">Teste la reconnaissance dans les deux sens.</p><button class="primary" onclick="setMode('quiz')">Tester</button></div>
<div class="card"><h3>✍️ Mots</h3><p class="muted">Passe de la lettre aux mots entiers.</p><button class="primary" onclick="setMode('words')">S'entraîner</button></div>
</div>`}
function alphabet(){return `
<div class="section-title"><h2>Alphabet</h2><span class="muted">${letters.length} caractères</span></div>
<p class="muted">Touche 🔊 pour entendre la transcription latine.</p>
<div class="grid">${letters.map((x,i)=>`<article class="card center"><div class="letter">${x.t}</div><div class="latin">${x.l}</div><div class="arabic" dir="rtl">${x.a}</div><button class="audio" onclick="speak('${x.l}')">🔊 Écouter</button></article>`).join("")}</div>`}
function cards(){
 const x=letters[cardIndex];
 return `<div class="big-card card">
<div class="small muted">Carte ${cardIndex+1} / ${letters.length}</div>
<div class="letter">${x.t}</div>
${cardShow?`<div class="latin">${x.l}</div><div class="arabic" dir="rtl">${x.a}</div><button class="audio" onclick="speak('${x.l}')">🔊 ${x.l}</button>`:`<p class="muted">Essaie de retrouver sa transcription.</p>`}
<div class="actions">${!cardShow?`<button class="primary" onclick="cardShow=true;render()">Voir la réponse</button>`:`<button class="secondary" onclick="cardNext()">Carte suivante →</button>`}</div>
</div>`}
function cardNext(){cardIndex=(cardIndex+1)%letters.length;cardShow=false;render()}
function newQuiz(){
 const askT=Math.random()<.5;
 const target=letters[Math.floor(Math.random()*letters.length)];
 const opts=shuffle([target,...shuffle(letters.filter(x=>x!==target)).slice(0,3)]);
 quiz={askT,target,opts,answered:false,correct:null};
}
function quizView(){
 const q=quiz;
 const question=q.askT?q.target.t:`${q.target.l} / ${q.target.a}`;
 return `<div class="big-card card">
<div class="small muted">Quiz — ${q.askT?"Tifinagh → transcription":"Transcription → tifinagh"}</div>
<div class="${q.askT?"word":"latin"}">${question}</div>
<p class="muted">${q.askT?"Choisis la correspondance latine / arabe.":"Choisis le caractère tifinagh correspondant."}</p>
<div class="answers">${q.opts.map((x,i)=>`<button class="answer ${q.answered?(x===q.target?"correct":(q.correct===x?"wrong":"")):""}" onclick="answerQuiz(${i})">${q.askT?`<span class="latin">${x.l}</span><span class="arabic" dir="rtl">${x.a}</span>`:`<span class="t">${x.t}</span><span>${x.l}</span>`}</button>`).join("")}</div>
<div class="feedback">${q.answered?(q.correct===q.target?"✅ Bonne réponse !":"❌ La bonne réponse était "+q.target.l+" / "+q.target.a):""}</div>
${q.answered?`<div class="actions"><button class="primary" onclick="newQuiz();render()">Question suivante →</button></div>`:""}
</div>`}
function answerQuiz(i){
 if(quiz.answered)return;
 const chosen=quiz.opts[i];quiz.answered=true;quiz.correct=chosen;
 score.total++;if(chosen===quiz.target)score.quiz++;save();render();
}
function wordsView(){
 const w=words[wordIndex];
 return `<div class="big-card card">
<div class="small muted">Mot ${wordIndex+1} / ${words.length}</div>
<div class="word">${w.t}</div>
<p class="muted">Écris sa transcription latine.</p>
<input id="wordInput" type="text" autocomplete="off" autocapitalize="none" placeholder="ex. amazigh">
<div class="actions"><button class="primary" onclick="checkWord()">Vérifier</button><button class="secondary" onclick="speak('${w.l}')">🔊 Écouter</button></div>
<div id="wordFeedback" class="feedback" style="margin-top:15px"></div>
</div>`}
function normalize(s){return s.toLowerCase().trim().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"")}
function checkWord(){
 const input=$("#wordInput"), fb=$("#wordFeedback"), w=words[wordIndex];
 if(normalize(input.value)===normalize(w.l)){score.words++;save();fb.textContent="✅ Correct !";fb.style.color="var(--good)";setTimeout(()=>{wordIndex=(wordIndex+1)%words.length;render()},700)}
 else{fb.textContent=`❌ Réponse : ${w.l}`;fb.style.color="var(--bad)"}
}
window.setMode=setMode;window.cardNext=cardNext;window.answerQuiz=answerQuiz;window.checkWord=checkWord;window.speak=speak;
renderNav();render();

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").style.display="block"});
$("#installBtn").onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt=null;$("#installBtn").style.display="none"};
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
