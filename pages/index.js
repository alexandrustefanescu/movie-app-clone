import Head from "next/head";
import Header from "../components/Header";
import Movies from "../components/Movies";
import Navbar from "../components/Navbar";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="An amazing Movie APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HEADER */}
      <Header />
      {/* NAVBAR */}
      <Navbar />
      {/* MOVIES */}
      <Movies results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((response) => response.json());

  return {
    props: {
      results: request.results,
    },
  };
}
