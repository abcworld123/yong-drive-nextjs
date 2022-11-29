import styles from 'styles/Layouts.module.scss';
import { BucketIcon } from 'svg/icons';
import type { BucketProps } from 'types/props';

export default function Bucket({ name, dblClick }: BucketProps) {
  return (
    <div>
      <div className={styles.objectIcon} onDoubleClick={() => dblClick(name)}>
        <BucketIcon />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
      </div>
    </div>
  );
}
