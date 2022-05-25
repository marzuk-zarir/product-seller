const { validationResult } = require('express-validator')
const prisma = require('../prisma/client')

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({ include: { products: true } })
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

exports.createNewCategory = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'validation failed' })
    }

    try {
        const newCategory = await prisma.category.create({ data: { name: req.body.name } })
        res.json(newCategory)
    } catch (error) {
        next(error)
    }
}
