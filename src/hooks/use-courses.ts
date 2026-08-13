import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { tagColor } from "@/lib/mock-data";

export type Department = { id: string; name: string; code: string };

export type CatalogCourse = {
  id: string;
  department_id: string | null;
  level: number;
  course_code: string;
  course_name: string;
  is_common: boolean;
};

export type MyCourse = {
  id: string;
  title: string;
  code: string;
  tag: string;
  progress: number;
  notes: number;
  files: number;
  level: number;
  isCommon: boolean;
};

const TAGS = Object.keys(tagColor);

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) % 100000;
  return h;
}

export function toMyCourse(c: CatalogCourse): MyCourse {
  const h = hash(c.id + c.course_code);
  return {
    id: c.id,
    title: c.course_name,
    code: c.course_code,
    tag: TAGS[h % TAGS.length]!,
    progress: h % 96,
    notes: h % 13,
    files: (h >> 3) % 9,
    level: c.level,
    isCommon: c.is_common,
  };
}

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    staleTime: 1000 * 60 * 60,
    queryFn: async (): Promise<Department[]> => {
      const { data, error } = await supabase.from("departments").select("id,name,code").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCatalogCourses(departmentId: string | null, level: number | null) {
  return useQuery({
    queryKey: ["catalog-courses", departmentId, level],
    enabled: Boolean(departmentId && level),
    staleTime: 1000 * 60 * 30,
    queryFn: async (): Promise<CatalogCourse[]> => {
      const { data, error } = await supabase
        .from("courses")
        .select("id,department_id,level,course_code,course_name,is_common")
        .eq("level", level!)
        .or(`department_id.eq.${departmentId},is_common.eq.true`)
        .order("course_code");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useMyCourses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-courses", user?.id],
    enabled: Boolean(user?.id),
    staleTime: 1000 * 30,
    queryFn: async (): Promise<MyCourse[]> => {
      const { data, error } = await supabase
        .from("user_courses")
        .select("course_id, courses(id,department_id,level,course_code,course_name,is_common)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? [])
        .map((row) => row.courses as CatalogCourse | null)
        .filter((c): c is CatalogCourse => Boolean(c))
        .map(toMyCourse)
        .sort((a, b) => a.code.localeCompare(b.code));
    },
  });
}

export function useInvalidateMyCourses() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return () => queryClient.invalidateQueries({ queryKey: ["my-courses", user?.id] });
}

export const REQUIRED_COURSES = 9;
