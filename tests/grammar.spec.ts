import {parse} from "../src/markup/grammar";
import * as util from "util";
import {DlContext} from "../src/markup/context";
import {templateUrlBuilder} from "../src/markup/url-builder";
import {basicHTMLRenderer, render} from "../src/markup/renderer";
import {DlElement} from "../src/markup/elements";
import {identity} from "../src/markup/transcriber";

const context = {
  urlBuilder: templateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
  transcriber: identity,
  renderer: basicHTMLRenderer,
}

test('Should parse a full link', () => {
  const text = parse('[ყოფნა|ვარ]');
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/ყოფნა">ვარ</a></p>')
});

test('Should parse a simple link', () => {
  const text = parse('[მაშინ]');
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/მაშინ">მაშინ</a></p>')
});

test('Should parse a suffix link', () => {
  const text = parse('[მთვარ|ე|ის]');
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/მთვარე">მთვარის</a></p>');
});

test('Should parse a suffix link with empty display', () => {
  const text = parse('[ამდენ|ი|]') ;
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/ამდენი">ამდენ</a></p>');
});

test('Should parse a suffix link with empty definition', () => {
  const text = parse('[წინდა||ს]') ;
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/წინდა">წინდას</a></p>');
});

test('Should parse a prefix-suffix link', () => {
  const text = parse('[გა|გაა|კეთებ|ა|ს]') ;
  expect(render(text, context)).toBe('<p><a href="https://pl.wiktionary.com/wiki/გაკეთება">გააკეთებს</a></p>');
});

test('Should render a header', () => {
  const text = parse('==[და|დამი|სხ|მა|ი] [სმა|დამალევინე]==') ;
  expect(render(text, context)).toBe('<h2><a href="https://pl.wiktionary.com/wiki/დასხმა">დამისხი</a> <a href="https://pl.wiktionary.com/wiki/სმა">დამალევინე</a></h2>');
});

test('Should render a simple header', () => {
  const text = parse('==dupa==') ;
  expect(render(text, context)).toBe('<h2>dupa</h2>');
});

test('Should render a paragraph', () => {
  const text = parse(`ერთი
ორი

სამი`) ;
  expect(render(text, context)).toBe(`<p>ერთი<br>
ორი</p>
<p>სამი</p>`);
});
