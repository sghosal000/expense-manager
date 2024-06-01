const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

const addCookie = (res, cookieName, token) => {
    res.cookie(cookieName, token, cookieConfig)
}

const clearCookie = (res, cookieName) => {
    res.clearCookie(cookieName, cookieConfig)
}

module.exports = {
    addCookie,
    clearCookie,
}