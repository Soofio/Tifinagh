/* ============================================================================
   DONNÉES LINGUISTIQUES — alphabet néo-tifinagh IRCAM (33 lettres officielles,
   enseignées à l'école au Maroc). Source de vérification :
   - IRCAM (Institut Royal de la Culture Amazighe) — ircam.ma/fr/alphabet-tifinaghe
   - Table de correspondance détaillée (33 lettres + Unicode + arabe) :
     aeb.win.tue.nl/natlang/berber/tifinagh/tifinagh.html

   Corrections apportées par rapport à la V1 :
   - Ajout de ⴽⵯ (Kw) et ⵓ (U), qui manquaient.
   - ɣ (gamma) vérifié et complété : ⵖ = "ɣ" (arabe غ), marqué "difficile".
   - Correction de correspondances arabes fausses ou approximatives
     (ex. "g" avait pour arabe le caractère tifinagh lui-même par erreur).
   - Ajout d'un indicateur "hard" pour les sons difficiles pour les
     francophones (ɣ, ḥ, ɛ, x, ṣ, ṭ, ẓ), demandé dans le brief.
   - Le champ "a" (arabe) est mis à null quand il n'existe pas de lettre
     arabe correspondante fiable (ex. voyelle "e", ou labio-vélarisées
     gw/kw qui n'ont pas d'équivalent direct à une seule lettre) : il
     vaut mieux ne rien afficher qu'afficher une fausse équivalence.
   - Champ "approx" : true quand la correspondance arabe est une
     approximation d'usage (ex. ṛ/ẓ n'ont pas de lettre arabe dédiée
     dans l'alphabet arabe standard).
============================================================================ */
const letters = [
 {t:"ⴰ",  l:"a",  a:"ا",  audio:"a"},
 {t:"ⴱ",  l:"b",  a:"ب",  audio:"b"},
 {t:"ⴳ",  l:"g",  a:"گ",  audio:"g"},
 {t:"ⴳⵯ", l:"gw", a:null, audio:"gw", note:"labio-vélarisée : g + w prononcés ensemble, pas de lettre arabe dédiée"},
 {t:"ⴷ",  l:"d",  a:"د",  audio:"d"},
 {t:"ⴹ",  l:"ḍ",  a:"ض",  audio:"dd", hard:true},
 {t:"ⴻ",  l:"e",  a:null, audio:"e", note:"voyelle neutre (schwa), pas de lettre arabe dédiée"},
 {t:"ⴼ",  l:"f",  a:"ف",  audio:"f"},
 {t:"ⴽ",  l:"k",  a:"ك",  audio:"k"},
 {t:"ⴽⵯ", l:"kw", a:null, audio:"kw", note:"labio-vélarisée : k + w prononcés ensemble, pas de lettre arabe dédiée"},
 {t:"ⵀ",  l:"h",  a:"ه",  audio:"h"},
 {t:"ⵃ",  l:"ḥ",  a:"ح",  audio:"hh", hard:true},
 {t:"ⵄ",  l:"ɛ",  a:"ع",  audio:"aa", hard:true},
 {t:"ⵅ",  l:"x",  a:"خ",  audio:"x", hard:true},
 {t:"ⵇ",  l:"q",  a:"ق",  audio:"q"},
 {t:"ⵉ",  l:"i",  a:"ي",  audio:"i"},
 {t:"ⵊ",  l:"j",  a:"ج",  audio:"j"},
 {t:"ⵍ",  l:"l",  a:"ل",  audio:"l"},
 {t:"ⵎ",  l:"m",  a:"م",  audio:"m"},
 {t:"ⵏ",  l:"n",  a:"ن",  audio:"n"},
 {t:"ⵓ",  l:"u",  a:"و",  audio:"u"},
 {t:"ⵔ",  l:"r",  a:"ر",  audio:"r"},
 {t:"ⵕ",  l:"ṛ",  a:"ر",  audio:"rr", hard:true, approx:true, note:"r emphatique : l'arabe standard n'a pas de lettre dédiée, ر est une approximation"},
 {t:"ⵖ",  l:"ɣ",  a:"غ",  audio:"gh", hard:true},
 {t:"ⵙ",  l:"s",  a:"س",  audio:"s"},
 {t:"ⵚ",  l:"ṣ",  a:"ص",  audio:"ss", hard:true},
 {t:"ⵛ",  l:"c",  a:"ش",  audio:"c"},
 {t:"ⵜ",  l:"t",  a:"ت",  audio:"t"},
 {t:"ⵟ",  l:"ṭ",  a:"ط",  audio:"tt", hard:true},
 {t:"ⵡ",  l:"w",  a:"و",  audio:"w"},
 {t:"ⵢ",  l:"y",  a:"ي",  audio:"y"},
 {t:"ⵣ",  l:"z",  a:"ز",  audio:"z"},
 {t:"ⵥ",  l:"ẓ",  a:"ظ",  audio:"zz", hard:true, approx:true, note:"z emphatique : ظ est l'équivalence pédagogique la plus courante, mais approximative"}
];

