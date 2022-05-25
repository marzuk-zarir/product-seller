const { body } = require('express-validator')
const prisma = require('../prisma/client')

exports.createCategoryValidator = [
    body('name')
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 20 })
        .custom(async (name) => {
            try {
                const isCategoryUnique = await prisma.category.findFirst({ where: { name } })
                if (isCategoryUnique) {
                    throw Error()
                }
                return name
            } catch (error) {
                throw Error(error)
            }
        })
]

exports.createProductValidator = [
    body('name').trim().notEmpty().isLength({ min: 5, max: 50 }),
    body('price').notEmpty().isNumeric(),
    body('categoryId')
        .notEmpty()
        .custom(async (id) => {
            try {
                const isCategoryExist = await prisma.category.findUnique({ where: { id } })
                if (!isCategoryExist) {
                    throw Error()
                }
                return id
            } catch (error) {
                throw Error(error)
            }
        })
]
