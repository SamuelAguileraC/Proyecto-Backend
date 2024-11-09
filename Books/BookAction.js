const Libro = require('./BookModel');

async function getBookFilter(filtros) {
    const query = {};

    
    if (filtros.title) query.title = { $regex: filtros.title, $options: 'i' };
    if (filtros.author) query.author = { $regex: filtros.author, $options: 'i' };
    if (filtros.genre) query.genre = filtros.genre; 
    if (filtros.publisher) query.publisher = filtros.publisher;
    if (filtros.publicationDate) query.publicationDate = new Date(filtros.publicationDate);
    if (filtros.availability !== undefined) query.availability = filtros.availability; 

    const cantidadLibros = await Libro.countDocuments(query);
    const librosFiltrados = await Libro.find(query);

    return {
        resultados: librosFiltrados,
        cantidadLibros: cantidadLibros,
    };
}
async function CreateBook(datos) {
    const libroCreado = await Libro.create(datos);
    return libroCreado;

}

async function getBookId(id) {
    const libro = await Libro.findById(id);
    return libro;
}
async function UpdateBook(id, datos) {
    const libro = await Libro.findByIdAndUpdate(id, datos, { new: true });
    return libro;
}
async function sfDeletePedido(id, cambios) {
    const resultado = await Producto.findByIdAndUpdate(id, cambios);
    return resultado;
  }
  
module.exports = { CreateBook, getBookFilter, getBookId, UpdateBook,sfDeletePedido };
