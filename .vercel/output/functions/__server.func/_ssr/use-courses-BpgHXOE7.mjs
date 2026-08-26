import { t as supabase } from "./client-ChYpccUq.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useAuth } from "./router-HXcVjxpS.mjs";
import { l as tagColor } from "./mock-data-BCbCT0ef.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-courses-BpgHXOE7.js
var TAGS = Object.keys(tagColor);
function hash(value) {
	let h = 0;
	for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) % 1e5;
	return h;
}
function toMyCourse(c) {
	const h = hash(c.id + c.course_code);
	return {
		id: c.id,
		title: c.course_name,
		code: c.course_code,
		tag: TAGS[h % TAGS.length],
		progress: h % 96,
		notes: h % 13,
		files: (h >> 3) % 9,
		level: c.level,
		isCommon: c.is_common
	};
}
function useDepartments() {
	return useQuery({
		queryKey: ["departments"],
		staleTime: 36e5,
		queryFn: async () => {
			const { data, error } = await supabase.from("departments").select("id,name,code").order("name");
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useCatalogCourses(departmentId, level) {
	return useQuery({
		queryKey: [
			"catalog-courses",
			departmentId,
			level
		],
		enabled: Boolean(departmentId && level),
		staleTime: 18e5,
		queryFn: async () => {
			const { data, error } = await supabase.from("courses").select("id,department_id,level,course_code,course_name,is_common").eq("level", level).or(`department_id.eq.${departmentId},is_common.eq.true`).order("course_code");
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useMyCourses() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["my-courses", user?.id],
		enabled: Boolean(user?.id),
		staleTime: 3e4,
		queryFn: async () => {
			const { data, error } = await supabase.from("user_courses").select("course_id, courses(id,department_id,level,course_code,course_name,is_common)").eq("user_id", user.id);
			if (error) throw error;
			return (data ?? []).map((row) => row.courses).filter((c) => Boolean(c)).map(toMyCourse).sort((a, b) => a.code.localeCompare(b.code));
		}
	});
}
function useInvalidateMyCourses() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	return () => queryClient.invalidateQueries({ queryKey: ["my-courses", user?.id] });
}
//#endregion
export { useMyCourses as i, useDepartments as n, useInvalidateMyCourses as r, useCatalogCourses as t };
