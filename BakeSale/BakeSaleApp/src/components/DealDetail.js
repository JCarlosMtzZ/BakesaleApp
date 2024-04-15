import { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

function DealDetail({ initialDealData, onBack }) {

  const [deal, setDeal] = useState(initialDealData);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await ajax.fetchDealDetail(initialDealData.key);
      setDeal(data);
    } 
    
    fetchData();

  }, []);

  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backLink}>Back</Text>
      </TouchableOpacity>
      <View style={styles.dealContainer}>
        <Image
          source={{ uri: deal.media[imageIndex] }}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  backLink: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 15,
    color: '#22f'
  },
  dealContainer: {
    borderColor: '#bbb',
    borderWidth: 1,
    width: 'auto',
    marginTop: 0,
    margin: 20,
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    backgroundColor: '#eee'
  },
  image: {
    width: '100%',
    height: 175,
    backgroundColor: '#ccc'
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  subHeader: {
    gap: 10,
    alignItems: 'center',
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  description: {
    textAlign: 'justify',
    paddingHorizontal: 25,
    paddingBottom: 25
  }
});

export default DealDetail;