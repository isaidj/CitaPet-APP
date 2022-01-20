import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {formatearFecha} from '../src/Helpers';
import 'moment/locale/es';
const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteElminar,
  setModalPaciente,
  setPaciente,
}) => {
  const {paciente, propietario, email, id, fecha, telefono} = item;

  const handleEliminar = idPaciente => {
    Alert.alert('Eliminar', '¿Estas seguro de eliminar este paciente?', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Aceptar',
        style: 'default',
        onPress: () => {
          pacienteElminar(idPaciente);
        },
      },
    ]);
  };

  return (
    <Pressable
      onPress={() => {
        setModalPaciente(true);
        setPaciente(item);
      }}
      style={({pressed}) => [{opacity: pressed ? 0.9 : 1.0}]}>
      <View style={styles.contenedor}>
        <Text style={[styles.texto, {fontWeight: 'bold'}]}>Nombre:</Text>
        <Text
          style={[
            styles.texto,
            {fontSize: 30, color: '#5297ff', fontWeight: 'bold', marginTop: 0},
          ]}>
          {paciente}
        </Text>
        <Text style={[styles.texto, {fontSize: 15}]}>
          {formatearFecha(fecha)}
        </Text>

        <View style={styles.contBtns}>
          <TouchableOpacity
            style={[styles.btn, styles.btnEditar]}
            onPress={() => {
              pacienteEditar(id);

              setModalVisible(true);
            }}>
            <Text style={styles.btnTxt}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnEliminar]}>
            <Text style={styles.btnTxt} onPress={() => handleEliminar(id)}>
              ELIMINAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pacientes: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  texto: {
    textAlign: 'left',
    fontSize: 20,
    color: '#3d3d3d',
  },

  contenedor: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    margin: 15,
  },
  contBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 7,

    borderRadius: 8,
    paddingHorizontal: 25,
  },
  btnEditar: {
    backgroundColor: '#ffb057',
  },
  btnEliminar: {
    backgroundColor: '#fb4141',
  },

  btnTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  textoPaciente: {},
  pacienteInfo: {},
});
export default Paciente;
