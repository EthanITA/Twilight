import {
  BookOpenIcon,
  CalendarDaysIcon,
  CalendarIcon,
  MapIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/vue/24/solid";

export const appNames = [
  "Notes",
  "Timeline",
  "Planner",
  "Board",
  "Calendar",
  "Today",
] as const;
type AppName = (typeof appNames)[number];

interface AppLink {
  name: AppName;
  link: string;
  icon: Component;
}

export const apps: AppLink[] = [
  {
    name: "Notes",
    link: "/notes",
    icon: BookOpenIcon,
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
