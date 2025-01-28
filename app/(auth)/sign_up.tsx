import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/custom_button';
import { Link, useRouter } from 'expo-router';
import { AppwriteContext } from '../../contexts/AppwriteContext';

interface formProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<formProps>({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { appwrite } = useContext(AppwriteContext); // Access Appwrite service and auth state
  const router = useRouter(); // For navigation

  async function handleSubmit(): Promise<void> {
    setIsSubmitting(true);
    try {
      // Call Appwrite createUserAccount method
      const user = await appwrite.createUserAccount({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      if (user) {
        router.replace('/home'); // Redirect to the main page
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center my-6 px-4">
          <Image className="w-[130px] h-[84px]" resizeMode="contain" source={image.logo} />
          <Text className="text-white text-2xl font-psemibold text-semibold">Sign Up to Luna</Text>

          <FormField
            label="Username"
            value={form.username}
            otherStyle="mt-7"
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
          />
          <FormField
            label="Email"
            value={form.email}
            otherStyle="mt-7"
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            otherStyle="mt-7"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
          />
          <CustomButton
            title="Sign Up"
            isLoading={isSubmitting}
            handlePress={handleSubmit}
            containerStyle="mt-7"
          />
          <View className="justify-center flex-row gap-2 pt-5">
            <Text className="text-gray-100 text-lg font-pregular">
              already have an account?
              <Link href="/sign_in" className="text-secondary text-lg font-psemibold">
                sign in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
