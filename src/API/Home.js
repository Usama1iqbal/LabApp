import axios from 'axios';

const BASE_URL = 'http://192.168.237.190:8002';

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
  const response = await axios.get(`${BASE_URL}/get_patients`);
  return response.data;
};

export const signupAPI = async ({ name, email, password, lab_id }) => {
  const response = await axios.post(`${BASE_URL}/SignUp`, {
    user_name: name,
    email,
    password,
    lab_id,
  });
  return response.data;
};
export const getAllLabs = async () => {
  const response = await axios.get(`${BASE_URL}/all-labs`);
  return response.data;
};
export const loginAdminAPI = async ({ email, password }) => {
  console.log('=== Login CALLED ===');
  console.log('Data:', { email, password });

  const response = await axios.post(`${BASE_URL}/login-admin`, {
    email,
    password,
  });
  console.log('=== SUCCESS ===', response.data);
  return response.data;
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

export const loginAPI = async ({ email, password, lab_id }) => {
  const data = { email, password, lab_id };
  const response = await axios.post(`${BASE_URL}/Login`, data);
  return response.data;
};

export const getPendingList = async lab_id => {
  const response = await axios.get(
    `${BASE_URL}/patient-waiting-list/${lab_id}`,
  );
  return response.data;
};

// Patient process detail
export const getPatientProcess = async (nic, vid) => {
  const response = await axios.get(`${BASE_URL}/patient-process/${nic}/${vid}`);
  return response.data;
};

// Lock test request
export const lockTestRequest = async ({ vid, userId, nic }) => {
  const response = await axios.put(
    `${BASE_URL}/requests/lock_test_request/visit_id/${vid}/user_id/${userId}`,
  );
  return response.data;
};

// Update report status
export const updateReportStatus = async data => {
  const response = await axios.put(
    `${BASE_URL}/requests/update_report_status`,
    data,
  );
  return response.data;
};

export const getAcceptedList = async lab_id => {
  const response = await axios.get(
    `${BASE_URL}/patient-Accepted-list/${lab_id}`,
  );
  return response.data;
};

export const unlockTestRequest = async (visit_id, user_id) => {
  const response = await axios.put(
    `${BASE_URL}/requests/unlock_test_request/visit_id/${visit_id}/user_id/${user_id}`,
  );
  return response.data;
};

// Lock single test
export const lockSingleTest = async (test_req_id, user_id) => {
  const response = await axios.put(
    `${BASE_URL}/requests/lock_test/${test_req_id}/user_id/${user_id}`,
  );
  return response.data;
};

// Unlock single test
export const unlockSingleTest = async (test_req_id, user_id) => {
  const response = await axios.put(
    `${BASE_URL}/requests/unlock_test_request/test_req_id/${test_req_id}/user_id/${user_id}`,
  );
  return response.data;
};
export const getPatientDetail = async (nic, lab_id) => {
  const response = await axios.get(`${BASE_URL}/patients/${nic}/${lab_id}`);
  return response.data;
};

export const addLab = async name => {
  const response = await axios.post(`${BASE_URL}/add-lab?name=${name}`);
  return response.data;
};
export const allLabs = async () => {
  const response = await axios.get(`${BASE_URL}/all-labs`);
  return response.data;
};

export const changeConfig = async data => {
  try {
    const response = await axios.post(
      `${BASE_URL}/change-config-status`,
      data,
      {},
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const allLab = async () => {
  const response = await axios.get(`${BASE_URL}/all-Labs`);
  return response.data;
};

export const configHistory = async () => {
  const response = await axios.get(`${BASE_URL}/config-history`);
  return response.data;
};
export const sentToEngine = async () => {
  const response = await axios.get(`${BASE_URL}/csent-config-to-engine`);
  return response.data;
};
