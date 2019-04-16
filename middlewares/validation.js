/**
 * Returns a validateToken that validates the given schema.
 *
 * If the schema is invalid, executes a 400 response with the error details.
 *
 * @param schema Should be a Joi schema
 * @return {Function}
 */
export const schemaBody = (schema) => {
    return function validateSchema(req, res, next) {
        const {error, value} = schema.validate(req.body,{
            allowUnknown : true
        });

        if (error) {
            // console.log(error);
            res.status(400).json(errorResponse(error));
        }else{
            next();
        }

    };
}

/**
 * Returns a validateToken that validates the given schema.
 *
 * If the schema is invalid, executes a 400 response with the error details.
 *
 * @param schema Should be a Joi schema
 * @return {Function}
 */
export const schemaParams = (schema) => {
    return function validateSchema(req, res, next) {
        const {error, value} = schema.validate(req.params,{
            allowUnknown : true
        });

        if (error) {
            // console.log(error);
            res.status(400).json(errorResponse(error));
        }else{
            next();
        }

    };
}

/**
* Returns an error message.
*/

let errorResponse = (error) => {
    return {
        message: "Validation error",
        errors: error.details.map((d) => ({message: d.message, context: d.context}))
    }
}