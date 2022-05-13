import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import File from 'components/Objects/File';
import Folder from 'components/Objects/Folder';
import convUnit from 'utils/convUnit';
import { BucketParams, ResObjectList } from 'types/apis';
import { FileFC, FolderFC } from 'types/Objects';

async function getObjectList() {
  const params: BucketParams = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Prefix: '',
    Delimiter: '/',
  };
  const { data } = await axios.get<ResObjectList>('api/s3-bucket/getobjectlist', { params });
  return data;
}

const Home: NextPage = () => {
  const [objects, setObjects] = useState<(FileFC | FolderFC)[]>([]);
  useEffect(() => {
    const arr = [];
    getObjectList().then(({ files, folders }) => {
      folders.forEach(({ name }) => {
        arr.push(<Folder name={name.slice(0, -1)} />);
      });
      files.forEach(({ name, size }) => {
        arr.push(<File name={name} size={convUnit(size)} />);
      });
      setObjects(arr);
    });
  }, []);
  
  return (
    <div>
      <Head>
        <title>yong-drive</title>
      </Head>
      <main>
        <div className="container mx-auto m-24 w-2/3 flex gap-x-8 gap-y-10 flex-wrap">
          {objects}
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default Home;
