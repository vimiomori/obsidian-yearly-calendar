import Calendar from "./calendar"
import { CalClass } from "./types";

export function createCalendar(el: HTMLElement): HTMLDivElement{
  const calendarDiv = el.createDiv({
    cls: [CalClass.Yearly],
  });
  const calendar = new Calendar(el);
  calendar.init();
  calendar.displayQuarters();
  return calendarDiv
}
