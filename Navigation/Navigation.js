import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails';

const searchStackNavigator = createStackNavigator({
    Search: Search,
    FilmDetails: FilmDetails
});

const appContainer = createAppContainer(searchStackNavigator);

export default appContainer;