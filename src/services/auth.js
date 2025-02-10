import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/auth/',
  timeout: 5000
})

// 2. Функция регистрации
export async function registerUser(userData) {
  // userData должен содержать:
  // {
  //   "email": "user@example.com",
  //   "password": "string",
  // }
  const response = await apiClient.post('register', userData)
  return response.data
}

// 3. Функция логина (авторизации)
export async function loginUser(credentials) {
  // Convert the credentials object into URLSearchParams format
  const payload = new URLSearchParams();
  for (const key in credentials) {
    payload.append(key, credentials[key]);
  }

  // Pass the payload along with the required header
  const response = await apiClient.post('login', payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
}
