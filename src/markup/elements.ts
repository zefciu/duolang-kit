import {DlContext} from "./context";

abstract class DlElement {
  abstract render(context: DlContext): string;
}

export class Document extends DlElement {
  content: Array<DlElement>;

  constructor(content: Array<DlElement>) {
    super();
    this.content = content;
  }

  render(context: DlContext): string {
    return this.content.map(v => v.render(context)).join('\n');
  }
}

export class Paragraph extends DlElement {
  content: Array<DlElement>;

  constructor(content: Array<DlElement>) {
    super();
    this.content = content;
  }

  render(context: DlContext): string {
    return '<p>' + this.content.map(v => v.render(context)).join('') + '</p>'
  }
}

export class Word extends DlElement {
  content: string;

  constructor(chars: Array<string>) {
    super();
    this.content = chars.join('');
  }

  render(context: DlContext): string {
    if (context.transcriber !== null) {
      return context.transcriber(this.content);
    }
    return this.content;
  }

}

export class Link extends DlElement {
  linkKey: string;
  word: Word;

  constructor(linkKey: Word, word: Word) {
    super()
    this.linkKey = linkKey.content; // Parsed as a 'Word', but we don’t want it to be transcribed
    this.word = word;

  }

  render(context: DlContext): string {
    return `<a href="${context.urlBuilder.build(this.linkKey)}">${this.word.render(context)}</a>`
  }

}

