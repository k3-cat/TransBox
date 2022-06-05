import { create } from 'apisauce';
import Constants from 'expo-constants';

import { rootStore } from './stores';

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

export async function triggerUpdate(R: typeof rootStore) {
  if (R.settings.updateChannel === 'google') {
    return;
  }

  const res = await api.get('/repos/Pix-00/TransBox/releases/latest');
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
        R.settings.connectionGood ? a.browser_download_url : 'https://mirror.ghproxy.com/' + a.browser_download_url,
        a.download_count
      );
      break;
    }
  }
}
