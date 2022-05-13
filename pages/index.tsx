import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import File from 'components/Objects/File';
import Folder from 'components/Objects/Folder';
import { alertError } from 'utils/alerts';
import convUnit from 'utils/convUnit';
import { BucketParams, ResObjectList } from 'types/apis';
import { FileFC, FolderFC } from 'types/Objects';

let curPath = '';

// todo state 전역변수 안쓰고 구현해보기
let objects: (FileFC | FolderFC)[];
let setObjects: React.Dispatch<React.SetStateAction<(FileFC | FolderFC)[]>>;

async function intoFolder(path: string) {
  const params: BucketParams = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Prefix: curPath + path,
    Delimiter: '/',
  };
  const { data } = await axios.get<ResObjectList>('api/s3-bucket/getobjectlist', { params });
  if (data.success) {
    let k = 1;
    const arr = [];
    const { files, folders } = data;
    folders.forEach(({ name }) => {
      arr.push(<Folder key={k++} name={name} dblClick={intoFolder} />);
    });
    files.forEach(({ name, size }) => {
      arr.push(<File key={k++} name={name} size={convUnit(size)} />);
    });
    curPath += path;
    setObjects(arr);
  } else {
    alertError('데이터를 가져오는 중 오류가 발생했습니다.');
  }
}

const Home: NextPage = () => {
  [objects, setObjects] = useState<(FileFC | FolderFC)[]>([]);
  useEffect(() => {
    intoFolder('');
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
