import Calendar from "./calendar"
import { CalClass } from "./types";
import {
  App,
} from "obsidian";

export function createCalendar(el: HTMLElement, app: App): HTMLDivElement{
  const calendarDiv = el.createDiv({
    cls: [CalClass.Yearly],
  });
  const calendar = new Calendar(calendarDiv, app);
  calendar.init();
  calendar.displayQuarters();
  return calendarDiv
}
