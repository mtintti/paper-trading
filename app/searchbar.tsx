
import React, { useContext, useState } from 'react';
import { View, Pressable } from 'react-native';
import { SearchContext } from './context/searchContext';
import { TextInput } from 'react-native-paper';

const finnhub = require('finnhub');

const SearchBar = () => {
  const { query, setQuery } = useContext(SearchContext);
  const [input, setInput] = useState<string>("");

  const handlesearch = (text: string) => {
    console.log("Search Input: ", text);

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "crf9dupr01qk4jsbc0bgcrf9dupr01qk4jsbc0c0"
    // crf9dupr01qk4jsbc0bgcrf9dupr01qk4jsbc0c0 API_KEY_HERE
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.symbolSearch(text, (error: any, data: any, response: any) => {
      console.log(data)
      setQuery(data);
    });
  };

  const handlePress = () => {
    handlesearch(input);
  }

  return (
    <View>
      <Pressable style={{ width: "100%", paddingHorizontal: 20, paddingTop: 50 }}>
        <TextInput placeholder="Stock market in your fingertips.."
          mode='outlined'
          value={input}
          onChangeText={(text) => setInput(text)}
          right={<TextInput.Icon icon="magnify" onPress={handlePress} />} 
        />

      </Pressable>
    </View>
  );
}
export default SearchBar;
