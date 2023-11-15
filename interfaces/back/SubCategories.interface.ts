import { NextApiRequest, NextApiResponse } from 'next';

import { ICategories } from './Categories.interface';

export interface ISubCategories extends Document {
  _id: string;
  name: string;
  slug: string;
  parent: ICategories;
}

export interface PostSubCategoryRequestBody {
  name: string;
  parent: ICategories[];
}

export interface PutSubCategoryRequestBody {
  id: string;
  name: string;
  parent: string;
}
export interface DeleteSubCategoryRequestBody {
  id: string;
  name: string;
}

export interface CreateSubCategoryRequestData extends NextApiRequest {
  body: PostSubCategoryRequestBody;
}
export interface UpdateSubCategoryRequestData extends NextApiRequest {
  body: PutSubCategoryRequestBody;
}

export interface DeleteSubCategoryRequestData extends NextApiRequest {
  body: DeleteSubCategoryRequestBody;
}

//! response
export interface SubCategoryResponseData extends NextApiResponse {
  subCategories: ISubCategories[];
  message: string;
}
