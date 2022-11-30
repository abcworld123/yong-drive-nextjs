import 'animate.css';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Control } from 'components/controls';
import { Objects } from 'components/objects';
import { Dnd } from 'components/utils';
import { useCheckBoxStore, useHomeStore, useUploadStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import Loader from 'svg/Loader';
import { alertError } from 'utils/alerts';
import api from 'utils/api';
import type { NextPage } from 'next';
import type { GetBody, ResObjectList } from 'types/apis';
import type { HomeProps, HomeServerSideContext } from 'types/props';

const Home: NextPage<HomeProps> = ({ bucket, path }) => {
  const setChkSet = useCheckBoxStore(state => state.setChkSet);
  const uploadObject = useUploadStore(state => state.uploadObject);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const intoFolder = useCallback((folder: string) => {
    const { bucket, path } = useHomeStore.getState();
    const nxtPath = `/${bucket}/${path}${folder}`;
    router.push(nxtPath);
  }, []);

  const checkHandler = useCallback((name: string, isChecked: boolean) => {
    const curChkSet = useCheckBoxStore.getState().chkSet;
    const has = curChkSet.has(name);
    if (!has && isChecked) {
      curChkSet.add(name);
      setChkSet(new Set(curChkSet));
    } else if (has && !isChecked) {
      curChkSet.delete(name);
      setChkSet(new Set(curChkSet));
    }
  }, []);

  const reload = useCallback(async () => {
    const { bucket, path } = useHomeStore.getState();
    setIsLoading(true);
    setChkSet(new Set());
    const body: GetBody = { bucket, path };
    try {
      const { data } = await api.post<ResObjectList>('/s3/object/get', body);
      if (!data.success) throw new Error('서버 오류가 발생했습니다.');
      useHomeStore.setState({ bucket, path, objects: data.objects });
      useCheckBoxStore.setState({ chkAll: false });
      setIsLoading(false);
    } catch (err) {
      await alertError(err.message);
      history.back();
    }
  }, []);

  useEffect(() => {
    useHomeStore.setState({ bucket, path });
    reload();
  }, [bucket, path]);

  useEffect(() => {
    useHomeStore.setState({ reload });
  }, []);

  return (
    <main>
      <Dnd onDrop={uploadObject}>
        <div className={styles.mainContainer}>
          <Control />
          { isLoading
            ? <Loader />
            : <Objects click={checkHandler} intoFolder={intoFolder} /> }
        </div>
      </Dnd>
    </main>
  );
};

export function getServerSideProps(context: HomeServerSideContext) {
  const bucket = context.query.bucket;
  const paths = context.query.path;
  const path = paths ? paths.map((path) => `${path}/`).join('') : '';
  return { props: { bucket, path } };
}

export default Home;
