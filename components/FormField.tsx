import { View, Text ,TextInput, KeyboardTypeOptions, TouchableOpacity,Image} from 'react-native'
import React,{useState} from 'react'
import icons from '../constants/icons'

interface FormFieldProps{
    label:string
    value:string 
    handleChangeText:(e:string)=>void
    otherStyle?:string 
    keyboardType?:KeyboardTypeOptions | undefined
    placeholder?:string
}

type showPasswordType = boolean;

const FormField:React.FC<FormFieldProps> = ({label,value,handleChangeText,otherStyle,keyboardType,placeholder}) => {
 
    const[showPassword ,setShowPassword] = useState<showPasswordType>(false);
    return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base text-gray-100  font-pmedium '>{label}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput 
        value={value}
        placeholderTextColor='#7b7b8b'
        placeholder={placeholder}
        onChangeText={handleChangeText}
        className='flex-1 text-white font-psemibold text-base'
        secureTextEntry={label==='Password' && !showPassword}
        keyboardType={keyboardType}
        />
        {label==='Password' && (
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Image  className='h-10 w-10'  source={!showPassword ? icons.eye :icons.eyehide}/>

            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField