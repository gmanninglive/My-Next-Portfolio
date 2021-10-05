/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FiChevronDown, FiArrowUp } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";

import Cards from "components/portfolio/Cards";
import Hero from "components/three/Hero";
import GitLink from "components/buttons/GitLink";
import ToggleColor from "components/buttons/ToggleColor";
import ContactForm from "components/forms/Contact";
import METADATA from "components/metadata/Metadata";

export default function Home() {
  const [lightBg, setLightBg] = useState(true);

  function setBackground() {
    if (lightBg == false) setLightBg(true);
    else setLightBg(false);
  }
  return (
    <>
      <METADATA />

      <div
        id="index"
        className={`overflow-hidden max-w-screen h-screen 
      flex flex-col flex-wrap justify-start p-4 bg-black  
       relative ${
         lightBg ? "bg-gradient-to-tr from-pink-200 to-white" : "bg-black"
       } `}
      >
        <div className="w-full flex justify-between items-center pb-2">
          <ToggleColor foo={setBackground} />
          <ul
            className={`flex gap-x-2 ${
              lightBg ? "text-gray-900" : "text-gray-100"
            }`}
          >
            <li>
              <Link href="#projects">
                <a>Projects</a>
              </Link>
            </li>
            <li>
              <Link href="#contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
        {/* bg-gradient-to-tr from-pink-200 to-white  */}
        <Hero />
        <FiChevronDown
          size={48}
          className={`mt-6 place-self-center animate-bounce ${
            lightBg ? "text-gray-900" : "text-gray-100"
          }`}
        />
      </div>
      <div
        className="overflow-hidden  
      flex justify-center py-4 
      bg-gray-200 "
      >
        <div
          className="overflow-hidden w-screen 
        gap-y-4 xl:w-7/12 
        flex flex-col flex-wrap justify-start
        "
        >
          <h1 id="projects" className="text-3xl text-gray-800 px-4">
            Projects
          </h1>

          <Cards />
        </div>
      </div>
      <div
        className="overflow-hidden  min-h-screen 
      flex justify-center px-4 pt-4 pb-2 
      bg-gradient-to-b from-gray-200 to-white  "
      >
        <div className="overflow-hidden w-screen xl:w-7/12 flex flex-col justify-start py-4 gap-y-4 relative">
          <h1 id="contact" className="text-4xl font-extrabold">
            Contact
          </h1>
          <div className="h-full w-full flex flex-col items-center justify-start gap-y-6">
            <span className="flex flex-col items-center gap-y-4">
              <h2>
                I look forward to hearing from you, drop me a line via the
                contact form
              </h2>
              <ContactForm />
            </span>
            <span className="flex flex-col items-center gap-y-4">
              <h2>Or contact me through one of my socials</h2>
              <span className="flex justify-center items-center gap-x-4">
                <GitLink url="https://github.com/gmanninglive" />
                <a
                  href="https://www.linkedin.com/in/george-manning-90a47621a/"
                  className="text-gray-800"
                >
                  <GrLinkedin size={36} />
                </a>
              </span>
            </span>
          </div>

          <div className="w-full flex justify-between items-center gap-y-2 ">
            <ul>
              <li>Created by George Manning</li>
              <li>Using Next.Js, Threejs & TailwindCss</li>
              <li className="">Check back monthly for updated 3d visuals 🤙</li>
            </ul>
            <Link href="#index">
              <a className="animate-bounce text-gray-900">
                <FiArrowUp size={24} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
