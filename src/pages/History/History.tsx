/**
 * @description - history records
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React, { Component } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

// internal
import styles from './History.pcss';
import { HistoryRecord } from './History.interface';

// scope
const columns: Array<ColumnProps<HistoryRecord>> = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];
const history: HistoryRecord[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Cody Smith',
    age: 32,
    address: 'Washington No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Keven Wilson',
    age: 32,
    address: 'Canada No. 1 Lake Park',
  },
];

class History extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <article className={styles.container}>
        <Table
          dataSource={history}
          columns={columns}
          pagination={false}
          bordered
        />
        ;
      </article>
    );
  }
}

export default History;
