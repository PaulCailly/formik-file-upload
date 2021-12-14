import { Formik, Form, Field } from "formik";
import { object, mixed } from "yup";

const FILE_SIZE = 900000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const Simple = () => {
  const validationSchema = object().shape({
    file: mixed()
      .test(
        "fileSize",
        "File Size is too large",
        (value) => value.size <= FILE_SIZE
      )
      .test("fileType", "Unsupported File Format", (value) =>
        SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const initialValues = { file: {} };

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }

    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formProps) => (
        <Form>
          <Field name="file">
            {({ meta }) => (
              <div>
                <input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    formProps.setFieldValue("file", event.target.files[0]);
                  }}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="Submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Simple;
