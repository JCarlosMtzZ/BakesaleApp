import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../util';

function DealItem({ deal, onPress }) {

  const handlePress = () => {
    onPress(deal.key);
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={handlePress}
    >
      <Image source={{ uri: deal.media[0] }}
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text>{priceDisplay(deal.price)}</Text>
          <Text>{deal.cause.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15
  },
  info: {
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'justify'
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc'
  },
  footer: {
    fontSize: 14,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  }
});

export default DealItem;