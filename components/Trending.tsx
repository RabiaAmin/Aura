import { View, Text, FlatList, TouchableOpacity ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';
import {icons} from '../constants'
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';

// Define the type for the items


interface TrendingProps{
  item: Models.Document[]; // Define `item` as an array of `Item` objects
};

type TrendingItemProps={
  thumbnail: string
  video :string
}

const TrendingItem = ({ thumbnail, video }: TrendingItemProps) => {
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
    <>
      {isPlay ? (
        <View className='w-52 h-72 rounded-3xl border mr-5 border-white mt-5  overflow-hidden '>
          {/* Using VideoView from expo-video */}
          <VideoView
            className="overflow-hidden "
            style={{ width: '100%', height: 200 }}
            player={player}
            
            onFullscreenExit={()=>handleExit()}
            allowsFullscreen
            allowsPictureInPicture
            contentFit='contain'
            
            
          />
         
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className=" mr-5 relative justify-center items-center "
          onPress={() => handlePlay()} // Trigger play on click
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-52 h-72 rounded-3xl mt-5 overflow-hidden shadow-lg shadow-black-200/400"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </>
  );
};


const Trending = ({ item }: TrendingProps) => {


  return (
    <FlatList
      horizontal
      data={item}
      keyExtractor={(item) => item.$id} // Ensure `id` is converted to a string
      renderItem={({ item }) => (
        <TrendingItem thumbnail={item.thumbnail} video={item.video} />
      )}
    />
  );
};

export default Trending;
