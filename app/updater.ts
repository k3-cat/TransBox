import { create } from 'apisauce';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

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
  const data = <GitHubReleases>res.data;
  const ver = Constants.manifest.version;

  if (data.name === `v${ver}-ota`
    || (data.name === `v${ver}` && Constants.nativeAppVersion === ver)
    || !verComp(ver!.slice(1), data.name.slice(1))) {
    return;
  }

  R.updater.setInfo(data.body);
  if (data.name.endsWith('-ota')) {
    R.updater.setDiag('ota');

  } else {
    const v8a = Device.supportedCpuArchitectures!.includes('arm64-v8a');
    for (let asset of data.assets) {
      if (asset.name === (v8a ? 'TransBox-v8a.apk' : 'TransBox.apk')) {
        R.updater.setUrlandCount(asset.browser_download_url, asset.download_count);
      }
    }

    R.updater.setDiag('apk');
  }
}
