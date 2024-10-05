
import { Pressable, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from './authContext';


export default function resultScreen() {
  const { ticker } = useLocalSearchParams();
  const [amountInput, setAmountInput] = useState<number | undefined>(undefined);
  const [priceInput, setPriceInput] = useState<number | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const { buyStock, session } = useAuth();
  const [data, setData] = useState<any | null>(null);

  console.log("Session state from result:", session);

  const final = () => {
    if (priceInput !== undefined && amountInput !== undefined) {
      setTotal(priceInput * amountInput);
    } else {
      setTotal(undefined);
    }
  };

  useEffect(() => {
    final();
  }, [amountInput, priceInput]);

  const addCurrent = () => {
    setPriceInput(data.c);
  }

  const changeAmount = (text: string) => {
    const value = parseFloat(text);
    setAmountInput(value);
  };

  const changePrice = (text: string) => {
    const value = parseFloat(text);
    setPriceInput(value);
    
  };
    useEffect(() => {
      const searchPrice = () => {
        const finnhub = require('finnhub');

        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "API_KEY_HERE"
        const finnhubClient = new finnhub.DefaultApi()

        finnhubClient.quote(ticker, (error: any, data: any, response: any) => {
          console.log("ticker is this: ",{ticker});
          console.log(data)
          setData(data)
        });
      };
      searchPrice();
    }, [ticker]);
    
    

  const buyStockhandler = () => {

      if (total !== undefined && amountInput !== undefined && priceInput !== undefined) {
        const currentDate = new Date();
        buyStock(ticker as string, total, amountInput, priceInput, currentDate);
      } else {
        console.error("values incorrect");
      }
    };

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{ticker}</Text>
        </View>
        {data ? (
          <>
        <Text style={styles.infotext}>Current price: {data.c}</Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={styles.infotextHiLo}>High: {data.h} </Text>
          <Text style={styles.infotextHiLo}>Low: {data.l}</Text>
        </View>
        </>
        ):(<Text>Loading stock price data...</Text>)}
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={{ width: "auto", paddingHorizontal: 10 }}>
            <TextInput
              placeholder='Amount'
              mode='outlined'
              value={amountInput?.toString() || ''}
              onChangeText={changeAmount}
            />
          </Pressable>
          <View style={{ flexDirection: 'column' }}>
            <Pressable style={{ width: "auto" }}>
              <TextInput
                placeholder='Price'
                mode='outlined'
                keyboardType="numeric"
                value={priceInput?.toString() || ''}
                onChangeText={changePrice}
              />
              <Button onPress={addCurrent}>current</Button>
            </Pressable>
          </View>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "medium" }}>
            Total: {total !== undefined ? total.toFixed(2) : ' '}
          </Text>
        </View>
        <Button mode="contained" onPress={buyStockhandler}>Buy</Button>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 15,
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
    infotext: {
      marginTop: 5,
      fontSize: 25,
      fontWeight: "bold",
      marginVertical: 10,
    },
    infotextHiLo: {
      marginTop: 5,
      fontSize: 20,
      fontWeight: "light",
    },
  });

/*<Text>{ticker}</Text>*/