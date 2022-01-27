export interface SIDStatus {
  integrationName: string;
  key: string;
  executionID: string;
  status: string;
}


export const data: SIDStatus[] = [
  {
    integrationName: 'feeds',
    key: 'SID-1',
    executionID: 'SID-1-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-2',
    executionID: 'SID-2-1',
    status: 'Success'
  },
  {
    integrationName: 'feeds',
    key: 'SID-3',
    executionID: 'SID-3-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-4',
    executionID: 'SID-4-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-5',
    executionID: 'SID-5-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-6',
    executionID: 'SID-6-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-7',
    executionID: 'SID-7-1',
    status: 'Success'
  },
  {
    integrationName: 'flash',
    key: 'SID-8',
    executionID: 'SID-8-1',
    status: 'Success'

  },
  {
    integrationName: 'seed',
    key: 'SID-9',
    executionID: 'SID-9-1',
    status: 'Success'
  },
  {
    integrationName: 'seed',
    key: 'SID-10',
    executionID: 'SID-10-1',
    status: 'Success'
  },
]
