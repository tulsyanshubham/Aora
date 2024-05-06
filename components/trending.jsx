import { act, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 }
}

const zoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  // console.log(activeItem.$id)
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className="Text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40    border-2 border-red-500"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode='contain'
          />

        </ TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemChanged = ({viewableItems}) => {
    if(viewableItems.length>0){
      setActiveItem(viewableItems[0].item.$id)
      // console.log(viewableItems[0]);
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{ //configure how items are determined to be "viewable"
        itemVisiblePercentThreshold : 70 // item is considered visible if at least 70% of it is within the viewport
      }}
      contentOffset={{x:150}} //initial scroll position
      horizontal
    />
  )
}

export default Trending