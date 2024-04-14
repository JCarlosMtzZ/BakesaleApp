import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import ajax from './src/ajax';
import SearchBar from './src/components/SearchBar';


function App() {

  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);

  useEffect(() => {
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
    <View style={styles.container}>
      <Text>Loading...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
