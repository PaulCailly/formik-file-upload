import ReactDropzone from "react-dropzone";
import { Formik, Form, Field } from "formik";
import { object, mixed } from "yup";

const FILE_SIZE = 900000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const Dropzone = () => {
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
              <ReactDropzone
                onDrop={(acceptedFiles) => {
                  formProps.setFieldValue("file", acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </ReactDropzone>
            )}
          </Field>
          <button type="Submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Dropzone;
