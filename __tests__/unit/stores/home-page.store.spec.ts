import * as React from 'react';
import { HomePageStore } from '../../../src/stores/home-page.store';

describe ('HomePageStore', () => {
    const HomePageStoreDefaults = HomePageStore.DEFAULTS;

    beforeEach(() => {
        HomePageStore.DEFAULTS = HomePageStoreDefaults;
    });

    it('should initialize with default value', () => {
        HomePageStore.DEFAULTS.title = 'Default title';
        const homePageStore = new HomePageStore();
        expect(homePageStore.title).toBe(HomePageStore.DEFAULTS.title);
        expect(homePageStore.hasTitle).toBeTruthy();
    });

    it('should hydrate store with new value', () => {
        const homePageStore = new HomePageStore();
        const newData = {
            title: 'new title'
        };

        expect(homePageStore.title).toBe(HomePageStore.DEFAULTS.title);
        homePageStore.hydrate(newData);
        expect(homePageStore.title).toBe(newData.title);
    });
});

