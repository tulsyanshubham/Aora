import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {EmptyState, SearchInput, VideoCard} from '../../components'
import { searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useappwrite'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query])

  // console.log(query, posts)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
              <View className="mt-6 mb-8" >
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search