import axios from 'axios';

// Your Bearer Token (ensure it's handled securely in production)
const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

// Function to verify OTP
export const verifyOtp = async (corpId, email, otp) => {
  try {
    const response = await axios.post(
      'http://103.35.121.219:4000/corp/verifyOTP',
      { corp_id: corpId, email, otp },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error during OTP verification');
  }
};

// Function to resend OTP
export const resendOtp = async (corpId, email) => {
  try {
    const response = await axios.post(
      'http://103.35.121.219:4000/corp/resendOTP',
      { corp_id: corpId, email },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error while resending OTP');
  }
};
