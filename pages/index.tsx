import Head from 'next/head'
import dynamic from "next/dynamic";

const GeoButton = dynamic(() => import("../components/GeoButton")
.then(module => module.GeoButton), {
 ssr: false,
});

export default function Home() {
 return (
   <>
     <Head>
       <title>Trusted Location </title>
     </Head>
     <main>
       <GeoButton />
     </main>
   </>
 )
}