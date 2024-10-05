import { StyleSheet, View, Pressable, FlatList } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { searchMock } from '@/mock/searchMock';
import { stockQuote } from '@/mock/stockQuote';
import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../context/searchContext';


export default function search() {
  const { query } = useContext(SearchContext);

  const filtered = query?.result
    ? query.result.map((item) => ({
      description: item.description,
      displaySymbol: item.displaySymbol,
    }))
    : [];


  console.log("Current Query: ", query);
  console.log("Filtered Results: ", filtered);

  const pressed = () => {
    console.log("close pressed on");
  }


  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text
        variant='titleLarge'
        style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}>
        Your Top Stocks Picks
      </Text>
      {query ? (
        filtered.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.displaySymbol}
            data={filtered}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  marginHorizontal: 15,
                  height: 50,
                }}
                onPress={() => router.push({pathname: '/result', params: {ticker: item.displaySymbol } })}
              >
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <Text>{item.description}</Text>
        <Text style={{ marginTop: 5, fontSize: 15, fontWeight: "bold" }}>{item.displaySymbol}</Text>
      </View>
      <Pressable onPress={pressed}>
        <View style={{ alignItems: "flex-end", justifyContent: "center", flexDirection: 'row' }}>
          <Text style={{ fontSize: 30 }}>x</Text>
        </View>
      </Pressable>
    </Pressable>
  )
}
          />
        ) : (
  <Text style={{ textAlign: 'center', fontSize: 16, }}>No results found</Text>
)
      ) : (
  <Text style={{ textAlign: 'center', fontSize: 16 }}>Type to see results...</Text>
)}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',

  },
});
