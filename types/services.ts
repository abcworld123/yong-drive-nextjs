import { GetServerSidePropsContext } from 'next';

export interface ObjectInfo {
  type: string;
  name: string;
  size?: number;
}

export interface HomeServerSideContext extends GetServerSidePropsContext {
  query: {
    bucket: string;
    path?: string[];
  }
}
