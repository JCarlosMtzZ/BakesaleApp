import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { TextInput, StyleSheet } from "react-native";

function SearchBar({ searchDeals, initialSearchTerm }) {

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const debouncedSearchDeals = debounce(searchDeals, 300);

  const handleChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    debouncedSearchDeals(searchTerm);
  }, [searchTerm]);

  return (
    <TextInput
      value={searchTerm}
      placeholder="Search All Deals"
      style={styles.input}
      onChangeText={handleChange} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 20,
    padding: 12,
    height: 46,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

export default SearchBar;