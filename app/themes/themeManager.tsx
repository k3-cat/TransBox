import { ThemeManager } from 'react-native-ui-lib';

export function initTheme() {
  ThemeManager.setComponentTheme('RadioButton', {
    size: 20,
    color: '#9ccc65',
    hitSlop: {
      top: 15,
      left: 15,
      right: 15,
      bottom: 30
    }
  });
}
