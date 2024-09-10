const multer = require('multer')
const { resolve } = require('node:path')
const { randomBytes } = require('node:crypto')

module.exports = {
	dest: resolve(__dirname, '..', '..', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, resolve(__dirname, '..', '..', 'uploads'))
		},
		filename: (req, file, cb) => {
			randomBytes(16, (error, hash) => {
				if (error) cb(new Error(error))

				const filename = `${hash.toString('hex')}-${file.originalname}`

				cb(null, filename)
			})
		},
	}),
	limits: {
		fileSize: 4 * 1024 * 1024, // 4 MB
	},
	fileFilter: (req, file, cb) => {
		const allowedMimetypes = [
			'image/jpg',
			'image/png',
			'image/gif',
			'application/pdf',
		]

		if (allowedMimetypes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('file type error'), false)
		}
	},
}
