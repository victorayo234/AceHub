//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-BCbCT0ef.js
var courses = [
	{
		id: "bio-201",
		title: "Cell Biology",
		code: "BIO 201",
		tag: "teal",
		progress: 72,
		notes: 12,
		files: 5
	},
	{
		id: "cs-140",
		title: "Data Structures",
		code: "CS 140",
		tag: "indigo",
		progress: 45,
		notes: 18,
		files: 9
	},
	{
		id: "hist-110",
		title: "Modern History",
		code: "HIST 110",
		tag: "amber",
		progress: 88,
		notes: 7,
		files: 3
	},
	{
		id: "chem-101",
		title: "Organic Chemistry",
		code: "CHEM 101",
		tag: "rose",
		progress: 31,
		notes: 9,
		files: 6
	},
	{
		id: "math-220",
		title: "Linear Algebra",
		code: "MATH 220",
		tag: "violet",
		progress: 58,
		notes: 14,
		files: 2
	},
	{
		id: "psy-150",
		title: "Cognitive Psychology",
		code: "PSY 150",
		tag: "emerald",
		progress: 12,
		notes: 3,
		files: 1
	},
	{
		id: "phys-130",
		title: "Classical Mechanics",
		code: "PHYS 130",
		tag: "indigo",
		progress: 64,
		notes: 11,
		files: 7
	},
	{
		id: "econ-200",
		title: "Microeconomics",
		code: "ECON 200",
		tag: "amber",
		progress: 40,
		notes: 8,
		files: 4
	},
	{
		id: "stat-210",
		title: "Probability & Statistics",
		code: "STAT 210",
		tag: "teal",
		progress: 77,
		notes: 16,
		files: 5
	},
	{
		id: "cs-260",
		title: "Operating Systems",
		code: "CS 260",
		tag: "violet",
		progress: 22,
		notes: 6,
		files: 8
	},
	{
		id: "eng-105",
		title: "Academic Writing",
		code: "ENG 105",
		tag: "rose",
		progress: 93,
		notes: 10,
		files: 2
	},
	{
		id: "phil-115",
		title: "Logic & Reasoning",
		code: "PHIL 115",
		tag: "emerald",
		progress: 51,
		notes: 5,
		files: 3
	}
];
var tagColor = {
	teal: "bg-[oklch(0.72_0.09_190)]",
	indigo: "bg-[oklch(0.62_0.13_275)]",
	amber: "bg-[oklch(0.80_0.12_75)]",
	rose: "bg-[oklch(0.72_0.12_15)]",
	violet: "bg-[oklch(0.68_0.13_305)]",
	emerald: "bg-[oklch(0.72_0.11_155)]"
};
var notes = [
	{
		id: "n1",
		title: "Mitochondria & ATP synthesis",
		courseId: "bio-201",
		kind: "note",
		updated: "2h ago",
		excerpt: "The electron transport chain builds a proton gradient across the inner membrane…"
	},
	{
		id: "n2",
		title: "Lecture 6 — Balanced trees",
		courseId: "cs-140",
		kind: "pdf",
		updated: "Yesterday",
		excerpt: "AVL rotations, red-black invariants, and amortized analysis of splay trees.",
		pages: 24
	},
	{
		id: "n3",
		title: "Cold War timeline",
		courseId: "hist-110",
		kind: "note",
		updated: "2 days ago",
		excerpt: "From the Truman Doctrine through the Cuban Missile Crisis and détente…"
	},
	{
		id: "n4",
		title: "Reaction mechanisms handout",
		courseId: "chem-101",
		kind: "pdf",
		updated: "3 days ago",
		excerpt: "SN1 vs SN2, carbocation stability and stereochemical outcomes.",
		pages: 12
	},
	{
		id: "n5",
		title: "Eigenvalues intuition",
		courseId: "math-220",
		kind: "note",
		updated: "5 days ago",
		excerpt: "A matrix stretches space along its eigenvectors by its eigenvalues…"
	},
	{
		id: "n6",
		title: "Memory & encoding models",
		courseId: "psy-150",
		kind: "note",
		updated: "6 days ago",
		excerpt: "Sensory, short-term and long-term stores; chunking and rehearsal effects."
	},
	{
		id: "n7",
		title: "Problem set 4 — Newtonian dynamics",
		courseId: "phys-130",
		kind: "pdf",
		updated: "1 week ago",
		excerpt: "Free-body diagrams, friction on inclines and conservation of momentum.",
		pages: 8
	},
	{
		id: "n8",
		title: "Elasticity of demand",
		courseId: "econ-200",
		kind: "note",
		updated: "1 week ago",
		excerpt: "Price elasticity, revenue effects and why necessities behave differently…"
	},
	{
		id: "n9",
		title: "Distributions cheat sheet",
		courseId: "stat-210",
		kind: "pdf",
		updated: "8 days ago",
		excerpt: "Binomial, Poisson, normal — means, variances and when to use each.",
		pages: 6
	},
	{
		id: "n10",
		title: "Deadlock & the banker's algorithm",
		courseId: "cs-260",
		kind: "note",
		updated: "9 days ago",
		excerpt: "Four Coffman conditions and how safe-state checking avoids deadlock."
	},
	{
		id: "n11",
		title: "Thesis statements that work",
		courseId: "eng-105",
		kind: "note",
		updated: "2 weeks ago",
		excerpt: "Arguable, specific, and answerable within the length of the essay."
	},
	{
		id: "n12",
		title: "Truth tables & validity",
		courseId: "phil-115",
		kind: "pdf",
		updated: "2 weeks ago",
		excerpt: "Constructing truth tables to test entailment and logical equivalence.",
		pages: 10
	}
];
var decks = [
	{
		id: "d1",
		title: "Cell organelles",
		courseId: "bio-201",
		total: 42,
		due: 12,
		mastered: 24
	},
	{
		id: "d2",
		title: "Big-O complexities",
		courseId: "cs-140",
		total: 30,
		due: 8,
		mastered: 19
	},
	{
		id: "d3",
		title: "Cold War dates",
		courseId: "hist-110",
		total: 26,
		due: 0,
		mastered: 26
	},
	{
		id: "d4",
		title: "Functional groups",
		courseId: "chem-101",
		total: 38,
		due: 21,
		mastered: 6
	},
	{
		id: "d5",
		title: "Matrix operations",
		courseId: "math-220",
		total: 34,
		due: 9,
		mastered: 15
	},
	{
		id: "d6",
		title: "Memory models",
		courseId: "psy-150",
		total: 22,
		due: 14,
		mastered: 4
	},
	{
		id: "d7",
		title: "Kinematics formulas",
		courseId: "phys-130",
		total: 28,
		due: 5,
		mastered: 17
	},
	{
		id: "d8",
		title: "Supply & demand terms",
		courseId: "econ-200",
		total: 25,
		due: 11,
		mastered: 9
	},
	{
		id: "d9",
		title: "Probability distributions",
		courseId: "stat-210",
		total: 31,
		due: 3,
		mastered: 24
	},
	{
		id: "d10",
		title: "Scheduling algorithms",
		courseId: "cs-260",
		total: 20,
		due: 18,
		mastered: 2
	}
];
var cards = [
	{
		front: "What powers ATP synthase?",
		back: "The proton-motive force generated by the electron transport chain across the inner mitochondrial membrane."
	},
	{
		front: "Where does glycolysis occur?",
		back: "In the cytosol — it does not require oxygen or mitochondria."
	},
	{
		front: "Function of the smooth ER?",
		back: "Lipid synthesis, detoxification, and calcium ion storage."
	},
	{
		front: "What is the role of the Golgi apparatus?",
		back: "Modifies, sorts, and packages proteins and lipids for secretion or delivery."
	},
	{
		front: "Which organelle contains hydrolytic enzymes?",
		back: "The lysosome — it digests macromolecules and worn-out organelles."
	}
];
var quizQuestions = [
	{
		q: "Which stage of respiration produces the most ATP?",
		options: [
			"Glycolysis",
			"Krebs cycle",
			"Oxidative phosphorylation",
			"Fermentation"
		],
		answer: 2,
		why: "Oxidative phosphorylation yields roughly 34 of the ~38 ATP produced per glucose molecule."
	},
	{
		q: "The inner mitochondrial membrane folds are called…",
		options: [
			"Cristae",
			"Thylakoids",
			"Villi",
			"Microtubules"
		],
		answer: 0,
		why: "Cristae increase surface area for the electron transport chain."
	},
	{
		q: "Which molecule is the final electron acceptor?",
		options: [
			"NAD+",
			"Oxygen",
			"Pyruvate",
			"Water"
		],
		answer: 1,
		why: "Oxygen accepts electrons at complex IV, forming water."
	},
	{
		q: "Glycolysis net yield per glucose is…",
		options: [
			"0 ATP",
			"2 ATP",
			"4 ATP",
			"36 ATP"
		],
		answer: 1,
		why: "Four ATP are produced but two are consumed, giving a net of two."
	}
];
var groups = [
	{
		id: "g1",
		name: "BIO 201 Finals Crew",
		members: 6,
		notes: 14,
		code: "BIO-9K2X",
		goal: "Finish chapters 8–12 by Sunday"
	},
	{
		id: "g2",
		name: "Algo Practice Club",
		members: 11,
		notes: 32,
		code: "ALG-7T4M",
		goal: "Two problems a day, every day"
	},
	{
		id: "g3",
		name: "Late Night Chem",
		members: 4,
		notes: 5,
		code: "CHM-1P8B",
		goal: "Master reaction mechanisms"
	},
	{
		id: "g4",
		name: "Stats Study Room",
		members: 8,
		notes: 19,
		code: "STA-5R3D",
		goal: "One past paper every weekend"
	},
	{
		id: "g5",
		name: "Physics Problem Solvers",
		members: 7,
		notes: 12,
		code: "PHY-2W9L",
		goal: "Clear problem sets before Wednesday"
	},
	{
		id: "g6",
		name: "Essay Feedback Circle",
		members: 5,
		notes: 9,
		code: "ENG-6Q1V",
		goal: "Swap drafts and review within 24h"
	}
];
var chat = [
	{
		id: 1,
		name: "Maya",
		initials: "MA",
		time: "09:12",
		text: "Uploaded the lecture 9 slides — the diagrams on page 6 are gold."
	},
	{
		id: 2,
		name: "Tunde",
		initials: "TU",
		time: "09:20",
		text: "Generated a 20-card deck from it, shared to the group."
	},
	{
		id: 3,
		name: "You",
		initials: "YO",
		time: "09:24",
		text: "Perfect. I'll take the practice quiz tonight and post my score."
	}
];
var weekly = [
	{
		day: "Mon",
		minutes: 45,
		cards: 30
	},
	{
		day: "Tue",
		minutes: 80,
		cards: 52
	},
	{
		day: "Wed",
		minutes: 30,
		cards: 18
	},
	{
		day: "Thu",
		minutes: 95,
		cards: 61
	},
	{
		day: "Fri",
		minutes: 60,
		cards: 40
	},
	{
		day: "Sat",
		minutes: 120,
		cards: 88
	},
	{
		day: "Sun",
		minutes: 70,
		cards: 44
	}
];
var heatmap = Array.from({ length: 182 }, (_, i) => {
	const seed = i * 37 % 11;
	return seed > 7 ? 0 : Math.max(0, seed - 3);
});
var upcoming = [
	{
		id: "u1",
		title: "Cell organelles review",
		when: "Today, 6:00 PM",
		meta: "12 cards due"
	},
	{
		id: "u2",
		title: "Data Structures quiz",
		when: "Tomorrow, 10:00 AM",
		meta: "15 questions"
	},
	{
		id: "u3",
		title: "Study group — BIO 201",
		when: "Friday, 4:30 PM",
		meta: "6 members"
	}
];
//#endregion
export { groups as a, quizQuestions as c, weekly as d, decks as i, tagColor as l, chat as n, heatmap as o, courses as r, notes as s, cards as t, upcoming as u };
