(() => {
  'use strict';
  const stories=window.STORIES, list=document.querySelector('.rows'), dialog=document.querySelector('#story-dialog');
  const switcher=document.querySelector('.lang-switch'), menu=document.querySelector('.menu-toggle'), nav=document.querySelector('#page-nav');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'), fine=matchMedia('(hover: hover) and (pointer: fine)');
  const tabs=['context','idea','activation','learnings'], tabZh=['背景','思路','执行','收获'];
  const alt={own:['TCL 115-inch QD-Mini LED display at OWN Valencia','Player trying TCL gaming monitors','TCL stage at OWN Valencia','Visitors exploring the TCL product ecosystem'],mwc:['Technology creators presenting a TCL livestream at MWC','Behind the scenes at TCL MWC','Shirley with a technology creator at MWC'],exhibition:['Startup product demonstration at Global Sources','Startup exhibition floor','Startup Launchpad pitch competition invitation','Startup Launchpad exhibition'],conference:['Startup Launchpad panel discussion','Conference speaker presenting to the audience','Startup Launchpad conference stage']};
  let language=sessionStorage.getItem('shirley-language')==='zh'?'zh':'en', selected=null, activeTab='context', opener=null, timer=0, oldOverflow='', frame=0;
  const langIndex=()=>language==='zh'?1:0;
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function photo(file,label,cls,corner,index=0){
    const wrap=node('span',`fold-card ${corner} ${cls}`),image=node('img');
    image.src=`assets/stories/${file}`;image.alt=label;image.decoding='async';image.loading=cls==='feature-photo'?'lazy':'eager';
    const curl=31+(index%3)*3;wrap.dataset.curl=curl;wrap.style.setProperty('--curl',`${curl}px`);
    image.addEventListener('load',()=>{wrap.style.aspectRatio=`${image.naturalWidth}/${image.naturalHeight}`;});
    wrap.append(image);
    if(cls!=='feature-photo'){
      wrap.addEventListener('pointerenter',()=>{if(fine.matches&&!reduced.matches)wrap.style.setProperty('--curl','18px');});
      wrap.addEventListener('pointerleave',()=>wrap.style.setProperty('--curl',`${curl}px`));
    }
    return wrap;
  }
  function rows(){
    list.replaceChildren();const i=langIndex();
    stories.forEach((s,n)=>{
      const row=node('article',`row${n===0?' feature':''}`);row.dataset.story=s.id;
      const number=node('span','number',String(n+1).padStart(2,'0')),title=node('h2','rowtitle',s.title[i]),meta=node('span','meta');
      meta.append(node('span','',s.category[i]),document.createElement('br'),document.createTextNode(s.year));
      const button=node('button','pill','EXPLORE ↗');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',`${language==='zh'?'查看项目':'Explore'}: ${s.title[i]}`);
      button.addEventListener('click',()=>openStory(s,button));
      row.append(number,title,meta,button,photo(s.preview,s.id==='football'?'TCL Football Nights in Spain':alt[s.id][0],'feature-photo','corner-tr'));
      const activate=()=>{if(fine.matches&&!row.classList.contains('feature'))list.querySelectorAll('.row').forEach(r=>r.classList.toggle('feature',r===row));};
      row.addEventListener('pointerenter',activate);row.addEventListener('pointermove',activate);row.addEventListener('focusin',activate);list.append(row);
    });
  }
  function setLanguage(){
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(n=>{n.innerHTML=n.dataset[language];});
    switcher.textContent=language==='zh'?'中文 / EN':'EN / 中文';switcher.setAttribute('aria-label',language==='zh'?'Switch to English':'切换为中文');
    menu.setAttribute('aria-label',language==='zh'?'打开菜单':'Open menu');
    sessionStorage.setItem('shirley-language',language);rows();
  }
  function renderTab(animate=false){
    clearTimeout(timer);const text=dialog.querySelector('.sectioncopy'),next=selected.body[activeTab][langIndex()];
    const update=()=>{text.textContent=next;text.classList.remove('is-fading');};
    if(animate&&!reduced.matches){text.classList.add('is-fading');timer=setTimeout(update,100);}else update();
    dialog.querySelectorAll('[role=tab]').forEach(b=>{const on=b.dataset.tab===activeTab;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
    document.querySelector('#story-panel').setAttribute('aria-labelledby',`story-tab-${activeTab}`);
  }
  function media(s){
    const visual=dialog.querySelector('.visual');visual.replaceChildren();visual.dataset.layout=s.layout;
    if(s.id==='football'){
      const shell=node('div','video-shell'),video=node('video');video.src='assets/stories/football-nights.mp4';video.poster='assets/stories/football-poster.webp';video.muted=true;video.defaultMuted=true;video.autoplay=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label',language==='zh'?'TCL Football Nights 西班牙活动视频':'TCL Football Nights Spain event video');
      const toggle=node('button','video-toggle','Ⅱ');toggle.type='button';
      const update=()=>{toggle.textContent=video.paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',video.paused?(language==='zh'?'播放视频':'Play video'):(language==='zh'?'暂停视频':'Pause video'));};
      video.addEventListener('play',update);video.addEventListener('pause',update);toggle.addEventListener('click',()=>{if(video.paused)video.play().catch(update);else video.pause();});shell.append(video,toggle);visual.append(shell,node('p','football-note',s.videoNote[langIndex()]));video.play().catch(update);
    }else{
      const corners=['corner-tl','corner-br','corner-tr','corner-bl'];
      for(let n=0;n<s.photos;n++)visual.append(photo(`${s.id}-${n}.webp`,alt[s.id][n],'gallery-card',corners[n],n));
      visual.append(node('div','stamp',s.stamp[langIndex()]));
    }
  }
  function openStory(s,button){
    selected=s;activeTab='context';opener=button;const i=langIndex();
    document.querySelector('#story-meta').textContent=`${String(stories.indexOf(s)+1).padStart(2,'0')} / ${s.category[i]} · ${s.year}`;
    const title=document.querySelector('#story-title');title.replaceChildren(document.createTextNode(s.heading[i][0]),document.createElement('br'),node('em','',s.heading[i][1]));
    dialog.querySelector('.dek').textContent=s.lead[i];const tablist=dialog.querySelector('.tabs');tablist.replaceChildren();
    tabs.forEach((tab,n)=>{const b=node('button','',language==='zh'?tabZh[n]:tab.toUpperCase());b.type='button';b.id=`story-tab-${tab}`;b.dataset.tab=tab;b.setAttribute('role','tab');b.setAttribute('aria-controls','story-panel');b.addEventListener('click',()=>{activeTab=tab;renderTab(true);});b.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(n+1)%4;if(event.key==='ArrowLeft')next=(n+3)%4;if(event.key==='Home')next=0;if(event.key==='End')next=3;if(next!==undefined){event.preventDefault();activeTab=tabs[next];renderTab(true);tablist.children[next].focus();}});tablist.append(b);});
    const metrics=dialog.querySelector('.metrics');metrics.replaceChildren();s.metrics.forEach(m=>{const box=node('div','metric');box.append(node('strong','',m[0]),node('span','',m[i+1]));metrics.append(box);});
    dialog.querySelector('.metric-note').textContent=s.note?s.note[i]:'';
    dialog.querySelector('.close').setAttribute('aria-label',language==='zh'?'关闭项目':'Close project');
    renderTab();media(s);oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.close').focus();
  }
  function pauseMedia(){dialog.querySelectorAll('video').forEach(v=>v.pause());}
  function closeStory(){pauseMedia();dialog.close();}
  dialog.querySelector('.close').addEventListener('click',closeStory);
  dialog.addEventListener('cancel',pauseMedia);
  dialog.addEventListener('close',()=>{clearTimeout(timer);pauseMedia();document.body.style.overflow=oldOverflow;if(opener?.isConnected)opener.focus();});
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeStory();});
  switcher.addEventListener('click',()=>{language=language==='zh'?'en':'zh';setLanguage();});
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
  document.addEventListener('click',e=>{if(!e.target.closest('.top')){nav.hidden=true;menu.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.hidden=true;menu.setAttribute('aria-expanded','false');}});
  function sway(){if(reduced.matches||!fine.matches)return;if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const root=dialog.open?dialog:list;root.querySelectorAll('.fold-card').forEach((card,n)=>{const y=dialog.open?dialog.scrollTop:scrollY;card.style.translate=`${Math.sin(y*.006+n)*3}px ${Math.sin(y*.009+n)*4}px`;card.style.setProperty('--curl',`${Number(card.dataset.curl)+Math.sin(y*.008+n)*4}px`);});});}
  addEventListener('scroll',sway,{passive:true});dialog.addEventListener('scroll',sway,{passive:true});setLanguage();
})();
