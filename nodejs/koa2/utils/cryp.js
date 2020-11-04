const cryp = require('crypto')

const SCERET_KEY = 'jiasuola_1'

function md5(content) {
	let md5 = cryp.createHash('md5')
	return md5.update(content).digest('hex')
}

function genPassword (password) {
	const str = `password=${password}&key=${SCERET_KEY}`
	return md5(str)
}

module.exports = {
	genPassword
}