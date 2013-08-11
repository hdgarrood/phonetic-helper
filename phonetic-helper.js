// MAKE SURE YOU'RE USING UTF8

// This is IPA, RP (as in, proper English).
// Source: https://en.wiktionary.org/wiki/Appendix:English_pronunciation
var phoneticKey = {
    'vowels' : {
        'æ'     : 'c*a*t',
        'æɹ'    : 'c*arr*y',
        'eɪ'    : 'pl*ay*',
        'ɑː'    : 'f*a*ther',
        'ɑː(ɹ)' : '*ar*m',
        'ɛə(ɹ)' : 'h*air*',
        'ɛ'     : 'b*e*d',
        'ɛɹ'    : 'm*err*y',
        'iː'    : '*ea*se',
        'ɪ'     : 'c*i*ty',
        'i'     : 'cit*y*',
        'ɪɹ'    : 's*yr*up',
        'aɪ'    : 'm*y*',
        'ɪə(ɹ)' : 'h*ere*',
        'ɒ'     : 'n*o*t',
        'əʊ'    : 'g*o*',
        'ɔə(ɹ)' : 'gl*or*y',
        'ɔː'    : 'l*aw*',
        'ɔː(ɹ)' : 'h*or*se',
        'ɔɪ'    : 'b*oy*',
        'ʊ'     : 'p*u*t',
        'ʊə(ɹ)' : 'p*oor*',
        'uː'    : 'l*o*se',
        'aʊ'    : 'h*ou*se',
        'ʌ'     : 'r*u*n',
        'ɜː(ɹ)' : 'f*u*r',
        'ə'     : '*a*bout',
        'ə(ɹ)'  : 'ent*er*'
    },

    'consonants' : {
        'b'  : 'e*bb*',
        'tʃ' : '*ch*at',
        'd'  : '*d*ot',
        'f'  : '*f*an',
        'g'  : '*g*et',
        'h'  : '*h*am',
        'ʍ'  : '*wh*ich',
        'dʒ' : '*j*oy',
        'k'  : '*c*at',
        'x'  : 'lo*ch*',
        'l'  : '*l*eft',
        'əl' : 'litt*le',
        'm'  : '*m*an',
        'əm' : 'spa*sm*',
        'n'  : '*n*ote',
        'ən' : 'hidd*en*',
        'ŋ'  : 'ri*ng*',
        'p'  : '*p*en',
        'ɹ'  : '*r*un',
        'r'  : '*r*un',
        's'  : '*s*et',
        'ʃ'  : '*sh*e',
        't'  : '*t*on',
        'θ'  : '*th*in',
        'v'  : '*v*oice',
        'w'  : '*w*et',
        'j'  : '*y*es',
        'z'  : '*z*oo',
        'ʒ'  : 'vi*s*ion'
    }
}

var vowelList = Object.getOwnPropertyNames(phoneticKey.vowels),
    consonantList = Object.getOwnPropertyNames(phoneticKey.consonants),
    soundList = vowelList.concat(consonantList)

function renderWord(word) {
    var parts = word.split('*')
    return parts[0] + '<em>' + parts[1] + '</em>' + parts[2]
}

// Given an IPA word, return an array of individual sounds (or unrecognised
// sounds). Each sound is represented by a 2-element array; if recognised, the
// first element will be "sound"; otherwise, "not-sound". The second element
// will be the sound.
//
//     splitIpaSounds('/taɪreɪd/')
//     => [
//          ['not-sound', '/'],
//          ['sound', 't'],
//          ['sound', 'aɪ']
//          ['sound', 'r'],
//          ['sound', 'eɪ'],
//          ['sound', 'd'],
//          ['not-sound', '/']
//     ]
function splitIpaSounds(ipaWord) {
    var result = [],
        // int: the longest sound we know of (in IPA).
        longestSound = _.max(soundList, function(sound) {
            return sound.length
        }).length,
        // (str, int) -> str: returns the next sound from the beginning of
        // `ipaWord` whose IPA representation is `length` characters long (or
        // `null` if none exists)
        getNextSoundOfLength = function(ipaWord, length) {
            var candidate = ipaWord.slice(0, length)

            if (soundList.indexOf(candidate) > -1) {
                return candidate
            } else {
                return null
            }
        },
        // (str) -> str: returns the next sound from the beginning of `ipaWord`
        // (or `null` if there is none)
        getNextSound = function(ipaWord) {
            for (var length = 1; length <= longestSound; length++) {
                var nextSound = getNextSoundOfLength(ipaWord, length)
                if (nextSound !== null)
                    return nextSound
            }
            return null
        }

    while (ipaWord.length > 0) {
        var nextSound = getNextSound(ipaWord),
            type = 'sound'

        // if no sound found, just take the first char
        if (nextSound === null) {
            type = 'not-sound'
            nextSound = ipaWord[0]
        }

        result.push([type, nextSound])
        ipaWord = ipaWord.slice(nextSound.length)
    }

    return result
}

window.onload = function() {
    $('input#explain').click(function(ev) {
        $('#word-display').text($('input#word')[0].value)
    })
}
