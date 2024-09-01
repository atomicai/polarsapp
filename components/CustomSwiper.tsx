import React, { LegacyRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Colors from '@/constants/Colors';

interface CustomSwiperProps {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedTop?: () => void;
  // onSwiped?: () => void;
  renderCard: (card: any) => React.ReactNode;
  // currentIndex: number;
  cards: any[];
}

const CustomSwiper = React.forwardRef<Swiper<any>, CustomSwiperProps>(
  (props: CustomSwiperProps, ref: any) => {
    const pan = React.useRef(new Animated.ValueXY()).current;

    const panResponder = React.useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => {
          const { dx, dy } = gestureState;
          return (
            (Math.abs(dx) > 10 && Math.abs(dy) < 10) || (Math.abs(dy) > 10 && Math.abs(dx) < 10)
          );
        },
        onPanResponderMove: (evt, gestureState) => {
          const { dx, dy } = gestureState;
          if (Math.abs(dy) < 10) {
            // Horizontal movement
            pan.x.setValue(dx);
            pan.y.setValue(0);
          } else if (Math.abs(dx) < 10) {
            // Vertical movement
            pan.x.setValue(0);
            pan.y.setValue(dy);
          }
        },
        onPanResponderRelease: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => {
          const { dx, dy } = gestureState;
          if (dx < -50 && Math.abs(dy) < 10) {
            // Swiped left
            props.onSwipedLeft && props.onSwipedLeft();
          } else if (dx > 50 && Math.abs(dy) < 10) {
            // Swiped right
            props.onSwipedRight && props.onSwipedRight();
          } else if (dy < -50 && Math.abs(dx) < 10) {
            // Swiped up
            props.onSwipedTop && props.onSwipedTop();
          } else {
            // Not swiped far enough, reset position
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
          }
        }
      })
    ).current;

    return (
      <Swiper
        {...props}
        infinite
        ref={ref}
        stackSeparation={-30}
        stackScale={6}
        cardStyle={{
          height: '100%',
          width: '100%'
        }}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        backgroundColor={'transparent'}
        stackSize={2}
        //   onSwiping={() => console.log('SWIPING')}
        disableBottomSwipe
        cardIndex={0}
        renderCard={(card, cardIndex: number) => {
          // if (cardIndex === props.currentIndex)
          //   return (
          //     <Animated.View
          //       {...panResponder.panHandlers}
          //       style={[styles.card, { transform: pan.getTranslateTransform() }]}
          //     >
          //       {props.renderCard(card)}
          //     </Animated.View>
          //   );

          return (
            <Animated.View
              {...panResponder.panHandlers}
              style={[styles.card, { transform: pan.getTranslateTransform() }]}
            >
              {props.renderCard(card)}
            </Animated.View>
          );
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12
  },
  underCard: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1D2A',
    padding: 12
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
    color: 'white'
  }
});

export default CustomSwiper;
