import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants/index'
import FormField from '../../components/formfield'
import CustomButton from '../../components/custombutton'
import { createUser } from '../../lib/appwrite'
import { useGlovalContext } from '../../context/GlobalProvider'

const SignUp = () => {

  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlovalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "" || form.username === "") {
      Alert.alert("Error", "Please fill in all the fields")
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.username, form.email, form.password);
      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "Account Created")
      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6" >
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10" >Sign Up</Text>
          <FormField
            title={'Username'}
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyle="mt-7"
          />
          <FormField
            title={'Email'}
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyle="mt-7"
            keyBoardType="email-address"
          />
          <FormField
            title={'Password'}
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyle="mt-7"
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular" >Already have an account?</Text>
            <Link className='text-lg font-psemibold text-secondary' href='/sign_in'> Login </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp