import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import CardView from "./src/components/CardView";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./graphql";

const theme: Theme = {
    ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
}

const trip1 = {
    title: 'Welcome to TypeScript',
    description: '',
    imageUrl: '',
    user: null,
    onPress: null
}

export default function App() {
  return (
      <PaperProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
            <View style={styles.container}>
                <CardView {...trip1} />
                <CardView {...trip1} />
                <CardView {...trip1} />
                <CardView {...trip1} />
            </View>
        </ApolloProvider>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
});
