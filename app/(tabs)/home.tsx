import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppwriteContext } from '../../contexts/AppwriteContext'; // Adjust path if needed
import {  images ,icons} from '../../constants'
import SearchField from '@/components/SearchField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';

import VideoCard from '@/components/VideoCard';


const Home = () => {

  const { post,user ,handleRefresh , latestPost} = useContext(AppwriteContext);
  const [refreshing , setRereshing] = useState<boolean>(false);
  
 

  const onRefresh = async ()=>{
    setRereshing(true);
    await handleRefresh();
    setRereshing(false);
  }



  return (
 <SafeAreaView className='bg-primary flex-1'>

<FlatList

  data={post}
  keyExtractor={(item, index) => `${item.id}-${index}`}
  renderItem={({ item }) => (
    <View className='mb-4'>

    <VideoCard title={item.title} user={item.user} thumbnail={item.thumbnail} video={item.video} />
  </View>
  )}
  

  ListHeaderComponent={() => (
    <View className='my-6 mx-4 space-y-6'>
      <View className='mb-6 flex-row justify-between items-start'>
        <View>
          <Text className='text-sm text-gray-100 font-pmedium'>Welcome Back</Text>
          <Text className='text-2xl text-white font-psemibold'>{user?.username}</Text>
        </View>
        <View>
          <Image
            source={images.logoSmall}
            className='w-9 h-9'
            resizeMode='contain'
          />
        </View>
      </View>
     

        <SearchField />

        <View className='w-full flex-1 pt-5 pb-4'>
        <Text className='font-pmedium text-lg mt-3 text-gray-100'>Trending Videos</Text>
        <Trending item={latestPost} />
 
        </View>
      
      
    </View>
  )}

  ListEmptyComponent={()=>(
      <EmptyState title='No Video Found' subtitle='be the fist one to create a video' />
 
  )}

  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
/>

  

  
 </SafeAreaView>
  )
}

export default Home