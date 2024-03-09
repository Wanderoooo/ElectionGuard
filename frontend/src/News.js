import { Button, Flex } from 'antd';
import React from 'react';

function News() {
  return (
         <Flex gap="small" wrap="wrap">
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
  );
}

export default News;
