import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

function TabBarIcon(props: {
  name: any;
  color: string;
  collection: 'ionicons' | 'feather' | 'font-awesome' | 'ant-design';
  size: number;
}) {
  if (props.collection === 'feather') return <Feather {...props} />;
  if (props.collection === 'ionicons') return <Ionicons {...props} />;
  if (props.collection === 'ant-design') return <AntDesign {...props} />;
  return <FontAwesome {...props} />;
}

export default TabBarIcon;
