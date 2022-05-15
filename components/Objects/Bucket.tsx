import { BucketFC, BucketProps } from 'types/Objects';
import { useRouter } from 'next/router';
import BucketIcon from '@svg/BucketIcon';

export default function Bucket({ name }: BucketProps): BucketFC {
  const router = useRouter();
  return (
    <div>
      <div className="border-[1px] border-gray-300 rounded-lg w-40 h-40 grid place-items-center select-none" onDoubleClick={() => router.push(`/${name}`)}>
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