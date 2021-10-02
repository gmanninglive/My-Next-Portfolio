import { HiOutlineMail } from "react-icons/hi";

export default function Email({ url = "gmanningdev@gmail.com", size = 48, ...rest }) {
  return (
    <a href={`mailto:${url}`} alt="email" >
      <HiOutlineMail size={size} />
    </a>
  );
}
