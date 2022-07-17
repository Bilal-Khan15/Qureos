import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
    title: String,
    isbn: String,
    pageCount: Number,
    published: {
        $date: String,
        price: Number,
        currency: String
    },
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
    categories: [String]
})