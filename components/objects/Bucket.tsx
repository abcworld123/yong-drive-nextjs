import { BucketFC, BucketProps } from 'types/objects';
import BucketIcon from '@svg/BucketIcon';

export default function Bucket({ name, dblClick }: BucketProps): BucketFC {
  return (
    <div>
      <div className="object-icon" onDoubleClick={dblClick}>
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
