// MAKE SURE YOU'RE USING UTF8

// This is IPA, RP (as in, proper English).
// Source: https://en.wiktionary.org/wiki/Appendix:English_pronunciation
var phoneticKey = {
    'æ'  : 'c*a*t',
    'æɹ' : 'c*arr*y',
    'eɪ' : 'pl*ay*',
    'ɑː' : 'f*a*ther',
    'a'  : 'a',
    's'  : 's',
    'd'  : 'd',
    'f'  : 'f'
}

function renderWord(word) {
    var parts = word.split('*')
    return parts[0] + '<em>' + parts[1] + '</em>' + parts[2]
}

window.onload = function() {
    $('input#explain').click(function(ev) {
        $('#word-display').text($('input#word')[0].value)
    })
}
