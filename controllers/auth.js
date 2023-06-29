const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors/index')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async(req,res) => {
    const {email, password} = req.body
    console.log(email)
    if(!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({email})

    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    console.log(isPasswordCorrect)
    const token = user.createJWT()
    
    res.status(StatusCodes.OK).json({user})
}


const register = async(req,res) => {
    const user = await User.create({...req.body })
    
    const token = user.createJWT()
    
    res.status(StatusCodes.CREATED).json({user: {username: user.getName() }, token})
}

module.exports = {login, register}