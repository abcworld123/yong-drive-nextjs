import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bucket from 'components/Objects/Bucket';
import { alertError } from 'utils/alerts';
import { ResBucketList } from 'types/apis';
import { FileFC, FolderFC } from 'types/Objects';

const Home: NextPage = () => {
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
        arr.push(<Bucket key={k++} name={Name} />);
      });
      setObjects(arr);
    } else {
      await alertError('데이터를 가져오는 중 오류가 발생했습니다.');
      history.back();
    }
  }

  return (
    <div>
      <Head>
        <title>yong-drive</title>
      </Head>
      <main>
        <div className="object-container">
          {objects}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
