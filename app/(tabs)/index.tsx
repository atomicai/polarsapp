import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Button,
  Pressable,
  ScrollView
} from 'react-native';

import { useMutation, useQuery } from '@tanstack/react-query';
import { GET_POLAROIDS_QUERY_KEY } from '@/shared/api/query-keys';
import { polaroids } from '@/shared/services';
import Colors from '@/constants/Colors';
import CustomSwiper from '@/components/CustomSwiper';
import example_polaroids from '@/data/polaroids.json';
import { Keyphrase, Keyword, Polaroid, PolaroidResponse } from '@/shared/types/polaroids';
import { useState, useRef, useEffect, ReactElement } from 'react';
import TabBarIcon from '@/components/icons/tabs/utils';
import Swiper from 'react-native-deck-swiper';
import { API_BASE_URL } from '@/shared/api';
// @ts-ignore: Unreachable code error
import Highlighter from 'react-highlight-words';

const tagColors = ['#9D50BB', '#00AFD1', '#FDF731'];
const tagRGBAColors = [
  'rgba(157, 80, 187, 0.1)',
  'rgba(0, 175, 209, 0.1)',
  'rgba(253, 247, 49, 0.1)'
];

export default function HomeScreen() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<Swiper<any> | null>(null);
  const [images, setImages] = useState([]);

  const onSwipedLeft = () => {
    console.log('Swiped Left');
  };

  const onSwipedRight = () => {
    console.log('Swiped Right');
  };

  const onSwipedTop = () => {
    console.log('Swiped Top');
  };

  // const onSwiped = async () => {
  //   if (!data) return;
  //   if (currentIndex === data.length - 1) {
  //     setCurrentIndex(0);
  //     return;
  //   }
  //   setCurrentIndex(currentIndex + 1);
  // };

  async function handleDislike() {
    swiperRef.current?.swipeLeft();
  }

  async function handleSuperlike() {
    swiperRef.current?.swipeTop();
  }

  async function handleLike() {
    swiperRef.current?.swipeRight();
  }

  const mutation = useMutation({
    mutationFn: () => {
      return polaroids.getPolaroids({
        top: 4,
        previous_ids: []
      });
    },
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // useEffect(() => {
  //   mutation.mutate();
  // }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark['background'],
        flexGrow: 1
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 35,
            paddingBottom: 35,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'white',
            maxHeight: 30,
            width: '100%'
          }}
        >
          <Image
            style={{ width: 143, height: 30 }}
            source={require('../../assets/images/logo.png')}
          />
        </View>

        <View style={styles.cardContainer}>
          <CustomSwiper
            ref={swiperRef}
            // cards={mutation.data ?? example_polaroids}
            cards={example_polaroids}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            onSwipedTop={onSwipedTop}
            // onSwiped={onSwiped}
            // currentIndex={currentIndex}
            renderCard={(card: PolaroidResponse) => (
              <View style={styles.cardWrapper} key={card.id}>
                <Image
                  style={{
                    width: '100%',
                    maxHeight: 500,
                    height: '60%',
                    backgroundColor: 'green',
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                  source={{
                    uri: card.media_path
                  }}
                />
                <View style={styles.cardButtons}>
                  <Pressable
                    style={[styles.buttonWrapper, { backgroundColor: 'white' }]}
                    onPress={handleDislike}
                  >
                    <TabBarIcon
                      collection="ant-design"
                      color={'black'}
                      name="closecircle"
                      size={24}
                    />
                  </Pressable>
                  <Pressable
                    style={[
                      styles.bigButtonWrapper,
                      { backgroundColor: 'black', borderColor: '#FDF731', borderWidth: 2 }
                    ]}
                    onPress={handleSuperlike}
                  >
                    <TabBarIcon
                      collection="font-awesome"
                      color={'#FDF731'}
                      name="hotjar"
                      size={30}
                    />
                  </Pressable>
                  <Pressable
                    style={[styles.buttonWrapper, { backgroundColor: 'white' }]}
                    onPress={handleLike}
                  >
                    <TabBarIcon
                      collection="ionicons"
                      color={'black'}
                      name="heart-dislike-circle"
                      size={32}
                    />
                  </Pressable>
                </View>
                <ScrollView fadingEdgeLength={120} style={{ flexGrow: 1, maxHeight: '14%' }}>
                  <Text style={styles.text}>{toReactElement(card)}</Text>
                </ScrollView>

                {/* <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 26
                  }}
                >
                  {card.tags.map((tag, index) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: 40,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: tagRGBAColors[index]
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: tagColors[index]
                        }}
                      >
                        #{tag}
                      </Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 18,
                    gap: 6,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  {card.reactions.map((reaction, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      key={index}
                    >
                      <TabBarIcon collection="ant-design" color={'red'} name="heart" size={15} />
                      <Text style={{ color: 'white', fontSize: 12 }}>{reaction.count}</Text>
                    </View>
                  ))}
                </View> */}
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 24
    // backgroundColor: 'red'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  cardContainer: {
    width: '100%',
    flex: 1,
    flexGrow: 1
    // backgroundColor: 'white'
  },
  cardButtons: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    gap: 12
  },
  buttonWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigButtonWrapper: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'transparent',
    color: 'white'
  }
});

type Keystone = {
  first: number;
  last: number;
  text: string;
};

function toReactElement({ text, keyphrases, keywords }: PolaroidResponse): ReactElement | string {
  if (!keyphrases && !keywords) return text;

  const keystones: string[] = (keyphrases ?? [])
    .map((item) => item.phrase)
    .concat((keywords ?? []).map((item) => item.word));

  const highlights: Keystone[] = keystones.map((h) => {
    const indexOfFirst = text.indexOf(h);
    const indexOfLast = indexOfFirst + h.length - 1;
    return {
      first: indexOfFirst,
      last: indexOfLast,
      text: h
    };
  });

  let modifiedText = text;

  const newH = highlights.map((word, index) => {
    modifiedText = text.replace(word.text, 'SPECIAL');
    const slice = text.slice(word.first, word.last + 1);
    return {
      ...word,
      sliceWord: slice
    };
  });

  const words: string[] = text.split('SPECIAL');

  console.log(highlights);
  // console.log(modifiedText);
  const blocks = newH.map((word, index) => {});
  return <>{blocks}</>;
}
