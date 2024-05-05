import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants/index'

const FormField = ({ title, value, handleChangeText, otherStyle, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyle}`} >
            <Text className="text-gray-100 text-base font-pmedium" >{title}</Text>
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row" >
                <TextInput
                    className="flex-1 text-white text-base font-psemibold"
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className="w-7 h-7"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField