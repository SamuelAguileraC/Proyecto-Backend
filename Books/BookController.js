const { CreateBook, getBookFilter, getBookId, UpdateBook,sfDeletePedido } = require('./BookAction');

async function createBook(datos) {
  const { title } = datos;
  const bookExistente = await getBookFilter({ title });
  if (bookExistente !== null && bookExistente.resultados.length > 0) {
    throw new Error("El libro ya existe");
  }
  const createdBook = await CreateBook(datos);
  return createdBook;
}
async function getBookById(id) {
  const book = await getBookId(id);
  return book;
}
async function readProductoConFiltros(filtros) {
  const resultadosBusqueda = await getBookFilter(filtros);
  return resultadosBusqueda;
}
function updateProducto(datos) {
  const { _id, ...cambios } = datos;

  const productoCreado = UpdateBook(_id, cambios);

  return productoCreado;
}
async function sfdeleteProducto(id, cambios) {
  const producto = await getProductoId(id);
  if (!producto) {
    throwCustomError(404, "Producto no encontrado");
  }

  try {
    const productoEliminado = sfDeletePedido(id, cambios);
    return productoEliminado;
  } catch (error) {
    throwCustomError(500, "Error al eliminar producto");
  }
}

module.exports = { createBook, getBookById, readProductoConFiltros, updateProducto, sfdeleteProducto }; 
