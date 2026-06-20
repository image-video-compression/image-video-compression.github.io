const CHART_COLORS = {
  primary: "#1693f3",
  purple: "#9b59b6",
  green: "#27ae60",
  orange: "#e67e22",
  red: "#e74c3c",
  teal: "#1abc9c",
  gray: "#95a5a6",
  palette: ["#1693f3", "#9b59b6", "#27ae60", "#e67e22", "#e74c3c", "#1abc9c", "#3498db", "#f39c12"],
};

let yearChart = null;
let typeChart = null;
let venueChart = null;
let chartCallbacks = {};

function formatTypeLabel(type) {
  if (!type || type === "submission") return "Submitted";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function countByField(papers, field, transform = (v) => v) {
  const counts = {};
  for (const p of papers) {
    const key = transform(p[field] || "");
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function animateValue(el, target, duration = 900) {
  const start = performance.now();
  const from = 0;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderStatCards(papers) {
  const years = papers.map((p) => parseInt(p.year, 10)).filter((y) => !Number.isNaN(y));
  const minYear = years.length ? Math.min(...years) : "—";
  const maxYear = years.length ? Math.max(...years) : "—";
  const types = new Set(papers.map((p) => p.type).filter(Boolean));
  const recent = papers.filter((p) => parseInt(p.year, 10) >= 2020).length;

  animateValue(document.getElementById("statTotal"), papers.length);
  document.getElementById("statYears").textContent = years.length ? `${minYear}–${maxYear}` : "—";
  animateValue(document.getElementById("statTypes"), types.size);
  animateValue(document.getElementById("statRecent"), recent);
}

function buildYearChart(papers) {
  const counts = countByField(papers, "year");
  const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
  const data = labels.map((l) => counts[l]);

  const ctx = document.getElementById("yearChart");
  if (yearChart) yearChart.destroy();

  yearChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Papers",
        data,
        backgroundColor: labels.map((_, i) => CHART_COLORS.palette[i % CHART_COLORS.palette.length] + "cc"),
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: CHART_COLORS.primary,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} papers` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } } },
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f0f0f0" } },
      },
      onClick: (_, elements) => {
        if (elements.length && chartCallbacks.onYearClick) {
          chartCallbacks.onYearClick(labels[elements[0].index]);
        }
      },
    },
  });
}

function buildTypeChart(papers) {
  const counts = countByField(papers, "type", formatTypeLabel);
  const labels = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const data = labels.map((l) => counts[l]);

  const ctx = document.getElementById("typeChart");
  if (typeChart) typeChart.destroy();

  typeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: CHART_COLORS.palette.slice(0, labels.length),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 12,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { animateRotate: true, animateScale: true, duration: 1400 },
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed} papers` } },
      },
      onClick: (_, elements) => {
        if (elements.length && chartCallbacks.onTypeClick) {
          chartCallbacks.onTypeClick(labels[elements[0].index]);
        }
      },
    },
  });
}

function buildVenueChart(papers) {
  const counts = countByField(papers, "venue");
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const labels = sorted.map(([v]) => (v.length > 45 ? v.slice(0, 42) + "…" : v));
  const fullLabels = sorted.map(([v]) => v);
  const data = sorted.map(([, c]) => c);

  const ctx = document.getElementById("venueChart");
  if (venueChart) venueChart.destroy();

  venueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Papers",
        data,
        backgroundColor: CHART_COLORS.primary + "99",
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: CHART_COLORS.purple,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, delay: (ctx) => ctx.dataIndex * 80, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => fullLabels[items[0].dataIndex],
            label: (ctx) => `${ctx.parsed.x} papers`,
          },
        },
      },
      scales: {
        x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f0f0f0" } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
      onClick: (_, elements) => {
        if (elements.length && chartCallbacks.onVenueClick) {
          chartCallbacks.onVenueClick(fullLabels[elements[0].index]);
        }
      },
    },
  });
}

function renderSurveyCharts(papers, callbacks = {}) {
  chartCallbacks = callbacks;
  document.getElementById("dashboardSection").style.display = "block";
  renderStatCards(papers);
  buildYearChart(papers);
  buildTypeChart(papers);
  buildVenueChart(papers);
}

window.renderSurveyCharts = renderSurveyCharts;
