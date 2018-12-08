import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class FilmItem extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{ uri: "image" }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>Titre du film</Text>
                        <Text style={styles.vote_text}>Vote</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>Description</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.date_text}>Sorti le 00/00/0000</Text>
                    </View>
                </View>
            </View>
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
        fontWeight: 'bold',
        fontSize: 20,
        paddingRight: 5
    }
})

export default FilmItem