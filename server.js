
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import routeUser from "./routes/routeUser.js";
import fileUpload from "express-fileupload";
import {fileURLToPath} from "url"
import path from "path";
 

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}))
app.use("/files" , express.static(path.resolve(__dirname , "files")))


app.use( router)
app.use( routeUser)

mongoose
  .connect("mongodb://localhost:27017/products")
  .then(() => {
    console.log("Успешное подключение к БД");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
  });

    // 1 method  2 path      3 handler  4 params
// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//     console.log(products);
//   } catch (error) {
//     console.log("Ошибка при получении продуктов: " + error);
//   }
// });

// app.post("/addproduct", async (req, res) => {
//   const { title, description, price } = req.body;
//   const newProduct = await Product.create({
//     title,
//     description,
//     price,
//   });

//   await newProduct.save();
//   res.send("Продукт успешно добавлен!");
// });

// app.patch("/product/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, price } = req.body;
//     const updateProduct = await Product.findByIdAndUpdate(id, {
//       title,
//       description,
//       price,
//     });

//     if(!updateProduct){
//       res.send("Такого товара не существует!")
//     }

//     res.send("Данные успешно изменены!");
//   } catch (error) {
//     console.log("Ошибка, не удалось выполнить команду: " + error);
    
//   }
// });


// app.put("/product/:id", async (req , res)=>{
//   try{
//     const {id} = req.params
//     const {title , description , price } = req.body

//     const updateProduct = await Product.findByIdAndUpdate(id , {title , description , price} )
    
//   }catch(error){
      
//   }
// })

// app.delete("/deleteproduct/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);

//     const product = await Product.findByIdAndDelete(id);
//     res.send("Продукт успешно удален!");
//   } catch (error) {
//     console.log("Ошибка при удалении продукта: " + error);
//   }
// });

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});
