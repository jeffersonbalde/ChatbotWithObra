import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from '@/components/SafeViewAndroid'

export default function ManageUsersScreen() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Text>Test</Text>
    </SafeAreaView>
  )
}   