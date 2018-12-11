import { createStackNavigator } from 'react-navigation';
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails';

const searchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetails: FilmDetails,
    navigationOptions: {
        title: 'Détails'
    }
})

export default searchStackNavigator