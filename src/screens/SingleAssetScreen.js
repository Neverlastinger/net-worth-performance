import React from 'react';
import styled from 'styled-components/native';
import AssetCard from '~/components/AssetCard';

const SingleAssetScreen = ({ route }) => {
  const { asset } = route.params;

  return (
    <SafeArea>
      <ScrollWrapper>
        <AssetCard asset={asset} />
      </ScrollWrapper>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

export default SingleAssetScreen;
