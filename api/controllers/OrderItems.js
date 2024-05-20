const db = require('../models');

const OrderItems = db.Order_Items;

class OrderItemsController {
  // CREATE (создание элемента заказа)
  async createOrderItem(req, res) {
    try {
      const { product_id, order_id, quantity } = req.body;
      const newOrderItem = await OrderItems.create({ product_id, order_id, quantity });
      res.status(201).json(newOrderItem);
    } catch (error) {
      console.error('Ошибка при создании элемента заказа:', error);
      res.status(500).json({ error: 'Ошибка при создании элемента заказа' });
    }
  }

  // READ (получение всех элементов заказа)
  async getAllOrderItems(req, res) {
    try {
      const allOrderItems = await OrderItems.findAll();
      res.json(allOrderItems);
    } catch (error) {
      console.error('Ошибка при получении всех элементов заказа:', error);
      res.status(500).json({ error: 'Ошибка при получении всех элементов заказа' });
    }
  }

  // READ (получение элемента заказа по идентификатору)
  async getOrderItemById(req, res) {
    try {
      const itemId = req.query.id;
      const orderItem = await OrderItems.findByPk(itemId);
      if (!orderItem) {
        res.status(404).json({ error: 'Элемент заказа не найден' });
        return;
      }
      res.json(orderItem);
    } catch (error) {
      console.error('Ошибка при получении элемента заказа по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении элемента заказа по идентификатору' });
    }
  }

  // UPDATE (обновление элемента заказа)
  async updateOrderItem(req, res) {
    try {
      const itemId = req.query.id;
      const { product_id, order_id, quantity } = req.body;
      const orderItem = await OrderItems.findByPk(itemId);
      if (!orderItem) {
        res.status(404).json({ error: 'Элемент заказа не найден' });
        return;
      }
      await orderItem.update({ product_id, order_id, quantity });
      res.json(orderItem);
    } catch (error) {
      console.error('Ошибка при обновлении элемента заказа:', error);
      res.status(500).json({ error: 'Ошибка при обновлении элемента заказа' });
    }
  }

  // DELETE (удаление элемента заказа)
  async deleteOrderItem(req, res) {
    try {
      const itemId = req.query.id;
      const orderItem = await OrderItems.findByPk(itemId);
      if (!orderItem) {
        res.status(404).json({ error: 'Элемент заказа не найден' });
        return;
      }
      await orderItem.destroy();
      res.json({ message: 'Элемент заказа успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении элемента заказа:', error);
      res.status(500).json({ error: 'Ошибка при удалении элемента заказа' });
    }
  }
}

module.exports = OrderItemsController;
