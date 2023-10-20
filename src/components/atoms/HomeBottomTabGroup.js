import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, MARGINS, PADDINGS} from '../../constants';
import CustomNotificationBadge from './CustomNotificationBadge';

const HomeBottomTabGroup = ({images, onItemClick}) => {
  const handleClick = (item, id) => {
    onItemClick(id);
  };
  return (
    <View style={styles.container}>
      {images.map((imgSource, index) => {
        return (
          <TouchableOpacity
            onPress={item => handleClick(item, index)}
            key={index}>
            {index === 2 ? <CustomNotificationBadge /> : undefined}

            <View style={{marginLeft: MARGINS.m20, marginRight: MARGINS.m20}}>
              {imgSource}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomeBottomTabGroup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: PADDINGS.p20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
