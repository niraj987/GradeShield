// Primary Orchestrator Script for GradeShield Dashboard
// Implements Inline Collapsible Cards and Dynamic Study Focus Recommendations

// Deep Copy of Academic Curriculum to allow in-memory modifications
let state = {
  curriculum: JSON.parse(JSON.stringify(ACADEMIC_CURRICULUM)),
  currentSemester: 6,
  gradingMode: "absolute",
  classMean: 60,
  classSD: 12,
  activeSubjectCode: null, // Tracks which accordion card is expanded
  mockBacklogActive: false
};

// DOM Elements
const semesterTabsContainer = document.getElementById("semester-tabs-container");
const subjectCardsContainer = document.getElementById("subject-cards-container");
const activeSemTitle = document.getElementById("active-sem-title");
const semTgpaBadge = document.getElementById("sem-tgpa-badge");

const cgpaVal = document.getElementById("cgpa-val");
const percentageVal = document.getElementById("percentage-val");
const creditsVal = document.getElementById("credits-val");
const standingVal = document.getElementById("standing-val");
const cgpaGaugeCircle = document.getElementById("cgpa-gauge-circle");

const focusLeverageContainer = document.getElementById("focus-leverage-container");
const focusAdvisorResults = document.getElementById("focus-advisor-results");

// Wipes all active curriculum raw scores to 0 on initial page load
function initializeScoresToZero() {
  Object.keys(state.curriculum).forEach(semKey => {
    state.curriculum[semKey].forEach(course => {
      course.obtainedGrade = null;
      course.components.forEach(comp => {
        comp.scored = 0;
      });
    });
  });
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Semester Selection Tabs
  renderSemesterTabs();

  // 2. Setup Custom Subject Modal Form
  setupAddSubjectModal();

  // 3. Initialize Three.js scene
  if (typeof initThreeScene === "function") {
    initThreeScene();
  }

  // 4. Wipe all grades/scores to zero for a clean slate
  initializeScoresToZero();

  // 5. Initial render & math run
  recalculateAll();

  // 6. Setup space/HUD view toggle
  const toggleHudBtn = document.getElementById("toggle-hud-btn");
  const mainWrapper = document.querySelector("main");
  let hudVisible = true;

  if (toggleHudBtn && mainWrapper) {
    toggleHudBtn.addEventListener("click", () => {
      hudVisible = !hudVisible;
      if (!hudVisible) {
        gsap.to(mainWrapper, { opacity: 0.04, filter: "blur(5px)", scale: 0.98, pointerEvents: "none", duration: 0.6, ease: "power2.out" });
        toggleHudBtn.innerHTML = "📊 Show HUD";
      } else {
        gsap.to(mainWrapper, { opacity: 1, filter: "blur(0px)", scale: 1.0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" });
        toggleHudBtn.innerHTML = "🌌 View Space";
      }
    });
  }
  
  // Stagger animate cards in on page load
  gsap.from(".subject-card", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out"
  });
});

// Render Semester Tabs (Sem 1 to 8)
function renderSemesterTabs() {
  semesterTabsContainer.innerHTML = "";
  const totalSemesters = 8;
  
  for (let sem = 1; sem <= totalSemesters; sem++) {
    const tab = document.createElement("button");
    tab.className = `py-2 text-center text-[10px] font-bold rounded-xl transition-all border ${
      state.currentSemester === sem 
        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/15" 
        : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
    }`;
    tab.textContent = `Sem ${sem}`;
    tab.addEventListener("click", () => {
      state.currentSemester = sem;
      state.activeSubjectCode = null; // Reset expanded card
      renderSemesterTabs();
      recalculateAll();
      
      // Animate subject cards appearing
      gsap.from(".subject-card", {
        opacity: 0,
        scale: 0.95,
        y: 15,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out"
      });
    });
    semesterTabsContainer.appendChild(tab);
  }
}

