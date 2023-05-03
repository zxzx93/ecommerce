import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, '2글자 이상 입력해주세요.'],
      maxlength: [32, '32글자 이하로 입력해주세요.'],
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
      ref: 'Category',
    },
  },
  { timestamps: true }
);

type TSubCategory = InferSchemaType<typeof SubCategorySchema>;

const subCategory: Model<TSubCategory> =
  mongoose.models.Users || mongoose.model('Users', SubCategorySchema);

export default subCategory;
