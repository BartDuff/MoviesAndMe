import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getgetFilmDetailsFromApi, getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';

class FilmDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    componentDidMount() {
        getgetFilmDetailsFromApi(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film :data,
                    isLoading: false
                })
            })
    }

    _displayFilm() {
        const { film } = this.state;
        if(this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    /> 
                    <Text style={styles.title_text}>{film.title}</Text>
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
    }
});

export default FilmDetails