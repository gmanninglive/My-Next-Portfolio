import { Field, Formik, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

import { useRef, useState } from "react";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export default function ContactForm() {
  const { isSubmitting, setSubmitting } = useState(false);
  const recaptchaRef = useRef();

  const initialValues = {
    from_name: "",
    from_email: "",
    message: "",
  };

  async function handleSubmit(values) {
    const body = { values };

    const res = await fetch(`/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) console.log("OK");
  }

  

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => { handleSubmit(values) }}
    >
      {(props) => {
        const handleBlur = (e) => {
          console.log("$$$$", props.isSubmitting);
          if (!props.values.recaptcha) {
            recaptchaRef.current.execute();
            props.setSubmitting(true);
          }
          props.handleBlur(e);
        };

        return (
          <Form
            className="w-full md:w-3/4 flex flex-col gap-y-4 p-2 my-4 bg-white/[0.5]"
          >
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.from_name}
              name="from_name"
              onBlur={handleBlur}
              placeholder="Please enter your name 🙂"
              required
              className="p-2"
            />

            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.from_email}
              name="from_email"
              onBlur={handleBlur}
              placeholder="And your Email Address"
              required
              className="p-2"
            />
            <Field
              as="textarea"
              onChange={props.handleChange}
              value={props.values.message}
              name="message"
              onBlur={handleBlur}
              placeholder="And finally your message"
              required
              className="p-2 h-48"
            />
            <ReCAPTCHA
              className="invisible"
              ref={recaptchaRef}
              sitekey={TEST_SITE_KEY}
              onChange={(value) => {
                console.log("$$$$", props.isSubmitting, value);
                props.setFieldValue("recaptcha", value);
                props.setSubmitting(false);
              }}
              size="invisible"
            />
            <button type="submit" disabled={props.isSubmitting}>
              SUBMIT
            </button>
            <div className="w-full flex justify-center text-xs">
              <span>
                This site is protected by reCAPTCHA and the Google&nbsp;
                <a href="https://policies.google.com/privacy">Privacy Policy</a>
                &nbsp;and&nbsp;
                <a href="https://policies.google.com/terms">Terms of Service</a>
                &nbsp;apply.
              </span>
            </div>
            

            {props.errors.name && <div>{props.errors.name}</div>}
          </Form>
        );
      }}
    </Formik>
  );
}
