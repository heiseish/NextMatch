
'use strict';

import React, { Component } from 'react';
import { closeDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import Navigator from 'Navigator';
import { connect } from 'react-redux';

import Login from './setup';
import TabBar from '../View/TabBar';
import Ranking from '../View/Ranking';
import TeamView from '../View/TeamView';
import Signup from './Signup';

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        var currentState = state;

        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};

// const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};

class AppNavigator extends Component {

    constructor(props){
        super(props);
        this.popRoute = this.popRoute.bind(this);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        // this.props.store.subscribe(() => {
        //     if(this.props.store.getState().drawer.drawerState == 'opened')
        //         this.openDrawer();

        //     if(this.props.store.getState().drawer.drawerState == 'closed')
        //         this._drawer.close()
        // });

        // BackAndroid.addEventListener('hardwareBackPress', () => {
        //     var routes = this._navigator.getCurrentRoutes();

        //     if(routes[routes.length - 1].id == 'home' || routes[routes.length - 1].id == 'login') {
        //         return false;
        //     }
        //     else {
        //         this.popRoute();
        //         return true;
        //     }
        // });
    }

    popRoute() {
        this.props.popRoute();
    }

    // openDrawer() {
    //     this._drawer.open();
    // }

    // closeDrawer() {
    //     if(this.props.store.getState().drawer.drawerState == 'opened') {
    //         this._drawer.close();
    //         this.props.closeDrawer();
    //     }
    // }

    render() {
        return (
            // <Drawer
            //     ref={(ref) => this._drawer = ref}
            //     type="overlay"
            //     content={ <SideBar navigator={this._navigator} /> }
            //     tapToClose={true}
            //     acceptPan={false}
            //     onClose={() => this.closeDrawer()}
            //     openDrawerOffset={0.2}
            //     panCloseMask={0.2}
            //     negotiatePan={true}>
            //     </Drawer>
                
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return {
                            ...Navigator.SceneConfigs.FloatFromRight,
                            gestures: {}
                        };
                    }}
                    initialRoute={{name: 'Login'}}
                    renderScene={this.renderScene}
                />
            
        );
    }

    renderScene(route, navigator) {
        switch (route.name) {
            case 'Login':
                return <Login navigator={navigator} />;
            case 'Signup':
                return <Signup navigator ={navigator}  />
            case 'TabBar':
                return <TabBar navigator={navigator} />;
            case 'Ranking':
                return <Ranking navigator={navigator} />;
            case 'TeamView':
                return <TeamView navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;
        }
    }
}

// function bindAction(dispatch) {
//     return {
//         closeDrawer: () => dispatch(closeDrawer()),
//         popRoute: () => dispatch(popRoute())
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         drawerState: state.drawer.drawerState
//     }
// }

export default /*connect(mapStateToProps, bindAction)*/ AppNavigator;
