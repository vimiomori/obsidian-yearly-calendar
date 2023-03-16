export enum CalClass {
  Yearly = "year-calendar",
}

export enum Selector {
  MonthsContainer = ".months-container",
  MonthContainer = ".month-container"
}

export enum AssignClass {
  QuartersContainer = "quarters-container",
  QuarterContainer = "quarter-container",
  Quarter = "quarter",
  QuarterContent = "quarter-content"
}

export class AssignAttr {
  DataQuarterID = "data-quarter-id"

  static Quarter(val: any) {
    return { DataQuarterID: val }
  }
}
