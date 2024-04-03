const express = require("express");
const router_admin = express.Router();
const { validarAdmin } = require('../middlewares/validarAdmin.js')

const {
  getLibrosController,
  postLibroController,
  putLibroController,
  deleteLibroController
} = require("../controllers/admin.js");

const {
  postLibroMiddleware,
  putLibroMiddleware,
  deleteLibroMiddleware
} = require("../middlewares/admin.js");


// CRUD admin
router_admin.get("/libros", getLibrosController);
router_admin.post("/libros", validarAdmin, postLibroMiddleware, postLibroController);
router_admin.put("/libros/:id",validarAdmin, putLibroMiddleware, putLibroController);
router_admin.delete("/libros/:id",validarAdmin, deleteLibroMiddleware, deleteLibroController);

module.exports = router_admin;
