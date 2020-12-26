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

  constructor(content: Array<string> | string) {
    super();
    if (content instanceof Array) {
      this.content = content.join('');
    } else {
      this.content = content;
    }
  }

  render(context: DlContext): string {
    if (context.transcriber !== null) {
      return context.transcriber(this.content);
    }
    return this.content;
  }

  concat(...words: Word[]): Word {
    return new Word(this.content.concat(...words.map(w => w.content)));
  }

}

export class Link extends DlElement {
  linkKey: string;
  word: Word;

  constructor(linkKey: Word, word: Word) {
    super();
    this.linkKey = linkKey.content; // Parsed as a 'Word', but we don’t want it to be transcribed
    this.word = word;

  }

  render(context: DlContext): string {
    return `<a href="${context.urlBuilder.build(this.linkKey)}">${this.word.render(context)}</a>`
  }
}

export class Header extends DlElement {
  content: Array<DlElement>;
  level: number;

  constructor(content: Array<DlElement>, level: number) {
    super();
    this.content = content;
    this.level = level;
  }

  render(context: DlContext): string {
    const content: string = (this.content.map(el => el.render(context))).join('');
    return `<h${this.level}>${content}</h${this.level}>`;
  }

}

