
document = content:(block *) { return document(content) }

block = header / paragraph


headerSign = ('=' +)

header = sign: headerSign content: (inline +) headerSign {
    return header(content, sign.length)
}

paragraph = content:(inline +) (linesep ?) { return paragraph(content) }

linesep = '\n' ('\n' +)

inline = word / link

character = (! '[') (! '|') (! ']') (! '=') c:. { return c }

word = chars:character+ {return word(chars)}

link = full_link / simple_link / suffix_link / prefix_suffix_link

full_link = '[' def:word '|' w: word ']' { return link(def.content, w) }

simple_link = '[' w: word ']' { return link(w.content, w) }

suffix_link = '[' w: word '|' defSuffix: link_part '|' wordSuffix: link_part ']' {
    return link(concat(w, defSuffix).content, concat(w, wordSuffix))
}

prefix_suffix_link = '[' defPrefix: link_part '|' wordPrefix: link_part '|' w: word '|' defSuffix: link_part '|' wordSuffix: link_part ']' {
    return link(concat(defPrefix, w, defSuffix).content, concat(wordPrefix, w, wordSuffix))
}

link_part = x: (word / '') { if (x ==='') return word([]); else return x;}
