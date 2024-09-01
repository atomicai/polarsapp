import { ReactElement } from 'react';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import HomeIcon from './HomeIcon';
import MessageIcon from './MessageIcon';

interface IconProps {
  name: IconName;
}

function TabBarIcon(props: IconProps) {
  return (
    <View style={tw`w-5 h-5 flex justify-center`} {...props}>
      {icons[props.name]}
    </View>
  );
}

export default TabBarIcon;

const icon_names = {
  HOME: 'home',
  MESSAGE: 'message'
  // HOT: 'hot',
  // NOTIFICATION: 'notification',
  // PROFILE: "profile"
} as const;

const icons: Record<IconName, ReactElement> = {
  [icon_names.HOME]: <HomeIcon />,
  [icon_names.MESSAGE]: <MessageIcon />
} as const;

type IconName = (typeof icon_names)[keyof typeof icon_names];
