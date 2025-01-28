import { View, Text  ,Image,ImageSourcePropType} from 'react-native'
interface TabIconProps{
    icon: ImageSourcePropType
    color: string
    focused: boolean
    name: string
}

const TabIcon :React.FC<TabIconProps>  = ({icon,color,focused,name})=>{
    return (
        <View className=' items-center  justify-center gap-2 w-16' >
            <Image
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className='w-6 h-6'
            />
            <Text className={`${focused?'font-psemibold':'font-pregular'} text-xs text-center `} style={{color:color}} >
                {name}</Text>
        </View>
    )
}


export default TabIcon;