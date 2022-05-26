import BucketIcon from '@svg/BucketIcon';
import type { BucketFC, BucketProps } from 'types/reactTypes';

export default function Bucket({ name, dblClick }: BucketProps): BucketFC {
  return (
    <div>
      <div className="object-icon" onDoubleClick={() => dblClick(name)}>
        <BucketIcon size={128} />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
      </div>
    </div>
  );
}
