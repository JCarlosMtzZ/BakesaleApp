import { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

function DealDetail({ deals, initialDealData, dealIndex, onBack }) {

  const width = Dimensions.get('window').width;
  const imageXPos = new Animated.Value(0);
  const titleXPos = new Animated.Value(0);

  const [deal, setDeal] = useState(initialDealData);
  const [currentDealIndex, setCurrentDealIndex] = useState(dealIndex);
  const [imageIndex, setImageIndex] = useState(0);
  const indexDirectionRef = useRef(null);
  
  const handleSwipe = (indexDirection, animatedValue, type) => {
    if (type === 'image') {
      if (!deal.media[imageIndex + indexDirection]) {
        Animated.spring(animatedValue, {
          useNativeDriver: true,
          toValue: 0
        }).start();
        return;
      }
      setImageIndex(prevImageIndex => prevImageIndex + indexDirection);
      indexDirectionRef.current = indexDirection;
    }
    if (type === 'title') {
      if (!deals[currentDealIndex + indexDirection]) {
        Animated.spring(animatedValue, {
          useNativeDriver: true,
          toValue: 0
        }).start();
        return;
      }
      setCurrentDealIndex(prevDealIndex => prevDealIndex + indexDirection);
      indexDirectionRef.current = indexDirection;
    }
  };

  useEffect(() => {
    if (indexDirectionRef.current !== null) {
      const indexDirection = indexDirectionRef.current;
      imageXPos.setValue(indexDirection * width);
      Animated.spring(imageXPos, {
        useNativeDriver: true,
        toValue: 0
      }).start();
    }
  }, [imageIndex]);

  useEffect(() => {
    if (indexDirectionRef.current !== null) {
      const indexDirection = indexDirectionRef.current;
      titleXPos.setValue(indexDirection * width);
      fetchData(deals[currentDealIndex].key);
      Animated.spring(titleXPos, {
        useNativeDriver: true,
        toValue: 0
      }).start(() => setImageIndex(0));
    }
  }, [currentDealIndex]);

  const createPanResponder = (animatedValue, type) => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gs) => {
        animatedValue.setValue(gs.dx);
      },
      onPanResponderRelease: (evt, gs) => {
        if (Math.abs(gs.dx) > width * 0.2) {
          const direction = Math.sign(gs.dx);
          Animated.timing(animatedValue, {
            toValue: direction * width,
            duration: 250,
            useNativeDriver: true,
          }).start(() => handleSwipe(-1 * direction, animatedValue, type));
        } else {
          Animated.spring(animatedValue, {
            useNativeDriver: true,
            toValue: 0
          }).start();
        }
      }
    });
    return panResponder;
  }

  
  async function fetchData(key) {
    const data = await ajax.fetchDealDetail(key);
    setDeal(data);
  } 

  useEffect(() => {
    fetchData(initialDealData.key);
  }, []);

  const openDealUrl = () => {
    Linking.openURL('https://www.youtube.com/');
  };
  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backLink}>Back</Text>
      </TouchableOpacity>
      <View style={styles.dealContainer}>
        <Animated.Image
          {...createPanResponder(imageXPos, 'image').panHandlers}
          source={{ uri: deal.media[imageIndex] }}
          style={[{ transform: [{translateX: imageXPos}] }, styles.image]}
        />
        <Animated.Text
          {...createPanResponder(titleXPos, 'title').panHandlers}
          style={[{ transform: [{translateX: titleXPos}] }, styles.title]}
          >
            {deal.title}
        </Animated.Text>
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
        <Button
          title='Buy this deal'
          onPress={openDealUrl}
        />
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