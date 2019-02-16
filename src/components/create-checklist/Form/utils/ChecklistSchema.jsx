import * as Yup from 'yup';

const ChecklistSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Checklist title should be 10-50 symbols long')
    .max(50, 'Checklist title should be 10-50 symbols long')
    .required('Checklist title is required'),
  items_data: Yup.array()
    .of(
      Yup.object().shape({
        item_title: Yup.string()
          .min(1, 'Checklist title should be 1-25 symbols long')
          .max(25, 'Checklist title should be 1-25 symbols long')
          .required('Section title is required'),
        description: Yup.string()
          .min(2, 'Description should be 2-200 symbols long')
          .max(200, 'Description should be 2-200 symbols long')
          .required('Description is required'),
        tags: Yup.array()
          .of(Yup.string())
          .min(1)
          .required('Choose at least 1 tag'),
        priority: Yup.string()
          .required('Priority is required'),
      }),
    ),
});

export default ChecklistSchema;
