import { View, StyleSheet, FlatList } from 'react-native';
import DealItem from './DealItem.js';

function DealList({ deals, onItemPress }) {
  return(
    <View style={styles.container}>
      <FlatList
        data={deals}
        renderItem={({item}) => (
          <DealItem deal={item} onPress={onItemPress} />
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }
});

export default DealList;