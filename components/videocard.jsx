import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar }, tag } }) => {

    const [play, setPlay] = useState(false)
    const tagarr = JSON.parse(tag);

    return (
        <View className="flex flex-col items-center px-4 mb-10">

            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                        />
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>
            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-72 rounded-xl mt-3 "
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-14 h-14 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
            {tag && (
                <View className="flex items-start flex-row flex-wrap w-[90vw] mt-3">
                    {tagarr.map((tag_ele, index) => (
                        <Text className="mx-[3px] text-gray-500 " key={index} >
                            {tag_ele.toLowerCase()}
                        </Text>
                    ))
                        }
                </View>
            )}
        </View>
    )
}

export default VideoCard