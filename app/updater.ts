import { create } from 'apisauce';
import Constants from 'expo-constants';

import { IRootStore } from './stores';

const api = create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' },
});

interface GitHubReleases {
  name: string;
  body: string;
  assets: {
    name: string;
    download_count: number;
    browser_download_url: string;
  }[];
}

function verComp(small: string, big: string) {
  // check beforehand if they are equal
  const s = small.split('.');
  const b = big.split('.');

  for (let i = 0; i < s.length; i++) {
    if (s[i] > b[i]) {
      return false;
    }
  }
  return true;
}

export async function triggerUpdate(R: IRootStore) {
  if (R.settings.updatingSource === 'google') {
    return;
  }

  const res = await api.get('/repos/k3-cat/TransBox/releases/latest');
  if (!res.ok) {
    return;
  }
  const r = <GitHubReleases>res.data;
  const ver = Constants.manifest.version;

  if (r.name === `v${ver}-ota`
    || (r.name === `v${ver}` && Constants.nativeAppVersion === ver)
    || !verComp(ver!.slice(1), r.name.slice(1))) {
    return;
  }

  const google = create({
    baseURL: 'https://www.google.com',
    timeout: 1000,
  });
  const connectionGood = (await google.get('/favicon.ico')).ok;

  R.updater.setInfo(r.body);
  if (r.name.endsWith('-ota')) {
    R.updater.setDiag('ota');

  } else {
    R.updater.setDiag('apk');

    for (let a of r.assets) {
      if (a.name !== 'TransBox.apk') {
        continue;
      }
      R.updater.setMetaInfo(
        r.name,
        connectionGood ? a.browser_download_url : 'https://mirror.ghproxy.com/' + a.browser_download_url,
        a.download_count
      );
      break;
    }
  }
}
