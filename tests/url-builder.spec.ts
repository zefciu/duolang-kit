import {TemplateUrlBuilder} from "../src/markup/url-builder";

test('template builder should interpolate input', () => {
  const builder = new TemplateUrlBuilder('https://pl.wiktionary.org/wiki/{}');
  expect(builder.build('ყოფნა')).toBe('https://pl.wiktionary.org/wiki/ყოფნა')
})