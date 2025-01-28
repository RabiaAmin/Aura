import {  Text, TouchableOpacity } from 'react-native'
import React from 'react'




interface CustomButtonProps{
  handlePress?:()=>void,
  isLoading?:boolean,
  title:string,
  textStyle?:string,
  containerStyle?:string

}


const CustomButton: React.FC<CustomButtonProps> = ({handlePress, containerStyle, isLoading , title , textStyle}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className= {`bg-secondary mt-7 min-h-[62px]  rounded-xl justify-center items-center  ${containerStyle}  ${isLoading?'opacity-50':''} `}
    disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton