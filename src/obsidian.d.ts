import type { Moment } from "moment";
import "obsidian";


// These types are copied from Obsidian-Periodic-Notes
// https://github.com/liamcain/obsidian-periodic-notes

declare module "obsidian" {
  interface IWeeklyNoteOptions {
    weeklyNoteFormat: string;
    weeklyNoteFolder: string;
    weeklyNoteTemplate: string;
  }
  export type IPeriodicity = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  export type Granularity =
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year"; /*| "fiscal-year" */

  export interface PeriodicConfig {
    enabled: boolean;
    openAtStartup: boolean;
  
    format: string;
    folder: string;
    templatePath?: string;
  }

  export interface CalendarSet {
    id: string;
    ctime: string;
  
    day?: PeriodicConfig;
    week?: PeriodicConfig;
    month?: PeriodicConfig;
    quarter?: PeriodicConfig;
    year?: PeriodicConfig;
    fiscalYear?: PeriodicConfig;
  }

  interface IOpenOpts {
    inNewSplit?: boolean;
    calendarSet?: string;
  }

  export class CalendarPlugin extends Plugin {
    options: IWeeklyNoteOptions;
  }
  export class CalendarSetManager {
    getActiveId(): string;
    getActiveSet(): CalendarSet;
    getFormat(granularity: Granularity): string 
    getActiveConfig(granularity: Granularity): PeriodicConfig 
    getCalendarSets(): CalendarSet[] 
    getInactiveGranularities(): Granularity[] 
    getActiveGranularities(): Granularity[] 
    renameCalendarset(calendarSetId: string, proposedName: string): void 
  }

  export type MatchType = "filename" | "frontmatter" | "date-prefixed";

  export interface PeriodicNoteMatchMatchData {
    /* where was the date found */
    matchType: MatchType;
    /* XXX: keep ZK matches in the cache, should this be separate from formats with HH:mm in them? */
    /* just collect this for now, not 100% sure how it will be used. */
    exact: boolean;
    // other ideas of match data:
    // - filename without date (unparsed tokens)
    // - time?: string
  }

  export interface PeriodicNoteCachedMetadata {
    calendarSet: string;
    filePath: string;
    date: Moment;
    granularity: Granularity;
    canonicalDateStr: string;
  
    /* "how" the match was made */
    matchData: PeriodicNoteMatchMatchData;
  }

  export class PeriodicNotesPlugin extends Plugin {
    calendarSetManager: CalendarSetManager;
    createPeriodicNote(granularity: Granularity, date: Moment): Promise<TFile>
    getPeriodicNote(granularity: Granularity, date: Moment): TFile | null 
    getPeriodicNotes(granularity: Granularity, date: Moment, includeFinerGranularities: boolean): PeriodicNoteCachedMetadata[] 
    openPeriodicNote(granularity: Granularity, date: Moment, opts?: IOpenOpts): Promise<void> 
  }

  export interface Workspace extends Events {
    on(
      name: "periodic-notes:settings-updated",
      callback: () => void,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      ctx?: any
    ): EventRef;
    on(
      name: "periodic-notes:resolve",
      callback: () => void,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      ctx?: any
    ): EventRef;
  }

  interface CommandManager {
    removeCommand(commandName: string): void;
  }

  interface MarkdownView {
    onMarkdownFold(): void;
  }

  interface MarkdownSubView {
    applyFoldInfo(foldInfo: FoldInfo): void;
    getFoldInfo(): FoldInfo | null;
  }

  interface Editor {
    cm: CodeMirror.Editor;
  }

  interface EditorSuggestManager {
    suggests: EditorSuggest<unknown>[];
  }

  interface VaultSettings {
    legacyEditor: boolean;
    foldHeading: boolean;
    foldIndent: boolean;
    rightToLeft: boolean;
    readableLineLength: boolean;
    tabSize: number;
    showFrontmatter: boolean;

    // // XXX: Added from Periodic Notes
    // localeOverride: ILocaleOverride;
    // weekStart: IWeekStartOption;
  }

  interface FoldPosition {
    from: number;
    to: number;
  }

  interface FoldInfo {
    folds: FoldPosition[];
    lines: number;
  }

  export interface FoldManager {
    load(file: TFile): Promise<FoldInfo>;
    save(file: TFile, foldInfo: FoldInfo): Promise<void>;
  }

  // interface Chooser<T> {
  //   useSelectedItem(evt: KeyboardEvent): void;
  //   setSuggestions(suggestions: T[]);
  // }

  interface Vault {
    config: Record<string, unknown>;
    getConfig<T extends keyof VaultSettings>(setting: T): VaultSettings[T];
    setConfig<T extends keyof VaultSettings>(setting: T, value: any): void;
  }

  export interface PluginInstance {
    id: string;
  }

  export interface DailyNotesSettings {
    autorun?: boolean;
    format?: string;
    folder?: string;
    template?: string;
  }

  class DailyNotesPlugin implements PluginInstance {
    id: string;
    options?: DailyNotesSettings;
  }

  export interface ViewRegistry {
    viewByType: Record<string, (leaf: WorkspaceLeaf) => unknown>;
    isExtensionRegistered(extension: string): boolean;
  }

  export interface App {
    commands: CommandManager;
    foldManager: FoldManager;
    internalPlugins: InternalPlugins;
    plugins: CommunityPluginManager;
    viewRegistry: ViewRegistry;
  }

  type PluginId = "nldates-obsidian" | "calendar" | string;

  export interface CommunityPluginManager {
    getPlugin(id: PluginId): Plugin;
  }

  export interface InstalledPlugin {
    disable: (onUserDisable: boolean) => void;
    enabled: boolean;
    instance: PluginInstance;
  }

  export interface InternalPlugins {
    plugins: Record<string, InstalledPlugin>;
    getPluginById(id: string): InstalledPlugin;
  }

}
