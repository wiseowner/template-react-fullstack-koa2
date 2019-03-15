import React from 'react';
import { Card, Col, Row } from 'antd';

const Team = () => <Row gutter={16}>
  <Col span={8}>
    <Card title="我们是谁">
      <a style={{fontWeight: 800}}>前端</a>
    </Card>
  </Col>
  <Col span={8}>
    <Card title="团队使命">
      为业务提供极致、高效的技术解决方案
    </Card>
  </Col>
  <Col span={8}>
    <Card title="成员介绍">
    </Card>
  </Col>
</Row>;



export default Team;
