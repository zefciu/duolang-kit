export type urlBuilder = (input: string) => string;


export function templateUrlBuilder(template: string) {
  return (input: string) => template.replace(/{}/, input)
}
