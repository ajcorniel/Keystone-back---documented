/**
* Verifies that the user is logged in to make admin actions.
* @returns next, error response
*/

export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            status: 400,
            response: 'Debes de haber iniciado sesion'
        });
    }
}

/**
* Verifies that the user isn't logged in to prevent double sessions.
* @returns next, error response
*/

export const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Ya existe una sesion'
        });
    } else {
        next();
    }
}
