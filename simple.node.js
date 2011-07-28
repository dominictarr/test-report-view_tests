
var trv = require('test-report-view')
  , it = require('it-is')
  , Reporter = require('test-report')
  

function log (str) {
  console.log('EXAMPLE TEST REPORT OUTPUT>>>')
  console.log(str)
  console.log('<<<EXAMPLE TEST REPORT OUTPUT END')

}

;(function simple() {
  var reporter = new Reporter ('example')

  reporter.test('test1').test('test2')
  var str = trv.view(reporter.report)
  
  it(str).matches(/example/).matches(/test1/).matches(/test2/)
  
})()

;(function nested() {
  var reporter = new Reporter ('example')

  reporter.test('test1').test('test2').subreport('nested').test('inner')
  var str = trv.view(reporter.report)
  log(str)
  
  it(str).matches(/example/).matches(/test1/).matches(/test2/).matches(/nested/).matches(/inner/)
  
})()

;(function errors() {
  var reporter = new Reporter ('example')
    , err = new Error('EXAMPLE ERROR')
  reporter.test('fail', err)
  var str = trv.view(reporter.report)
  log(str)
  
  it(str).matches(/example/).matches(/fail/)
  it(str.indexOf('Error: EXAMPLE ERROR\n')).notEqual(-1)
  // str contains at least the first line of the error.
  it(str.indexOf(trv.viewError(err).split('\n')[0])).notEqual(-1)
})()
