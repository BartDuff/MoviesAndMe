import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails';

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

const appContainer = createAppContainer(searchStackNavigator);

export default appContainer;