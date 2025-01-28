import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons, images } from "../../constants";
import CustomButton from "@/components/custom_button";
import { useVideoPlayer, VideoView } from "expo-video";
import * as DocumentPicker from "expo-document-picker";
import { useEvent } from "expo";
import { router } from "expo-router";
import { AppwriteContext } from "@/contexts/AppwriteContext";

type FormType = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
};

const Create = () => {

  const [form, setForm] = useState<FormType>({
    title: "",
    video: null,
    thumnail: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const player = useVideoPlayer(form.video?.uri || " ", (player) => {
    player.loop = true;
  });

  const handleExit = () => {
    player?.pause(); // Start playing
  };

  const openPicker = async (selectedType: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          selectedType === "image"
            ? ["image/*"] // Accepts all image formats
            : ["video/*"],
      });

      if (!result.canceled) {
        if (selectedType === "image") {
          setForm({ ...form, thumnail: result.assets[0] });
        }

        if (selectedType === "video") {
          setForm({ ...form, video: result.assets[0] });
        }
      } else {
        setTimeout(() => {
          Alert.alert("document picked", JSON.stringify(result, null, 2));
        }, 100);
      }
    } catch (error) {
      throw error;
    }
  };

  const {appwrite,user} = useContext(AppwriteContext); 

  const handleSubmit = async ()=>{
    if(!form.prompt||!form.thumnail||!form.title||!form.video){
      return Alert.alert('Please Fill All Fields !')
    }

    setUploading(true);

    try{

      if (!user || !user.id) {
        Alert.alert("Error", "User is not logged in or user ID is missing.");
        return;
      }

      await  appwrite.createPost(
        {...form,userId:user.id} 
       )
      Alert.alert('Success','post uploaded successfully');
      router.push('/home'); 

    }catch(e){
        throw e;
    }finally{
      setForm(
        {
          title: "",
          video: null,
          thumnail: null,
          prompt: "",
        }
      );

      setUploading(false);
    }
  }
  return (
    <SafeAreaView className="bg-primary flex-1 p-4">
      <ScrollView>
        <Text className="text-2xl text-white font-psemibold  w-full">
          Upload Video
        </Text>
        <FormField
          label="Video Title"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyle="mt-7"
          placeholder="Give your video a catche title"
        />

        <View>
          <Text className="text-base text-gray-100 mt-7 font-pmedium  w-full">
            Upload Video
          </Text>
          {form.video && player ? (
            <View className="w-full h-52 overflow-hidden bg-black-100 rounded-xl border-2 mt-1 border-black-200 justify-center items-center">
              <VideoView
                className="  w-full h-full "
                style={{ width: "100%", height: 200 }}
                player={player}
                onFullscreenExit={() => handleExit()}
                allowsFullscreen
                allowsPictureInPicture
                contentFit="contain"
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                openPicker("video");
              }}
            >
              <View className="w-full h-52 bg-black-100 rounded-xl border-2 mt-1 border-black-200 justify-center items-center">
                <View className="w-24 h-16 border-secondary-100/60 rounded-xl border-dashed border items-center justify-center">
                  <Image className="w-10 h-10 " source={icons.upload} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text className="text-base text-gray-100 mt-7 font-pmedium  w-full">
            Upload Thumnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumnail ? (
              <View className="w-full h-52 overflow-hidden bg-black-100 rounded-xl border-2 mt-1 border-black-200 justify-center items-center">
                <Image
                  source={{ uri: form.thumnail.uri }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="w-full h-20 bg-black-100 rounded-xl border-2 mt-1 border-black-200  flex-row justify-center items-center gap-2">
                <Image className="w-6 h-6 " source={icons.upload} />
                <Text className="text-base text-gray-100  font-pregular">
                  {" "}
                  Choose file{" "}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          label="AI Prompt"
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyle="mt-7"
          placeholder="The prompt you use to create this video"
        />

        <CustomButton title="Create" isLoading={uploading} handlePress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
