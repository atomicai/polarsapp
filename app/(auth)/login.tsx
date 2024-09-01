import { Button, Pressable, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios, { AxiosError } from 'axios';
import UserIcon from '@/assets/icons/auth/User';
import PasswordIcon from '@/assets/icons/auth/Password';
import GoogleIcon from '@/assets/icons/auth/Google';
import LoginScreenImage from '@/assets/images/auth/Login';
import LoginScreenLogo from '@/assets/images/shared/Logo';
import { SafeAreaView, View, Text, TextInput } from '@/components/Styled';
import { useSession } from '@/storage/ctx';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/shared/services';

export default function LoginScreen() {
  const router = useRouter();
  const [userName, onChangeUserName] = useState('');
  const [password, onChangePassword] = useState('');
  const { signIn } = useSession();

  const mutation = useMutation({
    mutationFn: () => {
      return auth.signIn({
        login: userName,
        password: password
      });
    },
    onSuccess: async (data: string) => {
      signIn(data);
      router.push('/');
    },
    onError: (err: AxiosError) => {}
  });

  const onSignIn = () => {
    mutation.mutate();
  };

  const isSignInDisabled = mutation.isPending || !userName || !password;

  const onGoogleLogin = async () => {
    try {
      const response = await axios.get('https://polaroids.ngrok.app/register/google');

      console.log(response.data);
    } catch (error) {
      console.log('ERROR');
    }
  };

  return (
    <SafeAreaView className="flex-1 items justify-between px-6 pt-12 pb-8 bg-primary">
      <View className="w-full items-center">
        <View className="w-full justify-center flex-row">
          <Text className="text-white opacity-80 text-xs mr-1">НЕТ АККАУНТА?</Text>
          <Pressable onPress={() => router.navigate('/register')}>
            <Text className="font-semibold text-white text-xs">ЗАРЕГИСТРИРОВАТЬСЯ</Text>
          </Pressable>
        </View>

        <LoginScreenImage />

        <View className="mb-2.5">
          <LoginScreenLogo width="238" height="50" />
        </View>

        <View className="w-full space-y-2">
          <View className="h-[50px] p-2.5 px-4 w-full bg-secondary rounded-md flex-row items-center">
            <TextInput
              className="flex-1 text-white"
              onChangeText={onChangeUserName}
              value={userName}
              placeholderTextColor="white"
              placeholder="Никнейм"
            />
            <UserIcon />
          </View>

          <View className="h-[50px] p-2.5 px-4 w-full bg-secondary rounded-md flex-row items-center">
            <TextInput
              className="flex-1 text-white"
              onChangeText={onChangePassword}
              value={password}
              placeholder="Пароль"
              placeholderTextColor="white"
            />
            <PasswordIcon />
          </View>
          {!!mutation.error && (
            <Text className="text-red-700 font-semibold text-xs">{mutation.error.message}</Text>
          )}
          <Text className="text-primary font-semibold text-xs">Забыли пароль?</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          gap: 8
        }}
      >
        <Pressable onPress={onSignIn} disabled={isSignInDisabled}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: !isSignInDisabled ? 'white' : '#9EA8B3'
              }
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                color: !isSignInDisabled ? 'black' : '#7E8B99',
                fontWeight: 600
              }}
            >
              {mutation.isPending ? 'Загрузка' : 'ВОЙТИ'}
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            height: 32,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: 'white',
              opacity: 0.2,
              width: '42%'
            }}
          ></View>
          <Text style={{ color: 'white', fontSize: 10, opacity: 0.5 }}>или</Text>
          <View
            style={{
              height: 1,
              backgroundColor: 'white',
              opacity: 0.2,
              width: '42%'
            }}
          ></View>
        </View>
        <View
          style={[
            styles.button,
            {
              borderWidth: 1,
              borderColor: 'white'
            }
          ]}
        >
          <Pressable
            onPress={onGoogleLogin}
            disabled
            style={{
              gap: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <GoogleIcon />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: 600
              }}
            >
              Войти через Google
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#080C18',
    paddingBottom: 30,
    paddingTop: 50,
    paddingHorizontal: 24
  },
  input: {
    height: 50,
    padding: 10,
    paddingHorizontal: 16,
    color: 'white',
    width: '100%',
    backgroundColor: '#282836',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  text: {
    color: 'white',
    fontSize: 12
  },
  innerInput: {
    flex: 1,
    color: 'white'
  },
  button: {
    height: 50,
    width: '100%',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
