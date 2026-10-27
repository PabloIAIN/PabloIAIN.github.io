// ---------- Portafolio Pablo Garza ----------
(function(){
  // espacios de foto vacíos
  document.querySelectorAll('.ph img').forEach(function(img){
    var mark=function(){img.closest('.ph').classList.add('empty')};
    img.addEventListener('error',mark);
    if(img.complete&&img.naturalWidth===0)mark();
  });
  // copiar correo
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.dataset.copy),t=el.textContent.trim();
      var done=function(){b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1600)};
      var sel=function(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Seleccionado'};
      try{navigator.clipboard.writeText(t).then(done,sel)}catch(e){sel()}
    });
  });
})();

// ---------- Repositorios (página Proyectos) ----------
(function(){
  var grid=document.getElementById('repo-grid'); if(!grid)return;
  var USER='PabloIAIN';
  var HIDE=['no-nativo','pabloiain-','pabloiain.github.io'];
  var COLORS={Java:'#b07219',TypeScript:'#3178c6',Python:'#3572A5',Dart:'#00B4AB',JavaScript:'#e0c341',PHP:'#4F5D95',HTML:'#e34c26','Jupyter Notebook':'#DA5B0B',Prolog:'#a8506a',SQL:'#b8901c'};
  var INFO={
    'campops':{d:'Dashboard de operaciones bilingüe para Camp Yavapines, sincronizado por código de equipo. Adoptado por el staff.',c:'campops'},
    'instrumento-ocr-tickets-mx':{d:'Comparación estadística de Tesseract, EasyOCR y Donut en tickets de compra mexicanos.',c:'ocr'},
    'enarm360':{d:'SaaS de simulación del examen ENARM: API REST, autenticación, roles y despliegue en VPS.',c:'enarm360',tag:'Co-fundador'},
    'gmu_doulos':{d:'App multiplataforma para gestionar un club de Guías Mayores.'},
    'taskflow':{d:'Gestor de proyectos para equipos de desarrollo con Spring Boot 3, React, PostgreSQL y JWT.'},
    'sistemas-de-contactos-react-y-node.js':{d:'Agenda de contactos full stack: frontend en React y API en Node.js.'},
    'agenda-contactos-fastapi':{d:'API REST de contactos con FastAPI, SQLAlchemy y SQLite.'},
    'agenda-contactos-springboot':{d:'API REST de contactos con Spring Boot.'},
    'examenes-sistema-cakephp':{d:'Sistema de generación de exámenes médicos con CakePHP 5.'},
    'pseudoc_parser':{d:'Lexer, parser y árbol de sintaxis abstracta para el lenguaje PseudoC.'},
    'cuaderno-de-ejercicios':{d:'Ejercicios de programación lógica en Prolog.'},
    'smartstock-hackathonv2':{d:'Sistema de control de incentivos corporativos. Segunda versión del hackathon.'},
    'smartstock-hackathon':{d:'Control de inventario y validación de pedidos con la "Regla de Oro". Hackathon.'}
  };
  var PRIVATE=[{name:'lakehouse-sunplus',lang:'SQL',updated:'2026-10-20',d:'Lakehouse empresarial con Dremio, Iceberg, Nessie y MinIO. Código propiedad de la empresa.',href:'proyectos.html#lakehouse',priv:true},
               {name:'jupyterhub-lakehouse',lang:'Python',updated:'2026-10-09',d:'Espacio de análisis multiusuario con JupyterHub y Docker, conectado al lakehouse por Arrow Flight.',href:'proyectos.html#lakehouse',priv:true}];
  // respaldo si la API de GitHub no responde
  var FALLBACK=[
    ['campops','TypeScript','2026-06-24'],['instrumento-ocr-tickets-mx','Jupyter Notebook','2026-04-24'],['gmu_doulos','Dart','2026-04-22','https://gmu-doulos.vercel.app'],
    ['taskflow','Java','2026-04-11'],['Enarm360','TypeScript','2025-10-14',null,true],['sistemas-de-contactos-react-y-node.js','JavaScript','2026-04-10'],
    ['agenda-contactos-fastapi','Python','2026-04-10'],['agenda-contactos-springboot','Java','2026-04-10'],['examenes-sistema-cakephp','PHP','2026-04-10'],
    ['pseudoc_parser','Python','2026-03-12'],['Cuaderno-de-Ejercicios','Prolog','2026-02-24'],['smartstock-hackathonv2','HTML','2025-12-03'],['smartstock-hackathon','HTML','2025-12-02']
  ].map(function(r){return {name:r[0],language:r[1],pushed_at:r[2],homepage:r[3]||'',fork:!!r[4],html_url:'https://github.com/'+USER+'/'+r[0],description:''}});

  var state={lang:'Todos',q:'',sort:'recent'},items=[];
  var MESES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  function fmt(s){var d=new Date(s);return isNaN(d)?'':MESES[d.getMonth()]+' '+d.getFullYear()}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function normalize(list){
    var out=list.filter(function(r){return HIDE.indexOf(r.name.toLowerCase())<0}).map(function(r){
      var i=INFO[r.name.toLowerCase()]||{};
      return {name:r.name,lang:r.language||'Otro',updated:r.pushed_at||r.updated_at,d:i.d||r.description||'Repositorio de práctica.',
        href:r.html_url,demo:r.homepage||'',tag:i.tag||(r.fork?'Fork':''),caso:i.c||''};
    });
    return PRIVATE.map(function(p){return {name:p.name,lang:p.lang,updated:p.updated,d:p.d,href:p.href,priv:true,caso:'lakehouse'}}).concat(out);
  }
  function card(r){
    var pill=r.priv?'<span class="pill lock">Privado</span>':r.demo?'<span class="pill demo">Demo</span>':r.tag?'<span class="pill">'+esc(r.tag)+'</span>':'';
    var ext=r.priv?'':' target="_blank" rel="noopener"';
    var href=r.demo||r.href;
    var caso=r.caso&&!r.priv?' · <span>caso documentado</span>':'';
    return '<a class="repo" href="'+esc(href)+'"'+ext+'><div class="repo-top"><span class="name">'+esc(r.name)+'</span>'+pill+'</div><p>'+esc(r.d)+'</p>'+
      '<div class="repo-meta"><span class="dot" style="--c:'+(COLORS[r.lang]||'var(--muted)')+'"></span>'+esc(r.lang)+' · act. '+fmt(r.updated)+caso+'</div></a>';
  }
  function chips(){
    var counts={Todos:items.length};items.forEach(function(r){counts[r.lang]=(counts[r.lang]||0)+1});
    var langs=Object.keys(counts).filter(function(k){return k!=='Todos'}).sort(function(a,b){return counts[b]-counts[a]||a.localeCompare(b)});
    var box=document.getElementById('repo-chips');
    box.innerHTML=['Todos'].concat(langs).map(function(l){
      var dot=l==='Todos'?'':'<span class="dot" style="width:8px;height:8px;border-radius:50%;display:inline-block;background:'+(COLORS[l]||'var(--muted)')+'"></span>';
      return '<button type="button" class="chip" data-lang="'+esc(l)+'" aria-pressed="'+(state.lang===l)+'">'+dot+esc(l)+' <span class="n">'+counts[l]+'</span></button>'}).join('');
    var nl=document.getElementById('stat-langs'); if(nl)nl.textContent=langs.length;
    var nr=document.getElementById('stat-repos'); if(nr)nr.textContent=items.filter(function(r){return !r.priv}).length;
  }
  function render(){
    var q=state.q.trim().toLowerCase();
    var list=items.filter(function(r){return (state.lang==='Todos'||r.lang===state.lang)&&(!q||(r.name+' '+r.d+' '+r.lang).toLowerCase().indexOf(q)>=0)});
    list.sort(state.sort==='name'?function(a,b){return a.name.localeCompare(b.name)}:function(a,b){return new Date(b.updated)-new Date(a.updated)});
    grid.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">No hay repositorios que coincidan. Prueba con otro filtro.</div>';
    document.getElementById('repo-count').textContent=list.length+' de '+items.length+' proyectos';
  }
  function load(list,src){items=normalize(list);chips();render();document.getElementById('repo-src').textContent=src}
  document.getElementById('repo-chips').addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;state.lang=b.dataset.lang;chips();render()});
  document.getElementById('repo-q').addEventListener('input',function(e){state.q=e.target.value;render()});
  document.getElementById('repo-sort').addEventListener('change',function(e){state.sort=e.target.value;render()});
  load(FALLBACK,'Lista guardada · actualizando desde GitHub…');
  fetch('https://api.github.com/users/'+USER+'/repos?per_page=100&sort=pushed')
    .then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(d){if(Array.isArray(d)&&d.length)load(d,'Datos en vivo desde GitHub')})
    .catch(function(){document.getElementById('repo-src').textContent='Lista guardada (GitHub no respondió)'});
})();

