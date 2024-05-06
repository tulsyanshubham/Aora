import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './custombutton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="flex justify-center items-center px-4">
            <Image
                source={images.empty}
                resizeMode="contain"
                className="w-[270px] h-[216px]"
            />
            <Text className="text-xl text-center font-psemibold text-white mt-2">{title}</Text>
            <Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>
            <CustomButton
                title="Create Video"
                handlePress={() => router.push("/create")}
                containerStyle="w-full my-5"
            />
        </View>
    )
}

export default EmptyState