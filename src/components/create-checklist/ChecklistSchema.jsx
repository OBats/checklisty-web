import * as Yup from 'yup';

const ChecklistSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  items_data: Yup.array()
    .of(
      Yup.object().shape({
        item_title: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        description: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        details: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        tags: Yup.array()
          .of(Yup.string())
          .min(1)
          .required('Required'),
        priority: Yup.string()
          .required('Required'),
      }),
    ),
});

export default ChecklistSchema;
