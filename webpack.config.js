module.exports = function(env, argv) {
	return argv.mode === 'production' ?
		require('./webpack.production') :
		require('./webpack.development')
}