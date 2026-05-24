// Academic Grading Scale Points
const GRADE_POINTS = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "D": 4,
  "E": 0,
  "F": 0
};

// Calculate Weighted Marks Out of 100 for a Course
function calculateWeightedMarks(components) {
  let totalWeighted = 0;
  
  components.forEach(comp => {
    if (comp.maxMarks && comp.maxMarks > 0) {
      // Calculate scaled weightage: (Scored / Max) * Weightage
      const compScore = (comp.scored / comp.maxMarks) * comp.weightage;
      totalWeighted += compScore;
    } else {
      // For online courses or special courses without explicit maxMarks, weightage is added directly
      totalWeighted += comp.scored || 0;
    }
  });
  
  // Return rounded value to nearest integer as LPU mark sheets typically do
  return Math.round(totalWeighted);
}

// Check if passing requirements are satisfied
// 1. ETE score must be >= 30% of ETE max marks.
// 2. Aggregate score must be >= 40.
function checkPassingStatus(components, aggregateScore) {
  let eteMaxTotal = 0;
  let eteScoredTotal = 0;
  let hasEte = false;

  components.forEach(comp => {
    const isEte = comp.type.toLowerCase().includes("end term") || comp.type.toLowerCase().includes("ete");
    if (isEte) {
      eteMaxTotal += comp.maxMarks || 0;
      eteScoredTotal += comp.scored || 0;
      hasEte = true;
    }
  });

  // If there's an End Term component, verify the 30% passing limit
  if (hasEte && eteMaxTotal > 0) {
    const etePercentage = (eteScoredTotal / eteMaxTotal) * 100;
    if (etePercentage < 30) {
      return { passed: false, reason: "Failed ETE passing criteria (<30% in End Term Exam)" };
    }
  }

  // Verify aggregate score of >= 40%
  if (aggregateScore < 40) {
    return { passed: false, reason: "Failed aggregate passing criteria (<40% overall score)" };
  }

  return { passed: true };
}

// Determine Grade in Absolute Mode
function getAbsoluteGrade(score, passingStatus) {
  if (!passingStatus.passed) {
    return passingStatus.reason.includes("ETE") ? "E" : "F";
  }

  if (score >= 90) return "O";
  if (score >= 80) return "A+";
  if (score >= 70) return "A";
  if (score >= 60) return "B+";
  if (score >= 50) return "B";
  if (score >= 45) return "C";
  if (score >= 40) return "D";
  return "F";
}

// Determine Grade in Relative Mode (Bell Curve)
// Based on Standard Z-Score: Z = (Score - Mean) / SD
function getRelativeGrade(score, mean, sd, passingStatus) {
  if (!passingStatus.passed) {
    return passingStatus.reason.includes("ETE") ? "E" : "F";
  }

  // Safe Standard Deviation
  const divisor = sd <= 0 ? 1 : sd;
  const zScore = (score - mean) / divisor;

  // Bell Curve Grade Threshold divisions
  if (zScore >= 1.5) return "O";      // Top ~6.7%
  if (zScore >= 1.0) return "A+";     // Next ~9.2%
  if (zScore >= 0.5) return "A";      // Next ~15.0%
  if (zScore >= 0.0) return "B+";     // Next ~19.1%
  if (zScore >= -0.5) return "B";     // Next ~19.1%
  if (zScore >= -1.0) return "C";     // Next ~15.0%
  if (zScore >= -1.5) return "D";     // Next ~9.2%
  return "F";                         // Lower ~6.7%
}

// Calculate SGPA for a Semester
function calculateSGPA(courses, gradingMode, classMean = 60, classSD = 12) {
  let totalCredits = 0;
  let totalWeightedGradePoints = 0;

  courses.forEach(course => {
    let grade = "";
    if (course.obtainedGrade) {
      // If grade is already officially awarded, use it
      grade = course.obtainedGrade;
    } else {
      // Otherwise, predict it based on current marks
      const weightedScore = calculateWeightedMarks(course.components);
      const passingStatus = checkPassingStatus(course.components, weightedScore);

      if (gradingMode === "relative") {
        grade = getRelativeGrade(weightedScore, classMean, classSD, passingStatus);
      } else {
        grade = getAbsoluteGrade(weightedScore, passingStatus);
      }
    }

    const gp = GRADE_POINTS[grade] || 0;
    totalCredits += course.credits;
    totalWeightedGradePoints += course.credits * gp;
  });

  return {
    sgpa: totalCredits > 0 ? parseFloat((totalWeightedGradePoints / totalCredits).toFixed(2)) : 0,
    totalCredits: totalCredits
  };
}

// Generate data coordinates for rendering Bell Curve SVG
function generateBellCurveData(mean, sd, userScore = null) {
  const points = [];
  const startX = mean - 4 * sd;
  const endX = mean + 4 * sd;
  const step = (endX - startX) / 100;

  for (let x = startX; x <= endX; x += step) {
    // Normal Distribution Probability Density Function: f(x) = (1 / (sd * sqrt(2*pi))) * e^(-(x-mean)^2 / (2*sd^2))
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(sd, 2));
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    points.push({ x: parseFloat(x.toFixed(2)), y: y });
  }

  // Normalize Y to standard SVG height coordinates
  const maxY = 1 / (sd * Math.sqrt(2 * Math.PI));
  const svgHeight = 120;
  const svgWidth = 400;

  const svgPoints = points.map(pt => {
    const svgX = ((pt.x - startX) / (endX - startX)) * svgWidth;
    const svgY = svgHeight - (pt.y / maxY) * (svgHeight - 15);
    return `${svgX},${svgY}`;
  }).join(" ");

  let userSvgX = null;
  if (userScore !== null) {
    const clampedScore = Math.max(startX, Math.min(endX, userScore));
    userSvgX = ((clampedScore - startX) / (endX - startX)) * svgWidth;
  }

  return {
    pathString: `M 0,${svgHeight} L ` + svgPoints + ` L ${svgWidth},${svgHeight} Z`,
    userX: userSvgX
  };
}
