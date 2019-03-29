import * as Yup from 'yup';

const minLength = 1;
const maxLength = 256;

const customNameSchema = Yup.object().shape({
  name: Yup.string()
    .min(minLength, `Name should be at least ${minLength} symbols long`)
    .max(maxLength, `Name should be max ${minLength} symbols long`)
    .matches(/^[^-\s][a-zA-Z0-9_\s-]+$/, 'Name can`t be started by space or can`t contains specific characters')
    .required('Team name is required'),
});

export default customNameSchema;
