# Duolang kit

## Purpose
This package is meant to facilitate creation of webpages containing bilingual texts
intended for educational purposes. The words in the text can link to entries
in a dictionary. There should also be a possibility to view the text in a transcription
(for languages that use non-latin scripts).

## Usage
Duolang kit uses a custom ML that is a small subset of WikiText. To mark words
for translation use square brackets:
```
const myText: string = [she|she] [to go|went]
```
Then create a `DlContext` that specifies how to create the links:
```
  const context: DlContext = {
    urlBuilder: new TemplateUrlBuilder('https://pl.wiktionary.com/wiki/{}'),
    transcriber: null,
  }
```
Parse the text and render as html:

```
parse(myText).render(context);
```

## Todo
* Implement transcriptions
* Allow simple links for words already in dictionary form
* Formatting options

