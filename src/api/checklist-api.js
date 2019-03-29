import http from './http';

export const createChecklist = values => (
  http.post('/api/checklists/create', values)
);

export const getChecklist = slug => (
  http.get(`/api/checklists/${slug}`)
);

export const updateChecklist = (slug, values) => (
  http.put(`/api/checklists/${slug}`, values)
);

export const updateSlug = (id, newSlug) => (
  http.patch('/api/checklists/new-slug', { id, newSlug })
);
