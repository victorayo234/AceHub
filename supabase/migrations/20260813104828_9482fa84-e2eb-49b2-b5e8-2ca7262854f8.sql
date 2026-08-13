CREATE TABLE public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.departments TO anon, authenticated;
GRANT ALL ON public.departments TO service_role;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departments are readable by everyone" ON public.departments FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES public.departments(id) ON DELETE CASCADE,
  level integer NOT NULL,
  course_code text NOT NULL,
  course_name text NOT NULL,
  is_common boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_code, level)
);
CREATE INDEX courses_dept_level_idx ON public.courses (department_id, level);
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are readable by everyone" ON public.courses FOR SELECT TO anon, authenticated USING (true);

ALTER TABLE public.profiles
  ADD COLUMN department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  ADD COLUMN level integer,
  ADD COLUMN onboarding_completed boolean NOT NULL DEFAULT false;

CREATE TABLE public.user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
CREATE INDEX user_courses_user_idx ON public.user_courses (user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_courses TO authenticated;
GRANT ALL ON public.user_courses TO service_role;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own courses" ON public.user_courses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own courses" ON public.user_courses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own courses" ON public.user_courses FOR DELETE TO authenticated USING (auth.uid() = user_id);

INSERT INTO public.departments (name, code) VALUES
  ('Computer Science','CSC'),
  ('Microbiology','MCB'),
  ('Electrical Engineering','EEE'),
  ('Mechanical Engineering','MEE'),
  ('Medicine & Surgery','MED'),
  ('Accounting','ACC'),
  ('Law','LAW'),
  ('Mass Communication','MAC'),
  ('Economics','ECO'),
  ('Biochemistry','BCH'),
  ('Political Science','POL'),
  ('Architecture','ARC');

INSERT INTO public.courses (department_id, level, course_code, course_name, is_common)
SELECT d.id,
       t.level,
       d.code || ' ' || (t.level + t.idx)::text,
       replace(t.title, '{D}', split_part(d.name, ' ', 1)),
       false
FROM public.departments d
CROSS JOIN (
  VALUES
    (100, 1, 'Introduction to {D} I'),
    (100, 2, 'Introduction to {D} II'),
    (100, 3, 'Foundations of {D}'),
    (100, 4, 'General Chemistry'),
    (100, 5, 'General Biology'),
    (100, 6, 'General Physics'),
    (100, 7, 'Elementary Mathematics I'),
    (100, 8, 'Elementary Mathematics II'),
    (100, 9, 'Study Skills for {D}'),
    (100, 10, 'Laboratory & Practical Work I'),
    (100, 11, 'History of {D}'),
    (100, 12, 'Computer Appreciation'),
    (100, 13, 'Basic Statistics'),
    (100, 14, 'Introduction to Research'),
    (100, 15, 'Workshop Practice I'),
    (200, 1, '{D} Theory I'),
    (200, 2, '{D} Theory II'),
    (200, 3, 'Applied {D} I'),
    (200, 4, 'Quantitative Methods'),
    (200, 5, 'Analytical Techniques in {D}'),
    (200, 6, 'Laboratory & Practical Work II'),
    (200, 7, 'Systems and Structures in {D}'),
    (200, 8, '{D} and Society'),
    (200, 9, 'Intermediate Statistics'),
    (200, 10, 'Field Methods in {D}'),
    (200, 11, 'Ethics in {D}'),
    (200, 12, 'Instrumentation for {D}'),
    (200, 13, 'Modelling in {D}'),
    (200, 14, 'Seminar in {D} I'),
    (200, 15, 'Workshop Practice II'),
    (300, 1, 'Advanced {D} I'),
    (300, 2, 'Advanced {D} II'),
    (300, 3, 'Applied {D} II'),
    (300, 4, 'Research Methods in {D}'),
    (300, 5, '{D} Management'),
    (300, 6, 'Comparative {D}'),
    (300, 7, 'Specialised Topics in {D}'),
    (300, 8, 'Laboratory & Practical Work III'),
    (300, 9, 'Data Analysis in {D}'),
    (300, 10, 'Industrial Attachment Seminar'),
    (300, 11, 'Policy and Regulation in {D}'),
    (300, 12, 'Design Studio in {D}'),
    (300, 13, 'Case Studies in {D}'),
    (300, 14, 'Seminar in {D} II'),
    (300, 15, 'Professional Skills in {D}'),
    (400, 1, 'Contemporary Issues in {D}'),
    (400, 2, '{D} Project Design'),
    (400, 3, '{D} Project Implementation'),
    (400, 4, 'Advanced Research in {D}'),
    (400, 5, 'Strategic {D} Management'),
    (400, 6, 'Emerging Technologies in {D}'),
    (400, 7, 'Global Perspectives in {D}'),
    (400, 8, 'Advanced Laboratory in {D}'),
    (400, 9, 'Entrepreneurial {D}'),
    (400, 10, 'Professional Ethics and Practice'),
    (400, 11, 'Capstone Seminar in {D}'),
    (400, 12, 'Advanced Analytics in {D}'),
    (400, 13, 'Special Topics in {D}'),
    (400, 14, 'Internship Report'),
    (400, 15, '{D} Practicum')
) AS t(level, idx, title);

DELETE FROM public.courses c
USING public.departments d
WHERE c.department_id = d.id AND d.code = 'CSC';

INSERT INTO public.courses (department_id, level, course_code, course_name, is_common)
SELECT (SELECT id FROM public.departments WHERE code = 'CSC'), t.level, 'CSC ' || (t.level + t.idx)::text, t.title, false
FROM (
  VALUES
    (100, 1, 'Introduction to Computer Science'),
    (100, 2, 'Introduction to Problem Solving'),
    (100, 3, 'Computer Hardware Fundamentals'),
    (100, 4, 'Discrete Structures'),
    (100, 5, 'Introductory Programming I'),
    (100, 6, 'Introductory Programming II'),
    (100, 7, 'Digital Logic Design'),
    (100, 8, 'Mathematics for Computing'),
    (100, 9, 'Introduction to Web Technologies'),
    (100, 10, 'Computer Ethics'),
    (100, 11, 'Data Representation'),
    (100, 12, 'Introduction to Operating Systems'),
    (100, 13, 'Physics for Computing'),
    (100, 14, 'Technical Writing for Computing'),
    (100, 15, 'Statistics for Computer Science'),
    (200, 1, 'Data Structures and Algorithms'),
    (200, 2, 'Object Oriented Programming'),
    (200, 3, 'Computer Architecture'),
    (200, 4, 'Operating Systems I'),
    (200, 5, 'Database Management Systems'),
    (200, 6, 'Systems Analysis and Design'),
    (200, 7, 'Discrete Mathematics II'),
    (200, 8, 'Assembly Language Programming'),
    (200, 9, 'Numerical Computation'),
    (200, 10, 'Software Engineering I'),
    (200, 11, 'Web Application Development'),
    (200, 12, 'Computer Networks I'),
    (200, 13, 'Human Computer Interaction'),
    (200, 14, 'Linear Algebra for Computing'),
    (200, 15, 'Probability and Statistics'),
    (300, 1, 'Algorithms and Complexity'),
    (300, 2, 'Compiler Construction'),
    (300, 3, 'Operating Systems II'),
    (300, 4, 'Computer Networks II'),
    (300, 5, 'Software Engineering II'),
    (300, 6, 'Artificial Intelligence'),
    (300, 7, 'Computer Graphics'),
    (300, 8, 'Database Design and Administration'),
    (300, 9, 'Mobile Application Development'),
    (300, 10, 'Information Security'),
    (300, 11, 'Formal Methods'),
    (300, 12, 'Systems Programming'),
    (300, 13, 'Object Oriented Design Patterns'),
    (300, 14, 'Research Methodology in Computing'),
    (300, 15, 'Industrial Training Seminar'),
    (400, 1, 'Machine Learning'),
    (400, 2, 'Distributed Systems'),
    (400, 3, 'Cloud Computing'),
    (400, 4, 'Cryptography and Network Security'),
    (400, 5, 'Computer Vision'),
    (400, 6, 'Natural Language Processing'),
    (400, 7, 'Advanced Database Systems'),
    (400, 8, 'Software Project Management'),
    (400, 9, 'Big Data Analytics'),
    (400, 10, 'Internet of Things'),
    (400, 11, 'Parallel Computing'),
    (400, 12, 'Human Factors in Software'),
    (400, 13, 'Final Year Project I'),
    (400, 14, 'Final Year Project II'),
    (400, 15, 'Professional Practice in Computing')
) AS t(level, idx, title);

INSERT INTO public.courses (department_id, level, course_code, course_name, is_common) VALUES
  (NULL, 100, 'GST 101', 'Use of English and Communication Skills I', true),
  (NULL, 100, 'GST 102', 'Use of English and Communication Skills II', true),
  (NULL, 100, 'GST 103', 'Nigerian Peoples and Culture', true),
  (NULL, 100, 'GST 104', 'Introduction to Library and Study Skills', true),
  (NULL, 200, 'GST 201', 'Philosophy, Logic and Human Existence', true),
  (NULL, 200, 'GST 202', 'Peace Studies and Conflict Resolution', true),
  (NULL, 200, 'GST 203', 'Communication in Practice', true),
  (NULL, 300, 'GST 301', 'Entrepreneurship and Innovation', true),
  (NULL, 300, 'GST 302', 'Venture Creation and Business Skills', true),
  (NULL, 300, 'GST 303', 'Digital Literacy and Productivity', true),
  (NULL, 400, 'GST 401', 'Leadership and Civic Responsibility', true),
  (NULL, 400, 'GST 402', 'Research and Professional Writing', true),
  (NULL, 400, 'GST 403', 'Career Development and Employability', true);