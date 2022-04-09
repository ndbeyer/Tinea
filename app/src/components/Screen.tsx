import React, {ReactNode} from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView, StatusBar} from 'react-native';

import Loading from './Loading';

const Background = styled.View`
  width: 100%;
  height: ${p => p.height}px;
  position: absolute;
`;

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const safeAreaViewStyle = {
  flex: 1,
};

const Screen = ({
  renderHeaderContent,
  children,
  style,
}: {
  renderHeaderContent?: () => ReactNode;
  children?: JSX.Element | JSX.Element[];
  style?: {[key: string]: string | number};
}): JSX.Element => {
  const {height} = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={safeAreaViewStyle}>
        <Background height={height} />
        {renderHeaderContent ? renderHeaderContent() : null}
        <StyledView style={style}>
          {!children ? <Loading /> : children}
        </StyledView>
      </SafeAreaView>
    </>
  );
};

export default Screen;
