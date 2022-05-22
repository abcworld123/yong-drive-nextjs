import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Loader from '@svg/Loader';
import Button from 'components/buttons/MainButton';
import Objects from 'components/objects/Objects';
import { alertError } from 'utils/alerts';
import type { NextPage } from 'next';
import type { BucketParams, ResObjectList } from 'types/apis';
import type { ObjectInfo } from 'types/objects';

interface HomeProps {
  bucket: string;
  asPath: string;
}

const Home: NextPage<HomeProps> = ({ bucket, asPath }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [objects, setObjects] = useState<ObjectInfo[]>([]);
  const [chkSet, setChkSet] = useState(new Set<string>());
  const [chkAll, setChkAll] = useState(false);

  const checkHandler = useCallback((name: string, isChecked: boolean) => {
    if (isChecked) chkSet.add(name);
    else if (!isChecked && chkSet.has(name)) chkSet.delete(name);
  }, [chkSet]);

  const dblClick = useCallback((folder: string) => {
    setIsLoading(true);
    setChkSet(new Set());
    setChkAll(false);
    const nxtPath = `/${bucket}/${asPath}${folder}`;
    router.push(nxtPath);
  }, [asPath, bucket, router]);

  const intoFolder = useCallback(async (asPath: string) => {
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
    intoFolder(asPath);
  }, [intoFolder, asPath]);

  return (
    <main>
      <div className={isLoading ? 'hidden' : ''}>
        <div className="main-container">
          <div className="flex gap-5">
            <Button onClick={() => setChkAll(!chkAll)}>
              <Checkbox checked={chkAll} onClick={() => setChkAll(!chkAll)} disabled={!objects.length} disableRipple />
            </Button>
            <Button>올리기</Button>
          </div>
          <div className="object-container">
            <Objects list={objects} click={checkHandler} chkAll={chkAll} dblClick={dblClick} />
          </div>
        </div>
      </div>
      <Loader size={150} show={isLoading} />
    </main>
  );
};

Home.getInitialProps = (ctx) => {
  const bucket = ctx.query.path[0];
  let asPath = decodeURIComponent(ctx.asPath.slice(bucket.length + 1));
  asPath = asPath ? asPath.slice(1) + '/' : '';
  return { bucket, asPath };
};

export default Home;
