import {DlElement, DlElementType} from "./elements";
import {DlContext} from "./context";

export function render<T>(el: DlElement, context: DlContext<T>): T {
  return context.renderer(el, context);
}

export type renderer<T> = (el: DlElement, context: DlContext<T>) => T

export function basicHTMLRenderer(el: DlElement, context: DlContext<string>): string {

  switch (el.type) {
    case DlElementType.DOCUMENT:
      return el.content.map(child => render(child, context)).join('\n');
    case DlElementType.HEADER:
      const renderedContent = el.content.map(child => render(child, context)).join('');
      return `<h${el.level}>${renderedContent}</h${el.level}>`;
    case DlElementType.LINK:
      return `<a href="${context.urlBuilder(el.linkKey)}">${render(el.word, context)}</a>`
    case DlElementType.PARAGRAPH:
      return '<p>' + el.content.map(child => render(child, context)).join('') + '</p>'
    case DlElementType.WORD:
      return context.transcriber(el.content);
  }

}
