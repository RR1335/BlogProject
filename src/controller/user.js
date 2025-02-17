const signin = (username,password) => {
    if (username === 'yiersan' && password === '112233') {
        return true
    } 
    return  false
}

module.exports = {
    signin
}