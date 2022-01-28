import React, { useState, useEffect, useCallback } from 'react'
import { Table, TablePaginationConfig, Modal, Input, Row, Col } from 'antd'
import SiDStatusService, { PaginatedSIDStatus } from './service'
import { SIDStatus } from './data'


const columns = [
  { title: 'Integration Name', dataIndex: 'integrationName', key: 'integrationName' },
  { title: 'Key', dataIndex: 'key', key: 'key' },
  { title: 'Execution ID', dataIndex: 'executionID', key: 'executionID' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
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
    SiDStatusService.getAll({ page: 1, limit: 5 })
      .then(status => {
        setPaginated(status)
        setLoading(false)
      })
  }, [])

  const handleTableChange = useCallback((pagination: TablePaginationConfig, _filters: any, _sorter: any) => {
    let current = 0
    if (pagination.current) { current = pagination.current }

    setLoading(true)
    SiDStatusService.getAll({ page: current, limit: pagination.pageSize || 10 })
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
        SiDStatusService.getByKey(record.key)
          .then(status => status && setCurrentSID(status))
      },
    }
  }, [])

  const setVisibilityOff = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(false)
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    SiDStatusService.getAll({ page: 1, limit: 50, searchInput: e.target.value })
      .then(status => {
        setPaginated(status)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <Modal title="Basic Modal" visible={visible} onOk={setVisibilityOff} onCancel={setVisibilityOff}>
        <p><b>Execution ID: </b>{currentSID.executionID} <b>Key: </b>{currentSID.key}</p>
        <br />
        <p><b>Error Description</b></p>
        <p>{currentSID.errorDescription}</p>
      </Modal>

      <Row style={{ padding: 8 }}>
        <Col span={8} />
        <Col span={8} offset={8}>
          <Input placeholder="Search for element" onChange={handleSearch} />
        </Col>
      </Row>

      <Table
        onRow={onRow}
        columns={columns}
        dataSource={paginated.data}
        loading={loading}
        pagination={paginated}
        onChange={handleTableChange} />
    </div >
  )
}

export default App
