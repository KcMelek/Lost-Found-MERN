import Item from '../../models/Item.js'
import User from '../../models/User.js'

const createItem = async (req,res) => {
        
    try {
        const itemData = req.body
        console.log(itemData)
        const newItem = new Item(itemData)
        if (req.file) {
            newItem.img = req.file.path;
          }
        await newItem.save()
        res.status(200).json({ ok: true, msg: 'Item Created' })
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'An error occured, contact with admin',
        })
    }
}

export default createItem
