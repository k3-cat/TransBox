import { create } from 'apisauce';

export async function testConnection() {
  const google = create({
    baseURL: 'https://www.google.com',
    timeout: 1000,
  });

  const res = await google.get('/favicon.ico');
  return res.ok;
}
