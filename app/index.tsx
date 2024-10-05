
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from './authContext';



export default function Login() {
  const [username, setUsername] = useState("");

  const { signIn,error } = useAuth();

  const handleLogin = async() => {
    console.log("Login button pressed, username:", username);
    await signIn(username);
    if (!error) {
      router.push("/(tabs)/Home");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        mode="outlined"
        onChangeText={(username) => setUsername(username)}
      />
      <View style={{bottom:20, position: "absolute"}}>
        <Button style={{ marginVertical: 15,backgroundColor: "gray"}} mode="contained" onPress={handleLogin}>Login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  textInput: {
    width: '40%',
    height: 30,
    maxWidth: 300,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "gray",
  },
  
});