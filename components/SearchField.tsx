import { View, Text ,TextInput, KeyboardTypeOptions, TouchableOpacity,Image, Alert} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'
import { AppwriteContext } from '@/contexts/AppwriteContext'




function handlePress(value:string,pathName:string){
    if(!value){
     return  Alert.alert("Missing Query",'please input something')
    }

    if(pathName.startsWith('/search'))router.setParams({value})
    else router.push(`/search/${value}`)
}



const SearchField:React.FC = () => {
const pathName = usePathname();
  const {query,setQuery} = useContext(AppwriteContext);
  const [value, setValue] = useState<string>(query);
 
 

    return (
    <View >
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-red-400 items-center flex-row'>
        <TextInput 
        value={value}
        placeholder='Search for a video topic'
        placeholderTextColor='#7b7b8b'
        onChangeText={(e)=>setValue(e)}
        className='flex-1 text-white font-psemibold text-base'

        />
     
            <TouchableOpacity onPress={()=>{setQuery(value),handlePress(  value,pathName)}}>
                <Image  className='h-5 w-5'  source={icons.search}/>
            </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default SearchField