// Custom Curriculum Semesters Addition
document.getElementById("add-custom-sem-btn").addEventListener("click", () => {
  const existingSems = Object.keys(state.curriculum).map(Number);
  const nextSem = Math.max(...existingSems) + 1;
  
  // Initialize with some mock courses so they can customize it
  state.curriculum[nextSem] = [
    {
      code: `CSE${nextSem}01`,
      name: "ADVANCED CSE ELECTIVE-I",
      credits: 4,
      obtainedGrade: null,
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 80 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 75 }
      ]
    },
    {
      code: `CSE${nextSem}02`,
      name: "CAPSTONE PROJECT DESIGN",
      credits: 3,
      obtainedGrade: null,
      components: [
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 85 },
        { type: "Practical End Term", maxMarks: 100, weightage: 70, scored: 78 }
      ]
    }
  ];

  state.currentSemester = nextSem;
  state.activeSubjectCode = null;
  
  // Re-render and calculate
  renderSemesterTabs();
  
  // Re-adjust semester tabs grid size if there are custom semesters
  const totalSems = Object.keys(state.curriculum).length;
  semesterTabsContainer.className = `grid grid-cols-${Math.min(totalSems, 4)} gap-2 mt-2`;

  recalculateAll();
});



// Setup Interactive Form and Modal listeners for adding custom courses
function setupAddSubjectModal() {
  const addSubjectModal = document.getElementById("add-subject-modal");
  const addCustomSubjectBtn = document.getElementById("add-custom-subject-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const addSubjectForm = document.getElementById("add-subject-form");
  const modalSubType = document.getElementById("modal-sub-type");
  
  if (addCustomSubjectBtn && addSubjectModal) {
    addCustomSubjectBtn.addEventListener("click", () => {
      addSubjectModal.classList.remove("opacity-0", "pointer-events-none");
      addSubjectModal.querySelector(".glass-card").classList.remove("scale-95");
    });
  }

  if (closeModalBtn && addSubjectModal) {
    closeModalBtn.addEventListener("click", () => {
      addSubjectModal.classList.add("opacity-0", "pointer-events-none");
      addSubjectModal.querySelector(".glass-card").classList.add("scale-95");
    });
  }

  // Handle dropdown type changes inside modal
  if (modalSubType) {
    modalSubType.addEventListener("change", (e) => {
      const type = e.target.value;
      const midCol = document.getElementById("modal-mid-col");
      const endCol = document.getElementById("modal-end-col");
      const endLabel = document.getElementById("modal-end-label");
      
      if (type === "theory_mid") {
        midCol.style.display = "block";
        endCol.className = "flex flex-col gap-1";
        endLabel.textContent = "End-Term Exam (Max 60)";
        document.getElementById("modal-mark-mid").value = 20;
        document.getElementById("modal-mark-end").value = 40;
      } else if (type === "theory_no_mid") {
        midCol.style.display = "none";
        endCol.className = "flex flex-col gap-1 col-span-2";
        endLabel.textContent = "End-Term Exam (Max 60)";
        document.getElementById("modal-mark-end").value = 40;
      } else if (type === "practical") {
        midCol.style.display = "none";
        endCol.className = "flex flex-col gap-1 col-span-2";
        endLabel.textContent = "Practical End Term (Max 100)";
        document.getElementById("modal-mark-end").value = 75;
      } else if (type === "project") {
        midCol.style.display = "none";
        endCol.className = "flex flex-col gap-1 col-span-2";
        endLabel.textContent = "Practical End Term (Max 100)";
        document.getElementById("modal-mark-end").value = 80;
      }
    });
  }

  // Handle Form Submission
  if (addSubjectForm) {
    addSubjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const code = document.getElementById("modal-sub-code").value.trim().toUpperCase();
      const name = document.getElementById("modal-sub-name").value.trim().toUpperCase();
      const credits = parseInt(document.getElementById("modal-sub-credits").value);
      const type = modalSubType.value;
      
      const att = parseInt(document.getElementById("modal-mark-att").value) || 0;
      const ca = parseInt(document.getElementById("modal-mark-ca").value) || 0;
      const mid = parseInt(document.getElementById("modal-mark-mid").value) || 0;
      const end = parseInt(document.getElementById("modal-mark-end").value) || 0;
      
      // Build components dynamically
      const components = [];
      if (type === "theory_mid") {
        components.push({ type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: att });
        components.push({ type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: ca });
        components.push({ type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: mid });
        components.push({ type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: end });
      } else if (type === "theory_no_mid") {
        components.push({ type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: att });
        components.push({ type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: ca });
        components.push({ type: "Objective Type End Term", maxMarks: 60, weightage: 70, scored: end });
      } else if (type === "practical") {
        components.push({ type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: att });
        components.push({ type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: ca });
        components.push({ type: "Practical End Term", maxMarks: 100, weightage: 50, scored: end });
      } else if (type === "project") {
        components.push({ type: "Practical End Term", maxMarks: 100, weightage: 100, scored: end });
      }
      
      const newSubject = {
        code: code,
        name: name,
        credits: credits,
        obtainedGrade: null, // Always dynamically simulated
        components: components
      };
      
      // Push into state active semester curriculum
      if (!state.curriculum[state.currentSemester]) {
        state.curriculum[state.currentSemester] = [];
      }
      state.curriculum[state.currentSemester].push(newSubject);
      
      // Close modal & reset form
      addSubjectModal.classList.add("opacity-0", "pointer-events-none");
      addSubjectModal.querySelector(".glass-card").classList.add("scale-95");
      addSubjectForm.reset();
      
      // Re-trigger global recalculation
      recalculateAll();
      
      // Animate card entrance specifically
      gsap.from(".subject-card:last-child", {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    });
  }
}

// Calculates SGPA/CGPA, updates the dashboard numbers, focus leverage, backlog tracker, and 3D scenes.
// Performs mathematical and metric updates ONLY, without re-rendering subject cards.
function recalculateMetrics() {
  const activeSemesterCourses = state.curriculum[state.currentSemester];
  const activeSemRes = calculateSGPA(activeSemesterCourses, state.gradingMode, state.classMean, state.classSD);
  
  activeSemTitle.textContent = `Semester ${state.currentSemester} Curriculum`;
  semTgpaBadge.textContent = `TGPA: ${activeSemRes.sgpa.toFixed(2)}`;

  // Compute Cumulative stats across ALL semesters
  let cumulativeWeightedGradePoints = 0;
  let cumulativeCredits = 0;

  Object.keys(state.curriculum).forEach(semKey => {
    const semCourses = state.curriculum[semKey];
    
    semCourses.forEach(course => {
      let grade = "";
      if (course.obtainedGrade) {
        grade = course.obtainedGrade;
      } else {
        const weightedScore = calculateWeightedMarks(course.components);
        const passingStatus = checkPassingStatus(course.components, weightedScore);
        
        if (state.gradingMode === "relative") {
          grade = getRelativeGrade(weightedScore, state.classMean, state.classSD, passingStatus);
        } else {
          grade = getAbsoluteGrade(weightedScore, passingStatus);
        }
      }
      
      const gp = GRADE_POINTS[grade] || 0;
      cumulativeCredits += course.credits;
      cumulativeWeightedGradePoints += course.credits * gp;
    });
  });

  const finalCgpa = cumulativeCredits > 0 ? parseFloat((cumulativeWeightedGradePoints / cumulativeCredits).toFixed(2)) : 0.00;
  const finalPercentage = finalCgpa * 10;

  // Smooth visual transitions for CGPA dashboard metrics
  animateDashboardNumbers(finalCgpa, finalPercentage, cumulativeCredits);

  // Update dynamic Study Focus Recommendations
  updateFocusRecommendations(activeSemesterCourses);

  // Update 3D canvas color
  if (typeof updateThreeEmblemColor === "function") {
    updateThreeEmblemColor(finalCgpa);
  }

  // Update dynamic Backlog Tracker panel
  updateBacklogTracker();
}

// Full recalculation including DOM re-rendering of subject cards
function recalculateAll() {
  const activeSemesterCourses = state.curriculum[state.currentSemester];
  
  // Render Cards DOM first
  renderSubjectCards(activeSemesterCourses);

  // Compute and update global metrics
  recalculateMetrics();
}

// Animate Overall Metrics Board values
function animateDashboardNumbers(cgpa, percentage, credits) {
  // Count up animation for CGPA
  gsap.to(cgpaVal, {
    textContent: cgpa.toFixed(2),
    duration: 0.8,
    snap: { textContent: 0.01 }
  });

  // Count up animation for Percentage
  gsap.to(percentageVal, {
    textContent: percentage.toFixed(2) + "%",
    duration: 0.8,
    snap: { textContent: 0.01 }
  });

  // Count up credits completed
  gsap.to(creditsVal, {
    textContent: credits,
    duration: 0.5,
    snap: { textContent: 1 }
  });

  // Radial Gauge speed ring dash offset calculation
  const strokeRadius = 54;
  const strokePerimeter = 2 * Math.PI * strokeRadius; // 339.29
  // Clamped CGPA percentage (CGPA / 10)
  const scoreRatio = Math.max(0, Math.min(10, cgpa)) / 10;
  const activeOffset = strokePerimeter * (1 - scoreRatio);

  gsap.to(cgpaGaugeCircle, {
    strokeDashoffset: activeOffset,
    duration: 1,
    ease: "power2.out"
  });

  // Update standing rating texts
  let standing = "Average Performance";
  let standingClass = "badge-pass";
  if (cgpa >= 9.0) {
    standing = "Outstanding Peak";
    standingClass = "grade-O";
  } else if (cgpa >= 8.0) {
    standing = "Excellent Performance";
    standingClass = "grade-A-plus";
  } else if (cgpa >= 7.0) {
    standing = "Very Good standing";
    standingClass = "grade-A";
  } else if (cgpa >= 6.0) {
    standing = "Good standing";
    standingClass = "badge-pass";
  } else if (cgpa < 5.0) {
    standing = "Marginal Pass";
    standingClass = "badge-reappear";
  }
  
  standingVal.textContent = standing;
  standingVal.className = `text-[10px] font-semibold px-2 py-0.5 rounded inline-block mt-1 ${standingClass}`;
}

// Render active semester subjects in a vertical list with all sliders fully visible by default
function renderSubjectCards(courses) {
  subjectCardsContainer.innerHTML = "";
  
  courses.forEach((course, courseIdx) => {
    const weightedScore = calculateWeightedMarks(course.components);
    const passingStatus = checkPassingStatus(course.components, weightedScore);
    
    // Find original preloaded transcript grade if available
    const officialCourse = getOfficialCourse(course.code);
    const originalGrade = officialCourse ? officialCourse.obtainedGrade : null;
    const isSimulating = originalGrade !== null && course.obtainedGrade === null;
    
    let grade = "";
    if (course.obtainedGrade) {
      grade = course.obtainedGrade;
    } else {
      if (state.gradingMode === "relative") {
        grade = getRelativeGrade(weightedScore, state.classMean, state.classSD, passingStatus);
      } else {
        grade = getAbsoluteGrade(weightedScore, passingStatus);
      }
    }

    // Determine correct passing state: official grades are passed by default unless they are E/F
    const isPassed = course.obtainedGrade !== null 
      ? (course.obtainedGrade !== "E" && course.obtainedGrade !== "F") 
      : passingStatus.passed;

    const card = document.createElement("div");
    card.id = `card-${course.code}`;
    card.className = `glass-card p-5 subject-card flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full`;
    
    // Add subtle hover borders depending on grade
    let gradeGlowClass = "glass-card-glow-teal";
    if (grade === "E" || grade === "F") gradeGlowClass = "glass-card-glow-rose";
    else if (grade === "O" || grade === "A+") gradeGlowClass = "glass-card-glow-gold";
    card.classList.add(gradeGlowClass);

    // Setup Badge and Reset buttons
    let badgeHtml = "";
    if (originalGrade !== null) {
      if (isSimulating) {
        badgeHtml = `
          <span class="text-[9px] text-amber-400 font-extrabold tracking-wider uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">Simulated</span>
          <button onclick="resetCourseToOfficial('${course.code}')" class="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline transition-all mt-1">↻ Reset</button>
        `;
      } else {
        badgeHtml = `
          <span class="text-[9px] text-teal-400 font-extrabold tracking-wider uppercase bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/20">Official</span>
          <span class="text-[8px] text-slate-500 mt-0.5">Drag to edit</span>
        `;
      }
    }

    // Card Header (Always visible)
    const cardHeader = document.createElement("div");
    cardHeader.className = "flex justify-between items-start gap-4 pb-4 border-b border-white/5";
    cardHeader.innerHTML = `
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/15">${course.code}</span>
          <span class="card-status-badge text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
            isPassed ? "badge-pass" : (grade === "E" ? "badge-reappear" : "badge-fail")
          }">
            ${isPassed ? "Passed" : (grade === "E" ? "Reappear" : "Failed")}
          </span>
          <span class="text-[10px] text-slate-400 font-semibold">${course.credits} Credits</span>
        </div>
        <h4 class="text-sm font-bold text-white font-heading mt-2 leading-snug">${course.name}</h4>
      </div>
      
      <div class="flex items-center gap-4 text-right">
        <div class="card-badge-container flex flex-col items-end justify-center shrink-0">
          ${badgeHtml}
        </div>
        <div>
          <div class="text-[9px] text-slate-500 uppercase font-semibold">Total Score</div>
          <div class="card-total-score text-sm font-extrabold font-heading text-slate-200 mt-0.5">${weightedScore}/100</div>
        </div>
        <div>
          <div class="text-[9px] text-slate-500 uppercase font-semibold">Grade</div>
          <span class="card-grade-badge text-xs font-extrabold px-2.5 py-0.5 rounded-md inline-block mt-0.5 grade-${grade.replace("+", "-plus")}">${grade}</span>
        </div>
      </div>
    `;

    card.appendChild(cardHeader);

    // Sliders Panel (Always visible and rendered inside each card)
    const slidersContainer = document.createElement("div");
    slidersContainer.className = "mt-4 flex flex-col gap-3.5 bg-slate-950/20 p-4 rounded-xl border border-white/5";
    
    // Render interactive input sliders
    course.components.forEach((comp, compIdx) => {
      const sliderGroup = document.createElement("div");
      sliderGroup.className = "flex flex-col gap-1.5 p-3 rounded-lg bg-white/5 border border-white/5";
      
      sliderGroup.innerHTML = `
        <div class="flex justify-between items-center text-[11px] font-semibold text-slate-300">
          <span>${comp.type.toUpperCase()}</span>
          <span class="font-mono text-white"><span class="comp-val-text font-extrabold text-indigo-400">${comp.scored}</span> / ${comp.maxMarks}</span>
        </div>
        <div class="flex items-center gap-4">
          <input type="range" min="0" max="${comp.maxMarks}" value="${comp.scored}" class="flex-1 component-slider">
          <span class="text-[10px] text-slate-400 font-mono font-semibold w-10 text-right">Wt: ${comp.weightage}%</span>
        </div>
      `;

      // Slider event listener
      const rangeSlider = sliderGroup.querySelector(".component-slider");
      const rangeValText = sliderGroup.querySelector(".comp-val-text");

      rangeSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        comp.scored = val;
        rangeValText.textContent = val;
        
        // Clear preloaded official grade on edit to run simulation calculations
        course.obtainedGrade = null;
        
        // Dynamic in-place calculation
        const newWeightedScore = calculateWeightedMarks(course.components);
        const newPassingStatus = checkPassingStatus(course.components, newWeightedScore);
        
        let newGrade = "";
        if (state.gradingMode === "relative") {
          newGrade = getRelativeGrade(newWeightedScore, state.classMean, state.classSD, newPassingStatus);
        } else {
          newGrade = getAbsoluteGrade(newWeightedScore, newPassingStatus);
        }

        const newIsPassed = newPassingStatus.passed;

        // Apply fine-grained DOM updates to the card in-place for 60 FPS performance
        const cardElem = document.getElementById(`card-${course.code}`);
        if (cardElem) {
          // 1. Update glow class
          cardElem.className = "glass-card p-5 subject-card flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full";
          let gradeGlowClass = "glass-card-glow-teal";
          if (newGrade === "E" || newGrade === "F") gradeGlowClass = "glass-card-glow-rose";
          else if (newGrade === "O" || newGrade === "A+") gradeGlowClass = "glass-card-glow-gold";
          cardElem.classList.add(gradeGlowClass);

          // 2. Update status badge
          const statusBadge = cardElem.querySelector(".card-status-badge");
          if (statusBadge) {
            statusBadge.className = `card-status-badge text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
              newIsPassed ? "badge-pass" : (newGrade === "E" ? "badge-reappear" : "badge-fail")
            }`;
            statusBadge.textContent = newIsPassed ? "Passed" : (newGrade === "E" ? "Reappear" : "Failed");
          }

          // 3. Update total score text
          const totalScoreVal = cardElem.querySelector(".card-total-score");
          if (totalScoreVal) {
            totalScoreVal.textContent = `${newWeightedScore}/100`;
          }

          // 4. Update grade badge text and visual class
          const gradeBadge = cardElem.querySelector(".card-grade-badge");
          if (gradeBadge) {
            gradeBadge.className = `card-grade-badge text-xs font-extrabold px-2.5 py-0.5 rounded-md inline-block mt-0.5 grade-${newGrade.replace("+", "-plus")}`;
            gradeBadge.textContent = newGrade;
          }

          // 5. Update simulated badge container & reset button
          const badgeContainer = cardElem.querySelector(".card-badge-container");
          if (badgeContainer && originalGrade !== null) {
            badgeContainer.innerHTML = `
              <span class="text-[9px] text-amber-400 font-extrabold tracking-wider uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">Simulated</span>
              <button onclick="resetCourseToOfficial('${course.code}')" class="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline transition-all mt-1">↻ Reset</button>
            `;
          }

          // 6. Update alert banner container
          const alertCont = cardElem.querySelector(".card-alert-container");
          if (alertCont) {
            if (!newIsPassed) {
              alertCont.innerHTML = `
                <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2 leading-tight">
                  <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                  <span><b>Passing Alert:</b> ${newPassingStatus.reason}</span>
                </div>
              `;
            } else {
              alertCont.innerHTML = "";
            }
          }
        }

        // 7. Recalculate lightweight cumulative metrics & dynamic advise panels without rebuilding cards
        recalculateMetrics();
      });

      slidersContainer.appendChild(sliderGroup);
    });

    // Alert Container for warning banners
    const alertContainer = document.createElement("div");
    alertContainer.className = "card-alert-container mt-3 flex flex-col gap-2";
    
    if (course.obtainedGrade === null && !passingStatus.passed) {
      alertContainer.innerHTML = `
        <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2 leading-tight">
          <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
          <span><b>Passing Alert:</b> ${passingStatus.reason}</span>
        </div>
      `;
    }

    card.appendChild(slidersContainer);
    card.appendChild(alertContainer);
    
    subjectCardsContainer.appendChild(card);
  });
}

