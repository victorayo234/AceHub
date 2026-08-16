import type { MyCourse } from "@/hooks/use-courses";

/** Deterministic pseudo-random helper so a course always yields the same content. */
function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rand(seed: string, max: number) {
  return hash(seed) % max;
}

/** Roughly a fifth of a student's courses have no activity yet. */
export function isStarted(course: MyCourse) {
  return rand(`${course.id}-active`, 10) > 1;
}

export type Deck = {
  id: string;
  title: string;
  courseId: string;
  total: number;
  due: number;
  mastered: number;
};

const DECK_TOPICS = [
  "Core definitions",
  "Lecture highlights",
  "Formulas & rules",
  "Exam key terms",
  "Tutorial questions",
  "Diagrams & processes",
];

export function decksForCourse(course: MyCourse): Deck[] {
  if (!isStarted(course)) return [];
  const count = 1 + rand(`${course.id}-decks`, 3);
  return Array.from({ length: count }, (_, i) => {
    const total = 18 + rand(`${course.id}-t${i}`, 28);
    const mastered = rand(`${course.id}-m${i}`, total);
    const due = rand(`${course.id}-d${i}`, Math.max(1, total - mastered));
    return {
      id: `${course.id}-deck-${i}`,
      title: `${course.code} · ${DECK_TOPICS[(rand(`${course.id}-topic${i}`, DECK_TOPICS.length) + i) % DECK_TOPICS.length]}`,
      courseId: course.id,
      total,
      due,
      mastered,
    };
  });
}

export function cardsForCourse(course: MyCourse) {
  const name = course.title;
  return [
    {
      front: `What is the central idea of ${name}?`,
      back: `${name} studies how its core principles connect — start from the definitions in your ${course.code} lecture notes and build outward.`,
    },
    {
      front: `Name a key term you must know for ${course.code}.`,
      back: `Every ${course.code} exam leans on the terminology introduced in the first three lectures — define it in your own words.`,
    },
    {
      front: `Which topic in ${name} carries the most marks?`,
      back: `Typically the applied/problem-solving section. Work past questions rather than re-reading the notes.`,
    },
    {
      front: `How do you revise ${course.code} efficiently?`,
      back: `Summarise each lecture into five bullet points, then turn each bullet into a flashcard and review it on a spaced schedule.`,
    },
    {
      front: `What common mistake costs marks in ${course.code}?`,
      back: `Skipping the reasoning steps. Show the working — partial credit is where most of the difference sits.`,
    },
  ];
}

export type QuizAttempt = {
  id: string;
  courseId: string;
  title: string;
  score: number;
  total: number;
  when: string;
};

const WHEN = ["Today", "Yesterday", "2 days ago", "Last week", "2 weeks ago"];

export function attemptsForCourse(course: MyCourse): QuizAttempt[] {
  if (!isStarted(course)) return [];
  const count = 1 + rand(`${course.id}-quizzes`, 3);
  return Array.from({ length: count }, (_, i) => {
    const total = [5, 10, 15][rand(`${course.id}-qt${i}`, 3)]!;
    const score = Math.max(1, total - rand(`${course.id}-qs${i}`, Math.ceil(total / 2) + 1));
    return {
      id: `${course.id}-quiz-${i}`,
      courseId: course.id,
      title: `${course.code} practice quiz ${i + 1}`,
      score,
      total,
      when: WHEN[(rand(`${course.id}-qw${i}`, WHEN.length) + i) % WHEN.length]!,
    };
  });
}

export function questionsForCourse(course: MyCourse, count = 4) {
  const base = [
    {
      q: `Which study method works best for mastering ${course.title}?`,
      options: ["Re-reading notes", "Spaced retrieval practice", "Highlighting", "Cramming the night before"],
      answer: 1,
      why: "Retrieval practice spread over days beats passive review in every controlled study.",
    },
    {
      q: `In ${course.code}, what should you do first when facing an unfamiliar problem?`,
      options: ["Guess an answer", "Identify what is given and what is asked", "Skip it", "Copy a similar solution"],
      answer: 1,
      why: "Framing the knowns and unknowns turns an unfamiliar problem into a familiar pattern.",
    },
    {
      q: `Which of these best summarises the scope of ${course.title}?`,
      options: [
        "Only memorising definitions",
        "Applying core principles to new situations",
        "Reciting the lecturer's slides",
        "Reading the textbook cover to cover",
      ],
      answer: 1,
      why: "Assessments reward application, not recall alone.",
    },
    {
      q: `How often should you review ${course.code} material to retain it?`,
      options: ["Once, before the exam", "Every day for hours", "Short sessions spread across the week", "Never"],
      answer: 2,
      why: "Short, frequent sessions produce the strongest long-term retention.",
    },
    {
      q: `What is the most useful output after a ${course.code} lecture?`,
      options: ["A verbatim transcript", "A five-point summary and 3 questions", "A photo of the board", "Nothing"],
      answer: 1,
      why: "Condensing and questioning forces the encoding that raw capture skips.",
    },
  ];
  return base.slice(0, count);
}

