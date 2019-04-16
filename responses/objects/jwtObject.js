/**
* Returns a token with the last login.
*/

export const jwtTransformer = (token, lastLogin) => {
    return {
        token: token,
        lastLogin: lastLogin
    };
};