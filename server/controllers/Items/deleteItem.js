import Item from '../../models/Item.js' 
const deleteItem = async (req, res) => {
    
    const { id } = req.params      
    
    try {

        const item = await Item.findByIdAndDelete({ _id: id })

        return res.status(200).json({ item, ok: true, msg: 'Item deleted' })
    
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact with admin',
        })
    } 
} 

export default deleteItem