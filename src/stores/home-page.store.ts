import { observable, computed, toJS } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';

export class HomePageStore extends Store {
  @observable public title: string;
  @observable public loading: boolean;
  @observable public path: string;
  @observable public bookSelected: string;

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

HomePageStore.DEFAULTS = {
  title: 'Cova trader',
  loading: true,
};