/* Exemples de mots pour la V1 (transcription IRCAM courante). */
const words = [
 {t:"ⴰⵎⴰⵣⵉⵖ", l:"amazigh", a:"أمازيغ"},
 {t:"ⵜⴰⵎⴰⵣⵉⵖⵜ", l:"tamazight", a:"تمازيغت"},
 {t:"ⴰⵣⵓⵍ", l:"azul", a:"أزول"},
 {t:"ⵜⴰⴼⵓⵢⵜ", l:"tafuyt", a:"تافويت"},
 {t:"ⴰⴼⵓⵙ", l:"afus", a:"أفوس"}
];

/* ============================================================================
   AUDIO — priorité aux fichiers locaux (audio/<code>.mp3), avec repli sur la
   synthèse vocale du navigateur UNIQUEMENT si le fichier est absent, et en
   affichant clairement que c'est une prononciation approximative.

   IMPORTANT (voir brief) : aucun jeu de fichiers audio "un enregistrement
   amazighophone authentique par lettre, sous licence réutilisable" n'a pu
   être identifié et vérifié de façon fiable pour l'instant (recherche faite
   sur Wikimedia Commons / IRCAM / ressources pédagogiques libres — rien de
   suffisamment complet et clairement licencié n'a été trouvé). Le dossier
   audio/ est donc prêt à recevoir de vrais fichiers dès que tu les auras
   (voir audio/README.txt), et l'appli les utilisera automatiquement dès
   qu'ils existeront, sans rien changer au code.
============================================================================ */
const $=s=>document.querySelector(s);
const navItems=[
 ["home","Accueil"],["alphabet","Alphabet"],["cards","Cartes"],["quiz","Quiz"],["words","Mots"]
];
let mode="home", cardIndex=0, cardShow=false, quiz=null, wordIndex=0, score=JSON.parse(localStorage.tifinaghScore||'{"quiz":0,"total":0,"words":0}');
let deferredPrompt=null;

function save(){localStorage.tifinaghScore=JSON.stringify(score)}

function speakFallback(text){
 if(!("speechSynthesis" in window)){return}
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);
 u.lang="zgh-MA"; // tamazight (peu/pas supporté par la plupart des navigateurs -> repli sur la voix par défaut)
 u.rate=.7;
 speechSynthesis.speak(u);
}

/* Joue le fichier audio local de la lettre s'il existe (.mp3 puis .wav),
   sinon bascule sur la synthèse vocale (approximative) et le signale
   visuellement 1s. Le découpeur audio (decoupeur-audio.html) exporte en
   .wav, donc les deux formats sont supportés sans rien à convertir. */
