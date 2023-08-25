import mongoose, { Model, Schema } from 'mongoose';

import { ICategories } from '../interfaces/back/Categories.interface';

const categoriesSchema = new Schema<ICategories>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Categories: Model<ICategories> =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);

export default Categories;
