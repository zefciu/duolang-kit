import {parse} from "../src/markup/grammar";
import {Document} from "../src/markup/elements";
import {DlContext} from "../src/markup/context";
import {TemplateUrlBuilder} from "../src/markup/url-builder";

test('Should parse a full link', () => {
  const text: Document = parse('[ყოფნა|ვარ]') as Document;
  expect(text).toBeInstanceOf(Document);
  const context: DlContext = {
    urlBuilder: new TemplateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
    transcriber: null,
  };
  expect(text.render(context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/ყოფნა">ვარ</a></p>')
});

test('Should parse a simple link', () => {
  const text: Document = parse('[მაშინ]') as Document;
  expect(text).toBeInstanceOf(Document);
  const context: DlContext = {
    urlBuilder: new TemplateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
    transcriber: null,
  };
  expect(text.render(context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/მაშინ">მაშინ</a></p>')
});

test('Should parse a suffix link', () => {
  const text: Document = parse('[მთვარ|ე|ის]') as Document;
  expect(text).toBeInstanceOf(Document);
  const context: DlContext = {
    urlBuilder: new TemplateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
    transcriber: null,
  };
  expect(text.render(context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/მთვარე">მთვარის</a></p>');
});

test('Should parse a prefix-suffix link', () => {
  const text: Document = parse('[გა|გაა|კეთებ|ა|ს]') as Document;
  expect(text).toBeInstanceOf(Document);
  const context: DlContext = {
    urlBuilder: new TemplateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
    transcriber: null,
  };
  expect(text.render(context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/გაკეთება">გააკეთებს</a></p>');
});
