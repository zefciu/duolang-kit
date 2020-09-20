
document = content:(block *) { return new Document(content) }

block = paragraph

paragraph = content:(inline +) (linesep ?) { return new Paragraph(content) }

linesep = '\n' ('\n' +)

inline = word / link

character = (! '[') (! '|') (! ']') c:. { return c }

word = chars:character+ {return new Word(chars)}

link = '[' def:word '|' w: word ']' { return new Link(def, w) }