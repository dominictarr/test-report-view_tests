
var it = require ('it-is')
  , trv = require ('test-report-view')
  , errors = [
      null
    , 7
    , Math.random()
    , true
    , false
    , NaN
    , undefined
    , {}
    , function(){}
    , catchError(function () {
        (null).x = 7 //type error
      })
    , catchError(function () {
        'onehu'() //type error
      })
    , catchError(function stackOverFlow() {
        stackOverFlow()
      })
    , {error: 'not_found', reason: 'this is a couch error'}
    , new Error('EXAMPLE ERROR')
    ]
  
function catchError(funx) {
  try { funx() } catch (err) { return err }
  throw new Error( 'expected funx to throw' )
}

errors.forEach(function (e){
  var str = trv.viewError(e)
  console.log('example error output:', str)
  it(str).ok().typeof('string')
  if('string' !== typeof e) {
    if(/\[object( \w+)?\]/(str))
      throw Error(str + ' should not match: /\[object( \w+)?\]/')
  }
})