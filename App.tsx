import React from 'react';
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "./src/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import NavigationContainer from './src/navigation';
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer />
        <FlashMessage
            titleStyle={{
              marginRight: 10,
              fontSize:16,
            }}
            position="top"
            style={{
              marginTop: 40,
            }}
          />
      </PersistGate>
    </Provider>
  )
}  

export default App;
