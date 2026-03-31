export const TIME_SLOTS = [
  "12:00",
  "12:30",
  "1:15",
  "2:00",
  "2:45",
  "3:30",
  "4:15",
  "5:10",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  "12:00": "12:00 PM",
  "12:30": "12:30 PM",
  "1:15": "1:15 PM",
  "2:00": "2:00 PM",
  "2:45": "2:45 PM",
  "3:30": "3:30 PM",
  "4:15": "4:15 PM",
  "5:10": "5:10 PM",
};

const SLOT_DURATION_MINUTES = 45;

/** Event date: April 18, 2026 */
const EVENT_DATE = "2026-04-18";

function slotToDate(slot: TimeSlot): Date {
  const [hourStr, min] = slot.split(":");
  let hour = parseInt(hourStr, 10);
  // All times are PM except 12:00 and 12:30
  if (hour !== 12) hour += 12;
  return new Date(`${EVENT_DATE}T${String(hour).padStart(2, "0")}:${min}:00-04:00`);
}

export function getSlotStartTime(slot: TimeSlot): Date {
  return slotToDate(slot);
}

export function getSlotEndTime(slot: TimeSlot): Date {
  const start = slotToDate(slot);
  return new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
}

export function getCurrentSlot(): TimeSlot | null {
  const now = new Date();
  for (let i = TIME_SLOTS.length - 1; i >= 0; i--) {
    const slotStart = slotToDate(TIME_SLOTS[i]);
    if (now >= slotStart) {
      const slotEnd = new Date(
        slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
      );
      if (now <= slotEnd) return TIME_SLOTS[i];
      // Past the end of this slot — check if we're before the next slot
      if (i < TIME_SLOTS.length - 1) {
        const nextStart = slotToDate(TIME_SLOTS[i + 1]);
        if (now < nextStart) return TIME_SLOTS[i]; // in the gap, show previous
      }
      // Past the last slot entirely
      if (i === TIME_SLOTS.length - 1) return null;
    }
  }
  return null;
}

export function isEventDay(): boolean {
  const now = new Date();
  const eventStart = new Date(`${EVENT_DATE}T11:00:00-04:00`);
  const eventEnd = new Date(`${EVENT_DATE}T19:00:00-04:00`);
  return now >= eventStart && now <= eventEnd;
}

export function formatTimeRange(slot: TimeSlot): string {
  const start = TIME_SLOT_LABELS[slot];
  const end = getSlotEndTime(slot);
  const endHour = end.getHours();
  const endMin = String(end.getMinutes()).padStart(2, "0");
  const displayHour = endHour > 12 ? endHour - 12 : endHour;
  return `${start} – ${displayHour}:${endMin} PM`;
}
