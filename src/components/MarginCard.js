import React from 'react';
import Card from '~/components/Card';

const MarginCard = ({ children }) => (
  <Card style={{ marginLeft: 6, marginRight: 6, marginBottom: 12 }}>
    {children}
  </Card>
);

export default MarginCard;
