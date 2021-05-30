import {DlElement, DlElementType} from "./elements";
import {DlContext} from "./context";

export function render<T, TExtra>(el: DlElement, context: DlContext<T, TExtra>, extras?: TExtra|undefined): T {
  return context.renderer(el, context, extras);
}

export type renderer<T, TExtra> = (el: DlElement, context: DlContext<T, TExtra>, extras?: TExtra|undefined) => T

export function basicHTMLRenderer(el: DlElement, context: DlContext<string, undefined>): string {

  switch (el.type) {
    case DlElementType.DOCUMENT:
      return el.content.map(child => render(child, context)).join('\n');
    case DlElementType.HEADER:
      const renderedContent = el.content.map(child => render(child, context)).join('');
      return `<h${el.level}>${renderedContent}</h${el.level}>`;
    case DlElementType.LINK:
      return `<a href="${context.urlBuilder(el.linkKey)}">${render(el.word, context)}</a>`
    case DlElementType.PARAGRAPH:
      return '<p>' + el.content.map(child => render(child, context)).join('<br>\n') + '</p>'
    case DlElementType.WORD:
      return context.transcriber(el.content);
    case DlElementType.VERSE:
      return el.content.map(child => render(child, context)).join('');
  }
}