// Calculate Dynamic Focus Recommendations & Leverage Scales
function updateFocusRecommendations(courses) {
  focusLeverageContainer.innerHTML = "";
  focusAdvisorResults.innerHTML = "";

  // 1. Initialize potential gains variables
  let attendanceLoss = 0;
  let caLoss = 0;
  let mteLoss = 0;
  let eteLoss = 0;
  
  let ongoingSemActive = false;

  // 2. Scan active courses and aggregate potential weighted score increases
  courses.forEach(course => {
    // Skip historical courses that are already completed
    if (course.obtainedGrade) return;
    
    ongoingSemActive = true;

    course.components.forEach(comp => {
      const type = comp.type.toLowerCase();
      const pointsLost = ((comp.maxMarks - comp.scored) / comp.maxMarks) * comp.weightage * course.credits;

      if (type.includes("attendance")) {
        attendanceLoss += pointsLost;
      } else if (type.includes("continuous") || type.includes("ca")) {
        caLoss += pointsLost;
      } else if (type.includes("mid term") || type.includes("mte")) {
        mteLoss += pointsLost;
      } else if (type.includes("end term") || type.includes("ete") || type.includes("practical end") || type.includes("theory end")) {
        eteLoss += pointsLost;
      }
    });
  });

  if (!ongoingSemActive) {
    focusLeverageContainer.innerHTML = `
      <div class="text-xs text-slate-500 italic text-center py-4">
        All courses are finalized transcript records. Focus suggestions are inactive.
      </div>
    `;
    focusAdvisorResults.innerHTML = `
      <div class="text-xs text-slate-400">
        🎓 Clear all Semester 5 reappear backlogs to instantly raise your CGPA! Select Semester 6 to plan your active term.
      </div>
    `;
    return;
  }

  // 3. Render Leverage Progress Scales
  const maxLoss = Math.max(attendanceLoss, caLoss, mteLoss, eteLoss, 1); // Avoid division by zero
  
  const categories = [
    { name: "End-Term Exams (ETE)", loss: eteLoss, color: "bg-indigo-500", key: "ete" },
    { name: "Continuous Assessment (CA)", loss: caLoss, color: "bg-teal-400", key: "ca" },
    { name: "Mid-Term Exams (MTE)", loss: mteLoss, color: "bg-amber-400", key: "mte" },
    { name: "Attendance Marks", loss: attendanceLoss, color: "bg-emerald-400", key: "att" }
  ];

  // Render individual leverage visual scales
  categories.forEach(cat => {
    if (cat.loss <= 0) return; // Hide categories with 0 leverage (already perfect scores)
    
    const leveragePercent = (cat.loss / maxLoss) * 100;
    const progressNode = document.createElement("div");
    progressNode.className = "flex flex-col gap-1";
    progressNode.innerHTML = `
      <div class="flex justify-between text-[10px] text-slate-400 font-semibold font-body">
        <span>${cat.name}</span>
        <span class="font-bold text-white font-mono">Leverage: ${Math.round(leveragePercent)}%</span>
      </div>
      <div class="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
        <div class="h-full ${cat.color} rounded-full transition-all duration-500" style="width: ${leveragePercent}%"></div>
      </div>
    `;
    focusLeverageContainer.appendChild(progressNode);
  });

  // 4. Generate dynamic AI advice blocks
  const recommendations = [];
  
  if (eteLoss > 0) {
    recommendations.push({
      priority: 1,
      tag: "CRITICAL",
      tagClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      text: `🔥 <b>Maximize End-Term Exams:</b> ETE holds the largest weightage in Semester ${state.currentSemester} (up to 70%). Elevating your ETE scores has massive leverage and can increase your TGPA by up to <b>+${(eteLoss / 10).toFixed(2)}</b> points!`
    });
  }

  if (caLoss > 0) {
    recommendations.push({
      priority: 2,
      tag: "HIGH",
      tagClass: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
      text: `💡 <b>Secure CA points:</b> Continuous Assessments hold significant weightage. Raising CA scores to 90%+ across subjects can recover lost credits and add up to <b>+${(caLoss / 10).toFixed(2)}</b> GPA.`
    });
  }

  if (mteLoss > 0) {
    recommendations.push({
      priority: 3,
      tag: "MEDIUM",
      tagClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      text: `⚡ <b>Mid-Term Improvements:</b> Room to recover points in Mid-Term evaluations. Focus on mid-term syllabus revisions next semester to recover up to <b>+${(mteLoss / 10).toFixed(2)}</b> TGPA points.`
    });
  }

  if (attendanceLoss > 0) {
    recommendations.push({
      priority: 4,
      tag: "ATTENTION",
      tagClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      text: `⚠️ <b>Boost Attendance:</b> You've lost points on attendance. Maintaining 90%+ attendance secures a full weightage score directly without taking tests, adding up to <b>+${(attendanceLoss / 10).toFixed(2)}</b> TGPA.`
    });
  }

  // Render advice blocks in DOM
  recommendations.sort((a,b) => a.priority - b.priority).forEach(rec => {
    const tip = document.createElement("div");
    tip.className = "flex flex-col gap-1.5 p-3 rounded-lg bg-white/5 border border-white/5 leading-relaxed text-[11px]";
    tip.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-[9px] font-bold px-2 py-0.5 rounded ${rec.tagClass}">${rec.tag}</span>
        <span class="text-[9px] text-slate-500 font-semibold font-mono">Priority #${rec.priority}</span>
      </div>
      <p class="text-slate-300 mt-1">${rec.text}</p>
    `;
    focusAdvisorResults.appendChild(tip);
  });
}

// Helper to look up original preloaded course record from read-only global
function getOfficialCourse(courseCode) {
  for (const semKey in ACADEMIC_CURRICULUM) {
    const found = ACADEMIC_CURRICULUM[semKey].find(c => c.code === courseCode);
    if (found) return found;
  }
  return null;
}

// Reset course to original prepopulated scoreboard & grade
window.resetCourseToOfficial = function(courseCode) {
  let officialCourse = null;
  let activeSemKey = null;
  
  for (const semKey in ACADEMIC_CURRICULUM) {
    const found = ACADEMIC_CURRICULUM[semKey].find(c => c.code === courseCode);
    if (found) {
      officialCourse = found;
      activeSemKey = semKey;
      break;
    }
  }

  if (officialCourse && activeSemKey) {
    const course = state.curriculum[activeSemKey].find(c => c.code === courseCode);
    if (course) {
      course.obtainedGrade = officialCourse.obtainedGrade;
      course.components = JSON.parse(JSON.stringify(officialCourse.components));
      recalculateAll();
    }
  }
};

// Scan all semesters for fail/reappear grades and render dynamic clearance sentinel
function updateBacklogTracker() {
  const backlogListContainer = document.getElementById("backlog-list-container");
  const backlogCountBadge = document.getElementById("backlog-count-badge");
  if (!backlogListContainer) return;

  backlogListContainer.innerHTML = "";
  let activeBacklogs = 0;

  Object.keys(state.curriculum).forEach(semKey => {
    state.curriculum[semKey].forEach(course => {
      const official = getOfficialCourse(course.code);
      const isOriginalBacklog = official && (official.obtainedGrade === "E" || official.obtainedGrade === "F");

      if (isOriginalBacklog) {
        activeBacklogs++;
        const isCleared = course.obtainedGrade !== "E" && course.obtainedGrade !== "F";

        const row = document.createElement("div");
        row.className = "flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-[11px] gap-2";
        row.innerHTML = `
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-mono font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15 text-[9px] shrink-0">${course.code}</span>
              <span class="text-slate-300 font-semibold truncate block text-[10px]">${course.name}</span>
            </div>
            <div class="text-[9px] text-slate-500 mt-0.5">Sem ${semKey} • Original Grade: <b class="text-rose-400">${official.obtainedGrade}</b></div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[8px] font-bold ${isCleared ? "text-teal-400" : "text-slate-400"}">${isCleared ? "Pass Active" : "Simulate Pass"}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer backlog-simulate-toggle" data-code="${course.code}" ${isCleared ? "checked" : ""}>
              <div class="w-8 h-4.5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-3.5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        `;

        // Toggle handler
        row.querySelector(".backlog-simulate-toggle").addEventListener("change", (e) => {
          const code = e.target.getAttribute("data-code");
          const targetCourse = state.curriculum[semKey].find(c => c.code === code);
          if (targetCourse) {
            if (e.target.checked) {
              targetCourse.obtainedGrade = "A+"; // Simulate an A+ pass!
            } else {
              targetCourse.obtainedGrade = official.obtainedGrade; // Restore fail state
            }
            recalculateAll();
          }
        });

        backlogListContainer.appendChild(row);
      }
    });
  });

  backlogCountBadge.textContent = `${activeBacklogs} Active`;
}

