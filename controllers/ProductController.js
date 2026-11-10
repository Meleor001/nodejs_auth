import Product from "../models/Product.js";
import fileService from "../middleware/fileService.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
      console.log(products);
    } catch (error) {
      console.log("Ошибка при получении продуктов: " + error);
    }
  }

  async addProduct(req, res) {
    try {
      let fileName = null;

      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
        if (!fileName) {
          return res.send("Ошибка при добавлении файла ", fileName);
        }
      }

      const { title, description, price } = req.body;
      const newProduct = await Product.create({
        title,
        description,
        price,
        image: fileName,
      });

      await newProduct.save();
      res.send("Продукт успешно добавлен!");
    } catch (error) {
      console.log("Ошибка при добавлении продукта: " + error);
    }
  }
}

export default new ProductController();
