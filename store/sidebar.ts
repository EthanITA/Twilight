import type { apps } from "~/const/sidebar";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CalendarIcon,
  MapIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/vue/24/solid";

type AppName = (typeof apps)[number];

interface AppLink {
  name: AppName;
  link: string;
  icon: Component;
}

export const useSidebar = defineStore("sidebar", () => {
  const apps: AppLink[] = [
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

  return {
    apps,
  };
});
