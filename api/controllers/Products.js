const db = require('../models');
const Products = db.Products;

class ProductsController {
  async createProduct(req, res) {
    try {
      const { product_name, price, description } = req.body;
      const newProduct = await Products.create({ product_name, price, description });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
      res.status(500).json({ error: 'Ошибка при создании продукта' });
    }
  }

  // READ (получение всех продуктов)
  async getAllProducts(req, res) {
    try {
      const allProducts = await Products.findAll();
      res.json(allProducts);
    } catch (error) {
      console.error('Ошибка при получении всех продуктов:', error);
      res.status(500).json({ error: 'Ошибка при получении всех продуктов' });
    }
  }

  // READ (получение продукта по идентификатору)
  async getProductById(req, res) {
    try {
      const productId = req.query.id;
      const product = await Products.findByPk(productId);
      if (!product) {
        res.status(404).json({ error: 'Продукт не найден' });
        return;
      }
      res.json(product);
    } catch (error) {
      console.error('Ошибка при получении продукта по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении продукта по идентификатору' });
    }
  }

  // UPDATE (обновление продукта)
  async updateProduct(req, res) {
    try {
      const productId = req.query.id;
      const { product_name, price, description } = req.body;
      const product = await Products.findByPk(productId);
      if (!product) {
        res.status(404).json({ error: 'Продукт не найден' });
        return;
      }
      await product.update({ product_name, price, description });
      res.json(product);
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      res.status(500).json({ error: 'Ошибка при обновлении продукта' });
    }
  }

  // DELETE (удаление продукта)
  async deleteProduct(req, res) {
    try {
      const productId = req.query.id;
      const product = await Products.findByPk(productId);
      if (!product) {
        res.status(404).json({ error: 'Продукт не найден' });
        return;
      }
      await product.destroy();
      res.json({ message: 'Продукт успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      res.status(500).json({ error: 'Ошибка при удалении продукта' });
    }
  }
}
module.exports = ProductsController;
