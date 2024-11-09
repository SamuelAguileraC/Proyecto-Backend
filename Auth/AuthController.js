const { throwCustomError } = require("../Utils/Errors");
const { register, getUserFilter, getUserByEmail } = require("./AuthAction");
const argon2 = require("argon2");

async function createUser(datos) {
  const { email } = datos;
  const usuarioExistente = await getUserFilter({ email });
  if (usuarioExistente !== null && usuarioExistente.resultados.length > 0) {
    throw new Error("El correo electrónico ya está asociado a otro usuario");
  }
  try {
    const hashedPassword = await argon2.hash(datos.password);
    datos.password = hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error al procesar la contraseña");
  }
  const createdUser = await register(datos);
  return createdUser;
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const usuario = await getUserByEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas 1" });
    }
    const passwordCorrecta = await argon2.verify(usuario.password, password);
    if (!passwordCorrecta) {
      return res.status(401).json({ error: "Credenciales inválidas 2" });
    }
    req.userData = {
      id: usuario._id,
      permissions: usuario.permissions
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al autenticar el usuario" });
  }
}


module.exports = { createUser, loginUser };