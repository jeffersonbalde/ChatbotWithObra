import { View, Text, Pressable, StyleSheet, onPress} from 'react-native'
import React from 'react'

export default function Button2({displayText, onPress}) {
  return (
    <View style={styles.container}>
        <Pressable onPress={onPress}>
            <Text style={styles.text}>
                {displayText}
            </Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    },
    container: {
        backgroundColor: '#14AE5C',
        width: '80%',
        maxHeight: 'fit-content',
        padding: 12,
        borderRadius: 15
    }
})