// ---------- Movimiento y navegación ----------
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar=document.querySelector('.progress');
  function prog(){var d=document.documentElement,m=d.scrollHeight-innerHeight;bar.style.setProperty('--p',m>0?Math.min(1,scrollY/m):0)}
  addEventListener('scroll',prog,{passive:true});prog();
  if(!('IntersectionObserver' in window))return;
  var all=[].slice.call(document.querySelectorAll('nav.top ul a'));
  var page=document.querySelector('nav.top ul a[aria-current="page"]');
  var links={};all.forEach(function(a){var h=a.getAttribute('href');if(h.charAt(0)==='#')links[h.slice(1)]=a});
  function setOn(a){all.forEach(function(x){x.classList.remove('on');if(x!==page)x.removeAttribute('aria-current')});if(a&&a!==page)a.classList.add('on')}
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)setOn(links[e.target.id]||null)})},{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section[id],main header[id]').forEach(function(s){so.observe(s)});
  if(reduce)return;
  var sel='.sec-head,.about .text,.skills>div,.case-head,.fields,.layers,.diagram,.evidence figure,.feat,.timeline li,.gallery figure,.contact-list,.links,.toolbar';
  var els=[].slice.call(document.querySelectorAll(sel)).filter(function(el){return el.getBoundingClientRect().top>innerHeight});
  els.forEach(function(el){el.classList.add('rv');var i=[].indexOf.call(el.parentNode.children,el);if(el.matches('.feat,.evidence figure,.gallery figure,.skills>div'))el.style.transitionDelay=(i%2)*110+'ms'});
  document.documentElement.classList.add('reveal-ready');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){io.observe(el)});
})();
