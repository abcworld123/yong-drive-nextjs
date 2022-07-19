import type { Bucket } from '@aws-sdk/client-s3';
import type { Request, Response } from 'express';

// param, formdata types
export interface BucketParams {
  bucket: string;
  path: string;
}

export interface UploadParams {
  bucket: string;
  path: string;
  filename: string;
}

export interface CreateFolderFormdata {
  bucket: string;
  path: string;
  foldername: string;
}

export interface DownloadFormdata {
  bucket: string;
  path: string;
  filenames: string[];
}

export interface DownloadSingleFormdata {
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

export interface DeleteFormdata {
  bucket: string;
  path: string;
  objects: string[];
}

// request types
export type ReqBucket = Request<null, null, null, BucketParams>;
export type ReqUploadObject = Request<null, null, null, UploadParams>;
export type ReqCreateFolderObjects = Request<null, null, CreateFolderFormdata, null>;
export type ReqDownloadObjects = Request<null, null, Override<DownloadFormdata, { filenames: string }>, null>;
export type ReqDeleteObjects = Request<null, null, DeleteFormdata, null>;

// response types
interface DefaultResponse {
  success: boolean;
}

interface WithErrMsg {
  errMsg?: string;
}

interface BucketList {
  buckets?: Bucket[];
}

interface ObjectList {
  objects?: ObjectInfo[];
}

export type ResDefault = Response<DefaultResponse>;
export type ResWithErrMsg = Response<WithErrMsg>;
export type ResBucketList = Response<BucketList>;
export type ResObjectList = Response<ObjectList>;

// etc
export interface ObjectInfo {
  type: string;
  name: string;
  size?: number;
}
