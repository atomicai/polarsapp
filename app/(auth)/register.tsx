import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import UserIcon from '@/assets/icons/auth/User';
import PasswordIcon from '@/assets/icons/auth/Password';
import GoogleIcon from '@/assets/icons/auth/Google';
import { useSession } from '@/storage/ctx';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/shared/services';
import { Text as StyledText } from '@/components/Styled';

export default function RegisterScreen() {
  const router = useRouter();
  const [userName, onChangeUserName] = useState('');
  const [password, onChangePassword] = useState('');
  const { signIn } = useSession();

  const mutation = useMutation({
    mutationFn: () => {
      return auth.signUp({
        login: userName,
        password: password
      });
    },
    onSuccess: async (data: string) => {
      signIn(data);
      router.push('/');
    },
    onError: (err) => {}
  });

  const onSignUp = () => {
    mutation.mutate();
  };

  const isSignUpDisabled = mutation.isPending || !userName || !password;

  const onGoogleRegister = async () => {
    try {
      const response = await axios.get('https://polaroids.ngrok.app/register/google');

      console.log(response.data);
    } catch (error) {
      console.log('ERROR');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Pressable onPress={() => router.navigate('/login')}>
              <View
                style={{
                  backgroundColor: '#10162A',
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6
                }}
              >
                <Image
                  style={{
                    width: 8.75,
                    height: 6.26
                  }}
                  source={require('../../assets/images/BackIcon4x.png')}
                />
              </View>
            </Pressable>
            <Text style={styles.text}>Назад</Text>
          </View>
        </View>

        <Image
          style={{
            width: 300,
            height: 300,
            marginVertical: 40
          }}
          source={require('../../assets/images/register4x.png')}
        />

        <View
          style={{
            width: '100%',
            gap: 8
          }}
        >
          <View style={styles.input}>
            <TextInput
              style={styles.innerInput}
              onChangeText={onChangeUserName}
              value={userName}
              placeholderTextColor="white"
              placeholder="Никнейм"
            />
            <UserIcon />
          </View>

          <View style={styles.input}>
            <TextInput
              style={styles.innerInput}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Пароль"
              placeholderTextColor="white"
            />
            <PasswordIcon />
          </View>
          {!!mutation.error && (
            <StyledText className="text-red-700 font-semibold text-xs">
              {mutation.error.message}
            </StyledText>
          )}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          gap: 8
        }}
      >
        <Pressable onPress={onSignUp} disabled={isSignUpDisabled}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: !isSignUpDisabled ? 'white' : '#9EA8B3'
              }
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                color: !isSignUpDisabled ? 'black' : '#7E8B99',
                fontWeight: 600
              }}
            >
              {mutation.isPending ? 'Загрузка' : 'СОЗДАТЬ АККАУНТ'}
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
            onPress={onGoogleRegister}
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
