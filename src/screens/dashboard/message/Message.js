/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import BaseContainer from '../../base/BaseContainer';
import {COLORS, MARGINS} from '../../../constants';
import ButtonGroup from '../../../components/atoms/ButtonGroup';
import MessageItem from '../../../components/molecules/MessageItem';

const Message = () => {
  const [btnState, setBtnState] = useState(0);
  const onPressButton = item => {
    console.log(item);
    setBtnState(item);
  };
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      desc: 'Lorem ipsum dolor sit amet',
      dateTime: '3:00 pm',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      desc: 'Lorem ipsum dolor sit amet',
      dateTime: '1:00 pm',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      desc: 'Lorem ipsum dolor sit amet',
      dateTime: '2:00 pm',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      desc: 'Lorem ipsum dolor sit amet',
      dateTime: '2:00 pm',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      desc: 'Lorem ipsum dolor sit amet',
      dateTime: '2:00 pm',
    },
  ];
  //item separator component
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.grayLight,
        }}
      />
    );
  };
  return (
    <BaseContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <ButtonGroup
          buttons={['Customer', 'Warehouse']}
          onItemClick={onPressButton}
          buttonActive={styles.btnActive}
          buttonInactive={styles.btnInactive}
          textActive={styles.textActive}
          textInActive={styles.textInActive}
          buttonCompletedActive={styles.btnCompletedActive}
        />
        {btnState === 1 ? (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.flatList}
              data={DATA}
              renderItem={({item}) => <MessageItem isCustomer={false} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={FlatListItemSeparator}
            />
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.flatList}
              data={DATA}
              renderItem={({item}) => <MessageItem isCustomer={true} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={FlatListItemSeparator}
            />
          </View>
        )}
      </View>
    </BaseContainer>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: MARGINS.m20,
    fontSize: 18,
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
  },
  btnInactive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  btnActive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.newOrder,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  btnCompletedActive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.newOrder,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  textInActive: {
    color: COLORS.white,
    fontSize: 14,
  },
  textActive: {
    color: COLORS.white,
    fontSize: 14,
  },
  listContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
  },
  flatList: {
    marginLeft: MARGINS.m10,
    marginRight: MARGINS.m10,
  },
});
