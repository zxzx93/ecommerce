import mongoose, { InferSchemaType, Model } from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'must be atleast 2 charcters'],
      maxlength: [32, 'must be atleast 2 charcters'],
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

type TCategories = InferSchemaType<typeof categoriesSchema>;

const Categories: Model<TCategories> =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);

export default Categories;
