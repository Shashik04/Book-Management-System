import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ corrected
  }
);

// ✅ changed model name from 'Cat' to 'Book'
export const Book = mongoose.model('Book', bookSchema);
