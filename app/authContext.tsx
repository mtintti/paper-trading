

import { useContext, createContext, useState, PropsWithChildren } from 'react';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebase/config';




interface AuthContextType {
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
  buyStock: (stockname: string, price: number, amount: number, total: number, date: Date) => Promise<void>,
  session: string | null;
  error: string | null;
  Loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => { },
  signOut: async () => { },
  buyStock: async () => { },
  session: null,
  error: null,
  Loading: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);


  const signIn = async (username: string) => {
    setLoading(true);
    console.log("Attempting to sign in the user:", username);

    try {

      const userRef = doc(db, "users", username);
      setDoc(userRef, { username: username, capital: true }, { merge: true });

      console.log("User added successfully to Firestore:", username);

      setSession(username);
      console.log("Session updated with username:", username);
    } catch (error) {
      setError("There was a error sign in");
      console.error("Sign-in error", error);
    }
    finally {
      setLoading(false);
    }
  };

  const buyStock = async (stockname: string, price: number, amount: number, total: number, date: Date) => {
    setLoading(true);
    console.log("Buying stock...");
    try {
      if (!session) {
        throw new Error("User is not logged in. Cannot buy stock.");
      }
      const userStockRef = collection(db, "users", session, "stocks");
      addDoc(userStockRef, { stockname: stockname, price: total, total: price, amount: amount, date: date.toISOString() })
    } catch(error){
      console.error("stock buying caused a error", error);
    } finally {
      setLoading(false);
      console.log("Stock buying was successfull.");
    }
  }



  const signOut = async () => {
    console.log("Signing out user...");
    setSession(null);
    console.log("Session cleared.");
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, buyStock, session, error, Loading }}>
      {children}
    </AuthContext.Provider>
  );
}