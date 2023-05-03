import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const CategorySchema = new Schema(
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
  },
  { timestamps: true }
);

type TCategory = InferSchemaType<typeof CategorySchema>;

const category: Model<TCategory> =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default category;
