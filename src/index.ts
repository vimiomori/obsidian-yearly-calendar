import {
  App,
  MarkdownPostProcessorContext,
  MarkdownRenderChild,
  Plugin,
} from "obsidian";

import { createCalendar } from "./parser";


export default class CalPlugin extends Plugin {

  async onload(): Promise<void> {
    this.registerMarkdownCodeBlockProcessor("cal", async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      ctx.addChild(new InlineCalendar(el, this.app));
    })
  }
}

class InlineCalendar extends MarkdownRenderChild {
  constructor(
    public el: HTMLElement,
    public app: App,
  ) {
    super(el);
  }
  async onload() {
    const cal = createCalendar(this.el, this.app);
    this.el.replaceWith(cal);
  }
}
