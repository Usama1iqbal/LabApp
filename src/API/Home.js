import axios from 'axios';

const BASE_URL = 'http://192.168.33.190:8002';

const handleError = error => {
  const detail = error.response?.data?.detail;
  const message =
    typeof detail === 'string'
      ? detail
      : Array.isArray(detail)
      ? detail.map(d => d.msg || JSON.stringify(d)).join('\n')
      : error.message;
  throw new Error(message);
};

export const getPatientsFromDB = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_patients`);
    return response.data;
  } catch (error) {
    handleError(error); // ✅ throw karo, return [] mat karo
  }
};

export const signupAPI = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/SignUp`, {
      user_name: name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('Signup Error:', error);
    throw error; // ← zarori hai useMutation ke onError ke liye
  }
};

// export const loginAPI = async ({ email, password }) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/Login`, { email, password });
//     return response.data;
//   } catch (error) {
//     const detail = error.response?.data?.detail;
//     if (Array.isArray(detail)) {
//       throw new Error(detail.map(d => d.msg).join('\n'));
//     }
//     throw new Error(detail || 'Network Error');
//   }
// };

export const loginAPI = async ({ email, password }) => {
  const data = { email, password };
  const response = await axios.post(`${BASE_URL}/Login`, data);
  return response.data;
}

export const getPendingList = async () => {
  const response = await axios.get(`${BASE_URL}/patient-waiting-list`);
  return response.data;
};

// Patient process detail
export const getPatientProcess = async (mpi, vid) => {
  const response = await axios.get(
    `${BASE_URL}/patient-process/${mpi}/${vid}`,
  );
  return response.data;
};

// Lock test request
export const lockTestRequest = async ({vid, userId, mpi }) => {
  const response = await axios.put(
    `${BASE_URL}/requests/lock_test_request/visit_id/${vid}/user_id/${userId}`,
  );
  return response.data;
};

// Update report status
export const updateReportStatus = async data => {
  try {
    const response = await axios.put(
      `${BASE_URL}/requests/update_report_status`,
      data,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAcceptedList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patient-Accepted-list`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const unlockTestRequest = async (visit_id, user_id) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/requests/unlock_test_request/visit_id/${visit_id}/user_id/${user_id}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Lock single test
export const lockSingleTest = async (test_req_id, user_id) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/requests/lock_test/${test_req_id}/user_id/${user_id}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Unlock single test
export const unlockSingleTest = async (test_req_id, user_id) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/requests/unlock_test_request/test_req_id/${test_req_id}/user_id/${user_id}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getPatientDetail = async mpi => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${mpi}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
