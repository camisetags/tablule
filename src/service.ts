import axios from 'axios';
import { SIDStatus } from './data';
// import axios from 'axios';

export interface PaginatedSIDStatus {
  data: SIDStatus[];
  total: number;
  current: number;
  pageSize: number;
}

interface SearchPayload {
  page: number;
  limit: number;
  searchInput?: string;
}

export interface Task {
  status: string
  key: string
  execution_id: string
  create_date: string
  sub_domain: string
  error_description?: string
}

export interface PaginatedTask {
  data: Task[];
  total: number;
  current: number;
  pageSize: number;
}

const SIDStatusService = {

  // Implement axios calls here
  async getAll({ page = 1, limit = 5, searchInput }: SearchPayload): Promise<PaginatedTask> {
    const results = await axios.get<PaginatedTask>(`http://54.163.16.30:80/task/page/${page}?per_page=${limit}`)
      .then(response => response.data)

    return results;
  },

  async getByKey(key: string): Promise<Task | null> {
    const result = await axios.get<Task>(`http://54.165.4.227:80/task/${key}`)

    if (result.status === 200) {
      return result.data
    }

    throw new Error('Task not found')
  }
}

export default SIDStatusService;
