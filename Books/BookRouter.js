const express = require("express");
const router = express.Router();
const { createBook, getBookById, readProductoConFiltros, updateProducto, sfdeleteProducto } = require("./BookController");
const { respondWithError } = require("../Utils/Errors");
const { checkPermissions } = require("../Auth/AuthMiddleware");


async function create(req, res) {
    try {
        const createdBook = await createBook(req.body);
        res.status(201).json(createdBook);
    } catch (error) {
        respondWithError(res
            , error);
    }
}

async function getBook(req, res) {
    try {
        const book = await getBookById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        respondWithError(res
            , error);
    }
}
async function getBooksByFilters(req, res) {
    try {
        const filtros = req.query;
        const resultados = await readProductoConFiltros(filtros);
        res.status(200).json(resultados);
    } catch (error) {
        respondWithError(res, error);
    }
}
async function update(req, res) {
    try {
        const updatedBook = await updateProducto(req.body);
        res.status(200).json(updatedBook);
    } catch (error) {
        respondWithError(res, error);
    }
}
async function sfDelete(req, res) {
    try {
        const deletedBook = await sfdeleteProducto(req.params.id, { Active: false });
        res.status(200).json(deletedBook);
    } catch (error) {
        respondWithError(res, error);
    }
}
router.put('/delete/:id', checkPermissions("inhabilitar libros"), sfDelete);
router.put('/update', checkPermissions("modificar libros"), update);
router.get('/:id', getBook);
router.get('/', getBooksByFilters);
router.post('/create', checkPermissions("crear libros"), create);
module.exports = router;
