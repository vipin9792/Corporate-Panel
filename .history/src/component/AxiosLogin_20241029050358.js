import { useHistory } from 'react-router-dom';

// Inside your LoginForm component
const history = useHistory();

// After a successful login
history.push('/dashboard'); // Redirect to the dashboard or another page
