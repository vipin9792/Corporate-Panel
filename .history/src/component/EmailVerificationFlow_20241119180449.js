const EmailVerificationFlow = () => {
    const [otp, setOtp] = useState(Array(4).fill(''));
    const [otpError, setOtpError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [corpId, setCorpId] = useState(null); // Initialize corpId state as null
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
  
    const queryParams = new URLSearchParams(location.search);
    const registeredCorpId = queryParams.get('corpId');  // Get corpId from query params (if available)
    const registeredEmail = queryParams.get('email'); // Get email from query params (if available)
  
    // Set the corpId and email based on query parameters
    useEffect(() => {
      if (registeredCorpId) {
        setCorpId(registeredCorpId);
      }
      if (registeredEmail) {
        setEmail(registeredEmail);
      }
  
      console.log('corpId from query params:', registeredCorpId);
      console.log('Email from query params:', registeredEmail);
    }, [registeredCorpId, registeredEmail]);
  
    const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Your token
  
    // Ensure email and corpId are set before calling API
    const handleResendOtp = async () => {
      if (!corpId || !email) {
        alert("Missing corpId or email. Please ensure these are set correctly.");
        console.log('corpId:', corpId); // Log corpId for debugging
        console.log('email:', email); // Log email for debugging
        return;
      }
  
      setResendLoading(true);  // Set loading state for resend OTP
      console.log('Resending OTP with corp_id:', corpId); // Log for debugging
      console.log('Email:', email); // Log for debugging
  
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/resendOTP',
          { corp_id: corpId, email }, // Ensure correct corp_id and email
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}` // Add Bearer Token here
            }
          }
        );
  
        console.log('Resend OTP Response:', response);  // Log the response for debugging
  
        if (response.status === 200) {
          if (response.data.code === 1000) {
            alert('OTP has been resent to your email.');
          } else {
            alert(`Error: ${response.data.status}. Please check the data you provided.`);
          }
        } else {
          alert('Failed to resend OTP. Please try again later.');
        }
      } catch (error) {
        console.error('Error while resending OTP:', error);  // Log the error for debugging
        alert('An error occurred while resending the OTP.');
      } finally {
        setResendLoading(false);  // Reset resend loading state
      }
    };
  
    const handleVerifyOtp = async (e) => {
      e.preventDefault();
      const otpValue = otp.join('');
      setOtpError('');
      setSuccessMessage('');
      setLoading(true);
  
      if (!otpValue || otpValue.length !== 4) {
        setOtpError('Please enter a valid 4-digit OTP.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/verifyOTP',
          { corp_id: corpId, email, otp: otpValue },  // Ensure correct corp_id, email, and otp
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}` // Add Bearer Token here for verify OTP API call
            }
          }
        );
  
        console.log('Verify OTP Response:', response);  // Log the response for debugging
  
        if (response.status === 200 && response.data.code === 1000) {
          setSuccessMessage('OTP verified successfully! You can now log in.');
          alert('OTP Verified Successfully! You can now login.');
          navigate('/LoginForm');
        } else {
          setOtpError(`OTP verification failed: ${response.data.status}`);
          alert('OTP Verification Failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error); // Log the error
        setOtpError('An error occurred during OTP verification.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      // JSX remains unchanged...
    );
  };
  