const STORAGE_KEY = "survey_submitted_papers";
const DELETED_IDS_KEY = "survey_deleted_paper_ids";

let allData = [];
let filteredData = [];
let currentPage = 1;
let recordsPerPage = 100;
let sortColumn = "year";
let sortDirection = "desc";

function getPageBase() {
  const path = window.location.pathname;
  if (path.endsWith("/")) {
    return window.location.origin + path;
  }
  const last = path.split("/").pop() || "";
  if (last.includes(".")) {
    return window.location.origin + path.substring(0, path.lastIndexOf("/") + 1);
  }
  return window.location.origin + path + "/";
}

function assetUrl(relativePath) {
  return new URL(relativePath, getPageBase()).href;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function loadLocalSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadDeletedIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(DELETED_IDS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveDeletedIds(ids) {
  localStorage.setItem(DELETED_IDS_KEY, JSON.stringify([...ids]));
}

function saveLocalSubmissions(papers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
}

function deletePaper(paperId) {
  const deleted = loadDeletedIds();
  deleted.add(paperId);
  saveDeletedIds(deleted);

  const remaining = loadLocalSubmissions().filter((p) => p.id !== paperId);
  saveLocalSubmissions(remaining);

  allData = allData.filter((p) => p.id !== paperId);
  applyFilters();
}

// How long a freshly-submitted paper's "Delete" button stays active.
// After this window, the submitter is assumed to have reviewed it; the
// button is disabled so other visitors can no longer remove someone
// else's submission from the table.
const SUBMISSION_DELETE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function isSubmissionEntry(paper) {
  return paper.source === "submission" || paper.type === "submission" || paper.submitted === true;
}

function isWithinDeleteWindow(paper) {
  if (!paper.addedAt) return false;
  const addedTime = new Date(paper.addedAt).getTime();
  if (Number.isNaN(addedTime)) return false;
  return Date.now() - addedTime < SUBMISSION_DELETE_WINDOW_MS;
}

function isDeletable(paper) {
  return isSubmissionEntry(paper) && isWithinDeleteWindow(paper);
}

function mergePapers(basePapers, localSubmissions) {
  const deleted = loadDeletedIds();
  const seen = new Set(basePapers.map((p) => p.id));
  const merged = basePapers.filter((p) => !deleted.has(p.id));

  for (const sub of localSubmissions) {
    if (deleted.has(sub.id) || seen.has(sub.id)) continue;
    merged.push({
      ...sub,
      type: sub.type || "submission",
      source: "submission",
      submitted: true,
    });
    seen.add(sub.id);
  }

  return merged;
}

function formatVenueCell(venueAbbrev, searchTerm) {
  const map = window.VENUE_MAP || {};
  const entry = map[venueAbbrev];
  const abbrev = escapeHtml(venueAbbrev || "");
  if (!entry) {
    return searchTerm ? highlightSearchTerm(venueAbbrev, searchTerm) : abbrev;
  }
  return searchTerm
    ? highlightSearchTerm(entry.full, searchTerm)
    : escapeHtml(entry.full);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightSearchTerm(text, searchTerm) {
  if (!text || !searchTerm || searchTerm.length < 2) return escapeHtml(text);
  const safeText = escapeHtml(text);
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
  return safeText.replace(regex, "<mark>$1</mark>");
}

function formatTypeLabel(type) {
  if (!type || type === "submission") return "Submitted";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getTagClass(type) {
  const key = (type || "default").toLowerCase().replace(/[^a-z]/g, "");
  const known = ["article", "inproceedings", "book", "techreport", "misc", "submission"];
  return known.includes(key) ? `tag tag-type-${key}` : "tag tag-default";
}

function populateSelect(selectId, options, allLabel) {
  const select = document.getElementById(selectId);
  select.innerHTML = `<option value="">${allLabel}</option>`;
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
}

function populateFilters() {
  const types = [...new Set(allData.map((row) => formatTypeLabel(row.type)).filter(Boolean))].sort();
  const years = [...new Set(allData.map((row) => String(row.year || "")).filter(Boolean))].sort(
    (a, b) => Number(b) - Number(a)
  );

  populateSelect("typeFilter", types, "All Types");
  populateSelect("yearFilter", years, "All Years");
}

function calculateSearchScore(searchTerm, row) {
  const fieldWeights = { title: 10, authors: 8, venue: 6, year: 4, type: 2 };
  let score = 0;
  const searchLower = searchTerm.toLowerCase();

  for (const [field, weight] of Object.entries(fieldWeights)) {
    const value = String(row[field] || "").toLowerCase();
    if (!value) continue;
    if (value === searchLower) score += weight * 10;
    else if (value.split(/\s+/).some((word) => word.startsWith(searchLower))) score += weight * 5;
    else if (value.includes(searchLower)) score += weight * 2;
  }

  return score;
}

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const typeFilter = document.getElementById("typeFilter").value;
  const yearFilter = document.getElementById("yearFilter").value;

  const results = allData
    .map((row) => {
      const typeLabel = formatTypeLabel(row.type);
      if (typeFilter && typeLabel !== typeFilter) return null;
      if (yearFilter && String(row.year || "") !== yearFilter) return null;

      if (searchTerm) {
        const score = calculateSearchScore(searchTerm, row);
        const broadMatch = Object.values(row).some((value) =>
          String(value || "").toLowerCase().includes(searchTerm)
        );
        if (score === 0 && !broadMatch) return null;
        return { row, score };
      }

      return { row, score: 0 };
    })
    .filter(Boolean);

  if (searchTerm && results.some((item) => item.score > 0)) {
    results.sort((a, b) => b.score - a.score);
  }

  filteredData = results.map((item) => item.row);
  currentPage = 1;
  sortTable(sortColumn, true);
}

function compareValues(aVal, bVal) {
  const aNum = Number(aVal);
  const bNum = Number(bVal);
  if (!Number.isNaN(aNum) && !Number.isNaN(bNum) && String(aVal).trim() !== "") {
    return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
  }
  return sortDirection === "asc"
    ? String(aVal).localeCompare(String(bVal))
    : String(bVal).localeCompare(String(aVal));
}

function sortTable(column, keepDirection = false) {
  if (!keepDirection) {
    if (sortColumn === column) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortColumn = column;
      sortDirection = column === "year" ? "desc" : "asc";
    }
  }

  filteredData.sort((a, b) => {
    let aVal = a[column] || "";
    let bVal = b[column] || "";
    if (column === "type") {
      aVal = formatTypeLabel(aVal);
      bVal = formatTypeLabel(bVal);
    }
    return compareValues(aVal, bVal);
  });

  document.querySelectorAll("th.sortable").forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
    if (th.dataset.column === sortColumn) {
      th.classList.add(sortDirection === "asc" ? "sort-asc" : "sort-desc");
    }
  });

  updateTable();
  updatePagination();
}

