import axios from 'axios';
import { data, SIDStatus } from './data';
// import axios from 'axios';

export interface PaginatedSIDStatus {
  data: SIDStatus[];
  total: number;
  current: number;
  pageSize: number;
}

const SIDStatusService = {
  // Implement axios calls here
  async getAll(page: number, limit: number = 10): Promise<PaginatedSIDStatus> {
    // axios.get('http://localhost:3000/api/v1/sid-status', {})
    //   .then(response => {})  

    const pageCount = (page - 1) * limit;
    const limitCount = page * limit;
    const result = data.slice(pageCount, limitCount);

    // Just change this call to a axios with limit and offset
    return Promise.resolve({
      data: result,
      total: data.length,
      current: page,
      pageSize: limit
    });
  },

  async getByKey(key: string): Promise<SIDStatus | null> {
    const result = await Promise
      .resolve(data.find(item => item.key === key));
    return result ? result : null;
  }
}

export default SIDStatusService;
