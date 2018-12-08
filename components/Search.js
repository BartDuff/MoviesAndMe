import React from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import filmsData from '../helpers/filmsData';
import FilmItem from './FilmItem';

class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={[styles.textinput, { marginBottom: 10}]} placeholder='Titre du film' />
                <Button style= {{height: 50}} title='Rechercher' onPress={() => { }} />
                <FlatList 
                    data={filmsData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item}) => <FilmItem/> }
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search