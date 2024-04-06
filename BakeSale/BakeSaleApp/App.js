import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import ajax from './src/ajax';


function App() {

  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await ajax.fetchInitialDeals();
      if (data.length > 0) setDeals(data);
    } 
    
    fetchData();

  }, []);

  const setCurrentDeal = (dealId) => {
    setCurrentDealId(dealId);
  };

  const currentDeal = () => {
    return deals.find(
      (deal) => deal.key === currentDealId
    );
  };

  if (currentDealId) return (<DealDetail initialDealData={currentDeal()} />);

  if (deals.length > 0) return (<DealList deals={deals} onItemPress={setCurrentDeal} />);

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
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
