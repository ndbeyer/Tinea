import React, {ReactNode} from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components';
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

const Screen = ({
  renderHeaderContent,
  children,
  style,
}: {
  renderHeaderContent?: () => ReactNode;
  children?: ReactNode | ReactNode[];
  style?: {[key: string]: string | number};
}): React.Element => {
  const defaultStyle = React.useMemo(
    () => ({
      flex: 1,
    }),
    [],
  );

  const {height} = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={defaultStyle}>
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
