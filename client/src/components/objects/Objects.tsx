import { memo } from 'react';
import { useHomeStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { convUnit } from 'utils/tools';
import { File, Folder } from '.';
import type { ObjectProps } from 'types/props';

function Objects({ click, dblClick }: ObjectProps) {
  const objects = useHomeStore(state => state.objects);
  const arr: React.ReactElement[] = [];

  objects.forEach(({ type, name, size }) => {
    if (type === 'folder') {
      arr.push(<Folder key={name} name={name} click={click} dblClick={dblClick} />);
    } else {
      arr.push(<File key={name} name={name} click={click} size={convUnit(size)} />);
    }
  });
  return (
    <div className={styles.objectContainer}>
      {arr}
    </div>
  );
}

export default memo(Objects);
