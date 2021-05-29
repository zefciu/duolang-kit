export enum DlElementType {
  DOCUMENT,
  PARAGRAPH,
  WORD,
  LINK,
  HEADER,
  VERSE
}


export type DlElement = {
  type: DlElementType.DOCUMENT | DlElementType.PARAGRAPH | DlElementType.VERSE
  content: DlElement[],
} | {
  type: DlElementType.WORD,
  content: string
}  | {
  type: DlElementType.LINK,
  linkKey: string,
  word: DlElement,
} | {
  type: DlElementType.HEADER,
  level: number,
  content: DlElement[],
}

export interface Word {
  content: string
}

export function document(content: DlElement[]): DlElement {
  return {type: DlElementType.DOCUMENT, content}
}

export function header(content: DlElement[], level: number): DlElement {
  return {type: DlElementType.HEADER, content: content, level: level}
}

export function link(linkKey: string, word: DlElement): DlElement {
  return {
    type: DlElementType.LINK,
    linkKey: linkKey, // Parsed as a 'Word', but we don’t want it to be transcribed
    word: word,
  }
}

export function paragraph(content: DlElement[]): DlElement {
  return {
    type: DlElementType.PARAGRAPH,
    content: content
  };
}

export function verse(content: DlElement[]): DlElement {
  return {
    type: DlElementType.VERSE,
    content: content
  };
}

export function word(content: (string| string[])): (DlElement & Word) {
  if (Array.isArray(content)) {
    content = content.join('');
  }
  return {
    type: DlElementType.WORD,
    content: content,
  }
}

export function concat(...elements: Word[]): (DlElement & Word) {
  return word(elements.map((el) => el.content));
}