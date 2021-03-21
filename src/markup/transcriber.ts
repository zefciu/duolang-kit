export type transcriber = (input: string) => string


interface TranscriberProvider {
  get(): transcriber
}


interface StringMap {
  [k: string]: string
}


class LetterByLetterTranscriberProvider implements TranscriberProvider {

  map: StringMap;

  constructor(map: StringMap) {
    this.map = map;
  }

  public get() {
    return this.transcribe;
  }

  public transcribe = (input: string) => {
    const get = (k: string) => {
      const v = this.map[k];
      return v === undefined ? k : v;
    };
    return input.split('').map((c: string) => get(c)).join('');
  }
}

export const polish_transcriber = new LetterByLetterTranscriberProvider({
    'ა': 'a',
    'ბ': 'b',
    'გ': 'g',
    'დ': 'd',
    'ე': 'e',
    'ვ': 'w',
    'ზ': 'z',
    'თ': 't',
    'ი': 'i',
    'კ': 'k’',
    'ლ': 'l',
    'მ': 'm',
    'ნ': 'n',
    'ო': 'o',
    'პ': 'p’',
    'ჟ': 'ż',
    'რ': 'r',
    'ს': 's',
    'ტ': 't’',
    'უ': 'u',
    'ფ': 'p',
    'ქ': 'k',
    'ღ': 'gh',
    'ყ': 'q',
    'შ': 'sz',
    'ჩ': 'cz',
    'ც': 'c',
    'ძ': 'dz',
    'წ': 'c’',
    'ჭ': 'cz’',
    'ხ': 'ch',
    'ჯ': 'dż',
    'ჰ': 'h',
  }
).get();
