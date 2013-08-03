// MAKE SURE YOU'RE USING UTF8

// This is IPA, RP (as in, proper English).
// Source: https://en.wiktionary.org/wiki/Appendix:English_pronunciation
var phoneticKey = {
    'æ'  : ['b*a*d', 'c*a*t', 'r*a*n'],
    'æɹ' : ['c*arr*y'],
    'eɪ' : ['b*ai*t', 'pl*ay*', 's*a*me'],
    'ɑː' : ['f*a*ther']
}

function renderWord(word) {
    var parts = word.split('*')
    return parts[0] + '<em>' + parts[1] + '</em>' + parts[2]
}

window.onload = function() {
    $('input#word').inputValue('lol')
}
