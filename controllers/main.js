const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) throw new BadRequestError("Invalid Username or password")
    const id = Date.now()
    const token = jwt.sign(
        {id, username},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
    res.status(200).json({msg: 'user created', token})
}


const dashboard = async (req, res) => {
    const luckNumber = Math.floor(Math.random() * 100)
    res.status(200).json({msg: `Hello ${req.user.username}!`, secret: `Here is the authourized data, your lucky number is ${luckNumber}`})
}

module.exports = {
    login, dashboard
}