import http from './http';

const createChecklist = values => (
  http.post('/api/checklists/create', values)
);

export default createChecklist;
