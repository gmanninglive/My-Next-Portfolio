/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
export default function METADATA () {
    return (
<Head>
{/* Twitter */}
<meta name="twitter:card" content="George Manning's Portfolio | Built with NextJs ThreeJs and Tailwind" key="twcard" />

<title>George Manning's Portfolio</title>
<meta name="description" content="Built with NextJs ThreeJs and Tailwind"
        />
<link rel="icon" href="/favicon.ico" />
{/* Open Graph */}
<meta property="og:url" content="https://gmanningdev.uk" key="ogurl" />
<meta property="og:image" content={`${process.env.BASE_URL}/images/gmanningdevscreen.png`} key="ogimage" />
<meta property="og:site_name" content="George Manning's Portfolio" key="ogsitename" />
<meta property="og:title" content="George Manning's Portfolio Website" key="ogtitle" />
<meta property="og:description" content="Built with NextJs ThreeJs and Tailwind " key="ogdesc" />
 </Head> 
)}