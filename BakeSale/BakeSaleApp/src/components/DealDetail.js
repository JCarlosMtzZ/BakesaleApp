import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

function DealDetail({ initialDealData }) {

  const [deal, setDeal] = useState(initialDealData);

  useEffect(() => {
    async function fetchData() {
      const data = await ajax.fetchDealDetail(initialDealData.key);
      setDeal(data);
    } 
    
    fetchData();

  }, []);

  

  return (
    <View style={styles.container}>
      <Image source={{ uri: deal.media[0] }}
        style={styles.image} 
      />
      <Text style={styles.title}>{deal.title}</Text>
      {deal.user && (
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <Text>{priceDisplay(deal.price)}</Text>
            <Text>{deal.cause.name}</Text>
          </View>
          <View style={styles.subHeader}>
            <Image source={{ uri: deal.user.avatar }} style={styles.avatar}/>
            <Text>{deal.user.name}</Text>
          </View>
        </View>
      )}
      <View>
        <Text style={styles.description}>{deal.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 'fit-content',
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'justify',
    backgroundColor: '#eee'
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc'
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  subHeader: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%'
  },
  description: {
    textAlign: 'justify',
    padding: 15
  }
});

export default DealDetail;