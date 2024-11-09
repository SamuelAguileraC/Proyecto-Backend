const User = require('./UserModel');

async function updateUser(id, data) {
    const user = await User.findByIdAndUpdate(id, data,
        { new: true });
    return user;
}
async function sfDeleteUsuario(id, cambios) {
    const resultado = await User.findByIdAndUpdate(id, cambios);
    return resultado;
}
async function getUsuarioId(filtros) {
    const usuario = await User.findById(filtros);
    return usuario;
}
module.exports = { updateUser, sfDeleteUsuario, getUsuarioId };