import { useState, useEffect, useCallback } from 'react'
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

function App() {
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
  })

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

  return (
    <div className="App">
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record)
            },
          }
        }}
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
