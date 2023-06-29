const express = require('express')
const router = express.Router()

const {create, getAll, getOne, update, deleteOne} = require('../controllers/jobs')

router.route('/').get(getAll).post(create)
router.route('/:id').get(getOne).patch(update).delete(deleteOne)

module.exports = router