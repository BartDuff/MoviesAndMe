import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform } from 'react-native';
import { getFilmDetailsFromApi, getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state; // on ajoute film et _shareFilms aux parmètres de la navigation
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../assets/images/ic_share.png')}
                    />
                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    _shareFilm = () => {
        const { film } = this.state;
        Share.share({ title: film.title, message: film.overview })
            .then(
                Alert.alert(
                    'Succès',
                    'Film partagé!',
                    [
                        { text: 'OK', onPress: () => { } }
                    ]
                )
            )
            .catch(err =>
                Alert.alert(
                    'Echec',
                    'Film non partagé!',
                    [
                        { text: 'OK', onPress: () => { } }
                    ]
                ))
    }

    _displayFloatingActionButton() {
        const { film } = this.state;
        if (film != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../assets/images/ic_share.png')}
                    />
                </TouchableOpacity>
            )
        }
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
            // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex],
                isLoading: false
            }, () => { this._updateNavigationParams() })
            return
        }
        // Le film n'est pas dans nos favoris, on n'a pas son détail
        // On appelle l'API pour récupérer son détail
        this.setState({ isLoading: true });
        getFilmDetailsFromApi(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                }, () => { this._updateNavigationParams() })
            })
    }

    _toggleFavorite() {
        const action = {
            type: 'TOGGLE_FAVORITE',
            value: this.state.film
        }
        this.props.dispatch(action);
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/images/ic_favorite_border.png');
        var shouldEnlarge = false; // film en non favoris
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../assets/images/ic_favorite.png');
            shouldEnlarge = true; // les bouton doit rétrécir s'il est cliqué alors qu'il est favoris
        }
        return (
            <EnlargeShrink
                shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }

    _displayFilm() {
        const { film } = this.state;
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le: {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note: {film.vote_average}</Text>
                    <Text style={styles.default_text}>Nombre de votes: {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget: {numeral(film.budget).format('0,0[.]00$')}</Text>
                    <Text style={styles.default_text}>Genre(s):
                    {film.genres.map((genre) => genre.name).join(" | ")}</Text>
                    <Text style={styles.default_text}>Companie(s):
                    {film.production_companies.map((company) => company.name).join(" | ")}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 175,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'nowrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: 'gray',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        height: null,
        width: null
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
}
export default connect(mapStateToProps)(FilmDetails)