function updateTable() {
  const tbody = document.getElementById("tableBody");
  const searchTerm = document.getElementById("searchInput").value.trim();
  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const pageData = filteredData.slice(start, end);

  tbody.innerHTML = "";

  if (pageData.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center loading">No papers found. Try different filters or <a href="submit.html">submit a paper</a>.</td></tr>';
    return;
  }

  pageData.forEach((row) => {
    const tr = document.createElement("tr");
    const typeLabel = formatTypeLabel(row.type);
    let deleteBtn = "";
    if (isSubmissionEntry(row)) {
      deleteBtn = isWithinDeleteWindow(row)
        ? `<button type="button" class="btn btn-sm btn-outline-danger delete-paper-btn" data-id="${escapeHtml(row.id)}" title="Remove this submission (available for 24h after adding)">Delete</button>`
        : `<button type="button" class="btn btn-sm btn-outline-secondary delete-paper-btn" disabled title="The 24-hour window to delete this submission has expired">Delete</button>`;
    }

    tr.innerHTML = `
      <td class="wrap">${searchTerm ? highlightSearchTerm(row.title, searchTerm) : escapeHtml(row.title)}</td>
      <td class="authors-cell">${searchTerm ? highlightSearchTerm(row.authors, searchTerm) : escapeHtml(row.authors)}</td>
      <td class="venue-cell">${formatVenueCell(row.venue, searchTerm)}</td>
      <td>${searchTerm ? highlightSearchTerm(String(row.year || ""), searchTerm) : escapeHtml(String(row.year || ""))}</td>
      <td><span class="${getTagClass(row.type)}">${escapeHtml(typeLabel)}</span></td>
      <td class="actions-cell text-center">${deleteBtn}</td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".delete-paper-btn").forEach((btn) => {
    if (btn.disabled) return; // expired delete window — no handler needed
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const paper = allData.find((p) => p.id === id);
      const title = paper ? paper.title : "this paper";
      if (window.confirm(`Remove "${title}" from your list?`)) {
        deletePaper(id);
      }
    });
  });
}

function updatePagination() {
  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const start = totalRecords > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0;
  const end = Math.min(currentPage * recordsPerPage, totalRecords);

  document.getElementById("startRecord").textContent = start;
  document.getElementById("endRecord").textContent = end;
  document.getElementById("totalRecords").textContent = totalRecords;
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;

  document.getElementById("firstPage").disabled = currentPage === 1;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage >= totalPages;
  document.getElementById("lastPage").disabled = currentPage >= totalPages;
}

function changePage(newPage) {
  const totalPages = Math.ceil(filteredData.length / recordsPerPage) || 1;
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    updateTable();
    updatePagination();
  }
}

function clearAllFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("yearFilter").value = "";
  applyFilters();
}

function showError(message) {
  document.getElementById("loadingState").innerHTML =
    `<div style="color:#c0392b;max-width:640px;margin:0 auto;text-align:left">
      <p><b>Could not load papers</b></p>
      <p>${message}</p>
      <p>To fix locally, run:</p>
      <pre style="background:#f8f9fa;padding:12px;border-radius:4px">python3 scripts/build_papers.py
cd docs && python3 -m http.server 8080</pre>
      <p>Then open <a href="http://localhost:8080">http://localhost:8080</a></p>
    </div>`;
}

async function loadBasePapers() {
  if (Array.isArray(window.SURVEY_PAPERS) && window.SURVEY_PAPERS.length > 0) {
    return window.SURVEY_PAPERS;
  }

  try {
    await loadScript(assetUrl("js/papers-data.js"));
    if (Array.isArray(window.SURVEY_PAPERS) && window.SURVEY_PAPERS.length > 0) {
      return window.SURVEY_PAPERS;
    }
  } catch {
    /* fall through to JSON fetch */
  }

  if (window.location.protocol === "file:") {
    throw new Error(
      "Browser blocked data loading from a local file. Use a local web server instead of opening index.html directly."
    );
  }

  const response = await fetch(assetUrl("papers.json"));
  if (!response.ok) {
    throw new Error(`papers.json not found (${response.status}). Run python3 scripts/build_papers.py first.`);
  }
  return response.json();
}

async function init() {
  try {
    const basePapers = await loadBasePapers();
    allData = mergePapers(basePapers, loadLocalSubmissions());

    document.getElementById("loadingState").style.display = "none";
    document.getElementById("tableSection").style.display = "block";
    document.getElementById("paginationSection").style.display = "block";

    // Show stats bar and charts section
    const dashEl = document.getElementById("dashboardSection");
    if (dashEl) dashEl.style.display = "block";
    const chartsEl = document.getElementById("chartsSection");
    if (chartsEl) chartsEl.style.display = "block";

    // Fire event for abstract paper count
    window.dispatchEvent(new CustomEvent("surveydataloaded", { detail: { count: allData.length } }));

    populateFilters();
    filteredData = [...allData];
    sortTable("year", true);

    if (window.renderSurveyCharts) {
      window.renderSurveyCharts(allData, {
        onYearClick: (year) => {
          document.getElementById("yearFilter").value = year;
          applyFilters();
          document.getElementById("tableSection").scrollIntoView({ behavior: "smooth" });
        },
        onTypeClick: (typeLabel) => {
          document.getElementById("typeFilter").value = typeLabel;
          applyFilters();
          document.getElementById("tableSection").scrollIntoView({ behavior: "smooth" });
        },
        onVenueClick: (venue) => {
          document.getElementById("searchInput").value = venue;
          applyFilters();
          document.getElementById("tableSection").scrollIntoView({ behavior: "smooth" });
        },
      });
    }

    if (new URLSearchParams(window.location.search).get("submitted") === "1") {
      document.getElementById("searchInput").placeholder = "Your paper was added — search to find it";
    }
  } catch (err) {
    showError(escapeHtml(err.message));
  }
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("typeFilter").addEventListener("change", applyFilters);
  document.getElementById("yearFilter").addEventListener("change", applyFilters);
  document.getElementById("clearFilters").addEventListener("click", clearAllFilters);

  document.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", () => sortTable(th.dataset.column));
  });

  document.getElementById("firstPage").addEventListener("click", () => changePage(1));
  document.getElementById("prevPage").addEventListener("click", () => changePage(currentPage - 1));
  document.getElementById("nextPage").addEventListener("click", () => changePage(currentPage + 1));
  document.getElementById("lastPage").addEventListener("click", () => {
    changePage(Math.ceil(filteredData.length / recordsPerPage) || 1);
  });

  document.getElementById("recordsPerPage").addEventListener("change", (e) => {
    recordsPerPage = parseInt(e.target.value, 10);
    currentPage = 1;
    updateTable();
    updatePagination();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    init();
  });
} else {
  bindEvents();
  init();
}
