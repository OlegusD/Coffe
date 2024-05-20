module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    order_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'client_id',
      },
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });
  Orders.associate = (models) => {
    Orders.hasMany(models.Order_Items, { foreignKey: 'order_id' });
    Orders.belongsTo(models.Clients, { foreignKey: 'client_id' });
  };
  return Orders;
};
