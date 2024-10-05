import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuth } from '../authContext';
import { LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


export default function HomeScreen() {
  const { session } = useAuth();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const db = getFirestore();

  console.log("Session state from home:", session);

  const fetchStockData = async () => {
    if (!session) return;

    const userStockRef = collection(db, "users", session, "stocks");
    const stockDocs = await getDocs(userStockRef);
    const stocks = stockDocs.docs.map(doc => doc.data());
    
    calculatePortfolioValue(stocks);
  };


  const calculatePortfolioValue = async (stocks: any[]) => {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "API_KEY_HERE";
    
    const finnhubClient = new finnhub.DefaultApi();
    let totalPortfolioValue = 0;

    for (const stock of stocks) {
      const { stockname, price, amount } = stock;
      await new Promise((resolve) => {
        finnhubClient.quote(stockname, (error: any, priceData: any) => {
          if (error) {
            console.error(`Error fetching data for ${stockname}`, error);
            resolve(null);
          } else {
            console.log(`${stockname} price data:`, priceData);
            const currentPrice = priceData.c;
            const totalChange = (currentPrice - price) * amount;
            totalPortfolioValue += (currentPrice * amount);

            resolve(currentPrice);
          }
        });
      });
    }

    setTotalAmount(totalPortfolioValue);
  };

  useEffect(() => {
    fetchStockData();
  }, []);



  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 15,}}>Total account amount {totalAmount.toFixed(2)}</Text>
      </View>
      <View>
        
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  user: {
    padding: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
