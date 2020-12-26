import {polish_transcriber} from "../src/markup/transcriber";

test('Should transcribe a text', () => {
  const input = `რომელმან შექმნა სამყარო ძალითა მით ძლიერითა,
ზეგარდმო არსნი სულითა ყვნა ზეცით მონაბერითა,
ჩვენ, კაცთა, მოგვცა ქვეყანა, გვაქვს უთვალავი ფერითა,
მისგან არს ყოვლი ხელმწიფე სახითა მის მიერითა.`
  const output = `romelman szekmna samqaro dzalita mit dzlierita,
zegardmo arsni sulita qwna zecit monaberita,
czwen, k’acta, mogwca kweqana, gwakws utwalawi perita,
misgan ars qowli chelmc’ipe sachita mis mierita.`
  expect(polish_transcriber(input)).toBe(output);
});
