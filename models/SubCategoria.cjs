const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SubCategoria', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'sub_categoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sub_categoria_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ],
  });
};
