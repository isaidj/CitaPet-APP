import React, {useEffect} from 'react';
import {Button, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Users = () => {
  const [user, setUser] = React.useState(null);

  //https://api.namefake.com/
  const getUser = () => {
    fetch('https://api.namefake.com/')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (  
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido {user ? user.name : '...'}</Text>
        <Pressable style={styles.button} onPress={getUser}>
          <Text style={styles.titulo}>Generar nombre</Text>
        </Pressable>
      </View>
      
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    
   
   
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0066ff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,


    
    
  },

});

export default Users;
