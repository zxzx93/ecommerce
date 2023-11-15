import { NextApiRequest, NextApiResponse } from 'next';

export interface ICategories extends Document {
  _id: string;
  name: string;
  slug: string;
}
export interface PostCategoryRequestBody {
  name: string;
}
export interface UpdateCategoryRequestBody {
  id: string;
  name: string;
}

export interface DeleteCategoryRequestBody {
  id: string;
  name: string;
}

export interface CreateCategoryRequestData extends NextApiRequest {
  body: PostCategoryRequestBody;
}
export interface UpdateCategoryRequestData extends NextApiRequest {
  body: UpdateCategoryRequestBody;
}

export interface DeleteCategoryRequestData extends NextApiRequest {
  body: DeleteCategoryRequestBody;
}

// export interface CreateCategoryResponseData extends NextApiResponse {
//   categories: ICategories[];
//   message: string;
// }
// export interface DeleteCategoryResponseData extends NextApiResponse {
//   categories: ICategories[];
//   message: string;
// }
// export interface UpdateCategoryResponseData extends NextApiResponse {
//   categories: ICategories[];
//   message: string;
// }

export interface CategoryResponseData extends NextApiResponse {
  categories: ICategories[];
  message: string;
}
