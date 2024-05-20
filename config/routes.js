const routes = {
  'POST /create/product': 'Products.createProduct',
  'GET /getAll/product': 'Products.getAllProducts',
  'GET /get/product': 'Products.getProductById',
  'PUT /update/product': 'Products.updateProduct',
  'DELETE /delete/product': 'Products.deleteProduct',

  'POST /create/client': 'Clients.createClient',
  'GET /getAll/client': 'Clients.getAllClients',
  'GET /get/client': 'Clients.getClientById',
  'PUT /update/client': 'Clients.updateClient',
  'DELETE /delete/client': 'Clients.deleteClient',

  'POST /create/order': 'Orders.createOrder',
  'GET /getAll/order': 'Orders.getAllOrders',
  'GET /get/order': 'Orders.getOrderById',
  'PUT /update/order': 'Orders.updateOrder',
  'DELETE /delete/order': 'Orders.deleteOrder',

  'POST /create/order-item': 'OrderItems.createOrderItem',
  'GET /getAll/order-item': 'OrderItems.getAllOrderItems',
  'GET /get/order-item': 'OrderItems.getOrderItemById',
  'PUT /update/order-item': 'OrderItems.updateOrderItem',
  'DELETE /delete/order-item': 'OrderItems.deleteOrderItem',

  'GET /get/count-order-today': 'Orders.getOrdersCountToday',
  'GET /get/order-info': 'Orders.getOrderInfo',
};

module.exports = routes;
