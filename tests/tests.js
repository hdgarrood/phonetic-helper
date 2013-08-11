test('rendering words', function() {
    equal('f<em>a</em>ther', renderWord('f*a*ther')),
    equal('g<em>o</em>',     renderWord('g*o*')),
    equal('<em>ar</em>m',    renderWord('*ar*m'))
})
