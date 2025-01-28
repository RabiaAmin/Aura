import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import image from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/custom_button';
import { Link } from 'expo-router';
import { AppwriteContext } from '../../contexts/AppwriteContext'; // Adjust path if needed

interface FormProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<FormProps>({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { appwrite, setIsLoggedIn ,setUser} = useContext(AppwriteContext); // Access AppwriteService and isLoggedIn setter
  const router = useRouter(); // For navigation

  async function handleSubmit(): Promise<void> {
    setIsSubmitting(true);
    try {
       await appwrite.logInAccount({
        email: form.email,
        password: form.password,
      });
      const session = await appwrite.getCurrentSession();
      if (session) {
        setUser(session);
        setIsLoggedIn(true); // Update login state
        router.replace('/home'); // Redirect to the tabs page
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center my-6 px-4">
          <Image
            className="w-[130px] h-[84px]"
            resizeMode="contain"
            source={image.logo}
          />
          <Text className="text-white text-2xl font-psemibold text-semibold">
            Log in to Aora
          </Text>
          <FormField
            label="Email"
            value={form.email}
            otherStyle="mt-7"
            handleChangeText={(e: string) =>
              setForm({ ...form, email: e })
            }
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            otherStyle="mt-7"
            handleChangeText={(e: string) =>
              setForm({ ...form, password: e })
            }
           
          />
          <CustomButton
            title="Sign In"
            isLoading={isSubmitting}
            handlePress={handleSubmit}
            containerStyle="mt-7"
          />
          <View className="justify-center flex-row gap-2 pt-5">
            <Text className="text-gray-100 text-lg font-pregular">
              Don't have an account?{' '}
              <Link href="/sign_up" className="text-secondary text-lg font-psemibold">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
