import mongoose from 'mongoose';

const uri = "mongodb://127.0.0.1:27017/pga";

const connectDB = () => {
    mongoose.connect(uri);
}

export default connectDB;