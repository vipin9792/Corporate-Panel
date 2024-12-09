// src/services/studentService.js

import axios from 'axios';

const API_URL = 'http://103.35.121.219:4000/corp/dashboard/studentList';

export const fetchStudents = async (corp_id, token) => {
  try {
    const response = await axios.post(
      API_URL,
      { corp_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
