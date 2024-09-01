import { FlatList, Text, TouchableOpacity } from 'react-native';

const data = [
  {
    id: 123,
    title: 'Home',
    image: '',
    screen: 'HomeScreen'
  }
];

const NavOptions = () => {
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
