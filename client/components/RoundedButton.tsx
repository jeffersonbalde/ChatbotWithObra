import { View, Text, Pressable } from 'react-native'

interface CustomButtonProps {
    onPress: () => void;
    label: string;
}

export default function RoundedButton({label, onPress}: CustomButtonProps) {
  return (
    <Pressable className='bg-[#2C2C2C] w-80 h-14 items-center rounded-full mt-2' onPress={onPress}>
        <Text className='text-[#FFFFFF] text-xl p-3'>{label}</Text>
    </Pressable>
  )
}