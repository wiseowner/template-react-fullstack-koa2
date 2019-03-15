import React from 'react';
import { Card, Col, Row, List } from 'antd';

const meta = [
  {
    title: '命令简单',
    children: [
      'npm install -g @didi/public-cli',
      'public-cli new',
    ],
  },
  {
    title: '提高效率',
    children: [
      '一键生成前端项目，不必再为项目初始化烦恼，也不必 Ctrl+C Ctrl+V 代码。',
      '内置多套模板（React-Mobx, Koa-server...），可满足公共前端 90% 的项目初始化需求。',
      '提供模板缓存，不必每次从远程下载，更快的生成。',
    ],
  },
  {
    title: '灵活多变',
    children: [
      '自定义添加任何技术栈的模板。',
      '自定义命令行问询。',
    ],
  },
  {
    title: '稳定支持',
    children: [
      '已有项目接入使用，并在未来支持后续项目。',
      '持续打磨，跟随业务不断完善脚手架，丰富模板。',
      '提供售后，有任何问题请联系团队。',
    ],
  },
];

const About = () => 
  <Card title="前端项目脚手架" bordered={false} style={{ overflow: 'scroll'}}>
    {
      meta.map(item => 
        <Card 
          key={item.title}
          title={item.title} 
          bordered={false}
        >
          <List 
            dataSource={item.children}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Card>)
    }
</Card>;



export default About;
