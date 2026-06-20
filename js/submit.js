const STORAGE_KEY = "survey_submitted_papers";

const form = document.getElementById("submit-form");
const successAlert = document.getElementById("success-alert");
const venueSelect = document.getElementById("venue");

function populateVenueDropdown(venues) {
  // venues is array of {abbrev, full} — sort by full name
  const sorted = [...venues].sort((a, b) => {
    const aStr = typeof a === "string" ? a : a.full;
    const bStr = typeof b === "string" ? b : b.full;
    return aStr.localeCompare(bStr, undefined, { sensitivity: "base" });
  });
  for (const v of sorted) {
    const option = document.createElement("option");
    if (typeof v === "string") {
      option.value = v;
      option.textContent = v;
    } else {
      option.value = v.abbrev;
      option.textContent = `${v.full} (${v.abbrev})`;
    }
    venueSelect.appendChild(option);
  }
}

function loadVenues() {
  if (Array.isArray(window.SURVEY_VENUES) && window.SURVEY_VENUES.length) {
    populateVenueDropdown(window.SURVEY_VENUES);
    return Promise.resolve();
  }

  return fetch("venues.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load venues");
      return res.json();
    })
    .then((venues) => populateVenueDropdown(venues))
    .catch(() => {
      venueSelect.innerHTML = '<option value="" disabled selected>Could not load venues</option>';
    });
}

function loadLocalSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalSubmissions(papers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
}

function makeId(title, year) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 40);
  return `submitted_${slug}_${year}_${Date.now()}`;
}

function handleSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const authors = document.getElementById("authors").value.trim();
  const venue = document.getElementById("venue").value.trim();
  const year = document.getElementById("year").value.trim();

  const paper = {
    id: makeId(title, year),
    title,
    authors,
    venue,
    year,
    source: "submission",
    submitted: true,
    addedAt: new Date().toISOString(),
  };

  const existing = loadLocalSubmissions();
  existing.unshift(paper);
  saveLocalSubmissions(existing);

  successAlert.hidden = false;
  form.reset();
  form.querySelector("#title").focus();

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    window.location.href = "index.html?submitted=1";
  }, 1500);
}

form.addEventListener("submit", handleSubmit);

document.getElementById("export-btn").addEventListener("click", () => {
  const submissions = loadLocalSubmissions().map(({ id, title, authors, venue, year }) => ({
    id,
    title,
    authors,
    venue,
    year,
  }));
  const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "submissions.json";
  a.click();
  URL.revokeObjectURL(url);
});

if (new URLSearchParams(window.location.search).get("submitted") === "1") {
  successAlert.hidden = false;
}

loadVenues();
