import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails';
import Favorites from '../components/Favorites'

const searchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetails: {
        screen: FilmDetails
    }
});

const favoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        }
    },
    FilmDetails: {
        screen: FilmDetails
    }
});

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: searchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image
                        source={require('../assets/images/ic_search.png')}
                        style={styles.icon} />
                )
            }
        }
    },
    Favorites: {
        screen: favoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image
                        source={require('../assets/images/ic_favorite.png')}
                        style={styles.icon} />
                )
            }
        }
    }
},
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    })

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

const appContainer = createAppContainer(MoviesTabNavigator);

export default appContainer;