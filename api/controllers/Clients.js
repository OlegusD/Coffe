const db = require('../models');
const Clients = db.Clients;

class ClientsController {
  // CREATE (создание клиента)
  async createClient(req, res) {
    try {
      const { client_name, contact_info } = req.body;
      const newClient = await Clients.create({ client_name, contact_info });
      res.status(201).json(newClient);
    } catch (error) {
      console.error('Ошибка при создании клиента:', error);
      res.status(500).json({ error: 'Ошибка при создании клиента' });
    }
  }

  // READ (получение всех клиентов)
  async getAllClients(req, res) {
    try {
      const allClients = await Clients.findAll();
      res.json(allClients);
    } catch (error) {
      console.error('Ошибка при получении всех клиентов:', error);
      res.status(500).json({ error: 'Ошибка при получении всех клиентов' });
    }
  }

  // READ (получение клиента по идентификатору)
  async getClientById(req, res) {
    try {
      const clientId = req.query.id;
      const client = await Clients.findByPk(clientId);
      if (!client) {
        res.status(404).json({ error: 'Клиент не найден' });
        return;
      }
      res.json(client);
    } catch (error) {
      console.error('Ошибка при получении клиента по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении клиента по идентификатору' });
    }
  }

  // UPDATE (обновление клиента)
  async updateClient(req, res) {
    try {
      const clientId = req.query.id;
      const { client_name, contact_info } = req.body;
      const client = await Clients.findByPk(clientId);
      if (!client) {
        res.status(404).json({ error: 'Клиент не найден' });
        return;
      }
      await client.update({ client_name, contact_info });
      res.json(client);
    } catch (error) {
      console.error('Ошибка при обновлении клиента:', error);
      res.status(500).json({ error: 'Ошибка при обновлении клиента' });
    }
  }

  // DELETE (удаление клиента)
  async deleteClient(req, res) {
    try {
      const clientId = req.query.id;
      const client = await Clients.findByPk(clientId);
      if (!client) {
        res.status(404).json({ error: 'Клиент не найден' });
        return;
      }
      await client.destroy();
      res.json({ message: 'Клиент успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении клиента:', error);
      res.status(500).json({ error: 'Ошибка при удалении клиента' });
    }
  }
}

module.exports = ClientsController;
