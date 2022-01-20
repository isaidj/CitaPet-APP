/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Formulario from './components/Formulario';
import Paciente from './components/Paciente';
import {ThemeProvider} from './context/ThemeContext';
import InformacionPaciente from './components/InformacionPaciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const [modalPaciente, setModalPaciente] = useState(false);
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.find(paciente => paciente.id === id);
    setPaciente(pacienteEditar);
  };
  const pacienteElminar = id => {
    const pacientesFiltrados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesFiltrados);
  };
  useEffect(() => {
    if (Object.keys(pacientes).length > 0) {
      storePacientes(pacientes);
    }
  }, [pacientes]);
  useEffect(() => {
    getPacientes();
  }, []);

  const storePacientes = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('pacientes', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getPacientes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('pacientes');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        setPacientes(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Administrar citas</Text>
        <Text style={styles.tituloBold}>Bienvenido</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPaciente([]);
            setModalVisible(true);
            //clean object paciente
          }}>
          <Text style={styles.textButton}>Nueva cita</Text>
        </TouchableOpacity>

        <Text style={[styles.titulo, {fontSize: 35, marginTop: 20}]}>
          Pacientes
        </Text>
        <View style={styles.pacientes}>
          {pacientes.length === 0 ? (
            <Text style={styles.texto}>No hay pacientes</Text>
          ) : (
            <FlatList
              data={pacientes}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <Paciente
                    item={item}
                    setModalVisible={setModalVisible}
                    pacienteEditar={pacienteEditar}
                    pacienteElminar={pacienteElminar}
                    setModalPaciente={setModalPaciente}
                    setPaciente={setPaciente}
                  />
                );
              }}
            />
          )}
        </View>
        {modalVisible && (
          <Formulario
            cerrarModal={cerrarModal}
            pacientes={pacientes}
            setpacientes={setPacientes}
            pacienteObj={paciente}
          />
        )}
        <Modal animationType="fade" visible={modalPaciente}>
          <InformacionPaciente
            paciente={paciente}
            setModalPaciente={setModalPaciente}
          />
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 35,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
    transform: [{translateY: 15}],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    color: '#3d3d3d',
  },
  tituloBold: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5297ff',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgb(82, 151, 255)',
    padding: 16,
    marginHorizontal: 25,
    borderRadius: 18,
  },

  textButton: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',

    color: '#fff',
  },
  pacientes: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },

  texto: {
    textAlign: 'center',
    fontSize: 20,
    color: '#3d3d3d',
    marginTop: 20,
  },
});

export default App;
