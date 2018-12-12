import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FilmItem from './FilmItem';
import { connect } from 'react-redux';

class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
    }

    _displayDetailsForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetails", { idFilm: idFilm });
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={
                    ({ item }) => <FilmItem
                        film={item}
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailsForFilm={this._displayDetailsForFilm} />}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.films.length > 0 && this.props.page < this.props.totalPages) {
                        this.props.loadFilms();
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)