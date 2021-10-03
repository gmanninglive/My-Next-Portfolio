import { Field, Formik, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

import { useRef, useState } from "react";

import SITE_KEY from "lib/recaptchakey";
import Alert from "components/common/Alert";

// TODO Build custom alert components
export default function ContactForm() {
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
    return res;
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        handleSubmit(values).then((res) => {
          console.log(res);
          if (res.status === 200) {
            actions.setStatus( "Success: 'Email sent !'" )
            actions.setSubmitting(false);
            actions.resetForm();
          } else {
            actions.setSubmitting(false);
            actions.setStatus( "Error: 'Sorry there was an error please try again !'" )
          }
        });
      }}
    >
      {(props) => {
        const handleBlur = (e) => {
        //   console.log("$$$$", props.isSubmitting);
          if (!props.values.recaptcha) {
            recaptchaRef.current.execute();
            props.setSubmitting(true);
          }
          props.handleBlur(e);
        };

        return (
          <form
            onSubmit={props.handleSubmit}
            className="w-full md:w-3/4 flex flex-col gap-y-4 p-2 bg-white/[0.5]"
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
              sitekey={SITE_KEY}
              onChange={(value) => {
                // console.log("$$$$", props.isSubmitting, value);
                props.setFieldValue("recaptcha", value);
                props.setSubmitting(false);
              }}
              size="invisible"
            />
            <button type="submit" disabled={props.isSubmitting} className="w-full p-2 bg-gray-900 text-gray-100 shadow-sm">
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
          </form>
        );
      }}
    </Formik>
  );
}
