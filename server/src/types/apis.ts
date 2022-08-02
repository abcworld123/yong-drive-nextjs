import type { Bucket } from '@aws-sdk/client-s3';

// get params, post body types
export interface LoginBody {
  pw: string;
}

export interface GetParams {
  bucket: string;
  path: string;
}

export interface UploadParams {
  bucket: string;
  path: string;
  filename: string;
}

export interface CreateFolderBody {
  bucket: string;
  path: string;
  foldername: string;
}

export interface DeleteBody {
  bucket: string;
  path: string;
  objects: string[];
}

export interface DownloadBody {
  bucket: string;
  path: string;
  filenames: string[];
}

export interface DownloadFormdata {
  bucket: string;
  path: string;
  filenames: string;
}

export interface DownloadSingleParams {
  bucket: string;
  path: string;
  filename: string;
}

export interface DownloadRecursiveParams {
  bucket: string;
  baseSrc: string;
  path: string;
  filenames: string[];
}

// request types
export interface ReqLogin {
  body: LoginBody;
}

export interface ReqCreate {
  body: CreateFolderBody;
}

export interface ReqDelete {
  body: DeleteBody;
}

export interface ReqDownload {
  body: DownloadFormdata;
}

export interface ReqGet {
  query: GetParams;
}

export interface ReqUpload {
  query: UploadParams;
}

// response types
export interface ResDefault {
  success: boolean;
  data?: any;
}

export interface ResCheck {
  success: boolean;
}

export interface ResLogin {
  success: boolean;
}

export interface ResWithErrMsg extends ResDefault {
  errMsg?: string;
}

export interface ResBucketList extends ResDefault {
  buckets?: Bucket[];
}

export interface ResObjectList extends ResDefault {
  objects?: ObjectInfo[];
}

// express default
export interface RequestData {
  params?: any;
  body?: any;
  query?: any;
}

export interface ResponseData {
  // data?: any;
}

// etc
export interface ObjectInfo {
  type: string;
  name: string;
  size?: number;
}
