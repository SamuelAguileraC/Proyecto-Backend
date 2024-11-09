const {  User } = require('./UserAction');

async function UpdateUser(userId, datos) {
    const user = await User.updateUser(userId, datos);
    return user;
}    
async function getUsuarioById(id) {
    const usuario = await User.getUsuarioId(id);
    return usuario;
  }

async function sfdeleteUsuario(id, cambios) {
    const usuario = await User.getUsuarioId(id);
    if (!usuario) {
      throwCustomError(404, "Usuario no encontrado");
    }
    const usuarioEliminado = await User.sfDeleteUsuario(id, cambios);
    return usuarioEliminado;
  }
  

module.exports = { UpdateUser, sfdeleteUsuario ,getUsuarioById};
