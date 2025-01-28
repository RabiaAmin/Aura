import { View, Text  ,Image,ImageSourcePropType} from 'react-native'
import React from 'react'
import { Tabs ,Redirect } from 'expo-router'

import icons from '../../constants/icons'
import TabIcon from '@/components/tab_icon'




const TabsLayout = () => {
  return (
<>
<Tabs
 screenOptions={{
    tabBarShowLabel:false,
    tabBarActiveTintColor: '#FFA001',
    tabBarInactiveTintColor: '#CDCDE0',
     tabBarHideOnKeyboard: true,
    tabBarStyle:{
        backgroundColor:'#161622',
        borderTopWidth:1,
        borderTopColor:'#232533',
        height:55,
        paddingTop:8,
        

    }
 }}
>
    <Tabs.Screen
    name='home'
    options={{
        title:'Home',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
           <TabIcon icon={icons.home} color={color} focused={focused} name='Home' />
        ),
 
    }}

    />

<Tabs.Screen
    name='create'
    options={{
        title:'Create',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
           <TabIcon icon={icons.plus} color={color} focused={focused} name='Create' />
        ),
 
    }}

    />
     <Tabs.Screen
    name='bookmark'
    options={{
        title:'Bookmark',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
           <TabIcon icon={icons.bookmark} color={color} focused={focused} name='Bookmark' />
        ),
 
    }}

    />
     <Tabs.Screen
    name='profile'
    options={{
        title:'Profile',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
           <TabIcon icon={icons.profile} color={color} focused={focused} name='Profile' />
        ),
 
    }}

    />

 </Tabs>
</>
  )
}

export default TabsLayout