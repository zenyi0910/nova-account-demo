/**
 * Nova 後台通用日期時間選擇器 v2
 * 自動初始化所有 .date-picker-wrap 元素
 * 移除舊面板，注入新的緊湊面板（日曆+input時間+快速選擇）
 */
(function(){
  if(document.getElementById('nova-dp-v2'))return;
  const marker=document.createElement('meta');marker.id='nova-dp-v2';document.head.appendChild(marker);

  // 注入 CSS
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
.dp2-time{display:flex;align-items:center;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid #E5E7EB}
.dp2-tg{display:flex;flex-direction:column;gap:2px}
.dp2-tg label{font-size:10px;color:#9CA3AF;font-weight:500}
.dp2-tg .dp2-ti{display:flex;align-items:center;gap:3px}
.dp2-tg input{width:32px;height:26px;border:1px solid #E5E7EB;border-radius:4px;text-align:center;font-size:12px;font-weight:500;color:#374151;padding:0}
.dp2-tg input:focus{outline:none;border-color:#3B82F6}
.dp2-sep{font-size:12px;color:#9CA3AF;font-weight:600}
.dp2-dash{font-size:12px;color:#9CA3AF;padding:0 4px;align-self:flex-end;padding-bottom:4px}
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

  function initPicker(wrap){
    // 移除舊面板
    const oldPanel=wrap.querySelector('.date-picker-panel');
    if(oldPanel)oldPanel.remove();

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
          <div class="dp2-tg"><label>起始</label><div class="dp2-ti"><input class="dp2-sh" value="00" maxlength="2"><span class="dp2-sep">:</span><input class="dp2-sm" value="00" maxlength="2"></div></div>
          <span class="dp2-dash">—</span>
          <div class="dp2-tg"><label>結束</label><div class="dp2-ti"><input class="dp2-eh" value="23" maxlength="2"><span class="dp2-sep">:</span><input class="dp2-em" value="59" maxlength="2"></div></div>
        </div>
      </div>
      <div class="dp2-quick">
        <div class="dp2-quick-title">快速選擇</div>
      </div>`;
    wrap.appendChild(panel);

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
      const sh=panel.querySelector('.dp2-sh').value.padStart(2,'0');
      const sm=panel.querySelector('.dp2-sm').value.padStart(2,'0');
      const eh=panel.querySelector('.dp2-eh').value.padStart(2,'0');
      const em=panel.querySelector('.dp2-em').value.padStart(2,'0');
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
    panel.querySelectorAll('input').forEach(inp=>{
      inp.addEventListener('input',()=>{inp.value=inp.value.replace(/[^0-9]/g,'').slice(0,2);});
      inp.addEventListener('change',applyDisplay);
    });
  }

  // Close on outside click
  document.addEventListener('click',()=>{
    document.querySelectorAll('.dp2-panel.show').forEach(p=>p.classList.remove('show'));
  });

  // Init all
  document.querySelectorAll('.date-picker-wrap').forEach(initPicker);

  // Expose for dynamic use
  window.NovaDatePicker={init:initPicker};
})();
