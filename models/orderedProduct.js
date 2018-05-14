'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderedProduct = sequelize.define('orderedProducts', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  OrderedProduct.associate = function (models) {
    models.orderedProducts.belongsTo(models.orders);
    models.orderedProducts.belongsTo(models.products);
  };

  return OrderedProduct;
};