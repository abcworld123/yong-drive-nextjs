import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import MainButton from 'components/buttons/MainButton';
import Objects from 'components/objects/Objects';
import Loader from '@svg/Loader';
import { BucketParams, ResObjectList } from 'types/apis';
import { ObjectInfo } from 'types/objects';
import { alertError } from 'utils/alerts';

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

  useEffect(() => {
    intoFolder(asPath);
  }, [asPath]);

  function checkHandler(name: string, isChecked: boolean) {
    if (isChecked) chkSet.add(name);
    else if (!isChecked && chkSet.has(name)) chkSet.delete(name);
  }

  function dblClick(folder: string) {
    setIsLoading(true);
    setChkSet(new Set());
    setChkAll(false);
    const nxtPath = `/${bucket}/${asPath}${folder}`;
    router.push(nxtPath);
  }

  async function intoFolder(asPath: string) {
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
      alertError('데이터를 가져오는 중 오류가 발생했습니다.')
      .then(() => history.back());
    }
  }

  return (
    <main>
      <div className={isLoading ? 'hidden' : ''}>
        <div className="main-container">
          <div className="flex gap-5">
            <MainButton onClick={() => setChkAll(!chkAll)}>
              <Checkbox checked={chkAll} onClick={() => setChkAll(!chkAll)} disabled={!objects.length} disableRipple />
            </MainButton>
            <MainButton>올리기</MainButton>
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
