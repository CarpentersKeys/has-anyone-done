import mongoose from 'mongoose';

const thissSchema = new mongoose.Schema({
    text: String,
    novel: Boolean,
}, { timestamps: true })

export const Thiss = mongoose.model('Thiss', thissSchema)