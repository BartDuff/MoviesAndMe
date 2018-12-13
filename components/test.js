// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Text, Animated, Easing, Dimensions, PanResponder } from 'react-native'
import HelloWorld from './HelloWorld';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topPosition: 0,
            leftPosition: 0,
        }

        var { height, width } = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if(touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
    }

    // componentDidMount() {
    //     Animated.parallel([
    //         Animated.spring(
    //           this.state.topPosition,
    //           {
    //             toValue: 100,
    //             tension: 8,
    //             friction: 3
    //           }
    //         ),
    //         Animated.timing(
    //           this.state.leftPosition,
    //           {
    //             toValue: 100,
    //             duration: 1000,
    //             easing: Easing.elastic(2)
    //           }
    //         )
    //       ]).start()
    // }

    render() {
        return (
            <View style={styles.main_container}>
                <Animated.View 
                { ...this.panResponder.panHandlers}
                style={[styles.subview_container, { top: this.state.topPosition, left: this.state.leftPosition}]}>
                    {Platform.OS === 'ios' ? <Text>iOs</Text> : <Text>Android</Text>}
                </Animated.View>
                <HelloWorld />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subview_container: {
        backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
        height: Platform.OS === 'ios' ? 100 : 50,
        width: Platform.OS === 'ios' ? 50 : 100
    }
})

export default Test