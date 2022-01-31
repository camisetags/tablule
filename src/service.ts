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


const SIDStatusService = {

  // Implement axios calls here
  async getAll({ page = 1, limit = 3, searchInput }: SearchPayload): Promise<PaginatedSIDStatus> {
    
    const results = await axios.get('http://127.0.0.1:5000/task/page/1?per_page=6')
      .then(response => response.data)
    
    console.log(results)

    const withSearchResult = searchInput
      ? results.data.filter((item: any) => item.key.includes(searchInput) || item.execution_id.includes(searchInput))
      : results.data

    // Just change this call to a axios with limit and offset
    return Promise.resolve({
      data: withSearchResult,
      total: results.data.length,
      current: results.current,
      pageSize: results.pageSize
    });
  },

  async getByKey(key: string): Promise<SIDStatus | null> {
    const result: SIDStatus = await Promise
      .resolve(data.find((item: any) => item.key === key));
    return result ? result : null;
  }
}

export default SIDStatusService;
