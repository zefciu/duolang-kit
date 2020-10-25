
document = content:(block *) { return new Document(content) }

block = paragraph

paragraph = content:(inline +) (linesep ?) { return new Paragraph(content) }

linesep = '\n' ('\n' +)

inline = word / link

character = (! '[') (! '|') (! ']') c:. { return c }

word = chars:character+ {return new Word(chars)}

link = full_link / simple_link / suffix_link / prefix_suffix_link

full_link = '[' def:word '|' w: word ']' { return new Link(def, w) }

simple_link = '[' w: word ']' { return new Link(w, w) }

suffix_link = '[' w: word '|' defSuffix: word '|' wordSuffix: word ']' {
    return new Link(w.concat(defSuffix), w.concat(wordSuffix))
}

prefix_suffix_link = '[' defPrefix: word '|' wordPrefix: word '|' w: word '|' defSuffix: word '|' wordSuffix: word ']' {
    return new Link(defPrefix.concat(w, defSuffix), wordPrefix.concat(w, wordSuffix))
}
