import 'animate.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { Control } from 'components/controls';
import Objects from 'components/objects/Objects';
import { Dnd } from 'components/utils';
import { useHomeStore } from 'hooks/stores';
import Loader from 'svg/Loader';
import { alertError } from 'utils/alerts';
import type { NextPage } from 'next';
import type { BucketParams, ResObjectList } from 'types/apis';
import type { HomeProps } from 'types/props';
import type { HomeServerSideContext } from 'types/services';

const Home: NextPage<HomeProps> = ({ bucket, path }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [setChkSet, uploadObject] = useHomeStore(state => [state.setChkSet, state.uploadObject], shallow);

  const dblClick = useCallback((folder: string) => {
    const nxtPath = `/${bucket}/${path}${folder}`;
    router.push(nxtPath);
  }, [path, bucket, router]);

  const checkHandler = useCallback((name: string, isChecked: boolean) => {
    const curChkSet = useHomeStore.getState().chkSet;
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
    setIsLoading(true);
    setChkSet(new Set());
    const params: BucketParams = { bucket, path };
    const { data } = await axios.get<ResObjectList>('/api/s3/object/get', { params });
    if (data.success) {
      useHomeStore.setState({ bucket, path, objects: data.objects, chkAll: false });
      setIsLoading(false);
    } else {
      await alertError('데이터를 가져오는 중 오류가 발생했습니다.');
      history.back();
    }
  }, [bucket, path]);

  useEffect(() => {
    reload();
    useHomeStore.setState({ reload });
  }, [reload]);

  return (
    <main>
      <Dnd onDrop={uploadObject}>
        <div className="main-container">
          <Control />
          { isLoading
            ? <Loader size={150} />
            : <Objects click={checkHandler} dblClick={dblClick} /> }
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
