import AsyncStorage from '@react-native-async-storage/async-storage';

class ControllerStorage {
  types = {
    WEB: 0,
    REACT_NATIVE: 1,
    NODE: 2
  }
  platform;
  constructor() {
    if (typeof document != 'undefined') {
      this.platform = this.types.WEB;
    }
    else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
      this.platform = this.types.REACT_NATIVE;
    }
    else {
      this.platform = this.types.NODE;
    }
  }
  async store(_controller_name, _value) {
    if (this.platform === this.types.WEB || this.platform === this.types.REACT_NATIVE) {
      try {
        const jsonValue = JSON.stringify(_value);
        await AsyncStorage.setItem(_controller_name, jsonValue);
      } catch (e) {
        throw Error('there was problem in storing value with react native');
      }
    } else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
  async load(_controller_name) {
    if (this.platform === this.types.WEB || this.platform === this.types.REACT_NATIVE) {
      try {
        let _result: any = await AsyncStorage.getItem(_controller_name);
        const jsonValue = JSON.parse(_result);
        return jsonValue;
      } catch (e) {
        throw Error('there was problem load value with react native');
      }
    } else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
  async clear() {
    if (this.platform === this.types.WEB || this.platform === this.types.REACT_NATIVE) {
      try {
        await AsyncStorage.clear()
      } catch (e) {
        throw Error('there was problem in clear storage react native');
      }
    } else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
}

export default ControllerStorage;