import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function WebLink({ url, size = 48, ...rest}) {
  return (
    <a href={url} target="_blank" rel="noreferrer" title="Check Out The Live Site" {...rest} >
      <FaExternalLinkSquareAlt size={size} />
    </a>
  );
}
