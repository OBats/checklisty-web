import * as Yup from 'yup';

const minLength = 1;
const maxLength = 256;
const maxDescLength = 1024;

const checklistSchema = Yup.object().shape({
  title: Yup.string()
    .min(minLength, 'Checklist title should be at least 1 symbols long')
    .max(maxLength, 'Checklist title should be max 256 symbols long')
    .required('Checklist title is required'),
  sections_data: Yup.array()
    .of(
      Yup.object().shape({
        section_title: Yup.string()
          .min(minLength, 'Section title should be at least 1 symbols long')
          .max(maxLength, 'Section title should be max 256 symbols long')
          .required('Section title is required'),
        items_data: Yup.array()
          .of(
            Yup.object().shape({
              item_title: Yup.string()
                .min(minLength, 'Item title should be at least 1 symbols long')
                .max(maxLength, 'Item title should be max 256 symbols long')
                .required('Item title is required'),
              description: Yup.string()
                .min(minLength, 'Description title should be at least 1 symbols long')
                .max(maxDescLength, 'Description title should be max 1024 symbols long')
                .required('Description is required'),
              priority: Yup.string()
                .required('Priority is required'),
            }),
          ),
      }),
    ),
});

export default checklistSchema;
