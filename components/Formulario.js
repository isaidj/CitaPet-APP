import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
const Formulario = ({
  cerrarModal,
  modalVisible,
  pacientes,
  setpacientes,
  pacienteObj,
}) => {
  console.log(pacienteObj);

  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState(0);
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(new Date(pacienteObj.fecha));
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);
  const handleCita = () => {
    if (
      [paciente, propietario, email, telefono, fecha, sintomas].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Aceptar',
          style: 'default',
        },
      ]);
      return;
    }
    const nuevoPaciente = {
      id: Date.now(),
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };
    setpacientes([...pacientes, nuevoPaciente]);
    cerrarModal();
    resetForm();
  };
  const actualizarPaciente = () => {
    if (
      [paciente, propietario, email, telefono, fecha, sintomas].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Aceptar',
          style: 'default',
        },
      ]);
      return;
    }
    const pacienteActualizado = {
      id,
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    setpacientes(
      pacientes.map(paciente =>
        paciente.id === id ? pacienteActualizado : paciente,
      ),
    );
    cerrarModal();
    resetForm();
  };

  const resetForm = () => {
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono(0);
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <ScrollView style={styles.modal}>
        <Text style={styles.titulo}>
          Nueva<Text style={styles.tituloBold}>Cita</Text>
        </Text>
        <View style={styles.formulario}>
          <Text style={styles.label}>Nombre Paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre Paciente"
            keyboardType="default"
            placeholderTextColor={'#c4c4c4'}
            onChangeText={text => setPaciente(text)}
            value={paciente}
          />
          <Text style={styles.label}>Nombre Propietario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre Propietario"
            keyboardType="default"
            placeholderTextColor={'#c4c4c4'}
            onChangeText={text => setPropietario(text)}
            value={propietario}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={'#c4c4c4'}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            keyboardType="phone-pad"
            placeholderTextColor={'#c4c4c4'}
            onChangeText={text => setTelefono(text)}
            maxLength={10}
            value={telefono ? telefono.toString() : ''}
          />

          <Text style={styles.label}>Fecha</Text>
          <View style={styles.datePicker}>
            <DatePicker
              date={fecha}
              mode="date"
              onDateChange={setFecha}
              locale="es"
            />
          </View>

          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            style={styles.input}
            placeholder="Sintomas"
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={'#c4c4c4'}
            onChangeText={text => setSintomas(text)}
            value={sintomas}
          />

          <View style={styles.botones}>
            <Pressable
              onPress={() => {
                resetForm();
                cerrarModal();
              }}
              style={styles.btnCancel}>
              <Text style={styles.btnTxtCancel}>Cancelar</Text>
            </Pressable>

            {pacienteObj.id ? (
              <Pressable onPress={actualizarPaciente} style={styles.btnSave}>
                <Text style={styles.btnTxtSave}>Actualizar</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleCita} style={styles.btnSave}>
                <Text style={styles.btnTxtSave}>Guardar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#5297ff',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    color: '#ffff',
  },
  tituloBold: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffff',
  },

  textCloseButton: {
    textAlign: 'center',
    color: '#3d3d3d',
    fontSize: 20,
  },
  formulario: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    color: '#ffff',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fafafa',
    backgroundColor: '#ffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    color: '#3d3d3d',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#fafafa',
    backgroundColor: '#ffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  btnCancel: {
    backgroundColor: '#ffff',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  btnTxtCancel: {
    color: '#3d3d3d',
    fontSize: 20,
    textAlign: 'center',
  },
  btnSave: {
    backgroundColor: '#3d3d3d',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  btnTxtSave: {
    color: '#ffff',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default Formulario;
