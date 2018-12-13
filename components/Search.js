import React from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator, SafeAreaView } from 'react-native';
//import filmsData from '../helpers/filmsData';
import FilmList from './FilmList';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0; // page courante
        this.totalPages = 0; // nombre total de pages
        this.state = {
            films: [],
            isLoading: false
        };
    }

    _loadFilms = () => {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) // on lance le chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false // on arrête le chargement
                });
            });
        }
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: [],
        }, () => {
            this._loadFilms();
        })
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

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.main_container}>
                    <TextInput
                        style={[styles.textinput, { marginBottom: 10 }]}
                        placeholder='Titre du film'
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._searchFilms()}
                    />
                    <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchFilms()} />
                    <FilmList
                        films={this.state.films}
                        navigation={this.props.navigation}
                        loadFilms={this._loadFilms}
                        page={this.page}
                        totalPages={this.totalPages}
                        favoriteList={false}
                    />
                    {this._displayLoading()}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search