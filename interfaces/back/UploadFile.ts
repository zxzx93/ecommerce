import { NextApiRequest } from 'next';

export interface UploadedFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: any;
}

export interface CloudinaryUploadImages {
  url: string;
  public_url: string;
}

export interface FileUploadRequestData extends NextApiRequest {
  body: {
    path: string;
    public_id: string;
  };
  files: { [fieldname: string]: UploadedFile[] };
}
