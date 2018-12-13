import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../assets/images/ic_favorite.png')}
                />
            )
        }
    }

    render() {
        const { film, displayDetailsForFilm } = this.props;
        return (
            <FadeIn>
                <TouchableOpacity style={styles.main_container}
                    onPress={() => this.props.displayDetailsForFilm(film.id)}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.poster_path) }}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text} numberOfLines={2}>{film.title}</Text>
                            <Text style={styles.vote_text}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'lightgrey'
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'grey'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: 'grey',
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    title_text: {
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        fontWeight: 'bold',
        fontSize: 18,
        paddingRight: 5
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem