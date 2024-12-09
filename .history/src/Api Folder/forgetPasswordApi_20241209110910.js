// api.js

import axios from 'axios';

const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      'http://103.35.121.219:4000/corp/forgetPassword',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in ForgetPassword API:', error);
    throw new Error('An error occurred while processing your request.');
  }
};
