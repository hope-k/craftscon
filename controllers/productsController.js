const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const sendError = require('../middleware/sendError');
const Product = require('../')



exports.addProduct = asyncErrorHandler(async () => {
    const { name, price, description, image: uploadedImage } = req.body
    let image;

    let product = await Product.create({
        name,
        price,
        description,
        user: req.user._id
    })
    if (uploadedImage) {
        product = await Product.findOneAndUpdate({ _id: product._id }, { image }, { new: true })
    }
    return res.sendResponse({ product })


})


exports.getAllProducts = asyncErrorHandler(async () => {
    const products = await Product.find({})
    return res.sendResponse({ products })
})

// /api/products/:id => GET
exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
    let product;
    product = await Product.findById(req.params.id)
    if(!product) {
        return next(new sendError(`Product not found with id ${req.params.id}`, 404))
    }
    return res.sendResponse({ product })
})


// /api/products/:id => PUT

exports.editProduct = asyncErrorHandler(async (req, res, next) => {
    let product, image;

    product = await Product.findById(req.params.id)
    if (!product) {
        return next(new sendError('Product not found'))

    }
    if (req.user._id != product.user) {
        return next(new Error('You are not authorized to edit this product'))
    }
    const { name, price, description, image: uploadedImage } = req.body



    product = await Product.findOneAndUpdate({ _id: req.params.id }, { name, price, description }, { new: true })
    if (uploadedImage) {
        product = await Product.findOneAndUpdate({ _id: product._id }, { image }, { new: true })
    }
    return res.sendResponse({ product })
})
// /api/products/:id => DELETE
exports.deleteProduct = asyncErrorHandler(async () => {
    let product;
    product = await Product.findById(req.params.id)
    if (!product) {
        return next(new Error('Product not found'))
    }
    if (req.user._id != product.user) {
        return next(new Error('You are not authorized to delete this product'))
    }
    product = await Product.findByIdAndDelete(req.params.id)
    return res.sendResponse({ product })
})