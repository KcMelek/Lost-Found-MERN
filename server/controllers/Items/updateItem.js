import Item from '../../models/Item.js'

const updateItem = async (req, res) => {
    const { id } = req.params
    const newData = req.body

    try {
        const itemUpdated = await Item.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        })

        if (itemUpdated) {
            return res
                .status(201)
                .json({ ok: true, msg: 'Item Updated!', itemUpdated })

        } else {
            return res.status(404).json({
                msg: "Item doesn't exist",
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occured, contact an administrator',
        })
    }
}

export default updateItem
