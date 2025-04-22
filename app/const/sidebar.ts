import {BookOpen, Calendar, CalendarDays, FileStack, Map, SquareStack} from "lucide-vue-next";

import notes from "~/components/sidebar/notes.vue";

export const appNames = [
  "Notes",
  "Timeline",
  "Planner",
  "Board",
  "Calendar",
  "Today",
] as const;
type AppName = (typeof appNames)[number];

export interface AppLink {
  name: AppName;
  link: string;
  icon: Component;
  app?: Component;
}

export const apps: AppLink[] = [
  {
    name: "Notes",
    link: "/notes",
    icon: BookOpen,
    app: notes,
  },
  {
    name: "Timeline",
    link: "/timeline",
    icon: Map,
  },
  {
    name: "Planner",
    link: "/planner",
    icon: SquareStack,
  },
  {
    name: "Board",
    link: "/board",
    icon: FileStack,
  },
  {
    name: "Calendar",
    link: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Today",
    link: "/today",
    icon: Calendar,
  },
];
