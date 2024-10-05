import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../authContext';

export default function WatchScreen() {
  const {signOut} = useAuth();
  const signOutUser  = () => {
    signOut();
  }
  return (
    <View>
      <Button  mode="contained" onPress={signOutUser}>Sign out</Button>
    </View>
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
