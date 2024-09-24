const productModel = require("../model/Products")
const configuration= require("../config/configConnection")

async function getAllProducts(req, res){
    var connection = await configuration();
     // console.log(connection);
     const [result] = await connection.query('select * from products');
     return res.status(201).json(result);
 }


 async function createProducts(product){

    var connection = await configuration();
    return await connection.query(`insert into products(productName,category,categoryId,price) value ('${product.productName}', '${product.category}','${product.categoryId}','${product.price}')`)
//productName,category,categoryId,price,images
    // if (!product ) {
    //     throw new Error('Invalid product data');
    // }
    //   console.log(product)
    

    // const{productId, product_name} = product;
    // // const product = new model(productId,product_name)   
    // // const query = 'INSERT INTO products (productId, product_name) VALUES (?, ?)';

    // // await connection.execute(query, [product.productId, product.product_name]);
    // const result = await connection.query(`insert into products values(${productId},${product_name})`);
    // res.status(201).json(result)
    //  return result;  
    // const { productId, product_name } = product;
    // const newproduct = new model(productId, product_name);
    // const query = 'INSERT INTO products (productId, product_name) VALUES (?, ?)';

    // await connection.execute(query, [newproduct.productId, newproduct.product_name]);
    // res.status(201).send('product created');
}

async function getProductById (req, res){
    try {
        var connection = await configuration();
        const { id } = req.params;
        // console.log(productId)
        const [results] = await connection.execute('SELECT * FROM products WHERE productId = ?', [id]);

        if (results.length === 0) {
            res.status(404).send('product not found');
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving product');
    }

}

async function deleteProductById(req, res){
    try {
        var connection = await configuration();
        const { id } = req.params;
        const query = 'DELETE FROM products WHERE productId = ?';

        const [result] = await connection.execute(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).send('product not found');
        } else {
            res.send('product deleted');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
} 

async function updateProductById(req,res) {
    try {
        var connection = await configuration();
        const { id } = req.params;
        const {  productName,category,categoryId,price,images} = req.body;
        const query = 
        `update products 
         set 
        productName=?,
         category= ? 
         categoryId =?
         price=?
         images=?
        where productId = ?;`
        

        const [result] = await connection.execute(query, [ productName,category,categoryId,price,images, id]);

        if (result.affectedRows === 0) {
            res.status(404).send('product not found');
        } else {
            res.send('product updated');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating product');
    }
}
module.exports = {
    getAllProducts,
    createProducts,
    getProductById,
    deleteProductById,
    updateProductById
}