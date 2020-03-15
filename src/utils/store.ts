import { toJS, runInAction } from 'mobx';
import { StoreDefaults } from './storeDefaults';
import { withoutKeys } from './merge';

export abstract class Store {
  public static DEFAULTS?: StoreDefaults;

  public constructor(state: StoreDefaults = {}) {
    const defaults = this.constructor['DEFAULTS'] || {};

    runInAction(() => Object.assign(this, defaults, state));
  }

  public abstract hydrate(data: StoreDefaults): void;

  public toJSON(ignoreAdditionalKeys: string[] | string = []): StoreDefaults {
    if (!Array.isArray(ignoreAdditionalKeys)) {
      ignoreAdditionalKeys = ignoreAdditionalKeys.constructor === String ? [ignoreAdditionalKeys] : [];
    }

    const regexIgnorePrivate = /^_.+/;
    const simpleObject: any = toJS(this);
    const ignoreKeys: string[] = Object.keys(simpleObject)
      .filter(key => regexIgnorePrivate.test(key) || typeof simpleObject[key] === 'function')
      .concat(ignoreAdditionalKeys, 'logger');

    return withoutKeys(ignoreKeys).merge({}, simpleObject);
  }
}
