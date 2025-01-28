import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppwriteContext } from '../../contexts/AppwriteContext'; // Adjust path if needed
import {  images ,icons} from '../../constants'
import SearchField from '@/components/SearchField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';

import VideoCard from '@/components/VideoCard';
import { router } from 'expo-router';


const profile = () => {

  const {userPost,appwrite,setUser,setIsLoggedIn,user} = useContext(AppwriteContext);

  const handleLogOut = async()=>{
    await appwrite.logOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign_in');

  }

  return (
 <SafeAreaView className='bg-primary h-[100vh]'>

<FlatList

  data={userPost}
  keyExtractor={(item,index) => `${item}-${index}`}
  renderItem={({ item }) => (
    <View className='pt-6'>

      <VideoCard title={item.title} user={item.user} thumbnail={item.thumbnail} video={item.video} />
    </View>
  )}
  

  ListHeaderComponent={() => (
    <View className='w-full justify-center items-center p-4'>
      <View className='w-full mb-6 flex-row justify-end'>
        <TouchableOpacity onPress={handleLogOut}>

          <Image
            source={icons.logout}
            className='w-9 h-9'
            resizeMode='contain'
          />
        </TouchableOpacity>

       
      </View>
      <View className='w-20 h-20 border border-secondary-100   rounded-lg items-center justify-center p-1 '>
        <Text className=' text-bold text-white font-pregular text-center text-4xl'>R</Text>

      </View>
      <Text className='text-white font-psemibold w-full text-center my-4'>{user?.username}</Text>
      <View className='w-full flex-row justify-evenly items-center mt-4'>
        <View className='flex-col items-center justify-center'>
          <Text className='text-white font-semibold text-2xl '>3</Text>
          <Text className='text-white text-sm font-pregular'>Posts</Text>
        </View>

        <View className='flex-col items-center justify-center'>
          <Text className='text-white font-semibold text-2xl '>3.5k</Text>
          <Text className='text-white text-sm font-pregular'>Followers</Text>
        </View>
      </View>
   
    </View>
  )}

  ListEmptyComponent={()=>(
      <EmptyState title='No Video Found' subtitle='be the fist one to create a video' />
 
  )}


/>

  

  
 </SafeAreaView>
  )
}

export default profile










