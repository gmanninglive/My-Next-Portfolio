import GitLink from "components/buttons/GitLink";
import WebLink from "components/buttons/WebLink";
import Image from "next/image";
import Slide from "components/motion/Slide";

export default function Card({ data }) {
  return (
    <Slide direction="right">
      <div
        className="w-full bg-white shadow-md
        flex justify-between flex-wrap xl:flex-nowrap
        text-gray-800 text-xl"
      >
        <div className="p-4 relative w-full xl:w-3/4">
          <h1>{data.title}</h1>
          <ul className="flex justify-start items-center flex-wrap gap-x-2">
            {data.tech.map((item, index) => (
              <li key={item} className="flex gap-x-2">
                <p>{item}</p>
                <p>{data.tech[index + 1] && <>&bull;</>}</p>
              </li>
            ))}
          </ul>
          <p className="py-4">{data.description}</p>
          <ul className="flex gap-x-6 items-center ">
            <li>
              <WebLink url={data.web_url} size={36} />
            </li>
            <li>
              <GitLink url={data.git_url} size={36} />
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          {data.image ? (
            <Image
              src={data.image}
              width={532}
              height={400}
              alt={data.title}
              className=""
            />
          ) : (
            "image"
          )}
        </div>
      </div>
    </Slide>
  );
}
