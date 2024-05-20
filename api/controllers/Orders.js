const db = require('../models');

const Orders = db.Orders;
const OrderItems = db.Order_Items;
const Clients = db.Clients;
const Products = db.Products;
const { Op } = require('sequelize');

class OrdersController {
  // CREATE (создание заказа)
  async createOrder(req, res) {
    try {
      const { order_datetime, order_status, client_id } = req.body;
      const newOrder = await Orders.create({ order_datetime, order_status, client_id });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      res.status(500).json({ error: 'Ошибка при создании заказа' });
    }
  }

  // READ (получение всех заказов)
  async getAllOrders(req, res) {
    try {
      const allOrders = await Orders.findAll();
      res.json(allOrders);
    } catch (error) {
      console.error('Ошибка при получении всех заказов:', error);
      res.status(500).json({ error: 'Ошибка при получении всех заказов' });
    }
  }

  // READ (получение заказа по идентификатору)
  async getOrderById(req, res) {
    try {
      const orderId = req.query.id;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ error: 'Заказ не найден' });
        return;
      }
      res.json(order);
    } catch (error) {
      console.error('Ошибка при получении заказа по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении заказа по идентификатору' });
    }
  }

  // UPDATE (обновление заказа)
  async updateOrder(req, res) {
    try {
      const orderId = req.query.id;
      const { order_datetime, order_status, client_id } = req.body;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ error: 'Заказ не найден' });
        return;
      }
      await order.update({ order_datetime, order_status, client_id });
      res.json(order);
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error);
      res.status(500).json({ error: 'Ошибка при обновлении заказа' });
    }
  }

  // DELETE (удаление заказа)
  async deleteOrder(req, res) {
    try {
      const orderId = req.query.id;
      const order = await Orders.findByPk(orderId);
      if (!order) {
        res.status(404).json({ error: 'Заказ не найден' });
        return;
      }
      await order.destroy();
      res.json({ message: 'Заказ успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
      res.status(500).json({ error: 'Ошибка при удалении заказа' });
    }
  }
  // READ (получение количества заказов за сегодня)
  async getOrdersCountToday(req, res) {
    try {
      // Получаем текущую дату
      const today = new Date();
      // Устанавливаем время начала дня на 00:00:00
      today.setHours(0, 0, 0, 0);
      // Устанавливаем время конца дня на 23:59:59
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      // Ищем заказы, у которых дата заказа входит в диапазон сегодняшнего дня
      const orderCount = await Orders.count({
        where: {
          order_datetime: {
            [Op.between]: [today, endOfDay],
          },
        },
      });

      res.json({ orders_count_today: orderCount });
    } catch (error) {
      console.error('Ошибка при получении количества заказов за сегодня:', error);
      res.status(500).json({ error: 'Ошибка при получении количества заказов за сегодня' });
    }
  }

  // READ (получение информации о заказе)
  async getOrderInfo(req, res) {
    try {
      const orderId = req.query.id;

      // Находим заказ по его идентификатору
      const order = await Orders.findByPk(orderId, {
        include: [
          // Включаем связанные данные о товарах в заказе
          {
            model: OrderItems,
            include: [
              // Включаем информацию о товаре (product_id -> product)
              {
                model: Products,
                attributes: ['product_name'],
              },
            ],
          },
          // Включаем информацию о клиенте (client_id -> client)
          {
            model: Clients,
            attributes: ['client_name'],
          },
        ],
      });

      if (!order) {
        res.status(404).json({ error: 'Заказ не найден' });
        return;
      }

      res.json(order);
    } catch (error) {
      console.error('Ошибка при получении информации о заказе:', error);
      res.status(500).json({ error: 'Ошибка при получении информации о заказе' });
    }
  }
}


module.exports = OrdersController;
