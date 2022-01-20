import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {formatearFecha} from '../src/Helpers';

const InformacionPaciente = ({paciente, setModalPaciente}) => {
  console.log(paciente);
  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>INFORMACION PACIENTE</Text>
      <View style={styles.infoContenedor}>
        <Text style={styles.label}>
          Nombre:{'\n'}
          <Text style={styles.texto}>{paciente.paciente}</Text>
        </Text>
        <Text style={styles.label}>
          Propietario:{'\n'}
          <Text style={styles.texto}>{paciente.propietario}</Text>
        </Text>
        <Text style={styles.label}>
          Email:{'\n'}
          <Text style={styles.texto}>{paciente.email}</Text>
        </Text>
        <Text style={styles.label}>
          Telefono:{'\n'}
          <Text style={styles.texto}>{paciente.telefono}</Text>
        </Text>
        <Text style={styles.label}>Fecha:</Text>

        <Text style={styles.label}>
          <Text style={styles.texto}>{formatearFecha(paciente.fecha)}</Text>
        </Text>
        <Text style={styles.label}>
          Sintomas:{'\n'}
          <Text style={styles.texto}>{paciente.sintomas}</Text>
        </Text>
      </View>

      <Pressable
        onPress={() => {
          setModalPaciente(false);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Cerrar</Text>
      </Pressable>
    </ScrollView>
  );
};

export default InformacionPaciente;
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffad14',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  infoContenedor: {
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 10,
    color: '#3d3d3d',
  },
  texto: {
    fontSize: 20,
    color: '#3d3d3d',
    marginTop: 10,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff7f0f',
    padding: 16,

    borderRadius: 10,
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});
