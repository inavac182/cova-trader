import { observable, computed, toJS } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';

export class HomePageStore extends Store {
  @observable public title: string;

  @computed get hasTitle() {
    return this.title !== '';
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

HomePageStore.DEFAULTS = {
  title: 'Cova trader',
};
