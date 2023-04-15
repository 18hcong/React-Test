import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, UserName, role, image) => {
  //submit data
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', UserName);
  data.append('role', role);
  data.append('userImage', image);
  return axios.post('/api/v1/participant', data);
};

const getAllUsers = () => {
  return axios.get('/api/v1/participant/all');
};

const putUpdateUser = (id, UserName, role, image) => {
  //submit data
  const data = new FormData();
  data.append('id', id);
  data.append('username', UserName);
  data.append('role', role);
  data.append('userImage', image);
  return axios.put('/api/v1/participant', data);
};

const deleteUser = (userID) => {
  return axios.delete('/api/v1/participant', { data: { id: userID } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, {
    email,
    password,
    delay: 3000, //ms
  });
};

const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};

const getQuizByUser = () => {
  return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
