import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";


const searchAPI = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!query.trim()) return [];
  return Array(5).fill().map((_, i) => ({
    id: i,
    title: `Result ${i + 1} for "${query}"`,
    description: `Description for result ${i + 1}`
  }));
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    setHasSearched(true);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(async () => {
      if (text.trim()) {
        setIsLoading(true);
        try {
          const searchResults = await searchAPI(text);
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsLoading(false);
      }
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchInputRef.current?.focus();
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultDescription}>{item.description}</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }

    if (hasSearched && results.length === 0 && searchQuery.trim()) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.noResults}>No results found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ height: 0.5, backgroundColor: 'white', marginVertical: 10 }} />
        )}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search..."
          placeholderTextColor="white"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearSearch}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f2125',
    paddingHorizontal: 16,
  },
  searchBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#303133',
    borderRadius: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 16,
    color: 'white'
  },
  clearButton: {
    position: 'absolute',
    right: 25,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: 'white',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    padding: 15,
  },
  resultItem: {
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
    color: 'white',
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;