import React from 'react';
import {Text, View, Dimensions, Animated, StyleSheet} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 20,
  },

  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 50,
    // backgroundColor: '#b197fc',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  textHeader: {
    fontSize: 20,
    color: '#20272F',
  },
  //   icon: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     position: 'absolute',
  //     top: -24,
  //     right: 18,
  //     width: 48,
  //     height: 48,
  //     zIndex: 1,
  //   },
});

class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: {top: height - 250, bottom: 50},
  };

  _draggedValue = new Animated.Value(50);

  render() {
    const {top, bottom} = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 8],
      extrapolate: 'clamp',
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: 'clamp',
    });
    //after component is mounted print "mounted" to console

    return (
      <View style={styles.container}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[0]}
          height={height + 180}
          friction={0.5}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Animated.View
                style={{
                  //   transform: [
                  //     {translateY: textTranslateY},
                  //     {translateX: textTranslateX},
                  //     {scale: textScale},
                  //   ],
                  opacity: backgoundOpacity,
                }}>
                <Text style={styles.textHeader}>Ordenes</Text>
              </Animated.View>
            </View>
            <View style={styles.container2}>
              <Text style={styles.textHeader}>Bottom sheet content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default BottomSheet;
