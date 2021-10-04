import { Field, Formik, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

import SITE_KEY from "lib/recaptchakey";
import ContactAlert from "components/common/ContactAlert";

export default function ContactForm() {
  const recaptchaRef = useRef();

  // Contact form alert state
  const [alertState, setAlertState] = useState({ type: "error", open: false });

  const initialValues = {
    from_name: "",
    from_email: "",
    message: "",
  };

  async function handleSubmit(values) {
    const body = { values };
    // Post request to nodemailer route with contact form values as body. Returns promise as res
    const res = await fetch(`/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // const res = { status: 400 }; // Just for testing
    return res;
  }

  // Setting alert state with timer
  function alert(message) {
    setAlertState({ type: message, open: true });
    setTimeout(() => {
      setAlertState({ type: message, open: false });
    }, 3000);
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        handleSubmit(values).then((res) => {
          // Log Api response
          console.log(res.json());
          if (res.status === 200) {
            // Enable Submit button
            actions.setSubmitting(false);
            // Load success Alert
            alert("success");
            // Reset Form
            actions.resetForm();
          } else {
            // Enable Submit button
            actions.setSubmitting(false);
            // Load Error Alert & don't reset form
            alert("error");
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
            className="w-full md:w-3/4 flex flex-col gap-y-4 p-2 bg-white/[0.5] relative"
          >
            {/* Alert on Success or Error */}
            <ContactAlert alertState={alertState} />

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

            <button
              type="submit"
              disabled={props.isSubmitting}
              className="w-full p-2 bg-gray-900 text-gray-100 shadow-sm"
            >
              {props.isSubmitting ? "Loading..." : "Submit"}
            </button>
            {/* Required when hiding google recaptcha badge */}
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
