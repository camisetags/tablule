import React, { useState, useEffect, useCallback } from 'react'
import { Table, TablePaginationConfig, Modal } from 'antd'
import SiDStatusService, { PaginatedSIDStatus } from './service'
import { SIDStatus } from './data'


const columns = [
  {
    title: 'Integration Name',
    dataIndex: 'integrationName',
    key: 'integrationName',
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Execution ID',
    dataIndex: 'executionID',
    key: 'executionID',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
]

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [paginated, setPaginated] = useState<PaginatedSIDStatus>({
    data: [],
    total: 0,
    current: 1,
    pageSize: 10,
  })
  const [currentSID, setCurrentSID] = useState<SIDStatus>({
    integrationName: '',
    key: '',
    executionID: '',
    status: '',
    errorDescription: '',
  })
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    setLoading(true)
    SiDStatusService.getAll(1, 5)
      .then(status => {
        setPaginated(status)
        setLoading(false)
      })
  }, [])

  const handleTableChange = useCallback((pagination: TablePaginationConfig, _filters: any, _sorter: any) => {
    let current = 0
    if (pagination.current) { current = pagination.current }

    setLoading(true)
    SiDStatusService.getAll(current, pagination.pageSize)
      .then(status => {
        setPaginated(status)
        setLoading(false)
      })
  }, [])

  const onRow = useCallback((record) => {
    return {
      onClick: () => {
        setVisible(true)
        setCurrentSID(record)
      },
    }
  }, [])

  return (
    <div className="App">
      <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Error Description</p>
        <p></p>
      </Modal>

      <Table
        onRow={onRow}
        columns={columns}
        dataSource={paginated.data}
        loading={loading}
        pagination={paginated}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default App
