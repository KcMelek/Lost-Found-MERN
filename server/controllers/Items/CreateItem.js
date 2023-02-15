import Item from '../../models/Item.js'
import User from '../../models/User.js'

const createItem = async (req,res) => {
        
    try {
        const itemData = req.body
        const newItem = new Item(itemData)
        const updateUser = await User.findByIdAndUpdate(
            itemData.userId,
            {$push:{items: newItem._id}},
            {new:true}
        )
        if (newItem && updateUser){
            await newItem.save()
            await updateUser.save()
            res.status(200).json({ ok: true, msg: 'Item Created' })
        }else{
            console.log('An error occured, contact with admin');
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'An error occured, contact with admin',
        })
    }
}

export default createItem
