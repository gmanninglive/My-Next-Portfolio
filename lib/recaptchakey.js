let SITE_KEY;
if (process.env.NODE_ENV === "development") {
  SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  
}
else if (process.env.NODE_ENV === "production") {
  SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
}
export default SITE_KEY;

