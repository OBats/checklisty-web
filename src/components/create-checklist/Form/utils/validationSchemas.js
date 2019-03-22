import * as Yup from 'yup';

const minLength = 1;
const maxLength = 256;
const maxDescLength = 1024;

export const checklistSchema = Yup.object().shape({
  title: Yup.string()
    .min(minLength, `Checklist title should be at least ${minLength} symbols long`)
    .max(maxLength, `Checklist title should be max ${maxLength} symbols long`)
    .required('Checklist title is required'),
  sections_data: Yup.array()
    .of(
      Yup.object().shape({
        section_title: Yup.string()
          .min(minLength, `Section title should be at least ${minLength} symbols long`)
          .max(maxLength, `Section title should be max ${maxLength} symbols long`)
          .required('Section title is required'),
        items_data: Yup.array()
          .of(
            Yup.object().shape({
              item_title: Yup.string()
                .min(minLength, `Item title should be at least ${minLength} symbols long`)
                .max(maxLength, `Item title should be max ${maxLength} symbols long`)
                .required('Item title is required'),
              description: Yup.string()
                .max(maxDescLength, `Description title should be max ${maxDescLength} symbols long`),
              priority: Yup.string()
                .required('Priority is required'),
            }),
          ),
      }),
    ),
});

export const customUrlSchema = Yup.object().shape({
  custom_url: Yup.string()
    .min(minLength, `Url should be at least ${minLength} symbols long`)
    .max(maxLength, `Url should be max ${minLength} symbols long`)
    .matches(/^[-a-z0-9]+$/, 'Url should contain only lowercase alphabetical characters, integers or en dashes (-)')
    .required('Url is required'),
});
