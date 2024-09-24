//  what we reuqire here is model and configuration
const model = require("../model/categories")
const configuration = require("../config/configConnection");
const bodyParser = require("body-parser");
const categories = require("../model/categories");

async function getAllCategories(req, res){
    var connection = await configuration();
     // console.log(connection);
     const [result] = await connection.query('select * from categories');
     return res.status(201).json(result);
 }


 async function createCategories(category){

    var connection = await configuration();
    return await connection.query(`insert into categories(categoryId, categoryName, categoryStock,numberOfProducts,dateCteated) value ('${category.categoryId}','${category.categoryName}','${category.categoryStock}','${category.numberOfProducts}','${category.dateCteated}')`)

    // if (!category ) {
    //     throw new Error('Invalid category data');
    // }
    //   console.log(category)
    

    // const{categoryId, categoryName} = category;
    // // const category = new model(categoryId,categoryName)   
    // // const query = 'INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)';

    // // await connection.execute(query, [category.categoryId, category.categoryName]);
    // const result = await connection.query(`insert into categories values(${categoryId},${categoryName})`);
    // res.status(201).json(result)
    //  return result;  
    // const { categoryId, categoryName } = category;
    // const newCategory = new model(categoryId, categoryName);
    // const query = 'INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)';

    // await connection.execute(query, [newCategory.categoryId, newCategory.categoryName]);
    // res.status(201).send('Category created');
}

async function getCategoryById (req, res){
    try {
        var connection = await configuration();
        const { id } = req.params;
        // console.log(categoryId)
        const [results] = await connection.execute('SELECT * FROM categories WHERE categoryId = ?', [id]);
        console.log(results[0])
        res.json(results[0]);
        
        // if (results.length === 0) {
        //     res.status(404).send('Category not found');
        // } else {
            
        // }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving category');
    }

}

async function deleteCategoryById(req, res){
    try {
        var connection = await configuration();
        const { id } = req.params;
        const query = 'DELETE FROM categories WHERE categoryId = ?';

        const [result] = await connection.execute(query, [id]);
         console.log(result)
        if (result.affectedRows === 0) {
            res.status(404).send('Category not found');
        } else {
            res.json(result)
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting category');
    }
} 

async function updateCategoryById(id,category) {
    try {
        var connection = await configuration();
        // const { id } = req.params;
        // const { categoryName } = req.body;
        console.log("inside updateCategoryById ",category)
        
        const query = 'update categories set categoryName = ?  , categoryStock = ?, numberOfProducts = ?, dateCteated = ? where categoryId = ?';

        const [result] = await connection.execute(query, [ category.categoryName, 
            category.categoryStock, 
            category.numberOfProducts, 
            category.dateCteated,id]);
            console.log(result);
            

    
    } catch (err) {
        console.error(err);
        // res.status(500).send('Error updating category');
    }
}

async function uploadCategoryPicserver(categoryId,categoryImage) {
    console.log("in the uploadCategoryPicserver-crudApis");
    
    const connection= await configuration();
    const response = await connection.query('UPDATE categories set categoryImage = ? where categoryId = ?',
        [categoryImage,categoryId]
    );
    connection.end;
    console.log("response1",response);
    return response;
}

// async function uploadCategory(categoryId,categoryImage) {

//     try {
//         var connection = await configuration();
//         const { id } = req.params;
//         const { categoryName } = req.body;
//         const {image} = categoryImage
//         const query = 'update categories set categoryName = ?  categoryImage = ? where categoryId = ?';

//         const [result] = await connection.execute(query, [categoryName, image, id]);

//         if (result.affectedRows === 0) {
//             res.status(404).send('Category not found');
//         } else {
//             res.send('Category image updated successfully');
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error updating category');
//     }
// }



 async function getCategoriesByName(catName){
    console.log("in getCategoriesByName");
    
    const regexPattern = new RegExp(catName, 'i'); // i : insensitive
    // console.log("Regex Pattern:", regexPattern);
    //  const result = await categories.find({'catName':{ $regex: regexPattern}}).exec();
    //  console.log(result);
    //  return result
    const connection= await configuration();
     try {
        const query = 'SELECT * FROM categories WHERE categoryName LIKE ?';
        const [rows] = await connection.query(query, [`%${catName}%`]);

        // Log the results
        console.log(rows);
        return rows;
        
     } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; 
        
     }
}
 module.exports = {
   
    getAllCategories,
    createCategories,
    getCategoryById,
    deleteCategoryById,
    updateCategoryById,
    uploadCategoryPicserver,
    getCategoriesByName
 }