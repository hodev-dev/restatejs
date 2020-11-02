class ControllerStorage {
  types = {
    WEB: 0,
    REACT_NATIVE: 1,
    NODE: 2
  }
  storage: any;
  platform: any;
  constructor(_storage: any) {
    this.storage = _storage;
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
    if (this.platform === this.types.WEB) {
      try {
        const jsonValue = JSON.stringify(_value);
        this.storage.setItem(_controller_name, jsonValue);
      } catch (e) {
        throw Error('there was problem in storing value with react native');
      }
    } else if (this.platform === this.types.REACT_NATIVE) {
      try {
        const jsonValue = JSON.stringify(_value);
        await this.storage.setItem(_controller_name, jsonValue);
      } catch (error) {
        return error;
      }
    } else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
  async load(_controller_name) {
    if (this.platform === this.types.WEB) {
      try {
        let _result: any = this.storage.getItem(_controller_name);
        const jsonValue = JSON.parse(_result);
        return jsonValue;
      } catch (e) {
        throw Error('there was problem load value with react native');
      }
    }
    else if (this.platform === this.types.REACT_NATIVE) {
      try {
        const item = await this.storage.getItem(_controller_name);
        const jsonValue = JSON.parse(item);
        return jsonValue;
      } catch (error) {
        return error;
      }
    }
    else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
  async clear() {
    if (this.platform === this.types.WEB) {
      try {
        this.storage.clear();
      } catch (e) {
        throw Error('there was problem in clear storage react native');
      }
    }
    else if (this.platform === this.types.REACT_NATIVE) {
      try {
        this.storage.clear();
      } catch (error) {
        return error;
      }
    }
    else if (this.platform === this.types.NODE) {
      throw Error('nodejs not supported yet!');
    } else {
      throw Error('unknow storage platform');
    }
  }
}

export default ControllerStorage;