export type CourseStats = {
  notes: number;
  cardsReviewed: number;
  quizAverage: number | null;
  streakDays: number;
  minutes: number;
  started: boolean;
};

export function statsForCourse(course: MyCourse): CourseStats {
  const started = isStarted(course);
  if (!started) {
    return { notes: 0, cardsReviewed: 0, quizAverage: null, streakDays: 0, minutes: 0, started: false };
  }
  const attempts = attemptsForCourse(course);
  const avg = attempts.length
    ? Math.round(
        (attempts.reduce((sum, a) => sum + a.score / a.total, 0) / attempts.length) * 100,
      )
    : null;
  return {
    notes: 1 + rand(`${course.id}-notes`, 12),
    cardsReviewed: decksForCourse(course).reduce((s, d) => s + d.mastered, 0) * 3,
    quizAverage: avg,
    streakDays: rand(`${course.id}-streak`, 15),
    minutes: 40 + rand(`${course.id}-min`, 600),
    started: true,
  };
}

export type StudyGroup = {
  id: string;
  name: string;
  courseId: string | null;
  courseCode: string;
  members: number;
  notes: number;
  code: string;
  goal: string;
  level: number | null;
  department: string;
  recommended: boolean;
};

const GOALS = [
  "Finish the past questions before the test",
  "Two tutorial problems a day, every day",
  "Summarise every lecture within 24 hours",
  "Weekly mock test on Saturdays",
  "Clear all assignments before the deadline",
];

function inviteCode(seed: string) {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const a = letters[rand(seed + "a", letters.length)]!;
  const b = letters[rand(seed + "b", letters.length)]!;
  const n = 1000 + rand(seed + "n", 9000);
  return `${a}${b}-${n}`;
}

export function recommendedGroups(courses: MyCourse[], department: string, level: number | null): StudyGroup[] {
  return courses.slice(0, 5).map((c, i) => ({
    id: `grp-${c.id}`,
    name: `${c.code} ${["Study Squad", "Finals Crew", "Tutorial Circle", "Night Owls", "Problem Solvers"][i % 5]}`,
    courseId: c.id,
    courseCode: c.code,
    members: 3 + rand(`${c.id}-members`, 18),
    notes: rand(`${c.id}-gnotes`, 30),
    code: inviteCode(c.id),
    goal: GOALS[rand(`${c.id}-goal`, GOALS.length)]!,
    level: c.level,
    department: c.isCommon ? "General Studies" : department,
    recommended: true,
  }));
}

export function departmentGroups(department: string, level: number | null): StudyGroup[] {
  return [
    {
      id: "grp-dept-1",
      name: `${department} ${level ?? ""} General Hub`.trim(),
      courseId: null,
      courseCode: department,
      members: 42,
      notes: 88,
      code: inviteCode(department + "hub"),
      goal: "Share timetables, past questions and announcements",
      level,
      department,
      recommended: false,
    },
    {
      id: "grp-dept-2",
      name: `${department} Past Questions Vault`,
      courseId: null,
      courseCode: department,
      members: 27,
      notes: 61,
      code: inviteCode(department + "vault"),
      goal: "Upload one past paper each week",
      level,
      department,
      recommended: false,
    },
  ];
}

export type CourseNote = {
  id: string;
  title: string;
  courseId: string;
  kind: "note" | "pdf";
  updated: string;
  excerpt: string;
};

const NOTE_TITLES = [
  "Lecture 1 — Introduction & scope",
  "Lecture 4 — Core concepts",
  "Tutorial questions & solutions",
  "Past questions summary",
  "Lab / practical notes",
  "Revision sheet",
];

const UPDATED = ["2h ago", "Yesterday", "2 days ago", "Last week", "2 weeks ago"];

export function notesForCourse(course: MyCourse): CourseNote[] {
  if (!isStarted(course)) return [];
  const count = 1 + rand(`${course.id}-notecount`, 3);
  return Array.from({ length: count }, (_, i) => ({
    id: `${course.id}-note-${i}`,
    title: `${course.code} · ${NOTE_TITLES[(rand(`${course.id}-nt${i}`, NOTE_TITLES.length) + i) % NOTE_TITLES.length]}`,
    courseId: course.id,
    kind: rand(`${course.id}-nk${i}`, 3) === 0 ? ("pdf" as const) : ("note" as const),
    updated: UPDATED[(rand(`${course.id}-nu${i}`, UPDATED.length) + i) % UPDATED.length]!,
    excerpt: `Key ideas from ${course.title} — definitions, worked examples and the points the lecturer stressed for ${course.code}.`,
  }));
}
