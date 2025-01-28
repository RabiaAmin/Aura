import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppwriteContext } from '../../contexts/AppwriteContext'; // Adjust path if needed
import {  images ,icons} from '../../constants'
import SearchField from '@/components/SearchField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';

import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';


const Search = () => {



const {query} = useLocalSearchParams();

  const {searchedPost} = useContext(AppwriteContext);

  console.log('this is Search data ::' , searchedPost);



  return (
 <SafeAreaView className='bg-primary h-[100vh]'>

<FlatList

  data={searchedPost}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View className='pt-6'>

      <VideoCard title={item.title} user={item.user} thumbnail={item.thumbnail} video={item.video} />
    </View>
  )}
  

  ListHeaderComponent={() => (
    <View className='my-6 mx-4 space-y-6'>
      <View className='mb-6 flex-row justify-between items-start'>
        <View>
          <Text className='text-sm text-gray-100 font-pmedium'>Your Search for</Text>
          <Text className='text-2xl text-white font-psemibold'>{query}</Text>
        </View>
        <View>
          <Image
            source={images.logoSmall}
            className='w-9 h-9'
            resizeMode='contain'
          />
        </View>
      </View>
      <SearchField  />
    </View>
  )}

  ListEmptyComponent={()=>(
      <EmptyState title='No Video Found' subtitle='be the fist one to create a video' />
 
  )}


/>

  

  
 </SafeAreaView>
  )
}

export default Search










