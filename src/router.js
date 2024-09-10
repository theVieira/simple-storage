const multer = require('multer')
const multerConfig = require('./config/multer')
const { exec } = require('node:child_process')
const File = require('./models/File')
const { resolve } = require('node:path')

const STORAGE_URL = process.env.STORAGE_URL

const router = require('express').Router()

router.get('/', async (req, res) => {
	try {
		const files = await File.find()

		res.json(files)
	} catch (error) {
		if (error instanceof Error) {
			res.json({ error: error.message })
		}
	}
})

router.get('/download/:id', async (req, res) => {
	try {
		const { id } = req.params

		const file = await File.findById(id)

		res.sendFile(resolve(__dirname, '..', 'uploads', file.key))
	} catch (error) {
		if (error instanceof Error) {
			res.json({ error: error.message })
		}
	}
})

router.post('/', multer(multerConfig).single('file'), async (req, res) => {
	try {
		const { originalname, filename } = req.file

		await File.create({
			filename: originalname,
			key: filename,
			url: `${STORAGE_URL}/${filename}`,
		})
			.then((val) => res.json(val))
			.catch((err) => res.json(err))
	} catch (error) {
		if (error instanceof Error) {
			res.json({ error: error.message })
		}
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const file = await File.findByIdAndDelete(id)

		exec(`rm ${resolve(__dirname, '..', 'uploads')}/${file.key}`)

		res.sendStatus(204)
	} catch (error) {
		if (error instanceof Error) {
			res.json({ error: error.message })
		}
	}
})

module.exports = router
