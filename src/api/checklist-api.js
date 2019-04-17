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

export const findChecklists = searchValue => (
  http.get(`/api/checklists/search=${searchValue}`)
);

export const createNestedChecklist = values => (
  http.post('/api/checklists/create-nested-checklist', values)
);

export const getNestedChecklist = slug => (
  http.get(`/api/checklists/get-nested-checklist/${slug}`)
);
