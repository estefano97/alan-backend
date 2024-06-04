const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_rol: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rol_usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
