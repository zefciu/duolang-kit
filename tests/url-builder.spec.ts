import {templateUrlBuilder} from "../src/markup/url-builder";

test('template builder should interpolate input', () => {
  const builder = templateUrlBuilder('https://pl.wiktionary.org/wiki/{}');
  expect(builder('ყოფნა')).toBe('https://pl.wiktionary.org/wiki/ყოფნა')
})