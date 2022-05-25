import File from 'components/objects/File';
import Folder from 'components/objects/Folder';
import convUnit from 'utils/convUnit';
import type { ObjectProps } from 'types/reactTypes';

export default function Objects({ list, click, chkAll, dblClick }: ObjectProps) {
  const arr = [];
  list.forEach(({ type, name, size }) => {
    if (type === 'folder') {
      arr.push(<Folder key={name} name={name.slice(0, -1)} click={click} chkAll={chkAll} dblClick={() => dblClick(name)} />);
    } else {
      arr.push(<File key={name} name={name} click={click} chkAll={chkAll} size={convUnit(size)} />);
    }
  });
  return <>{arr}</>;
}
