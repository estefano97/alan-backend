const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductoSubcategoria', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_subcategoria: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sub_categoria',
        key: 'id'
      }
    },
    id_producto: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'producto_subcategoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "producto_subcategoria_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
