import mongoose from 'mongoose';

const uri = "mongodb://mongo:27017/pga";

const connectDB = () => {
    mongoose.connect(uri);
}

export default connectDB;