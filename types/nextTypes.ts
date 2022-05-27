import { GetServerSidePropsContext } from 'next';

export interface HomeServerSideContext extends GetServerSidePropsContext {
  query: {
    bucket: string;
    path?: string[];
  }
}
