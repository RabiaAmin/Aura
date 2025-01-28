import { View, Text ,Image} from 'react-native'
import React from 'react'
import {  images } from '../constants'
import CustomButton from './custom_button'
import { router } from 'expo-router'

interface EmptyStateProp{
    title:string
    subtitle:string
}

const EmptyState = ({title,subtitle}:EmptyStateProp) => {
  return (
    <View className='justify-center items-center '>
      <Image source={images.empty} className='w-20 h-20 ' resizeMode='contain'/>
               <Text className='text-2xl text-white font-psemibold'>{title}</Text>
               <Text className='text-sm text-gray-100 font-pmedium'>{subtitle}</Text>
               <View className='w-full p-8 '>
               <CustomButton title='Create Video' handlePress={()=>router.push('/create')} />
               </View>
    </View>
  )
}

export default EmptyState