import { useContext } from 'react';
import File from 'components/objects/File';
import Folder from 'components/objects/Folder';
import { HomeContext } from 'pages/[bucket]/[[...path]]';
import convUnit from 'utils/convUnit';
import type { ObjectProps } from 'types/props';

export default function Objects({ click, dblClick }: ObjectProps) {
  const { objects } = useContext(HomeContext);
  const arr: React.ReactElement[] = [];

  objects.forEach(({ type, name, size }) => {
    if (type === 'folder') {
      arr.push(<Folder key={name} name={name} click={click} dblClick={dblClick} />);
    } else {
      arr.push(<File key={name} name={name} click={click} size={convUnit(size)} />);
    }
  });
  return (
    <div className="object-container">
      {arr}
    </div>
  );
}
