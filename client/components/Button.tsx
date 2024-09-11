import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    onPress: () => void;
    label: string;
}

export default function Button({label, onPress}: CustomButtonProps) {
  return (
    <Pressable className='bg-[#2C2C2C] w-72 h-16 items-center rounded-xl mt-2' onPress={onPress}>
        <Text className='text-[#FFFFFF] text-2xl p-3'>{label}</Text>
    </Pressable>
  )
}