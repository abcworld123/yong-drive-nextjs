import { BucketIcon } from 'svg/icons';
import type { BucketProps } from 'types/props';

export default function Bucket({ name, dblClick }: BucketProps) {
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
