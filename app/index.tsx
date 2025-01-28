import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useEffect } from 'react'
import {  router,Redirect } from 'expo-router'
import {  images } from '../constants'
import CustomButton from '../components/custom_button'
import { AppwriteContext } from '@/contexts/AppwriteContext'





const index = () => {
  const {isLoggedIn} = useContext(AppwriteContext);
  

  if( isLoggedIn){
    return <Redirect href="/home"  />
  }



  return (
  <SafeAreaView className='bg-primary h-full' >
    <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className='w-full  min-h-[85vh]  justify-center items-center px-4  '>
          <Image source={images.logo} className='w-[130px] h-[84px] ' resizeMode='contain'  />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
          <View className='relative mt-5'>
            <Text className='font-bold text-3xl color-white text-center px-3'>Discover Endless Possiblity With <Text className='text-secondary-200'> Aura! </Text> </Text>
          <Image source={images.path} className='w-[130px] h-[14px] absolute -bottom-2 -right-5 ' resizeMode='contain'  />
            
          </View>
          <Text className='text-gray-200 mt-7 text-center text-sm font-pregular'>Where Creativity Meets Innvation: embark on a journey of limitless exploration with aura</Text>

          <CustomButton title='Sign In' handlePress={():void=>router.push('/sign_in') } containerStyle="w-full"   />
          <CustomButton title='Sign up' handlePress={():void=>router.push('/sign_up') } containerStyle="w-full"   />

      </View>

      
        
   

    </ScrollView>

  </SafeAreaView>
  )
}

export default index

