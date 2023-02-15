import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.SECRET_KEY

export const validateJWT = async (req, res, next) => {

    const token = req.header('token')

    try {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Access denied',
            })
        }

        const payload = jwt.verify(token, secretKey)

        req.id = payload.id
        return next()
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            ok: false,
            msg: 'Token not valid',
        })
    }
}

export default validateJWT;
