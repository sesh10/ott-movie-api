import { Schema } from "mongoose";

export const MovieSchema = new Schema ({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
    streamLink: { type: String }
});