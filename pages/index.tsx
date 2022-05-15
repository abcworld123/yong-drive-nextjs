import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bucket from 'components/Objects/Bucket';
import { alertError } from 'utils/alerts';
import { ResBucketList } from 'types/apis';
import { FileFC, FolderFC } from 'types/Objects';

interface tempProps {
  asPath: string;
  bucket: string;
}

const Home: NextPage<tempProps> = () => {
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
      alertError('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  }
  
  return (
    <div>
      <Head>
        <title>yong-drive</title>
      </Head>
      <main>
        <div className="container mx-auto m-24 w-2/3 flex gap-x-8 gap-y-10 flex-wrap">{objects}</div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;


