import React, {useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

const DraggableView = () => {
  //print position of the touch
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);

  const onDrag = e => {
    setPosition({x: e.nativeEvent.pageX, y: e.nativeEvent.pageY});
    if (isDragging) {
    }
  };

  const resetPosition = () => {
    setPosition({x: 0, y: 0});
  };

  return (
    <Pressable
      style={[
        styles.box,
        {
          transform: [{translateY: position.y}],
        },
      ]}
      onTouchMove={onDrag}
      onPressIn={() => setIsDragging(true)}
      onPressOut={() => setIsDragging(false)}>
      <Text style={styles.titulo}>Arrastra el objeto para moverlo</Text>

      <Text style={styles.touchPosition}>
        {position.x} {position.y}
      </Text>
      {/* <Button title="Reset" onPress={resetPosition} style={styles.button} /> */}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: '100%',
    height: 300,
    backgroundColor: '#0066ff',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  touchPosition: {
    position: 'absolute',
  },
});

export default DraggableView;
