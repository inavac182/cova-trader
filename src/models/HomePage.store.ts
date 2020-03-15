import { observable, computed, toJS } from 'mobx';
import { StoreDefaults } from '../util/storeDefaults';
import { Store } from '../util/store';

export class HomePageStore extends Store {
  @observable public title: string;

  public storeInitialState: StoreDefaults;

  public setInitialState(): void {
    this.storeInitialState = this.toJSON();
  }

  @computed get hasTitle() {
    return this.title !== '';
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

HomePageStore.DEFAULTS = {
  title: '',
};
