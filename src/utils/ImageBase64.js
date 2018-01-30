let path = require('path')
var fs = require('fs')

exports.getBase64Pic = function (assetsFile) {
  var img = path.join(__dirname, '../assets/' + assetsFile)
  var imageBuf = fs.readFileSync(img)
  console.log('data:image/png;base64,' + imageBuf.toString('base64'))
  return 'data:image/png;base64,' + imageBuf.toString('base64')
}
