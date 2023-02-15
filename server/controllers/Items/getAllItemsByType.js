import Item from '../../models/Item.js'

const getAllItems = async (req, res) => {
    const { type } = req.params
    const { name, date} = req.query

    console.log(name)

    try {
        const items = await Item.find({
            $and: [{ type: { $eq: type }}],
        })
            
            .sort(name === 'asc' ? { name: 1 } : {})
            .sort(name === 'desc' ? { name: -1 } : {})
            .sort(date === 'asc' ? { date: 1 } : {})
            .sort(date === 'desc' ? { date: -1 } : {})


        if (items.length > 0) {
            return res
                .status(200)
                .json({ items, ok: true, msg: 'All items in DB', type: type })
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
