const serverHandle = (req,res) => {
    res.setHeader('Content-type','application/json')

    const resData = {
        name: 'RR1335',
        site: 'Node.js Beginning',
        env: process.env.NODE_ENV
    }

    res.end(
        JSON.stringify(resData)
    )
}


module.exports = serverHandle 