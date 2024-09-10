const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
	filename: String,
	key: String,
	url: String,
})

module.exports = mongoose.model('File', FileSchema)
