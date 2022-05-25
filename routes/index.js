const router = require('express').Router()
const {
    createCategoryValidator,
    createProductValidator,
    updateProductValidator
} = require('../middlewares/validators')
const { getAllCategories, createNewCategory } = require('../controllers/Category')
const {
    getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/Products')

// ------- Category ----------
router.get('/category', getAllCategories)
router.post('/category', createCategoryValidator, createNewCategory)

// ------- Products ----------
router.get('/products', getAllProducts)
router.get('/products/:id', getSingleProduct)
router.post('/products', createProductValidator, createNewProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router
