// Chart.js 共用配置 - 對齊 insight 系統風格
// 垂直虛線 crosshair plugin
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw(chart) {
    if (chart.tooltip?._active?.length) {
      const x = chart.tooltip._active[0].element.x;
      const yAxis = chart.scales.y;
      const ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1;
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.stroke();
      ctx.restore();
    }
  }
};
Chart.register(crosshairPlugin);

// 共用 tooltip 樣式
const TOOLTIP_STYLE = {
  backgroundColor: '#fff',
  titleColor: '#1E293B',
  bodyColor: '#475569',
  borderColor: '#E2E8F0',
  borderWidth: 1,
  cornerRadius: 8,
  padding: 10,
  titleFont: { size: 12, weight: '600' },
  bodyFont: { size: 11 },
  displayColors: true,
  boxWidth: 8,
  boxHeight: 8,
  usePointStyle: true
};

// KPI sparkline 配置
function createSparkline(canvas, data, color, label) {
  const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, color + '40');
  gradient.addColorStop(1, color + '00');
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + ':00'),
      datasets: [{
        label: label || '',
        data: data,
        borderColor: color,
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { ...TOOLTIP_STYLE, callbacks: {
          title: (items) => items[0].label,
          label: (item) => ` ${item.dataset.label}: ${item.formattedValue}`
        }}
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// 標準折線圖（登入數據、金幣趨勢等）
function createLineChart(canvas, config) {
  const datasets = config.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    borderColor: ds.color,
    backgroundColor: ds.color + '20',
    borderWidth: 2,
    borderDash: ds.dash || [],
    fill: ds.fill || false,
    tension: 0.3,
    pointRadius: 3,
    pointStyle: ds.pointStyle || 'circle',
    pointBackgroundColor: ds.color,
    pointBorderColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: ds.color,
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2
  }));
  return new Chart(canvas, {
    type: 'line',
    data: { labels: config.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } } },
        tooltip: { ...TOOLTIP_STYLE }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94A3B8' } },
        y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 }, color: '#94A3B8' }, title: config.yTitle ? { display: true, text: config.yTitle, font: { size: 11 }, color: '#64748B' } : undefined }
      }
    }
  });
}

// 柱狀圖（餘額分佈、產出消耗等）
function createBarChart(canvas, config) {
  const datasets = config.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: ds.color,
    borderColor: ds.borderColor || ds.color,
    borderWidth: 1,
    borderRadius: 4,
    type: ds.type || 'bar'
  }));
  return new Chart(canvas, {
    type: 'bar',
    data: { labels: config.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'center', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } },
        tooltip: { ...TOOLTIP_STYLE }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94A3B8' } },
        y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 }, color: '#94A3B8' }, title: config.yTitle ? { display: true, text: config.yTitle, font: { size: 11 }, color: '#64748B' } : undefined }
      }
    }
  });
}
