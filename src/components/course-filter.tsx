import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MyCourse } from "@/hooks/use-courses";

export const ALL_COURSES = "all";

export function CourseFilter({
  courses,
  value,
  onChange,
  allLabel = "All my courses",
  includeAll = true,
  placeholder = "Select a course",
  className,
}: {
  courses: MyCourse[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  includeAll?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className ?? "w-full sm:w-72"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll ? <SelectItem value={ALL_COURSES}>{allLabel}</SelectItem> : null}
        {courses.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.code} — {c.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
