import Image from "next/image";



export default function Card({ data }) {
  return (
    <div
      className="w-full bg-gray-200 rounded-xl 
        flex justify-between flex-wrap xl:flex-nowrap
        text-gray-800 text-xl"
    >
      <div className="p-4 relative w-full xl:w-3/4">
        <h1>{data.title}</h1>
        <ul className="flex justify-start items-center flex-wrap gap-x-6">
          {data.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="py-4">{data.description}</p>
        <ul className="flex gap-x-6 items-center">
          <li>
            <a href={data.web_url}>Live Site</a>
          </li>
          <li>
            <a href={data.git_url}>Github</a>
          </li>
        </ul>
      </div>
      
      <div className="flex items-center">
        {data.image ? (
          <Image
            src={data.image}
            width={450}
            height={400}
            alt={data.title}
            className="rounded-xl"
          />
        ) : (
          "image"
        )}
      </div>
    </div>
  );
}
