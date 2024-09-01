import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  Touchable,
  Pressable
} from 'react-native';
import Colors from '@/constants/Colors';
import Logo from '@/assets/images/shared/Logo';
import { useRouter } from 'expo-router';
import { useSession } from '@/storage/ctx';

type Tab = {
  title: string;
  amount: number;
};

const tabs: Tab[] = [
  {
    title: 'Достижения',
    amount: 50
  },
  {
    title: 'Ассоциации',
    amount: 120
  },
  {
    title: 'Уровень',
    amount: 30
  }
];

const pages: string[] = ['Достижения', 'Любимые', 'Настройки'];

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useSession();
  const windowWidth = Dimensions.get('window').width;
  const responsiveTabSize = windowWidth / 3.6;
  const responsiveImageSize = windowWidth / 2;
  const responsiveImageBorderSize = responsiveImageSize + 30;
  const responsiveUserNameFontSize = windowWidth / 18;
  const responsiveUserNameLineHeight = windowWidth / 17;

  const responsiveTabTitleFontSize = windowWidth / 29;
  const responsiveTabTitleLineHeight = windowWidth / 26;

  const responsiveTabAmountFontSize = windowWidth / 16;
  const responsiveTabAmountLineHeight = windowWidth / 14;

  const responsivePagePadding = windowWidth / 26;

  const onClick = () => {
    router.push('/modal');
  };

  const onSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark['background'],
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 24,
        paddingTop: 60
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexGrow: 1
        }}
      >
        <Logo width="143" height="30" />

        <View
          style={{
            width: responsiveImageBorderSize,
            height: responsiveImageBorderSize,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveImageBorderSize,
            borderColor: '#FDF731',
            borderWidth: 3,
            marginTop: 20
          }}
        >
          <Image
            style={{
              width: responsiveImageSize,
              height: responsiveImageSize,
              backgroundColor: 'green',
              resizeMode: 'cover'
            }}
            borderRadius={responsiveImageSize}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/polaroids-26b50.appspot.com/o/TEST2.jpg?alt=media&token=6bb51350-922a-45ee-9306-219486fee438'
            }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            lineHeight: responsiveUserNameLineHeight,
            fontSize: responsiveUserNameFontSize,
            fontWeight: 600,
            marginTop: 20
          }}
        >
          alexsheks
        </Text>
        <View
          style={{
            flexDirection: 'row',

            marginTop: 20,
            justifyContent: 'space-between',

            width: '100%'
          }}
        >
          {tabs.map((tab, index) => (
            <View
              key={index}
              style={{
                borderRadius: 20,
                borderColor: 'white',
                borderWidth: 1,
                width: responsiveTabSize,
                height: responsiveTabSize,
                padding: 12,
                paddingVertical: 12,
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <Text
                style={{
                  color: 'white',
                  lineHeight: responsiveTabAmountLineHeight,
                  fontSize: responsiveTabAmountFontSize,
                  fontWeight: 600
                }}
              >
                {tab.amount}
              </Text>
              <Text
                style={{
                  color: 'white',
                  lineHeight: responsiveTabTitleLineHeight,
                  fontSize: responsiveTabTitleFontSize,
                  fontWeight: 400
                }}
              >
                {tab.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          gap: 8
        }}
      >
        {/* {pages.map((page, index) => (
          <Pressable key={index} onPress={onClick}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#282836',
                padding: responsivePagePadding
              }}
            >
              <Text
                style={{
                  color: 'white',
                  lineHeight: responsiveTabTitleLineHeight,
                  fontSize: responsiveTabTitleFontSize
                }}
              >
                {page}
              </Text>
            </View>
          </Pressable>
        ))} */}
        <Pressable onPress={onSignOut}>
          <Text
            style={{
              color: 'white'
            }}
          >
            ВЫЙТИ
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
