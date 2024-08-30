import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    idAdmin: {
        type: Boolean,
        required: false,
    }
});

const user = mongoose.model('user', userSchema); 
export default user;