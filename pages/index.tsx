import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Bucket from 'components/objects/Bucket';
import { alertError } from 'utils/alerts';
import type { NextPage } from 'next';
import type { ResBucketList } from 'types/apis';
import type { BucketFC } from 'types/reactTypes';

const Home: NextPage = () => {
  const router = useRouter();
  const [objects, setObjects] = useState<BucketFC[]>([]);

  const intoBucket = useCallback(async () => {
    const { data } = await axios.get<ResBucketList>('/api/s3/bucket/get');
    if (data.success) {
      let k = 1;
      const arr = [];
      const { buckets } = data;
      buckets.forEach(({ Name }) => {
        arr.push(<Bucket key={k++} name={Name} dblClick={() => router.push(`/${Name}`)} />);
      });
      setObjects(arr);
    } else {
      await alertError('데이터를 가져오는 중 오류가 발생했습니다.');
      history.back();
    }
  }, [router]);

  useEffect(() => {
    intoBucket();
  }, [intoBucket]);

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

export default Home;
