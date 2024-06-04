const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RolUsuario', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rol_usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rol_usuario_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
