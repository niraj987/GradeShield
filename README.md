# 🌌 GradeShield | Premium SGPA & CGPA Academic Command Console

GradeShield is a futuristic, immersive, and high-performance interactive academic dashboard designed specifically for a **B.Tech Computer Science & Engineering (CSE) student specialized in Data Science with a Psychology Open Minor**. 

This console is preloaded with actual transcript records for Semesters 1–5, while giving the student a highly dynamic, real-time sandboxed environment (Semesters 6–8+) to simulate grade improvements, clear historic backlogs, add custom courses, and receive instant, algorithm-driven study recommendations.

The entire interface is wrapped in a state-of-the-art **glassmorphic HUD UI** powered by a score-reactive, immersive **3D space particle scene**.

---

## 🚀 Live Demo & Key Visuals

| Dashboard View | 3D Space Visuals |
| :---: | :---: |
| ![GradeShield Dashboard HUD](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80) *Interactive Glassmorphism & Analytical Sliders* | ![Three.js Reactive Starfield](https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80) *Immersive, Color-Shifting Orbitals* |

---

## 💎 Core Features

### 1. Preloaded Transcript & Curriculum (Data Science + Psychology Minor)
GradeShield comes out-of-the-box with a comprehensive B.Tech CSE (Data Science) curriculum containing genuine components and credit scales:
* **Core Data Science & Coding Core:** Orientation to Computing, Python Programming, software engineering, basic electrical, DBMS, Discrete Mathematics, OOP in C++, DSA, Java, Computer Networks, Operating Systems, Design & Analysis of Algorithms, Probability & Statistics, Data Science Toolbox, AI Essentials, Training in Programming, Predictive Analytics, Power BI Data Analytics, and Big Data Fundamentals.
* **Psychology Open Minor Pathway:** Integrates specialized coursework including `PSY291 Psychological Testing` (Sem 5) and `PSY292 Positive Psychology` (Sem 6).
* **Professional Enhancements:** Includes Soft Skills, Analytical Skills, Verbal Ability, Community Development Projects, Capstone Project Designs, and Industry Internships.

### 2. Real-Time Predictive SGPA & CGPA Simulations
* **Component-Level Sliders:** Drag raw score sliders (Attendance out of 5, Continuous Assessment (CA) out of 100, Mid-Terms out of 30, and End-Terms out of 60/100) on any active/simulated semester subject.
* **Instant Calculation Pipeline:** The application dynamically scales marks based on university weightage percentages and updates your Term GPA (TGPA) and Cumulative GPA (CGPA) in real-time at 60 FPS.
* **Standings & Percentage Conversion:** Instantly maps your CGPA to an official university standing rating (Outstanding Peak, Excellent, Very Good, Good, etc.) and performs automatic percentage conversion using the standard formula:
  $$\text{Percentage (\%)} = \text{CGPA} \times 10$$

### 3. Backlog & Reappear Sentinel
* **Fail Tracker:** Scans all semesters for reappears (e.g., `CSE322 Formal Languages & Automation Theory` in Sem 5).
* **Simulated Clearance:** Toggle the "Simulate Pass" switch on active backlogs to immediately view how clearing a reappear impacts your overall cumulative CGPA.

### 4. Dynamic Study Focus Advisor (Algorithm-Driven)
* **Gains Optimization:** An algorithm parses all active, ongoing course components and evaluates where you have the highest mathematical headroom to salvage lost points.
* **Priority Actions:** Renders clean, color-coded priority alert cards (**CRITICAL**, **HIGH**, **MEDIUM**, **ATTENTION**) indicating whether you should focus on Attendance, Continuous Assessment (CA), Mid-Terms, or End-Terms to extract maximum GPA value.

### 5. Infinite Academic Sandbox
* **Add Custom Subject:** A premium glassmorphic modal allows you to define custom subjects, allocating specific credit hours, and selecting course evaluation types (Theory with Mid Term, Theory without Mid Term, Practicals/Labs, or Projects/End-term only).
* **Add Custom Semester:** Extend your academic catalog past Semester 8 with simulated subsequent terms.

