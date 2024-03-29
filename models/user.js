import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  },
});

// Set the route is only going to be created and running for the time when it is getting called
// Express will look for a collection named "users" in the database

const User = models.User || model('User', UserSchema); // If the model already exists, use it, otherwise, create a new one
export default User;