import React from 'react';
import Routes from './src/navigation/routes';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Login Screen"
//         onPress={() => navigation.navigate('login')}
//       />
//     </View>
//   );
// }

const App = () => {
  return <Routes />;
};

export default App;
