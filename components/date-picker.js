/**
 * Nova 後台通用日期時間選擇器 v3
 * 自動初始化所有 .date-picker-wrap 元素
 * 日曆 + 滾輪時間 + 快速選擇
 */
(function(){
  if(document.getElementById('nova-dp-v3'))return;
  const marker=document.createElement('meta');marker.id='nova-dp-v3';document.head.appendChild(marker);

  const style=document.createElement('style');
  style.textContent=`
.dp2-panel{display:none;position:absolute;top:calc(100% + 4px);left:0;z-index:1000;background:#fff;border:1px solid #E5E7EB;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.12);padding:16px;flex-direction:row;gap:12px}
.dp2-panel.show{display:flex}
.dp2-left{display:flex;flex-direction:column;width:224px}
.dp2-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.dp2-cal-header span{font-size:13px;font-weight:600;color:#1F2937}
.dp2-cal-header button{background:none;border:none;cursor:pointer;color:#6B7280;font-size:16px;padding:2px 6px;border-radius:4px}
.dp2-cal-header button:hover{background:#F3F4F6}
.dp2-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center}
.dp2-grid .dh{font-size:11px;color:#9CA3AF;padding:4px 0;font-weight:500}
.dp2-grid .dd{font-size:12px;padding:5px 0;border-radius:4px;cursor:pointer;color:#374151}
.dp2-grid .dd:hover{background:#EFF6FF}
.dp2-grid .dd.other{color:#D1D5DB;pointer-events:none}
.dp2-grid .dd.today{font-weight:700;box-shadow:inset 0 0 0 1px #3B82F6}
.dp2-grid .dd.sel{background:#2563EB;color:#fff;border-radius:50%}
.dp2-grid .dd.in-range{background:#DBEAFE;color:#1E40AF}
.dp2-grid .dd.range-start,.dp2-grid .dd.range-end{background:#2563EB;color:#fff;border-radius:50%}
.dp2-time{display:flex;align-items:center;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #E5E7EB}
.dp2-wheel-group{display:flex;flex-direction:column;align-items:center;gap:2px}
.dp2-wheel-group label{font-size:10px;color:#9CA3AF;font-weight:500}
.dp2-wheel{position:relative;width:36px;height:80px;overflow:hidden;border:1px solid #E5E7EB;border-radius:6px;background:#F9FAFB}
.dp2-wheel-inner{position:absolute;top:0;left:0;width:100%;transition:transform .15s ease}
.dp2-wheel-item{height:26px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9CA3AF;cursor:pointer;user-select:none}
.dp2-wheel-item.active{font-weight:600;color:#1F2937;font-size:13px}
.dp2-wheel::before,.dp2-wheel::after{content:'';position:absolute;left:0;right:0;height:27px;pointer-events:none;z-index:1}
.dp2-wheel::before{top:0;background:linear-gradient(to bottom,rgba(249,250,251,.9),transparent)}
.dp2-wheel::after{bottom:0;background:linear-gradient(to top,rgba(249,250,251,.9),transparent)}
.dp2-wheel-highlight{position:absolute;top:27px;left:2px;right:2px;height:26px;border-radius:4px;background:#EFF6FF;border:1px solid #BFDBFE;pointer-events:none}
.dp2-sep{font-size:14px;color:#6B7280;font-weight:700;padding-top:14px}
.dp2-dash{font-size:12px;color:#9CA3AF;padding:0 4px;padding-top:14px}
.dp2-quick{display:flex;flex-direction:column;gap:4px;border-left:1px solid #E5E7EB;padding-left:12px;min-width:72px}
.dp2-quick-title{font-size:10px;font-weight:600;color:#9CA3AF;margin-bottom:2px}
.dp2-quick button{text-align:left;background:none;border:1px solid #E5E7EB;border-radius:5px;padding:5px 8px;font-size:12px;color:#374151;cursor:pointer;white-space:nowrap}
.dp2-quick button:hover{background:#EFF6FF;border-color:#3B82F6;color:#2563EB}
.dp2-quick button.active{background:#EFF6FF;border-color:#3B82F6;color:#2563EB}
`;
  document.head.appendChild(style);

  const fmt=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const today=new Date();today.setHours(0,0,0,0);

  function getShortcuts(){
    const t=new Date();t.setHours(0,0,0,0);
    const yesterday=new Date(t);yesterday.setDate(t.getDate()-1);
    const d7=new Date(t);d7.setDate(t.getDate()-6);
    const d30=new Date(t);d30.setDate(t.getDate()-29);
    const monthStart=new Date(t.getFullYear(),t.getMonth(),1);
    const lastMonthStart=new Date(t.getFullYear(),t.getMonth()-1,1);
    const lastMonthEnd=new Date(t.getFullYear(),t.getMonth(),0);
    return [
      {label:'今天',start:t,end:t},
      {label:'昨天',start:yesterday,end:yesterday},
      {label:'近7天',start:d7,end:t},
      {label:'近30天',start:d30,end:t},
      {label:'本月',start:monthStart,end:t},
      {label:'上個月',start:lastMonthStart,end:lastMonthEnd},
    ];
  }

  function createWheel(container, max, initial, pad){
    const items=[];
    for(let i=0;i<=max;i++) items.push(pad?String(i).padStart(2,'0'):String(i));
    const inner=container.querySelector('.dp2-wheel-inner');
    inner.innerHTML=items.map((v,i)=>`<div class="dp2-wheel-item${i===initial?' active':''}" data-v="${i}">${v}</div>`).join('');
    let current=initial;
    const itemH=26;
    function scrollTo(idx){
      current=Math.max(0,Math.min(max,idx));
      inner.style.transform='translateY('+(27-current*itemH)+'px)';
      inner.querySelectorAll('.dp2-wheel-item').forEach((el,i)=>{el.classList.toggle('active',i===current);});
    }
    scrollTo(initial);
    // Mouse wheel
    container.addEventListener('wheel',e=>{e.preventDefault();scrollTo(current+(e.deltaY>0?1:-1));},{passive:false});
    // Click
    inner.querySelectorAll('.dp2-wheel-item').forEach(el=>{
      el.addEventListener('click',()=>scrollTo(+el.dataset.v));
    });
    // Touch drag
    let startY=0,startIdx=0;
    container.addEventListener('touchstart',e=>{startY=e.touches[0].clientY;startIdx=current;});
    container.addEventListener('touchmove',e=>{
      e.preventDefault();
      const dy=startY-e.touches[0].clientY;
      scrollTo(startIdx+Math.round(dy/itemH));
    },{passive:false});
    return {get:()=>current, set:scrollTo};
  }

  function initPicker(wrap){
    const oldPanel=wrap.querySelector('.date-picker-panel,.dp2-panel');
    if(oldPanel)oldPanel.remove();
    // Remove v2 marker if exists
    const v2m=document.getElementById('nova-dp-v2');if(v2m)v2m.remove();

    const trigger=wrap.querySelector('.date-picker-trigger');
    let display=wrap.querySelector('.date-display');
    if(!trigger)return;
    if(!display){display=document.createElement('span');display.className='date-display';display.textContent='選擇日期範圍';trigger.appendChild(display);}

    const panel=document.createElement('div');
    panel.className='dp2-panel';
    panel.innerHTML=`
      <div class="dp2-left">
        <div class="dp2-cal-header"><button class="dp2-prev">&lt;</button><span class="dp2-title"></span><button class="dp2-next">&gt;</button></div>
        <div class="dp2-grid"></div>
        <div class="dp2-time">
          <div class="dp2-wheel-group"><label>起始</label><div class="dp2-wheel dp2-sh-wheel"><div class="dp2-wheel-highlight"></div><div class="dp2-wheel-inner"></div></div></div>
          <span class="dp2-sep">:</span>
          <div class="dp2-wheel-group"><label>&nbsp;</label><div class="dp2-wheel dp2-sm-wheel"><div class="dp2-wheel-highlight"></div><div class="dp2-wheel-inner"></div></div></div>
          <span class="dp2-dash">—</span>
          <div class="dp2-wheel-group"><label>結束</label><div class="dp2-wheel dp2-eh-wheel"><div class="dp2-wheel-highlight"></div><div class="dp2-wheel-inner"></div></div></div>
          <span class="dp2-sep">:</span>
          <div class="dp2-wheel-group"><label>&nbsp;</label><div class="dp2-wheel dp2-em-wheel"><div class="dp2-wheel-highlight"></div><div class="dp2-wheel-inner"></div></div></div>
        </div>
      </div>
      <div class="dp2-quick">
        <div class="dp2-quick-title">快速選擇</div>
      </div>`;
    wrap.appendChild(panel);

    // Init wheels
    const shWheel=createWheel(panel.querySelector('.dp2-sh-wheel'),23,0,true);
    const smWheel=createWheel(panel.querySelector('.dp2-sm-wheel'),59,0,true);
    const ehWheel=createWheel(panel.querySelector('.dp2-eh-wheel'),23,23,true);
    const emWheel=createWheel(panel.querySelector('.dp2-em-wheel'),59,59,true);

    let cY=today.getFullYear(),cM=today.getMonth();
    let rs=null,re=null,selecting=false;
    const shortcuts=getShortcuts();
    const quickDiv=panel.querySelector('.dp2-quick');

    shortcuts.forEach(s=>{
      const btn=document.createElement('button');
      btn.textContent=s.label;
      btn.addEventListener('click',ev=>{
        ev.stopPropagation();
        rs=s.start;re=s.end;selecting=false;
        cY=rs.getFullYear();cM=rs.getMonth();
        quickDiv.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        render();
        applyDisplay();
        setTimeout(()=>panel.classList.remove('show'),150);
      });
      quickDiv.appendChild(btn);
    });

    function applyDisplay(){
      if(!rs||!re)return;
      const sh=String(shWheel.get()).padStart(2,'0');
      const sm=String(smWheel.get()).padStart(2,'0');
      const eh=String(ehWheel.get()).padStart(2,'0');
      const em=String(emWheel.get()).padStart(2,'0');
      const txt=fmt(rs)+' '+sh+':'+sm+' \u2013 '+fmt(re)+' '+eh+':'+em;
      display.textContent=txt;
      const hidden=wrap.querySelector('input[type="hidden"]');
      if(hidden)hidden.value=fmt(rs)+' '+sh+':'+sm+':00 ~ '+fmt(re)+' '+eh+':'+em+':59';
    }

    function render(){
      const grid=panel.querySelector('.dp2-grid');
      panel.querySelector('.dp2-title').textContent=cY+'年'+(cM+1)+'月';
      const firstDay=new Date(cY,cM,1).getDay();
      const daysInMonth=new Date(cY,cM+1,0).getDate();
      const prevDays=new Date(cY,cM,0).getDate();
      let html=['日','一','二','三','四','五','六'].map(d=>'<div class="dh">'+d+'</div>').join('');
      for(let i=0;i<firstDay;i++)html+='<div class="dd other">'+(prevDays-firstDay+1+i)+'</div>';
      for(let d=1;d<=daysInMonth;d++){
        const date=new Date(cY,cM,d);
        let cls='dd';
        if(date.toDateString()===today.toDateString())cls+=' today';
        if(rs&&re&&date>=rs&&date<=re)cls+=' in-range';
        if(rs&&date.toDateString()===rs.toDateString())cls+=' range-start';
        if(re&&date.toDateString()===re.toDateString())cls+=' range-end';
        html+='<div class="'+cls+'" data-d="'+d+'">'+d+'</div>';
      }
      const total=firstDay+daysInMonth;
      for(let i=1;i<=(7-total%7)%7;i++)html+='<div class="dd other">'+i+'</div>';
      grid.innerHTML=html;
      grid.querySelectorAll('.dd:not(.other)').forEach(el=>{
        el.addEventListener('click',ev=>{
          ev.stopPropagation();
          const clicked=new Date(cY,cM,+el.dataset.d);
          if(!selecting||!rs){rs=clicked;re=null;selecting=true;}
          else{
            if(clicked<rs){re=rs;rs=clicked;}else{re=clicked;}
            selecting=false;
            applyDisplay();
            setTimeout(()=>panel.classList.remove('show'),150);
          }
          quickDiv.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
          render();
        });
      });
    }

    panel.querySelector('.dp2-prev').addEventListener('click',ev=>{ev.stopPropagation();cM--;if(cM<0){cM=11;cY--;}render();});
    panel.querySelector('.dp2-next').addEventListener('click',ev=>{ev.stopPropagation();cM++;if(cM>11){cM=0;cY++;}render();});

    trigger.addEventListener('click',ev=>{
      ev.stopPropagation();
      document.querySelectorAll('.dp2-panel.show').forEach(p=>{if(p!==panel)p.classList.remove('show');});
      panel.classList.toggle('show');
      if(panel.classList.contains('show'))render();
    });

    panel.addEventListener('click',ev=>ev.stopPropagation());
    // Expose instance on DOM element
    wrap._dpInstance = { get startDate(){ return rs ? fmt(rs)+' '+String(shWheel.get()).padStart(2,'0')+':'+String(smWheel.get()).padStart(2,'0') : ''; }, get endDate(){ return re ? fmt(re)+' '+String(ehWheel.get()).padStart(2,'0')+':'+String(emWheel.get()).padStart(2,'0') : ''; }, reset(){ rs=null;re=null;display.textContent='選擇日期範圍'; } };
  }

  document.addEventListener('click',()=>{
    document.querySelectorAll('.dp2-panel.show').forEach(p=>p.classList.remove('show'));
  });

  document.querySelectorAll('.date-picker-wrap').forEach(initPicker);
  window.NovaDatePicker={init:initPicker};
})();
