import { useState, useEffect, useCallback } from 'react'
import { Table } from 'antd'
import SiDStatusService from './service'
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
  const [sidStatus, setSidStatus] = useState<SIDStatus[]>([])

  useEffect(() => {
    SiDStatusService.getAll(5, 0)
      .then(status => {
        setSidStatus(status)
      })
  }, [])

  return (
    <div className="App">
      <Table columns={columns} dataSource={sidStatus} />
    </div>
  )
}

export default App
