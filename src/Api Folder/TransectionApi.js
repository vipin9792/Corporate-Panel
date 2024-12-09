// api.js
import axios from 'axios';

const fetchTransactions = async (corp_id) => {
  try {
    const response = await axios.post(
      'http://103.35.121.219:4000/corp/subscription/fetchTransactions',
      { corp_id: corp_id },
      {
        headers: {
          Authorization:
            'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error('Error fetching transactions: ' + err.message);
  }
};

export { fetchTransactions };
