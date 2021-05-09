
document = content:(block *) { return new Document(content) }

block = header / paragraph


headerSign = ('=' +)

header = sign: headerSign content: (inline +) headerSign {
    return new Header(content, sign.length)
}

paragraph = content:(inline +) (linesep ?) { return new Paragraph(content) }

linesep = '\n' ('\n' +)

inline = word / link

character = (! '[') (! '|') (! ']') (! '=') c:. { return c }

word = chars:character+ {return new Word(chars)}

link = full_link / simple_link / suffix_link / prefix_suffix_link

full_link = '[' def:word '|' w: word ']' { return new Link(def, w) }

simple_link = '[' w: word ']' { return new Link(w, w) }

suffix_link = '[' w: word '|' defSuffix: link_part '|' wordSuffix: link_part ']' {
    return new Link(w.concat(defSuffix), w.concat(wordSuffix))
}

prefix_suffix_link = '[' defPrefix: link_part '|' wordPrefix: link_part '|' w: word '|' defSuffix: link_part '|' wordSuffix: link_part ']' {
    return new Link(defPrefix.concat(w, defSuffix), wordPrefix.concat(w, wordSuffix))
}

link_part = x: (word / '') { if (x ==='') return new Word([]); else return x;}
