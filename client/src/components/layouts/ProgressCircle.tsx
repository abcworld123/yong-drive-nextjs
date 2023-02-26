import { Circle } from 'rc-progress';
import { shallow } from 'zustand/shallow';
import { useUploadStore } from 'hooks/stores';

export default function ProgressCircle() {
  const [isUploading, progVal] = useUploadStore(state => [state.isUploading, state.progVal], shallow);

  return (
    <Circle
      className={`w-12 ${isUploading ? '' : 'hidden'}`}
      percent={progVal}
      strokeWidth={8}
      trailWidth={2}
      strokeColor="#3fc3ee"
      trailColor="#ccc"
    />
  );
}
