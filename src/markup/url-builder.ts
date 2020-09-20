export type urlBuilder = {
  build: (input: string) => string;
}

export class TemplateUrlBuilder {
  template: string;

  constructor(template: string) {
    this.template = template;
  }

  build(input: string) {
    return this.template.replace(/{}/, input)
  }
}
