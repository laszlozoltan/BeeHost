/* BeeHost results map (Leaflet). Needs vendor/leaflet, js/map-data.js and js/lang.js. */
(function(){
  if(!window.L||!window.BH_MAP) return;
  var T=function(o){return window.BH.T(o)};
  var css=getComputedStyle(document.documentElement);
  var C={on:'#E8590C',off:'#FFC078',hotel:'#F76707',ink:'#2A2940'};
  var map=L.map('bhmap',{scrollWheelZoom:false,zoomSnap:0.5}).setView([46.768,23.585],12.5);
  var sat=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community'});
  var osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
  sat.addTo(map);
  var baseCtl=L.control.layers(null,null,{position:'topright'});
  function bases(){ baseCtl.remove(); baseCtl=L.control.layers({},{},{position:'topright'}); baseCtl.addBaseLayer(sat,T({hu:'Műhold',ro:'Satelit',en:'Satellite'})); baseCtl.addBaseLayer(osm,T({hu:'Térkép',ro:'Hartă',en:'Map'})); baseCtl.addTo(map); }
  bases(); document.addEventListener('langchange',bases);
  var layer=L.layerGroup().addTo(map);
  if(BH_MAP.border){ L.polygon(BH_MAP.border,{color:'#2A2940',weight:5,opacity:.55,fill:false,interactive:false}).addTo(map); var bd=L.polygon(BH_MAP.border,{color:'#FFFFFF',weight:2,dashArray:'7 5',fill:false,interactive:false}).addTo(map); map.attributionControl.addAttribution('Cluj-Napoca: <a href="https://www.geoboundaries.org">geoBoundaries</a>'); map.fitBounds(bd.getBounds(),{padding:[10,10]}); }
  var survey='2023',key='hotel';
  var LAYERS={
    '2023':[['hotel',{hu:'Kihelyezett hotelek',ro:'Hoteluri amplasate',en:'Hotels set out'}],
            ['cornuta',{hu:'Osmia cornuta',ro:'Osmia cornuta',en:'Osmia cornuta'}],
            ['bicornis',{hu:'Osmia bicornis',ro:'Osmia bicornis',en:'Osmia bicornis'}],
            ['trypoxylon',{hu:'Trypoxylon sp.',ro:'Trypoxylon sp.',en:'Trypoxylon sp.'}],
            ['leucospis',{hu:'Leucospis dorsigera',ro:'Leucospis dorsigera',en:'Leucospis dorsigera'}],
            ['other',{hu:'Egyéb faj',ro:'Altă specie',en:'Other species'}]],
    '2021':[['reed',{hu:'Elfoglalt nádszálak aránya',ro:'Proporția tuburilor de trestie ocupate',en:'Share of occupied reed stems'}],
            ['wood',{hu:'Elfoglalt fúrt járatok aránya',ro:'Proporția galeriilor ocupate în lemn',en:'Share of occupied holes in wood'}]]};
  var sel=document.getElementById('maplayer'),leg=document.getElementById('maplegend'),note=document.getElementById('mapnote');
  function fillSelect(){
    sel.innerHTML=LAYERS[survey].map(function(l){return '<option value="'+l[0]+'"'+(l[0]===key?' selected':'')+'>'+T(l[1])+'</option>'}).join('');
  }
  function sw(c,o){return '<i style="background:'+c+';opacity:'+(o||1)+'"></i>'}
  function draw(){
    layer.clearLayers();
    if(survey==='2023'){
      var n=0;
      BH_MAP.cells2023.forEach(function(c){
        var style;
        if(key==='hotel'){ if(!c.hotel) return; style={color:'#fff',weight:1.5,fillColor:C.hotel,fillOpacity:.7}; n++; }
        else { if(!c.obs) return; var v=c[key]===1; if(v) n++; style={color:'#fff',weight:v?2:1,fillColor:v?C.on:C.off,fillOpacity:v?.9:.45}; }
        L.polygon(c.c,style).addTo(layer);
      });
      leg.innerHTML = key==='hotel'
        ? sw(C.hotel,.55)+T({hu:'legalább egy hotel a cellában',ro:'cel puțin un hotel în celulă',en:'at least one hotel in the cell'})+' · <b>'+n+'</b> '+T({hu:'cella',ro:'celule',en:'cells'})
        : sw(C.on,.75)+T({hu:'jelen volt',ro:'prezentă',en:'recorded'})+' · <b>'+n+'</b> '+T({hu:'cella',ro:'celule',en:'cells'})+' &nbsp; '+sw(C.off,.35)+T({hu:'nem jelezték',ro:'neraportată',en:'not recorded'});
      note.innerHTML=T({hu:'A cellák kb. 600 m-esek; egy hotel helye sem azonosítható. A pontokat a 2023. november 20-i záró találkozó térképeiről digitalizáltuk, ezért a helyek közelítőek.',ro:'Celulele au cca. 600 m; locul niciunui hotel nu poate fi identificat. Punctele au fost digitizate de pe hărțile prezentate la întâlnirea de încheiere din 20 noiembrie 2023, deci locațiile sunt aproximative.',en:'Cells are about 600 m across, so no single hotel can be located. Points were digitised from the maps shown at the closing meeting on 20 November 2023, so locations are approximate.'});
    } else {
      BH_MAP.parks2021.forEach(function(p){
        var v=p[key];
        L.circleMarker([p.lat,p.lon],{radius:6+v*120,color:'#fff',weight:2,fillColor:C.on,fillOpacity:v?.75:.2})
          .bindTooltip(T(p)+' · '+(v? '≈ '+Math.round(v*100)+'%':'0%'),{direction:'right',permanent:true,className:'bh-tip',offset:[8+v*120,0]}).addTo(layer);
      });
      leg.innerHTML=sw(C.on,.55)+T({hu:'a kör mérete az arányt mutatja',ro:'mărimea cercului arată proporția',en:'circle size shows the share'});
      note.innerHTML=T({hu:'2021: 13 csapdafészek hét park és zöldterület 300 m-es körzetében, parkonként összesítve. Az arányok a BSc-szakdolgozat grafikonjáról leolvasott közelítő értékek; a park helye a park közepét jelöli.',ro:'2021: 13 cuiburi-capcană pe o rază de 300 m în jurul a șapte parcuri și spații verzi, cumulate pe parc. Proporțiile sunt valori aproximative citite de pe graficul din lucrarea de licență; punctul marchează centrul parcului.',en:'2021: 13 trap nests within 300 m of seven parks and green spaces, pooled by park. Shares are approximate values read from the BSc thesis chart; the marker shows the park centre.'});
    }
  }
  sel.addEventListener('change',function(){key=sel.value;draw();});
  document.querySelectorAll('[data-survey]').forEach(function(b){b.addEventListener('click',function(){
    survey=b.dataset.survey;key=LAYERS[survey][0][0];
    document.querySelectorAll('[data-survey]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    fillSelect();draw();
    if(survey==='2021') map.setView([46.768,23.583],14); else if(window.BH_MAP.border) map.fitBounds(L.polygon(BH_MAP.border).getBounds(),{padding:[10,10]}); else map.setView([46.768,23.585],12.5);
  })});
  document.addEventListener('langchange',function(){fillSelect();draw();});
  fillSelect();draw();
})();
