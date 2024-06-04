import { DataTypes } from "sequelize";
import _Categoria from "./Categoria.cjs";
import _Producto from "./Producto.cjs";
import _ProductoSubcategoria from "./ProductoSubcategoria.cjs";
import _RolUsuario from "./RolUsuario.cjs";
import _SubCategoria from "./SubCategoria.cjs";
import _Usuario from "./Usuario.cjs";

function initModels(sequelize) {
  var Categoria = _Categoria(sequelize, DataTypes);
  var SubCategoria = _SubCategoria(sequelize, DataTypes);
  var Producto = _Producto(sequelize, DataTypes);
  var ProductoSubcategoria = _ProductoSubcategoria(sequelize, DataTypes);
  var RolUsuario = _RolUsuario(sequelize, DataTypes);
  var Usuario = _Usuario(sequelize, DataTypes);

  SubCategoria.belongsTo(Categoria, { as: "id_categoria_categorium", foreignKey: "id_categoria"});
  ProductoSubcategoria.belongsTo(SubCategoria, { as: "id_subcategoria_sub_categorium", foreignKey: "id_subcategoria"});
  Categoria.hasMany(SubCategoria, { as: "sub_categoria", foreignKey: "id_categoria"});
  ProductoSubcategoria.belongsTo(Producto, { as: "id_producto_producto", foreignKey: "id_producto"});
  RolUsuario.hasMany(Usuario, { as: "usuarios", foreignKey: "id_rol"});
  Usuario.belongsTo(RolUsuario, { as: "id_rol_rol_usuario", foreignKey: "id_rol"});
  Producto.hasMany(ProductoSubcategoria, { as: "producto_subcategoria", foreignKey: "id_producto"});
  SubCategoria.hasMany(ProductoSubcategoria, { as: "producto_subcategoria", foreignKey: "id_subcategoria"});

  return {
    Categoria,
    Producto,
    ProductoSubcategoria,
    RolUsuario,
    SubCategoria,
    Usuario,
  };
}

export default initModels;