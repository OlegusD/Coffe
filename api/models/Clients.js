module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define('Clients', {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'clients',
    timestamps: false,
  });

  Clients.associate = (models) => {
    Clients.hasMany(models.Orders, { foreignKey: 'client_id' });
  };

  return Clients;
};
