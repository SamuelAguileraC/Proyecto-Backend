const express = require("express");
const router = express.Router();
const { UpdateUser, sfdeleteUsuario } = require("./UserController");
const { respondWithError } = require("../Utils/Errors");
const { checkPermissions } = require("../Auth/AuthMiddleware");

async function updateUser(req, res) {
    try {
        const user = await UpdateUser(req.params.userId, req.body);  
        res.status(200).json(user);
    } catch (error) {
        respondWithError(res, error);
    }
}

async function SoftDeleteUsuarios(req, res) {
    userActive = req.user;
    buscarUsuario = await getUsuarioById(req.params.id);

    try {

    if (buscarUsuario._id.equals(userActive)) {
        sfdeleteUsuario(req.params.id, { active: false});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
           
        }else{
            throwCustomError(401, "No tienes permisos para modificar este usuario");
        }
    } catch(e) {
        respondWithError(res, e);
    }
}

router.put('/update/:userId', checkPermissions("modificar usuarios"), updateUser);
router.patch("delete/:id", checkPermissions("inhabilitar usuarios"), SoftDeleteUsuarios);

module.exports = router;