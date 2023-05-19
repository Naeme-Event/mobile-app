import React, {ReactNode} from 'react';
import {Text as RNText} from 'react-native-paper';

type Props = {
  className?: string;
  font?: string;
  onPress?: () => void;
  children: ReactNode;
};
const Text = (props: Props) => {
  const {font, children, ...restProps} = props;
  return (
    <RNText style={{fontFamily: 'Montserrat-Black'}} {...restProps}>
      {children}
    </RNText>
  );
};

export default Text;
