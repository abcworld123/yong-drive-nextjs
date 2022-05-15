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

interface HomeProps {
  bucket: string;
  asPath: string;
}

const Home: NextPage<HomeProps> = ({ bucket, asPath }) => {
  const [objects, setObjects] = useState<(FileFC | FolderFC)[]>([]);
  const curPath = asPath.slice(bucket.length + 2);

  useEffect(() => {
    intoFolder(curPath + (curPath && '/'));
  }, [asPath]);

  async function intoFolder(curPath: string) {
    const params: BucketParams = {
      Bucket: bucket,
      Prefix: curPath,
      Delimiter: '/',
    };
    const { data } = await axios.get<ResObjectList>('/api/s3-bucket/getobjectlist', { params });
    if (data.success) {
      let k = 1;
      const arr = [];
      const { files, folders } = data;
      folders.forEach(({ name }) => {
        name = name.slice(0, -1);
        const nxtPath = `/${bucket}/${curPath}${name}`;
        arr.push(<Folder key={k++} name={name} path={nxtPath} />);
      });
      files.forEach(({ name, size }) => {
        arr.push(<File key={k++} name={name} size={convUnit(size)} />);
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
        <div className="container mx-auto m-24 w-2/3 flex gap-x-8 gap-y-10 flex-wrap">
          {objects}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

Home.getInitialProps = (ctx) => {
  return {
    bucket: ctx.query.path[0],
    asPath: decodeURIComponent(ctx.asPath),
  };
};

export default Home;
