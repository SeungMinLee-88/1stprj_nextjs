
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start:  '2025-04-03T14:00:00',
    end:  '2025-04-03T15:00:00',
    allDay: false
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start:  '2025-04-08T16:00:00',
    end:  '2025-04-08T17:00:00',
    allDay: false
  }
]

export function createEventId() {
  return String(eventGuid++)
}
