import Item from '../../models/Item.js'

const getItemById = async (req, res) => {
    const { id } = req.params
    try {
        const item = await Item.findOne({
            $and: [{ _id: id }],
        })
            
            .populate({
                path: 'userId',
                select: '_id nickname fullname img email',
            })

        if (item) {
            return res.status(200).json({ item, ok: true, msg: 'Item found' })
        } else {
            return res.status(204).json({ ok: false, msg: 'Item not found' })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occured, contact with admin',
        })
    }
}
export default getItemById
