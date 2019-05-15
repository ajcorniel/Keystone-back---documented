/**
* Returns a token with the last login.
* @param {string} lastLogin
* @returns Last Login's token
*/

export const jwtTransformer = (token, lastLogin) => {
    return {
        token: token,
        lastLogin: lastLogin
    };
};