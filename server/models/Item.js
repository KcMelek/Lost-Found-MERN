import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    name: 
    { type: String, default: 'No Name' },

    userId: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    description: 
    { type: String, default: 'Withouth description' },
    
    type:
    { type: String, enum: ['Lost', 'Found'], required: true },
    
    location:
    {type: String, required: true},
    
    date: 
    { type: String, required: true },

    number: { type: String, required: true },
    
    img: [
        {
            type: String,
            default:
                'https://i.ibb.co/DpZ3qy2/Untitled-design-10.png',
        },
    ],
    createdAt: { type: Date, default: Date.now },
})

const Item = mongoose.model('Item', ItemsSchema)
export default Item