/**
 * @description - history records
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@linaria/react';
import { Alert, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
// internal
import { HistoryRecord } from './History.interface';
import { HistoryEpicActions } from '../../redux/history.slice';
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

const Box = styled.article`
  border-bottom: 1px solid red;
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function History() {
  // redux
  // unnecessary for explicit action types
  const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const state = useSelector((s: AppState) => ({
    cost: s.history.cost,
  }));

  // effects
  useEffect(() => {
    dispatch(HistoryEpicActions.ActiveTiming());

    return () => {
      dispatch(HistoryEpicActions.DeactiveTiming());
    };
  }, []);

  // scope
  const message = `此页面停留 ${state.cost} 秒钟`;

  return (
    <Box>
      <Alert message={message} />
      <Table
        dataSource={history}
        columns={columns}
        pagination={false}
        bordered
      />
    </Box>
  );
}

export default History;
