import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppIcon, AppText, TouchableView } from '../../../common';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';

const FaqCard = ({item}) => {
  const lang = useSelector(state => state.lang);

  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableView
       flex row spaceBetween
        onPress={() => setShowAnswer(pre => !pre)}>
        

        <AppText stretch style={styles.title}>{item.question}</AppText>
        <AppIcon
          size={8}
          padding={3}
          name={
            showAnswer
              ? lang.lang == 'en'
                ? 'chevron-down'
                : 'chevron-up'
              : lang.lang == 'en'
              ? 'chevron-right'
              : 'chevron-left'
          }
          type="Feather"
          color={colors.black}
        />
      </TouchableView>
      <View style={styles.line} />
      {showAnswer ? <AppText style={styles.sub_title}>{item.answer}</AppText> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    backgroundColor: colors.white,
    elevation: 2,
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 6,
    marginVertical: 5,
    marginHorizontal: 2,
    shadowOffset: {width: 1, height: 1},
  },

  view: {
    flex: 1,
    flexDirection: 'row',
  },
  line: {
    height: 0.5,
    backgroundColor: colors.black,
    marginVertical: 3,
  },
  title: {
    fontSize: 19,
    color: colors.black,
    fontFamily: fonts.normal,
  },
  sub_title: {
    width: '100%',
    fontSize: 17,
    color: colors.grayText,
    fontFamily: fonts.normal,
  },
});
export default FaqCard;
