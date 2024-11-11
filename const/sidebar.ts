import {
  BookOpenIcon,
  CalendarDaysIcon,
  CalendarIcon,
  MapIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/vue/24/solid";
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
    icon: BookOpenIcon,
    app: notes,
  },
  {
    name: "Timeline",
    link: "/timeline",
    icon: MapIcon,
  },
  {
    name: "Planner",
    link: "/planner",
    icon: RectangleStackIcon,
  },
  {
    name: "Board",
    link: "/board",
    icon: RectangleGroupIcon,
  },
  {
    name: "Calendar",
    link: "/calendar",
    icon: CalendarIcon,
  },
  {
    name: "Today",
    link: "/today",
    icon: CalendarDaysIcon,
  },
];
