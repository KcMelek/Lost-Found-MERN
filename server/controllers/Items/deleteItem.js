import Item from '../../models/Item.js' 
import User from '../../models/User.js'
const deleteItem = async (req, res) => {
    
    const { id } = req.params      
    
    try {

        const item = await Item.findByIdAndDelete({ _id: id })
        const user = await User.findByIdAndUpdate({ _id: item?.userId })
        
        if (user && user.items !== undefined) {
            const itemsArray = user.items.filter((element) => element != id)
            user.items = itemsArray
            await user.save()
        }
        
        if (item && user) {
            return res.status(200).json({ item, ok: true, msg: 'Item deleted' })
        } else {
            return res.status(404).json({ ok: false, msg: 'Item id not found' })         
        }
    
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact with admin',
        })
    } 
} 

export default deleteItem