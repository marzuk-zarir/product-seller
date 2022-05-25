const { validationResult } = require('express-validator')
const prisma = require('../prisma/client')

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({ include: { category: true } })
        res.json(products)
    } catch (error) {
        next(error)
    }
}

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { category: true }
        })
        if (!product) {
            return res.status(404).json({ msg: 'product not found' })
        }
        res.json(product)
    } catch (error) {
        next(error)
    }
}

exports.createNewProduct = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'validation failed' })
    }

    try {
        const { name, price, categoryId } = req.body
        const newProduct = await prisma.product.create({ data: { name, price, categoryId } })
        res.json(newProduct)
    } catch (error) {
        next(error)
    }
}

exports.updateProduct = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'validation failed' })
    }

    try {
        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
            include: { category: true }
        })
        res.json(product)
    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const isProductExist = await prisma.product.findFirst({
            where: { id: parseInt(req.params.id) }
        })
        if (!isProductExist) {
            return res.status(404).json({ msg: 'product not found' })
        }
        const product = await prisma.product.delete({ where: { id: parseInt(req.params.id) } })
        res.json(product)
    } catch (error) {
        next(error)
    }
}
