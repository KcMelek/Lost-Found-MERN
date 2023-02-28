import Item from '../../models/Item.js'

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        if (items.length > 0) {
            return res.json({ items })
        } else {
            return res.status(204).json({ ok: false, msg: 'No items in DB' })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occured, contact with admin',
        })
    }
}

export default getAllItems
