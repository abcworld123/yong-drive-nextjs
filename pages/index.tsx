import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bucket from 'components/objects/Bucket';
import { alertError } from 'utils/alerts';
import { ResBucketList } from 'types/apis';
import { FileFC, FolderFC } from 'types/objects';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const [objects, setObjects] = useState<(FileFC | FolderFC)[]>([]);

  useEffect(() => {
    intoBucket();
  }, []);

  async function intoBucket() {
    const { data } = await axios.get<ResBucketList>('/api/s3-bucket/getbucketlist');
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
  }

  return (
    <div>
      <main>
        <div className="object-container">
          {objects}
        </div>
      </main>
    </div>
  );
};

export default Home;
