import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.SECRET_KEY

const generateJWT = async (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: '24h',
    })
    return token
}


const createUser = async (req,res) => {
    const userData = req.body

    const data = {
        members: [
            {
                email_address: userData.email,
            },
        ],
    }

    const postData = JSON.stringify(data)

    try {
        const findUser = await User.findOne({ email: userData.email })
        if (findUser) {
            return res.status(200).json({
                ok: false,
                msg: 'The email is already used',
            })
        }

        const newUser = new User(userData)

        //Encrypt password
        const salt = bcrypt.genSaltSync()
        newUser.password = bcrypt.hashSync(newUser.password, salt)

        //Generate JWT
        const token = await generateJWT(newUser.id)

        await newUser.save()


        res.send("Done");
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occured, contact an administrator',
        })
    }
}

export default createUser
