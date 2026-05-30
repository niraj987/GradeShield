// Pre-populated Curriculum, Raw Marks, and Obtained Grades
const ACADEMIC_CURRICULUM = {
  1: [
    {
      code: "CSE111",
      name: "ORIENTATION TO COMPUTING-I",
      credits: 2,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 20, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 85 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 30, scored: 23 }
      ]
    },
    {
      code: "CSE326",
      name: "INTERNET PROGRAMMING LABORATORY",
      credits: 2,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 100 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 23 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 0 }
      ]
    },
    {
      code: "INT108",
      name: "PYTHON PROGRAMMING",
      credits: 4,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 30 },
        { type: "Others", maxMarks: 3, weightage: 3, scored: 3 },
        { type: "Practical End Term", maxMarks: 100, weightage: 45, scored: 47 }
      ]
    },
    {
      code: "MEC136",
      name: "ENGINEERING GRAPHICS & DIGITAL FABRICATION",
      credits: 4,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 57 },
        { type: "Theory End Term", maxMarks: 70, weightage: 50, scored: 30 },
        { type: "Theory Mid Term", maxMarks: 40, weightage: 20, scored: 7 }
      ]
    },
    {
      code: "MTH174",
      name: "ENGINEERING MATHEMATICS",
      credits: 4,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 67 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 27 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 0 } // Absent represented as 0 for scaling
      ]
    },
    {
      code: "PES318",
      name: "SOFT SKILLS-I",
      credits: 3,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 34 },
        { type: "Practical End Term", maxMarks: 100, weightage: 55, scored: 27 }
      ]
    },
    {
      code: "PHY110",
      name: "ENGINEERING PHYSICS",
      credits: 3,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 90 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 32 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 15 }
      ]
    }
  ],
  2: [
    {
      code: "CHE110",
      name: "ENVIRONMENTAL STUDIES",
      credits: 2,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 40, scored: 71 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 35, scored: 18 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 16 }
      ]
    },
    {
      code: "CSE101",
      name: "COMPUTER PROGRAMMING",
      credits: 4,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 20 },
        { type: "Practical End Term", maxMarks: 100, weightage: 45, scored: 57 }
      ]
    },
    {
      code: "CSE121",
      name: "ORIENTATION TO COMPUTING-II",
      credits: 2,
      obtainedGrade: "A",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 20, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 79 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 30, scored: 41 }
      ]
    },
    {
      code: "CSE320",
      name: "SOFTWARE ENGINEERING",
      credits: 3,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 59 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 18 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 24 }
      ]
    },
    {
      code: "ECE249",
      name: "BASIC ELEC. & ELECTRONICS ENG.",
      credits: 4,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 61 },
        { type: "Objective Type End Term", maxMarks: 30, weightage: 15, scored: 13 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 17 },
        { type: "Theory End Term", maxMarks: 40, weightage: 35, scored: 5 }
      ]
    },
    {
      code: "ECE279",
      name: "BASIC ELEC. & ELECTRONICS ENG. LAB",
      credits: 1,
      obtainedGrade: "A",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 2 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 50 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 95 }
      ]
    },
    {
      code: "INT306",
      name: "DATABASE MANAGEMENT SYSTEMS",
      credits: 4,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 35 },
        { type: "Practical End Term", maxMarks: 100, weightage: 45, scored: 55 }
      ]
    },
    {
      code: "MTH401",
      name: "DISCRETE MATHEMATICS",
      credits: 3,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 42 },
        { type: "Objective Type End Term", maxMarks: 30, weightage: 15, scored: 13 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 16 },
        { type: "Others", maxMarks: 1, weightage: 1, scored: 1 },
        { type: "Theory End Term", maxMarks: 40, weightage: 35, scored: 7 }
      ]
    },
    {
      code: "PEL121",
      name: "COMMUNICATION SKILLS-I",
      credits: 3,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 64 },
        { type: "Objective Type End Term", maxMarks: 100, weightage: 40, scored: 55 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 15, scored: 8 }
      ]
    }
  ],
  3: [
    {
      code: "CSE202",
      name: "OBJECT ORIENTED PROGRAMMING",
      credits: 4,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 80 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 60 }
      ]
    },
    {
      code: "CSE205",
      name: "DATA STRUCTURES AND ALGORITHMS",
      credits: 4,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 52 },
        { type: "Theory End Term", maxMarks: 70, weightage: 50, scored: 28 },
        { type: "Theory Mid Term", maxMarks: 40, weightage: 20, scored: 10 }
      ]
    },
    {
      code: "CSE211",
      name: "COMPUTER ORGANIZATION AND DESIGN",
      credits: 4,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 78 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 35 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 14 }
      ]
    },
    {
      code: "CSE306",
      name: "COMPUTER NETWORKS",
      credits: 3,
      obtainedGrade: "D",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 47 },
        { type: "Objective Type End Term", maxMarks: 30, weightage: 15, scored: 7 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 9 },
        { type: "Others", maxMarks: 1, weightage: 1, scored: 1 },
        { type: "Theory End Term", maxMarks: 40, weightage: 35, scored: 15 }
      ]
    },
    {
      code: "CSE307",
      name: "INTERNETWORKING ESSENTIALS",
      credits: 1,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 75 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 48 }
      ]
    },
    {
      code: "CSE316",
      name: "OPERATING SYSTEMS",
      credits: 3,
      obtainedGrade: "B",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 61 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 50, scored: 45 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 6 }
      ]
    },
    {
      code: "CSE325",
      name: "OPERATING SYSTEMS LABORATORY",
      credits: 1,
      obtainedGrade: "A",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 80 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 51 }
      ]
    },
    {
      code: "GEN231",
      name: "COMMUNITY DEVELOPMENT PROJECT",
      credits: 2,
      obtainedGrade: "A+",
      components: [
        { type: "Practical End Term", maxMarks: 100, weightage: 100, scored: 80 }
      ]
    },
    {
      code: "PEL132",
      name: "COMMUNICATION SKILLS-II",
      credits: 3,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 62 },
        { type: "Practical End Term", maxMarks: 100, weightage: 40, scored: 41 },
        { type: "Practical Mid Term", maxMarks: 50, weightage: 15, scored: 30 }
      ]
    }
  ],
  4: [
    {
      code: "CSE310",
      name: "PROGRAMMING IN JAVA",
      credits: 4,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 50, scored: 56 },
        { type: "Practical End Term", maxMarks: 100, weightage: 45, scored: 80 }
      ]
    },
    {
      code: "CSE408",
      name: "DESIGN AND ANALYSIS OF ALGORITHMS",
      credits: 3,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 54 },
        { type: "Objective Type End Term", maxMarks: 45, weightage: 50, scored: 26 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 16 }
      ]
    },
    {
      code: "INT217",
      name: "INTRODUCTION TO DATA MANAGEMENT",
      credits: 3,
      obtainedGrade: "A",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 88 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 85 }
      ]
    },
    {
      code: "INT375",
      name: "DATA SCIENCE TOOLBOX: PYTHON PROG.",
      credits: 3,
      obtainedGrade: "A+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 3 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 95 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 62 }
      ]
    },
    {
      code: "INT428",
      name: "ARTIFICIAL INTELLIGENCE ESSENTIALS",
      credits: 4,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 2 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 81 },
        { type: "Objective Type End Term", maxMarks: 45, weightage: 50, scored: 20 }
      ]
    },
    {
      code: "MTH302",
      name: "PROBABILITY AND STATISTICS",
      credits: 4,
      obtainedGrade: "A+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 97 },
        { type: "Objective Type End Term", maxMarks: 45, weightage: 50, scored: 36 },
        { type: "Objective Type Mid Term", maxMarks: 30, weightage: 20, scored: 11 }
      ]
    },
    {
      code: "PEA305",
      name: "ANALYTICAL SKILLS-I",
      credits: 3,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 0 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 55 },
        { type: "Objective Type End Term", maxMarks: 45, weightage: 40, scored: 24 },
        { type: "Objective Type Mid Term", maxMarks: 40, weightage: 15, scored: 13 }
      ]
    }
  ],
  5: [
    {
      code: "CSE322",
      name: "FORMAL LANGUAGES & AUTOMATION THEORY",
      credits: 3,
      obtainedGrade: "E",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 40 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 70, scored: 8 }
      ]
    },
    {
      code: "CSE343",
      name: "TRAINING IN PROGRAMMING",
      credits: 3,
      obtainedGrade: "A+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 92 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 90 }
      ]
    },
    {
      code: "INT234",
      name: "PREDICTIVE ANALYTICS",
      credits: 3,
      obtainedGrade: "A+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 94 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 88 }
      ]
    },
    {
      code: "INT374",
      name: "DATA ANALYTICS WITH POWER BI",
      credits: 3,
      obtainedGrade: "A+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 80 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 89 }
      ]
    },
    {
      code: "PEA306",
      name: "ANALYTICAL SKILLS-II",
      credits: 3,
      obtainedGrade: "C",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 5 },
        { type: "Objective Type End Term", maxMarks: 45, weightage: 85, scored: 5 } // Very low end term score
      ]
    },
    {
      code: "PEV301",
      name: "VERBAL ABILITY",
      credits: 4,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 65 },
        { type: "Practical End Term", maxMarks: 100, weightage: 55, scored: 64 }
      ]
    },
    {
      code: "PSY291",
      name: "PSYCHOLOGICAL TESTING",
      credits: 3,
      obtainedGrade: "B+",
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 95 },
        { type: "Objective Type End Term", maxMarks: 30, weightage: 21, scored: 21 },
        { type: "Theory End Term", maxMarks: 40, weightage: 49, scored: 18 }
      ]
    }
  ],
  6: [
    {
      code: "CSE332",
      name: "INDUSTRY ETHICS AND LEGAL ISSUES",
      credits: 2,
      obtainedGrade: null, // Ongoing
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 80 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 70, scored: 40 }
      ]
    },
    {
      code: "CSE357",
      name: "COMBINATORIAL STUDIES",
      credits: 3,
      obtainedGrade: null,
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 78 },
        { type: "Objective Type End Term", maxMarks: 60, weightage: 70, scored: 38 }
      ]
    },
    {
      code: "CSE393",
      name: "ONLINE ACADEMIC COURSE",
      credits: 2,
      obtainedGrade: null,
      components: [
        { type: "Theory End Term", maxMarks: 100, weightage: 100, scored: 75 }
      ]
    },
    {
      code: "INT312",
      name: "BIG DATA FUNDAMENTALS",
      credits: 3,
      obtainedGrade: null,
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 45, scored: 85 },
        { type: "Practical End Term", maxMarks: 100, weightage: 50, scored: 70 }
      ]
    },
    {
      code: "PES319",
      name: "SOFT SKILLS-II",
      credits: 3,
      obtainedGrade: null,
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 15, scored: 4 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 30, scored: 80 },
        { type: "Practical End Term", maxMarks: 100, weightage: 55, scored: 75 }
      ]
    },
    {
      code: "PSY292",
      name: "POSITIVE PSYCHOLOGY",
      credits: 3,
      obtainedGrade: null,
      components: [
        { type: "Attendance Marks", maxMarks: 5, weightage: 5, scored: 5 },
        { type: "Continuous Assessment", maxMarks: 100, weightage: 25, scored: 85 },
        { type: "Theory End Term", maxMarks: 40, weightage: 70, scored: 30 }
      ]
    }
  ],
  7: [],
  8: []
};
