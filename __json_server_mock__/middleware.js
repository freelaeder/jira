module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        if (req.body.username === 'free' && req.body.password === '1234') {
            return res.status(200).json({
                user: {
                    token: '123'
                }
            })
        } else {
            return res.status(400).json({message: 'usename || password error'})
        }
    }
     next()
}

/**
 *  启动命令
 *      "start:json-server": "json-server __json_server_mock__/db.json --watch  --port 3005 --middlewares __json_server_mock__/middleware.js",
 *
 * */