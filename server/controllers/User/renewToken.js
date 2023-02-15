import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.SECRET_KEY

const generateJWT = async (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: '24h',
    })
    return token
}

export const renewToken = async (req, res) => {
    const id = req.id

    const token = await generateJWT(id)

    res.status(200).json({ ok: true, id, token: token })
}
