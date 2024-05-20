module.exports = (sequelize, DataTypes) => {
  const Order_Items = sequelize.define('Order_Items', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'product_id',
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'order_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'order_items',
    timestamps: false,
  });

  Order_Items.associate = (models) => {
    Order_Items.belongsTo(models.Orders, { foreignKey: 'order_id' });
    Order_Items.belongsTo(models.Products, { foreignKey: 'product_id' });
  };

  return Order_Items;
};
