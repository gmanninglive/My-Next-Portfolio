import { AiFillGithub } from 'react-icons/ai';

export default function GitLink ({ url, size = 48, ...rest} ) {
    return(
        <a href={url} target="_blank" rel="noreferrer" title="Check Out The Github Repo" {...rest}>
            <AiFillGithub
            size={size} />
        </a>
    )
}