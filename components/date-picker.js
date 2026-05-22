/**
 * Nova 後台通用日期時間選擇器 v4
 * 雙月曆 + 快捷選單(左側) + 時間選擇(起始/結束)
 * 限制：只能選昨日以前
 */
(function(){
  if(document.getElementById('nova-dp-v4'))return;
  const marker=document.createElement('meta');marker.id='nova-dp-v4';document.head.appendChild(marker);
  // Remove old markers
  const old3=document.getElementById('nova-dp-v3');if(old3)old3.remove();
  const old2=document.getElementById('nova-dp-v2');if(old2)old2.remove();

  const style=document.createElement('style');
  style.textContent=`
.dp2-panel{display:none;position:absolute;top:calc(100% + 4px);left:0;z-index:1000;background:#fff;border:1px solid #E5E7EB;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.12);padding:16px;flex-direction:row;gap:12px}
.dp2-panel.show{display:flex}
.dp2-quick{display:flex;flex-direction:column;gap:4px;border-right:1px solid #E5E7EB;padding-right:12px;min-width:72px}
.dp2-quick-title{font-size:10px;font-weight:600;color:#9CA3AF;margin-bottom:2px}
.dp2-quick button{text-align:left;background:none;border:1px solid #E5E7EB;border-radius:5px;padding:5px 8px;font-size:12px;color:#374151;cursor:pointer;white-space:nowrap}
.dp2-quick button:hover{background:#EFF6FF;border-color:#3B82F6;color:#2563EB}
.dp2-quick button.active{background:#EFF6FF;border-color:#3B82F6;color:#2563EB}
.dp2-cals{display:flex;gap:16px}
.dp2-cal{display:flex;flex-direction:column;width:210px}
.dp2-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.dp2-cal-header span{font-size:13px;font-weight:600;color:#1F2937}
.dp2-cal-header button{background:none;border:none;cursor:pointer;color:#6B7280;font-size:16px;padding:2px 6px;border-radius:4px}
.dp2-cal-header button:hover{background:#F3F4F6}
.dp2-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center}
.dp2-grid .dh{font-size:11px;color:#9CA3AF;padding:4px 0;font-weight:500}
.dp2-grid .dd{font-size:12px;padding:5px 0;border-radius:4px;cursor:pointer;color:#374151}
.dp2-grid .dd:hover:not(.disabled):not(.other){background:#EFF6FF}
.dp2-grid .dd.other{color:#D1D5DB;pointer-events:none}
.dp2-grid .dd.disabled{color:#D1D5DB;pointer-events:none;cursor:not-allowed;opacity:0.5}
.dp2-grid .dd.today{font-weight:700;box-shadow:inset 0 0 0 1px #3B82F6}
.dp2-grid .dd.sel{background:#2563EB;color:#fff;border-radius:50%}
.dp2-grid .dd.in-range{background:#DBEAFE;color:#1E40AF}
.dp2-grid .dd.range-start,.dp2-grid .dd.range-end{background:#2563EB;color:#fff;border-radius:50%}
.dp2-time{display:flex;align-items:center;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid #E5E7EB;font-size:12px;color:#374151}
.dp2-time-label{font-size:11px;color:#6B7280;font-weight:500;min-width:28px}
.dp2-time-input{display:flex;align-items:center;gap:2px}
.dp2-time-input input{width:32px;text-align:center;border:1px solid #E5E7EB;border-radius:4px;padding:4px 2px;font-size:12px;font-family:inherit}
.dp2-time-input input:focus{outline:none;border-color:#3B82F6}
.dp2-time-input .sep{color:#6B7280;font-weight:600}
`;
  document.head.appendChild(style);

  const fmt=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const today=new Date();today.setHours(0,0,0,0);
  const yesterday=new Date(today);yesterday.setDate(today.getDate()-1);

  function getShortcuts(){
    const t=new Date();t.setHours(0,0,0,0);
    const yest=new Date(t);yest.setDate(t.getDate()-1);
    const d7=new Date(t);d7.setDate(t.getDate()-7);
    const d30=new Date(t);d30.setDate(t.getDate()-30);
    const weekStart=new Date(t);weekStart.setDate(t.getDate()-t.getDay()-7);
    const weekEnd=new Date(weekStart);weekEnd.setDate(weekStart.getDate()+6);
    const thisWeekStart=new Date(t);thisWeekStart.setDate(t.getDate()-t.getDay());
    const monthStart=new Date(t.getFullYear(),t.getMonth(),1);
    const lastMonthStart=new Date(t.getFullYear(),t.getMonth()-1,1);
    const lastMonthEnd=new Date(t.getFullYear(),t.getMonth(),0);
    return [
      {label:'昨天',start:yest,end:yest},
      {label:'本週',start:thisWeekStart,end:yest},
      {label:'上週',start:weekStart,end:weekEnd},
      {label:'本月',start:monthStart,end:yest},
      {label:'上個月',start:lastMonthStart,end:lastMonthEnd},
      {label:'近7天',start:d7,end:yest},
      {label:'近30天',start:d30,end:yest},
    ];
  }

  function renderCal(container, year, month, rs, re, maxDate, onClick){
    const title=container.querySelector('.dp2-cal-header span');
    const grid=container.querySelector('.dp2-grid');
    title.textContent=year+'年 '+(month+1)+'月';
    const firstDay=new Date(year,month,1).getDay();
    const daysInMonth=new Date(year,month+1,0).getDate();
    const prevDays=new Date(year,month,0).getDate();
    let html=['日','一','二','三','四','五','六'].map(d=>'<div class="dh">'+d+'</div>').join('');
    for(let i=0;i<firstDay;i++) html+='<div class="dd other">'+(prevDays-firstDay+1+i)+'</div>';
    for(let d=1;d<=daysInMonth;d++){
      const date=new Date(year,month,d);
      let cls='dd';
      if(date>maxDate) cls+=' disabled';
      if(date.toDateString()===today.toDateString()) cls+=' today';
      if(rs&&re&&date>=rs&&date<=re) cls+=' in-range';
      if(rs&&date.toDateString()===rs.toDateString()) cls+=' range-start';
      if(re&&date.toDateString()===re.toDateString()) cls+=' range-end';
      html+='<div class="'+cls+'" data-d="'+d+'" data-m="'+month+'" data-y="'+year+'">'+d+'</div>';
    }
    const total=firstDay+daysInMonth;
    for(let i=1;i<=(7-total%7)%7;i++) html+='<div class="dd other">'+i+'</div>';
    grid.innerHTML=html;
    grid.querySelectorAll('.dd:not(.other):not(.disabled)').forEach(el=>{
      el.addEventListener('click',ev=>{
        ev.stopPropagation();
        onClick(new Date(+el.dataset.y,+el.dataset.m,+el.dataset.d));
      });
    });
  }

  function initPicker(wrap){
    const oldPanel=wrap.querySelector('.date-picker-panel,.dp2-panel');
    if(oldPanel)oldPanel.remove();

    const trigger=wrap.querySelector('.date-picker-trigger');
    let display=wrap.querySelector('.date-display');
    if(!trigger)return;
    if(!display){display=document.createElement('span');display.className='date-display';display.textContent='選擇日期範圍';trigger.appendChild(display);}

    const panel=document.createElement('div');
    panel.className='dp2-panel';
    panel.innerHTML=`
      <div class="dp2-quick">
        <div class="dp2-quick-title">快捷選單</div>
      </div>
      <div style="display:flex;flex-direction:column">
        <div class="dp2-cals">
          <div class="dp2-cal dp2-cal-left">
            <div class="dp2-cal-header"><button class="dp2-prev">&lt;</button><span></span><button class="dp2-next">&gt;</button></div>
            <div class="dp2-grid"></div>
          </div>
          <div class="dp2-cal dp2-cal-right">
            <div class="dp2-cal-header"><button class="dp2-prev">&lt;</button><span></span><button class="dp2-next">&gt;</button></div>
            <div class="dp2-grid"></div>
          </div>
        </div>
        <div class="dp2-time">
          <span class="dp2-time-label">起始</span>
          <div class="dp2-time-input">
            <input type="text" class="dp2-sh" value="00" maxlength="2"><span class="sep">:</span>
            <input type="text" class="dp2-sm" value="00" maxlength="2"><span class="sep">:</span>
            <input type="text" class="dp2-ss" value="00" maxlength="2">
          </div>
          <span style="color:#9CA3AF;margin:0 8px">—</span>
          <span class="dp2-time-label">結束</span>
          <div class="dp2-time-input">
            <input type="text" class="dp2-eh" value="23" maxlength="2"><span class="sep">:</span>
            <input type="text" class="dp2-em" value="59" maxlength="2"><span class="sep">:</span>
            <input type="text" class="dp2-es" value="59" maxlength="2">
          </div>
        </div>
      </div>`;
    wrap.appendChild(panel);

    // Time inputs
    const shI=panel.querySelector('.dp2-sh'),smI=panel.querySelector('.dp2-sm'),ssI=panel.querySelector('.dp2-ss');
    const ehI=panel.querySelector('.dp2-eh'),emI=panel.querySelector('.dp2-em'),esI=panel.querySelector('.dp2-es');
    function clampTime(input,max){input.addEventListener('blur',()=>{let v=parseInt(input.value)||0;if(v<0)v=0;if(v>max)v=max;input.value=String(v).padStart(2,'0');});}
    clampTime(shI,23);clampTime(smI,59);clampTime(ssI,59);
    clampTime(ehI,23);clampTime(emI,59);clampTime(esI,59);

    let lY=today.getFullYear(),lM=today.getMonth()-1;
    if(lM<0){lM=11;lY--;}
    let rY=today.getFullYear(),rM=today.getMonth();
    let rs=null,re=null,selecting=false;
    const maxDate=yesterday;
    const shortcuts=getShortcuts();
    const quickDiv=panel.querySelector('.dp2-quick');

    shortcuts.forEach(s=>{
      const btn=document.createElement('button');
      btn.textContent=s.label;
      btn.addEventListener('click',ev=>{
        ev.stopPropagation();
        rs=s.start;re=s.end;selecting=false;
        lY=rs.getFullYear();lM=rs.getMonth();
        rY=lY;rM=lM+1;if(rM>11){rM=0;rY++;}
        quickDiv.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        render();
        applyDisplay();
        setTimeout(()=>panel.classList.remove('show'),200);
      });
      quickDiv.appendChild(btn);
    });

    function applyDisplay(){
      if(!rs||!re)return;
      const txt=fmt(rs)+' '+shI.value+':'+smI.value+':'+ssI.value+' ~ '+fmt(re)+' '+ehI.value+':'+emI.value+':'+esI.value;
      display.textContent=txt;
    }

    function onDateClick(clicked){
      if(!selecting||!rs){rs=clicked;re=null;selecting=true;}
      else{
        if(clicked<rs){re=rs;rs=clicked;}else{re=clicked;}
        selecting=false;
        applyDisplay();
        setTimeout(()=>panel.classList.remove('show'),200);
      }
      quickDiv.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      render();
    }

    function render(){
      renderCal(panel.querySelector('.dp2-cal-left'),lY,lM,rs,re,maxDate,onDateClick);
      renderCal(panel.querySelector('.dp2-cal-right'),rY,rM,rs,re,maxDate,onDateClick);
    }

    // Left cal nav
    panel.querySelector('.dp2-cal-left .dp2-prev').addEventListener('click',ev=>{ev.stopPropagation();lM--;if(lM<0){lM=11;lY--;}rM--;if(rM<0){rM=11;rY--;}render();});
    panel.querySelector('.dp2-cal-left .dp2-next').addEventListener('click',ev=>{ev.stopPropagation();lM++;if(lM>11){lM=0;lY++;}rM++;if(rM>11){rM=0;rY++;}render();});
    // Right cal nav
    panel.querySelector('.dp2-cal-right .dp2-prev').addEventListener('click',ev=>{ev.stopPropagation();lM--;if(lM<0){lM=11;lY--;}rM--;if(rM<0){rM=11;rY--;}render();});
    panel.querySelector('.dp2-cal-right .dp2-next').addEventListener('click',ev=>{ev.stopPropagation();lM++;if(lM>11){lM=0;lY++;}rM++;if(rM>11){rM=0;rY++;}render();});

    trigger.addEventListener('click',ev=>{
      ev.stopPropagation();
      document.querySelectorAll('.dp2-panel.show').forEach(p=>{if(p!==panel)p.classList.remove('show');});
      panel.classList.toggle('show');
      if(panel.classList.contains('show'))render();
    });

    panel.addEventListener('click',ev=>ev.stopPropagation());
    wrap._dpInstance={get startDate(){return rs?fmt(rs)+' '+shI.value+':'+smI.value+':'+ssI.value:'';},get endDate(){return re?fmt(re)+' '+ehI.value+':'+emI.value+':'+esI.value:'';},reset(){rs=null;re=null;display.textContent='選擇日期範圍';}};
  }

  document.addEventListener('click',()=>{
    document.querySelectorAll('.dp2-panel.show').forEach(p=>p.classList.remove('show'));
  });

  document.querySelectorAll('.date-picker-wrap').forEach(initPicker);
  window.NovaDatePicker={init:initPicker};
})();