### 6. Immersive 3D Space Canvas (Three.js & GSAP)
* **Multi-Layered Starfields:** Composed of three distinct particle distributions (dense background dust, glowing teal stellar particles, and soft amber twinkling stars).
* **Geodesic Orbital emblem:** A centralized metallic polyhedral core surrounded by elegant rotating atomic torus rings.
* **Score-Reactive Environment:** Color palettes, glowing ambient light, and shooting star speeds transition smoothly using GSAP based on your current CGPA standing:
  * 🌟 **CGPA $\ge$ 9.0:** Gold & Orange (Outstanding Peak)
  * 💜 **CGPA $\ge$ 8.0:** Purple & Pink (Excellent)
  * 🩵 **CGPA $\ge$ 7.0:** Cyan & Teal (Very Good)
  * 💙 **CGPA $\ge$ 5.5:** Indigo & Cyan (Good/Average)
  * 🌹 **CGPA $<$ 5.5:** Rose Warning & Amber (Warning / Reappear Warning)
* **Space HUD Toggle ("🌌 View Space"):** Instantly fade out the analytical HUD with smooth motion blur to fully view the interactive 3D universe.

---

## 🛠️ Built With

* **Core Language:** Pure Vanilla JavaScript (ES6 Modules) & HTML5 (Semantic Structure)
* **3D Visual Engine:** [Three.js](https://threejs.org/) (r128 WebGL rendering)
* **High-Performance Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform) for number tick-ups, layout transitions, and seamless color blends.
* **UI/UX & Styling:** Vanilla CSS3 coupled with custom glassmorphism overrides, sleek backdrops, responsive grid layouts, and curated dark-theme palettes.
* **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (Loaded via CDN) for speed and spacing utilities.

---

## 📂 Project Structure

```bash
d:\CGPA calculator/
├── css/
│   └── style.css            # Premium custom CSS, glows, custom scrolls, glass classes
├── js/
│   ├── app.js               # Primary JS orchestrator, DOM binds, study advisor logic
│   ├── curriculum.js        # Comprehensive preloaded 8-semester course data structure
│   ├── relativeMath.js      # GPA, SGPA, CGPA calculations, passing checks, bell curves
│   └── threeScene.js        # WebGL Three.js starfield, dynamic orbital core, color shifting
├── index.html               # Main dashboard HTML entry point
├── LICENSE                  # Open source license details
└── README.md                # Project documentation (this file)
```

---

## 🧮 How Calculations Work

### 1. Weighted Scores
Each subject score is calculated by scaling the student's component performance to their respective course weightage:
$$\text{Weighted Component Score} = \left(\frac{\text{Scored Component Marks}}{\text{Max Component Marks}}\right) \times \text{Component Weightage}$$

The total weighted mark out of 100 is the sum of these scaled scores, rounded to the nearest integer.

### 2. Passing Sentinel Criteria
GradeShield enforces real-world passing thresholds:
1. **End-Term Exam (ETE) Threshold:** The student must score at least **30%** of the maximum ETE component marks. If not, the course triggers an automatic **"E" (Reappear)** grade.
2. **Aggregate Threshold:** The total weighted marks must be at least **40%**. Failing this triggers a **"F" (Fail)** grade.

### 3. Absolute Grading Scale Points
Preloaded grades map directly to official university grade point indices:

| Weighted Score | Obtained Grade | Grade Points | Standing Descriptor |
| :---: | :---: | :---: | :---: |
| $\ge 90$ | **O** | 10 | Outstanding |
| $80 - 89$ | **A+** | 9 | Excellent |
| $70 - 79$ | **A** | 8 | Very Good |
| $60 - 69$ | **B+** | 7 | Good |
| $50 - 59$ | **B** | 6 | Above Average |
| $45 - 49$ | **C** | 5 | Average |
| $40 - 44$ | **D** | 4 | Pass |
| $< 40$ | **E / F** | 0 | Reappear / Fail |

---

## 🚦 Getting Started

To run GradeShield locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/niraj987/GradeShield.git
   ```
2. **Open index.html:**
   Simply open the `index.html` file in any modern web browser.
   *(Since this runs on pure vanilla client-side JavaScript, no heavy frameworks, compiler steps, or Node installations are required. Instant load-up!)*

3. **Deploy to Hosting:**
   GradeShield is fully optimized for static web deployment. Simply push to **Vercel**, **GitHub Pages**, or **Netlify** for an instant online deployment.

---

## 📄 License

This project is licensed under the [MIT License](file:///d:/CGPA%20calculator/LICENSE).
