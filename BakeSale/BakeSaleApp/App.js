import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, Dimensions } from 'react-native';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import ajax from './src/ajax';
import SearchBar from './src/components/SearchBar';


function App() {

  const loadingTitlePos = new Animated.Value(0);

  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);


  const animateLoadingTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 130;
    Animated.timing(
      loadingTitlePos, {
        toValue: direction * (width / 2),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease
       }
    ).start(({ finished }) => {
      if (finished) {
        animateLoadingTitle(-1 * direction);
      }
    });
  }

  useEffect(() => {

    animateLoadingTitle();

    async function fetchData() {
      const data = await ajax.fetchInitialDeals();
      if (data.length > 0) setDeals(data);
    } 
    
    fetchData();

  }, []);

  const searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
    }
    setDealsFromSearch(dealsFromSearch);
  };

  const setCurrentDeal = (dealId) => {
    setCurrentDealId(dealId);
  };

  const unsetCurrentDeal = () => {
    setCurrentDealId(null);
  };

  const currentDeal = () => {
    return deals.find(
      (deal) => deal.key === currentDealId
    );
  };

  if (currentDealId) return (
    <DealDetail
      initialDealData={currentDeal()}
      onBack={unsetCurrentDeal} />);

  const dealsToDisplay = dealsFromSearch.length > 0 ? dealsFromSearch : deals;
  if (dealsToDisplay.length > 0) return (
    <View style={styles.container}>
      <SearchBar searchDeals={searchDeals} />
      <DealList deals={dealsToDisplay} onItemPress={setCurrentDeal} />
    </View>);

  return (
    <Animated.View style={[{ transform: [{translateX: loadingTitlePos}] }, styles.container]}>
      <Text style={styles.loadingTitle}>Loading...</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    fontWeight: 'bold',
    fontSize: 28
  }
});

export default App;
