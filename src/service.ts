import axios from 'axios';
import { data, SIDStatus } from './data';
// import axios from 'axios';

const SIDStatusService = {
  // Implement axios calls here
  async getAll(limit: number, offset: number): Promise<SIDStatus[]> {
    // axios.get('http://localhost:3000/api/v1/sid-status', {})
    //   .then(response => {})  
    return Promise.resolve(data.slice(offset, offset + limit));
  },

  async getByKey(key: string): Promise<SIDStatus | null> {
    const result = await Promise
      .resolve(data.find(item => item.key === key));
    return result ? result : null;
  }
}

export default SIDStatusService;
