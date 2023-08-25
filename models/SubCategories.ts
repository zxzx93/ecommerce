import mongoose, { Model, Schema } from 'mongoose';

import { ISubCategories } from '../interfaces/back/SubCategories.interface';

const { ObjectId } = Schema.Types;

export const subCategoriesSchema = new Schema<ISubCategories>(
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
    parent: {
      type: ObjectId,
      required: true,
      ref: 'Categories',
    },
  },
  { timestamps: true }
);

const SubCategories: Model<ISubCategories> =
  mongoose.models.SubCategories ||
  mongoose.model('SubCategories', subCategoriesSchema);

export default SubCategories;
