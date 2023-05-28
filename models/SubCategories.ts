import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const subCategoriesSchema = new Schema(
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
      ref: 'Categories',
    },
  },
  { timestamps: true }
);

type TSubCategories = InferSchemaType<typeof subCategoriesSchema>;

const SubCategories: Model<TSubCategories> =
  mongoose.models.SubCategories ||
  mongoose.model('SubCategories', subCategoriesSchema);

export default SubCategories;
