import http from './http';

const createChecklist = values => (
  http.post('/api/checklists/create', values)
);

export const getChecklist = async id => (
  http.get(`/api/checklists/${id}`)
);

export const updateChecklist = (id, values) => (
  http.put(`/api/checklists/${id}`, values)
);

export default createChecklist;