function tryPlay(path, onFail, onSuccess){
 const audio=new Audio(path);
 let handled=false;
 audio.addEventListener("canplaythrough",()=>{if(!handled){handled=true;audio.play().then(onSuccess).catch(onFail)}});
 audio.addEventListener("error",()=>{if(!handled){handled=true;onFail()}});
 setTimeout(()=>{if(!handled){handled=true;onFail()}},900);
 audio.load();
}
function playLetter(letter, btnEl){
 const showFallbackBadge=()=>{
  if(!btnEl)return;
  const original=btnEl.textContent;
  btnEl.textContent="🔊 (voix approx.)";
  setTimeout(()=>{btnEl.textContent=original},1500);
 };
 tryPlay(`audio/${letter.audio}.mp3`, ()=>{
  tryPlay(`audio/${letter.audio}.wav`, ()=>{
   speakFallback(letter.l);
   showFallbackBadge();
  }, ()=>{});
 }, ()=>{});
}
window.playLetter=playLetter;

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
</div>
<p class="muted small audio-note">🔊 = audio local si disponible dans <code>audio/</code>, sinon voix approximative du navigateur (repli, pas une vraie prononciation amazighe).</p>`}
function alphabet(){return `
<div class="section-title"><h2>Alphabet</h2><span class="muted">${letters.length} caractères</span></div>
<p class="muted">Touche 🔊 pour écouter. Les lettres surlignées en orange sont réputées difficiles pour les francophones.</p>
<div class="grid">${letters.map((x,i)=>`<article class="card center ${x.hard?"hard":""}">
<div class="letter">${x.t}</div>
<div class="latin">${x.l}</div>
<div class="arabic" dir="rtl">${x.a?x.a+(x.approx?" *":""):"—"}</div>
${x.note?`<div class="note">${x.note}</div>`:""}
<button class="audio" onclick="playLetter(letters[${i}], this)">🔊 Écouter</button>
</article>`).join("")}</div>
<p class="muted small">* correspondance arabe approximative (pas de lettre dédiée en arabe standard).</p>`}
function cards(){
 const x=letters[cardIndex];
 return `<div class="big-card card">
<div class="small muted">Carte ${cardIndex+1} / ${letters.length}</div>
<div class="letter">${x.t}</div>
${cardShow?`<div class="latin">${x.l}</div><div class="arabic" dir="rtl">${x.a?x.a:"—"}</div><button class="audio" onclick="playLetter(letters[${cardIndex}], this)">🔊 ${x.l}</button>`:`<p class="muted">Essaie de retrouver sa transcription.</p>`}
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
 const question=q.askT?q.target.t:`${q.target.l} / ${q.target.a?q.target.a:"—"}`;
 return `<div class="big-card card">
<div class="small muted">Quiz — ${q.askT?"Tifinagh → transcription":"Transcription → tifinagh"}</div>
<div class="${q.askT?"word":"latin"}">${question}</div>
<p class="muted">${q.askT?"Choisis la correspondance latine / arabe.":"Choisis le caractère tifinagh correspondant."}</p>
<div class="answers">${q.opts.map((x,i)=>`<button class="answer ${q.answered?(x===q.target?"correct":(q.correct===x?"wrong":"")):""}" onclick="answerQuiz(${i})">${q.askT?`<span class="latin">${x.l}</span><span class="arabic" dir="rtl">${x.a?x.a:"—"}</span>`:`<span class="t">${x.t}</span><span>${x.l}</span>`}</button>`).join("")}</div>
<div class="feedback">${q.answered?(q.correct===q.target?"✅ Bonne réponse !":"❌ La bonne réponse était "+q.target.l+(q.target.a?" / "+q.target.a:"")):""}</div>
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
<div class="actions"><button class="primary" onclick="checkWord()">Vérifier</button><button class="secondary" onclick="speakFallback('${w.l}')">🔊 Écouter</button></div>
<div id="wordFeedback" class="feedback" style="margin-top:15px"></div>
</div>`}
function normalize(s){return s.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function checkWord(){
 const input=$("#wordInput"), fb=$("#wordFeedback"), w=words[wordIndex];
 if(normalize(input.value)===normalize(w.l)){score.words++;save();fb.textContent="✅ Correct !";fb.style.color="var(--good)";setTimeout(()=>{wordIndex=(wordIndex+1)%words.length;render()},700)}
 else{fb.textContent=`❌ Réponse : ${w.l}`;fb.style.color="var(--bad)"}
}
window.setMode=setMode;window.cardNext=cardNext;window.answerQuiz=answerQuiz;window.checkWord=checkWord;window.speakFallback=speakFallback;
renderNav();render();

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").style.display="block"});
$("#installBtn").onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt=null;$("#installBtn").style.display="none"};
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
