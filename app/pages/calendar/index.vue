<template>
  <div class="size-full relative">
    <div class="flex flex-col overflow-auto select-none size-full bg-white">
      <div ref="scrollRef" class="flex-1 overflow-auto" @scroll="handleScroll">
        <div class="relative inline-flex min-w-max flex-col">
          <div class="flex sticky top-0 z-20">
            <div class="flex ml-[60px]">
              <div
                v-for="date in visibleDates"
                :key="date.id"
                :class="
                  date.isToday
                    ? 'bg-primary-100 relative z-40'
                    : 'bg-secondary-50 relative z-40'
                "
                class="w-[120px] shrink-0 py-3 text-center border-r border-b border-gray-200 font-semibold"
              >
                {{ date.display }}
              </div>
            </div>
          </div>

          <div v-for="hour in hours" :key="hour" class="flex">
            <div
              class="w-[60px] shrink-0 sticky left-0 bg-gray-50 border-r border-b border-gray-200 h-12 flex items-center justify-end pr-2 text-gray-500 text-sm z-10"
            >
              {{ hour }}
            </div>
            <div class="flex">
              <div
                v-for="date in visibleDates"
                :key="date.id + '-' + hour"
                :class="date.isToday && 'bg-primary-50/40'"
                class="w-[120px] shrink-0 h-12 border-r border-b border-gray-200 relative"
              />
            </div>
          </div>

          <div
            class="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          >
            <div class="ml-[60px]">
              <div
                v-for="event in events"
                :key="event.id"
                :class="event.color"
                :style="positionEvent(event)"
                class="absolute rounded pointer-events-auto cursor-pointer"
                @click="selectEvent(event)"
              >
                <div class="p-1 text-xs overflow-hidden h-full">
                  <div class="font-semibold">{{ event.title }}</div>
                  <div>{{ formatEventTime(event) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const MAX_VISIBLE_DAYS = 30;
const DAYS_TO_ADD = 7;
const SCROLL_THRESHOLD = 5;

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
  description?: string;
}

let dateIdCounter = 0;
let eventIdCounter = 0;

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

function generateDateObj(date: Date): {
  id: number;
  date: Date;
  display: string;
  isToday: boolean;
} {
  return {
    id: dateIdCounter++,
    date: new Date(date),
    display: date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
    }),
    isToday: isToday(date),
  };
}

function createEvent(
  title: string,
  start: Date,
  end: Date,
  color: string = "bg-blue-200 text-blue-800",
): CalendarEvent {
  return {
    id: eventIdCounter++,
    title,
    start: new Date(start),
    end: new Date(end),
    color,
  };
}

function formatEventTime(event: CalendarEvent): string {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  return `${formatTime(event.start)} - ${formatTime(event.end)}`;
}

function initializeDates() {
  const dates = [];
  const today = new Date();
  const daysBeforeToday = Math.floor(MAX_VISIBLE_DAYS / 2);
  const daysAfterToday = MAX_VISIBLE_DAYS - daysBeforeToday - 1;

  for (let i = daysBeforeToday; i > 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(generateDateObj(d));
  }

  dates.push(generateDateObj(today));

  for (let i = 1; i <= daysAfterToday; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(generateDateObj(d));
  }

  return dates;
}

function selectEvent(event: CalendarEvent) {
  alert(`Selected event: ${event.title}\nTime: ${formatEventTime(event)}`);
}

function positionEvent(event: CalendarEvent) {
  const dateIndex = visibleDates.value.findIndex(
    (d) =>
      d.date.getDate() === event.start.getDate() &&
      d.date.getMonth() === event.start.getMonth() &&
      d.date.getFullYear() === event.start.getFullYear(),
  );

  if (dateIndex === -1) return { display: "none" };

  const left = dateIndex * 120;

  const startHour = event.start.getHours();
  const startMinutes = event.start.getMinutes();
  const endHour = event.end.getHours();
  const endMinutes = event.end.getMinutes();

  const hourHeight = 48;
  const top =
    startHour * hourHeight + (startMinutes / 60) * hourHeight + hourHeight;

  const durationHours = endHour - startHour + (endMinutes - startMinutes) / 60;
  const height = durationHours * hourHeight;

  return {
    left: `${left - 120 / 2}px`,
    top: `${top}px`,
    width: "112px",
    height: `${height}px`,
    zIndex: "5",
  };
}

