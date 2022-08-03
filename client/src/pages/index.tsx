import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Bucket } from 'components/objects';
import { alertError } from 'utils/alerts';
import api from 'utils/api';
import type { NextPage } from 'next';
import type { ResBucketList } from 'types/apis';

const BucketSelectPage: NextPage = () => {
  const router = useRouter();
  const [objects, setObjects] = useState<React.ReactElement[]>([]);

  const dblClick = useCallback((bucket: string) => {
    router.push(`/${bucket}`);
  }, [router]);

  const reload = useCallback(async () => {
    const { data } = await api.post<ResBucketList>('/s3/bucket/get');
    if (data.success) {
      const arr: React.ReactElement[] = [];
      data.buckets.forEach(({ Name: name }) => {
        arr.push(<Bucket key={name} name={name} dblClick={dblClick} />);
      });
      setObjects(arr);
    } else {
      await alertError('데이터를 가져오는 중 오류가 발생했습니다.');
      history.back();
    }
  }, [dblClick]);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <main>
      <div className="main-container">
        <div className="object-container">
          {objects}
        </div>
      </div>
    </main>
  );
};

export default BucketSelectPage;
