import express from "express";

import Controllers from "../controllers/Procesos.js";
import store from "../connection/dbposgres.js";
import response from "../connection/response.js";
import initModels from "../../models/init-models.js";
import sequelizeOwn from "../../database/db.js";

//Constantes
const router = express.Router();
const Controller =
  process.env.DEVLOCAL == "true" ? Controllers() : Controllers(store());

var models = initModels(sequelizeOwn);

sequelizeOwn
  .sync({ force: false, alter: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error creating database:", err);
  });

router.get("/clientes/", function (req, res, next) {
  Controller.clientes(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get("/cotizaciones/", function (req, res, next) {
  Controller.cotizaciones(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get("/categoria/", function (req, res, next) {
  Controller.categoriaProducto(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get("/subCategorias/", function (req, res, next) {
  Controller.subCategoriaProducto(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get("/detalles/", function (req, res, next) {
  Controller.detallesProducto(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get("/menuProductos/", function (req, res, next) {
  Controller.menuProducto(req.query)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

//obtener todas las categorias
router.get("/new/categoria", async (req, res, next) => {
  const data = await models.Categoria.findAll();
  response.success(req, res, data, 200);
});

//obtener categoria por id
router.get("/new/categoria/:id", async (req, res, next) => {
  const data = await models.Categoria.findAll({ where: { id: req.params.id } });
  response.success(req, res, data[0], 200);
});

//obtener subcategorias por id categoria
router.get("/new/sub-categoria/:categoriaName", async (req, res, next) => {
  const categoria = await models.Categoria.findOne({
    where: { nombre: req.params.categoriaName },
  });
  const data = await models.SubCategoria.findAll({
    where: { id_categoria: categoria.id },
  });
  response.success(req, res, data, 200);
});

//obtener productos por subcategorias
router.get("/new/sub-categoria/:subId", async (req, res, next) => {
  const finalResponse = [];
  const productosList = await models.ProductoSubcategoria.findAll({
    where: { id_categoria: req.params.subId },
  });

  await productosList.forEach(async (el) => {
    const product = await models.Producto.findAll({
      where: { id: data[i].id_producto },
    });
    finalResponse.push(product);
  });

  response.success(req, res, finalResponse, 200);
});

router.get("/new/productos/all", async (req, res, next) => {
  const data = await models.Producto.findAll();
  const finalResponse = [];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    const ProdSubcategoria = await models.ProductoSubcategoria.findOne({
      where: { id_producto: data[i].id },
    });
    console.log(ProdSubcategoria)
    if(ProdSubcategoria) {
      const SubCategoriaFinal = await models.SubCategoria.findOne({
        where: { id: ProdSubcategoria.id_subcategoria },
      });
      finalResponse.push({
        nombre: data[i].nombre,
        descripcion: data[i].descripcion,
        precio: data[i].precio,
        stock: data[i].stock,
        imageurl: data[i].imageurl,
        subCategoria: SubCategoriaFinal.nombre,
      });
    } else {
      finalResponse.push({
        nombre: data[i].nombre,
        descripcion: data[i].descripcion,
        precio: data[i].precio,
        stock: data[i].stock,
        imageurl: data[i].imageurl,
      });
    }
  }

  response.success(req, res, finalResponse, 200);
});

export default router;