const visibleDates = ref(initializeDates());
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const scrollRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(13, 15, 0, 0);

const tomorrowEnd = new Date(tomorrow);
tomorrowEnd.setHours(15, 45, 0, 0);

const events = ref<CalendarEvent[]>([
  createEvent(
    "Important Meeting",
    tomorrow,
    tomorrowEnd,
    "bg-primary-200 text-primary-800",
  ),
]);

const todayIndex = computed(() => {
  return visibleDates.value.findIndex((date) => date.isToday);
});

function updateDatesWindow(direction: "before" | "after") {
  if (isLoading.value) return;
  isLoading.value = true;

  const scrollContainer = scrollRef.value;
  if (!scrollContainer) {
    isLoading.value = false;
    return;
  }

  const prevScrollLeft = scrollContainer.scrollLeft;
  const prevScrollWidth = scrollContainer.scrollWidth;

  let newDates = [...visibleDates.value];
  const cellWidth = 120;

  if (direction === "before") {
    const firstDate = newDates[0]?.date;
    if (firstDate) {
      newDates = newDates.slice(0, newDates.length - DAYS_TO_ADD);

      const newBeforeDates = [];
      for (let i = DAYS_TO_ADD; i > 0; i--) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() - i);
        newBeforeDates.push(generateDateObj(d));
      }

      newDates = [...newBeforeDates, ...newDates];
    }
  } else {
    const lastDate = newDates[newDates.length - 1]?.date;
    if (lastDate) {
      newDates = newDates.slice(DAYS_TO_ADD);

      const newAfterDates = [];
      for (let i = 1; i <= DAYS_TO_ADD; i++) {
        const d = new Date(lastDate);
        d.setDate(lastDate.getDate() + i);
        newAfterDates.push(generateDateObj(d));
      }

      newDates = [...newDates, ...newAfterDates];
    }
  }

  visibleDates.value = newDates;

  setTimeout(() => {
    if (scrollContainer) {
      if (direction === "before") {
        scrollContainer.scrollLeft = prevScrollLeft + DAYS_TO_ADD * cellWidth;
      } else {
        scrollContainer.scrollLeft = prevScrollLeft - DAYS_TO_ADD * cellWidth;
      }
    }
    isLoading.value = false;
  }, 0);
}

let scrollTimeout: number | null = null;

function handleScroll() {
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = requestAnimationFrame(() => {
    if (!scrollRef.value || isLoading.value) return;

    const container = scrollRef.value;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const leftThreshold = SCROLL_THRESHOLD * 120;
    const rightThreshold = maxScroll - SCROLL_THRESHOLD * 120;

    if (container.scrollLeft < leftThreshold && container.scrollLeft >= 0) {
      updateDatesWindow("before");
    }

    if (container.scrollLeft > rightThreshold && rightThreshold > 0) {
      updateDatesWindow("after");
    }

    scrollTimeout = null;
  });
}

onMounted(() => {
  if (scrollRef.value) {
    const tomorrowIndex = visibleDates.value.findIndex((date) =>
      isTomorrow(date.date),
    );
    if (tomorrowIndex !== -1) {
      const cellWidth = 120;
      scrollRef.value.scrollLeft = (tomorrowIndex - 1) * cellWidth;
    } else {
      if (todayIndex.value !== -1) {
        const cellWidth = 120;
        scrollRef.value.scrollLeft = (todayIndex.value - 2) * cellWidth;
      }
    }

    const rowHeight = 48;
    scrollRef.value.scrollTop = 13 * rowHeight;
  }
});
</script>
<style scoped>
.hour-width {
  width: 60px;
}

.hour-height {
  height: 48px;
}

.event-width {
  width: 112px;
}

.event-height {
  height: 48px;
}
</style>
