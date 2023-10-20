/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import {COLORS, MARGINS, PADDINGS, ROUTES} from '../../../../constants';
import PressItem from '../../../../components/atoms/PressItem';
import * as homeActions from '../../../../store/actions/home';
import {useSelector, useDispatch} from 'react-redux';

const Completed = ({navigation}) => {
  const dispatch = useDispatch();
  const header = ['Assigned Order ID', 'Completion Date'];
  const [showLoading, setShowLoading] = useState(false);

  //get initial data
  useEffect(() => {
    loadCompletedDeliverData();
  }, []);

  //load initial data
  const loadCompletedDeliverData = useCallback(
    async token => {
      setShowLoading(true);
      await dispatch(homeActions.getCompletedDelivers());
      setShowLoading(false);
    },
    [dispatch],
  );

  //press item event
  const handleOnPressId = id => {
    navigation.navigate(ROUTES.COMPLETED_DETAIL, {id: id});
  };

  //get state data
  const completedDeliverData = useSelector(
    state => state.home.completedDeliverData,
  );

  // map data table
  const tableData = completedDeliverData.map(data => [
    data.id,
    data.assigned_order_id,
    data.completion_date,
  ]);
  tableData.map((rowData, index) => {
    console.log('Index', index);
  });

  //table element
  const element = (data, index) => (
    <View>
      <PressItem onPress={() => handleOnPressId(data)}>
        <Text
          style={{
            color: COLORS.present,
            alignItems: 'center',
            textAlign: 'center',
            textDecorationLine: 'underline',
            fontSize: 10,
          }}>
          {data}
        </Text>
      </PressItem>
    </View>
  );

  //render UI
  return (
    <View style={styles.container}>
      {completedDeliverData.length === 0 ? undefined : (
        <Table borderStyle={{borderWidth: 1, borderColor: COLORS.black}}>
          <Row
            data={header}
            style={styles.head}
            textStyle={styles.header_text}
          />
          <Table>
            {tableData.map((rowData, index) => (
              <TableWrapper
                key={index}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.white,
                  borderBottomLeftRadius:
                    index === completedDeliverData.length - 1 ? 12 : 0,
                  borderBottomRightRadius:
                    index === completedDeliverData.length - 1 ? 12 : 0,
                }}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 0 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                    style={styles.cell}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </Table>
      )}
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {flex: 1, marginLeft: MARGINS.m18, marginRight: MARGINS.m18},
  head: {
    height: 40,
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  text: {margin: 6, color: COLORS.black, textAlign: 'center', fontSize: 10},
  header_text: {
    margin: 6,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 10,
  },
  cell: {
    width: '50%',
    height: 40,
  },
  textCell: {
    margin: 6,
    color: COLORS.black,
    textAlign: 'center',
  },
  row: {flexDirection: 'row', backgroundColor: COLORS.white},
});
