import mongoose from "mongoose";

const Schema = mongoose.Schema;

// resume, tech_stack, field_of_interest, experience_level, bio
const UsersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    tech_stack: {
        type: String,
        required: true
    },
    field_of_interest: {
        type: String,
        required: true
    },
    experience_level: {
        type: Number
    },
    bio: {
        type: String,
        required: true
    }
})

const Users = mongoose.model("User", UsersSchema);
export default Users;