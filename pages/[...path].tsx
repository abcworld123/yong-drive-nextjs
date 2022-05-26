import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import Loader from '@svg/Loader';
import Control from 'components/layouts/Control';
import Objects from 'components/objects/Objects';
import { alertError } from 'utils/alerts';
import type { NextPage } from 'next';
import type { BucketParams, ObjectInfo, ResObjectList } from 'types/apis';
import type { HomeProps } from 'types/reactTypes';

export const HomeContext = createContext({
  bucket: '',
  asPath: '',
  objects: [] as ObjectInfo[],
  chkAll: false,
  toggleChkAll: null as () => void,
  reload: null as (asPath: string) => void,
});

const Home: NextPage<HomeProps> = ({ bucket, asPath }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [objects, setObjects] = useState<ObjectInfo[]>([]);
  const [chkSet, setChkSet] = useState(new Set<string>());
  const [chkAll, setChkAll] = useState(false);

  const dblClick = useCallback((folder: string) => {
    const nxtPath = `/${bucket}/${asPath}${folder}`;
    router.push(nxtPath);
  }, [asPath, bucket, router]);

  const checkHandler = useCallback((name: string, isChecked: boolean) => {
    const has = chkSet.has(name);
    if (!has && isChecked) {
      chkSet.add(name);
    } else if (has && !isChecked) {
      chkSet.delete(name);
    }
    setChkSet(new Set(chkSet));
  }, [chkSet]);

  const toggleChkAll = useCallback(() => {
    setChkAll(chkAll => !chkAll);
  }, []);

  const reload = useCallback(async (asPath: string) => {
    setIsLoading(true);
    setChkSet(new Set());
    setChkAll(false);
    const params: BucketParams = {
      Bucket: bucket,
      Prefix: asPath,
      Delimiter: '/',
    };
    const { data } = await axios.get<ResObjectList>('/api/s3-bucket/getobjectlist', { params });
    if (data.success) {
      setObjects(data.objects);
      setIsLoading(false);
    } else {
      await alertError('데이터를 가져오는 중 오류가 발생했습니다.');
      history.back();
    }
  }, [bucket]);

  useEffect(() => {
    reload(asPath);
  }, [asPath]);

  return (
    <HomeContext.Provider value={{ bucket, asPath, objects, chkAll, reload, toggleChkAll }}>
      <main>
        {
          isLoading
            ? <Loader size={150} />
            : (
              <div className="main-container">
                <Control chkSet={chkSet} />
                <Objects click={checkHandler} dblClick={dblClick} />
              </div>
            )
        }
      </main>
    </HomeContext.Provider>
  );
};

Home.getInitialProps = (ctx) => {
  const bucket = ctx.query.path[0];
  let asPath = decodeURIComponent(ctx.asPath.slice(bucket.length + 1));
  asPath = asPath ? asPath.slice(1) + '/' : '';
  return { bucket, asPath };
};

export default Home;
