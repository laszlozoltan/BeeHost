/* Shared HU/RO/EN switch for the subpages. Remembers the choice in localStorage ("bh-lang"), same key as the home page. */
(function(){
  var body=document.body, lang='hu';
  try{var s=localStorage.getItem('bh-lang'); if(s==='hu'||s==='ro'||s==='en') lang=s;}catch(e){}
  function set(l){
    lang=l; body.classList.remove('lang-hu','lang-ro','lang-en'); body.classList.add('lang-'+l);
    document.documentElement.lang=l;
    ['hu','ro','en'].forEach(function(k){var b=document.getElementById('b-'+k); if(b) b.setAttribute('aria-pressed', k===l);});
    try{localStorage.setItem('bh-lang',l)}catch(e){}
    document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
  }
  ['hu','ro','en'].forEach(function(k){var b=document.getElementById('b-'+k); if(b) b.addEventListener('click',function(){set(k)});});
  window.BH={get lang(){return lang}, T:function(o){return o==null?'':(typeof o==='string'?o:(o[lang]!=null?o[lang]:o.hu))}};
  set(lang);
})();
