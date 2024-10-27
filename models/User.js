// models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// No password hashing, so remove the pre-save hook
// No comparePassword method, since passwords are not hashed

const User = model('User', userSchema);
export default User; // Use default export
