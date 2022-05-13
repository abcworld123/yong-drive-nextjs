import type { NextPage } from 'next';
import Head from 'next/head';
import File from 'components/Items/File';
import Folder from 'components/Items/Folder';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>yong-drive</title>
      </Head>
      <main>
        <div className="container mx-auto m-24 w-2/3 flex gap-x-8 gap-y-10 flex-wrap">
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
          <Folder name="새 폴더" />
          <File name="새 텍스트 문서.txt" size="1.58KB" />
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default Home;
