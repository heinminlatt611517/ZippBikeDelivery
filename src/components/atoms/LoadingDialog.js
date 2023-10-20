import {COLORS, MARGINS, PADDINGS} from '../../constants';
import {StyleSheet, View, Text, Modal} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

export default function LoadingDialog(props) {
  return props.showAlert ? (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 85,
            width: '50%',
            backgroundColor: COLORS.black,
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Text style={styles.text}>Loading...</Text>
          <BallIndicator color={COLORS.white} size={25} />
        </View>
      </View>
    </Modal>
  ) : undefined;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.white,
    paddingTop: PADDINGS.p10,
  },
});
