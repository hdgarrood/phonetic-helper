test('renderWord', function() {
    equal(renderWord('f*a*ther'), 'f<em>a</em>ther'),
    equal(renderWord('g*o*'),     'g<em>o</em>'),
    equal(renderWord('*ar*m'),    '<em>ar</em>m')
})

test('splitIpaSounds', function() {
     deepEqual(
         [
             ['not-sound' , '/']  ,
             ['sound'     , 't']  ,
             ['sound'     , 'aɪ'] ,
             ['sound'     , 'r']  ,
             ['sound'     , 'eɪ'] ,
             ['sound'     , 'd']  ,
             ['not-sound' , '/']
         ],
         splitIpaSounds('/taɪreɪd/')
         )
})
