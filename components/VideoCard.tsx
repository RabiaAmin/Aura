import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

type User = {
  username: string;
};

type VideoCardProp = {
  title: string;
  user: User;
  thumbnail: string;
  video:string
};

const VideoCard = ({ title, user, thumbnail ,video}: VideoCardProp) => {

    const [isPlay, setIsPlay] = useState<boolean>(false);
  
  
    const player = useVideoPlayer(video, (player) => {
      player.loop = true;
  
  
    });
  
      // Listen for changes in the playing state
      const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  
      // Update the `isPlay` state when the playing state changes
      useEffect(() => {
        setIsPlay(isPlaying);
      }, [isPlaying]);
  
  
      const handlePlay = () => {
        setIsPlay(true);
        player.play(); // Start playing
      };
  
      const handleExit = () => {
        setIsPlay(false);
        player.pause(); // Start playing
      };
  return (
    <View className="flex-col  px-4 mb-4">
      <View className="flex-row justify-between items-start gap-3">
        <View className="w-[60vw]">
          <Text
            className="text-white font-psemibold text-xl  "
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text className="text-gray-100 text-xs py-1 ">
            {" "}
            posted by{" "}
            <Text className="text-secondary-100">{user.username}</Text>
          </Text>
        </View>

        <Image source={icons.menu} className="w-5 h-5 mt-3" resizeMode="contain" />
      </View>

      {isPlay ? (
          <View className='w-full h-60 overflow-hidden rounded-3xl border mr-5 border-white my-5 overflow-hidden '>
             {/* Using VideoView from expo-video */}
             <VideoView
               className="overflow-hidden  w-full h-full "
               style={{ width: '100%', height: 200 }}
               player={player}
               
               onFullscreenExit={()=>handleExit()}
               allowsFullscreen
               allowsPictureInPicture
               contentFit='contain'
               
               
             />
            
           </View>
      ) : (
        <TouchableOpacity activeOpacity={0.7} className="w-full h-60 justify-center items-center" onPress={()=>handlePlay()}>
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute"  resizeMode="contain"/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
