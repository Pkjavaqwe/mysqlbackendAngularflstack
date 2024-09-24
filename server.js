const express = require("express")
const bodyParser = require("body-parser");
const serverApp = require("./apis/crudApis")
const serverAppProduct = require("./apis/ProductApis")
const cors = require("cors")
const multer = require("multer")
// const mysql = require('mysql2/promise.js')
const{getCategoriesByName,getAllCategories,createCategories,uploadCategoryPicserver,getCategoryById,deleteCategoryById,updateCategoryById} = serverApp
const{getAllProducts, createProducts,getProductById,deleteProductById,updateProductById} =serverAppProduct
const expressApp = express()
expressApp.use(express.json());
expressApp.use(cors())
expressApp.listen(8080, (error)=>{
    if(error)
        console.log("something went wrong");
        else
        console.log("application server started... on port 8080")

})

expressApp.use(express.urlencoded({extended: true}));
expressApp.use(express.json());

expressApp.get('/categories/getall',getAllCategories)

expressApp.post('/categories/add',async function(req,res){
    try {
        console.log(req.body);
    var requestBody = req.body
    const data=await createCategories(requestBody);
    res.status(201).json(data);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
})

expressApp.get('/categories/get/:id',getCategoryById );
expressApp.get('/categories/getByName/:catName',async function(request,response) {
    const data = await getCategoriesByName(request.params.catName)
    response.send(data);
} );

expressApp.delete('/categories/delete/:id',deleteCategoryById );
expressApp.put('/categories/update/:id', async function(request, response){
    // console.log("from client:", request.body); 
    console.log("request",request.body);
     const {categoryName}=request.body;
    console.log("recategoryNamequest",categoryName);
     const reqbody = request.body
     const data=await updateCategoryById(request.params.id ,reqbody);
     response.send(data);
 });
// expressApp.put('/categories/update/:id',updateCategoryById );
const upload = multer()

expressApp.put("/categories/fileupload/:categoryId",upload.single("categoryImage"),async function(req,res){
    console.log("in file upload");
    
    const data = await uploadCategoryPicserver(req.params.categoryId,req.file.buffer);
    console.log(data);
    res.send(data);
})
// expressApp.put('/categories/upload/:id',upload.single('categoryImage'),async function (req,res) {
//     console.log(req.params.empId);
//           console.log(req)
//           console.log(req.file)
//           const data = await uploadEmployee(req.params.empId,req.file.buffer)
//           console.log(data)
//           res.send(data)
// } );

   


expressApp.get('/products/getall',getAllCategories)
expressApp.post('/products/add',async function(req,res){
    try {
        console.log(req.body);
    var requestBody = req.body
    const data=await createProducts(requestBody);
    res.status(201).json(data);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
})

expressApp.get('/products/get/:id',getProductById );
expressApp.delete('/products/delete/:id',deleteProductById );
expressApp.put('/products/update/:id',updateProductById );

