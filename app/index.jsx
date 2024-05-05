import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants/index'
import CustomButton from '../components/custombutton'

const index = () => {
  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView contentContainerStyle={{ height: "100%" }} >
        <View className="w-full justify-center items-center min-h-[95vh] px-4" >

          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5" >
            <Text className="text-3xl text-white font-bold text-center" >
              Discover Endless Possibilities With{" "} <Text className="text-secondary-200" >Aora</Text>
              {/* <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode='contain' /> */}
            </Text>
          </View>

          <Text className="text-gray-100 mt-7 text-sm font-pregular text-center " >
            <Text className="font-bold" >Explore Limitless Possibilities:</Text> Where Innovation Meets Creativity - Begin Your Journey with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => { router.push('/sign_in') }}
            containerStyle="w-full mt-7"
          />

        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor='#161622' style='light' /> */}
    </SafeAreaView>
  )
}

export default index