function throwCustomError(code, msg) {
    const error = new Error(msg);
    error.code = typeof code === 'number' ? code : 500;  
    throw error;
}


function respondWithError(res, error) {
    
    const statusCode = error.code && Number.isInteger(error.code) ? error.code : 500; // Usa 500 como código por defecto

    res.status(statusCode).json({
        mensaje: "Fallido. ✌",
        err: error.message,
    });
}

module.exports = {
    throwCustomError,
    respondWithError
}