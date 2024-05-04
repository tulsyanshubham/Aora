import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyle,textStyle,isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? "opacity-50" : " "}` } 
    >
      <Text className={`font-psemibold text-primary text-lg ${textStyle}`} > {title} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton