import {default as YearCalendar} from "js-year-calendar";
import { CalClass, Selector, AssignClass, AssignAttr } from "./types";
import {
  App, PeriodicNotesPlugin,
} from "obsidian";


// Copied from js-year-calendar library
interface CalendarDataSourceElement {
    /**
     * The name of the element. Used for context menu or specific events.
     */
    name?: string;
    /**
     * The color of the element. This property will be computed automatically if not defined.
     */
    color?: string;
    /**
     * The date of the beginning of the element range.
     */
    startDate: Date;
    /**
     * The date of the end of the element range.
     */
    endDate: Date;
    /**
     * Indicates whether only the half of start day of the element range should be rendered.
     */
    startHalfDay?: boolean;
    /**
     * Indicates whether only the half of last day of the element range should be rendered.
     */
    endHalfDay?: boolean;
}


export default class Calendar<T extends CalendarDataSourceElement> extends YearCalendar<T> {
  periodicNotesPlugin: PeriodicNotesPlugin

  constructor(
    public el: HTMLElement,
    public app: App,
  ) {
    super(el);
    this.periodicNotesPlugin = app.plugins.getPlugin("periodic-notes") as PeriodicNotesPlugin;
    console.log(this.periodicNotesPlugin.calendarSetManager.getCalendarSets())
  }

  init() {
    this.setDisplayWeekNumber(true);
    this.setDisplayHeader(false);
    this.setWeekStart(1);
  }

  displayQuarters() {
    const monthContainers = this.el.querySelectorAll(Selector.MonthContainer);
    const quartersContainer = this.el.createDiv({ cls: [ AssignClass.QuartersContainer ] });

    for ( let i = 0; i < 4; i++) {
      const quarterContainer = quartersContainer.createDiv({ cls: [ AssignClass.QuarterContainer ], attr: AssignAttr.Quarter(i) })
      const quarterDiv = quarterContainer.createDiv( {cls: [ AssignClass.Quarter ]} );
      quarterDiv.createDiv( {cls: [ AssignClass.QuarterContent ], text: `Q${i + 1}` } );
      for (let j = 0; j < 3; j++) {
        quarterContainer.appendChild(monthContainers[(i * 3) + j])
      }
      quartersContainer.appendChild(quarterContainer)
    }

    const monthsContainer = this.el.querySelector(Selector.MonthsContainer);
    monthsContainer?.replaceWith(quartersContainer);
  }
}

