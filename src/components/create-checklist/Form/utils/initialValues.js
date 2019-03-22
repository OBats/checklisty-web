const initiaalValues = {
  title: '',
  isPrivate: false,
  sections_data: [{
    _id: Math.random(),
    section_title: '',
    items_data: [{
      _id: Math.random(),
      item_title: '',
      description: '',
      details: '',
      tags: [],
      priority: 0,
    }],
  }],
};

export default initiaalValues;
