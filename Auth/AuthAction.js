const Usuario = require("../Users/UserModel");


async function getUserFilter(filtros) {
    const cantidadUsuarios = await Usuario.countDocuments(filtros);
    const usuariosFiltrados = await Usuario.find(filtros);

    return {
        resultados: usuariosFiltrados,
        cantidadUsuarios: cantidadUsuarios,
    };
}

async function register(datos) {

    const usuarioCreado = await Usuario.create(datos);
    return usuarioCreado;
}

async function getUserByEmail(email) {
    const usuario = await Usuario.findOne ({ email });
    return usuario;
}

module.exports = { register, getUserFilter, getUserByEmail };
