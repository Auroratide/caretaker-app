import React, {Component} from 'react';
import renderer from 'react-test-renderer';
import {TabNavigator} from 'react-navigation';

import UserGateway, {Permissions} from '../../data/UserGateway/';
import Navigation from './index.js';
import {adminRoutes, helperRoutes, config} from './config.js';

describe('Navigation', () => {

    beforeEach(() => {
        TabNavigator.mockReset();
        TabNavigator.mockReturnValue(MockTabNavigator)
    })

    it('snapshot', () => {
        jest.spyOn(UserGateway, 'getCurrentPermissions')
            .mockReturnValue(Permissions.HELPER);
        expect(renderer.create(<Navigation />)).toMatchSnapshot();
    })

    it('should get the permissions from the user gateway', () => {
        jest.spyOn(UserGateway, 'getCurrentPermissions')
            .mockReturnValue(Permissions.HELPER);
        const navigation = renderer
            .create(<Navigation />)
            .getInstance();

        expect(navigation.state.userType).toBe(Permissions.HELPER);
    })

    it('should use the admin routes when the user is an admin', () => {
        jest.spyOn(UserGateway, 'getCurrentPermissions')
            .mockReturnValue(Permissions.ADMIN);
        const navigation = renderer
            .create(<Navigation />)
            .getInstance();

        expect(TabNavigator).toHaveBeenCalledWith(adminRoutes, config);
    })

    it('should use the admin routes when the user is a focus', () => {
        jest.spyOn(UserGateway, 'getCurrentPermissions')
            .mockReturnValue(Permissions.FOCUS);
        const navigation = renderer
            .create(<Navigation />)
            .getInstance();

        expect(TabNavigator).toHaveBeenCalledWith(adminRoutes, config);
    })

    it('should use the helper routes when the user is a helper', () => {
        jest.spyOn(UserGateway, 'getCurrentPermissions')
            .mockReturnValue(Permissions.HELPER);
            const navigation = renderer
                .create(<Navigation />)
                .getInstance();

        expect(TabNavigator).toHaveBeenCalledWith(helperRoutes, config);
    })

    it('should render null when the state is not set', () => {
        const navigation = renderer
            .create(<Navigation />)
            .getInstance();
        navigation.state.userType = null;

        expect(navigation.render()).toBe(null);
    })

})


class MockTabNavigator extends Component {
    render(){
        return (
            <div>Mock Tab Navigator</div>
        );
    }
}