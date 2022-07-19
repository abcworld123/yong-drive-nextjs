import { getBucketListCmd, getObjectListCmd } from 'services/s3';

async function testGetList() {
  const data1 = await getBucketListCmd();
  if (!data1.success) return false;
  const data2 = await getObjectListCmd({ bucket: data1.buckets[0].Name, path: '' });
  if (!data2.success) return false;
  return true;
}

test('yong-drive 탐색', async () => {
  const result = await testGetList();
  expect(result).toBeTruthy();
});
