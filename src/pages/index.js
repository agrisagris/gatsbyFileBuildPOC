import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/index.css";

function Index({ data }) {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch("/api/date");
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <Helmet>
        <title>Gatsby file build POC</title>
      </Helmet>
      <h1>Gatsby + Node.js (TypeScript) API</h1>
      {data?.allMdx?.nodes.map((file) => {
        return (
          <div key={file?.id}>
            <h2>{file?.slug}</h2>

            <h3>{file?.frontmatter?.title}</h3>
            <p>{file?.frontmatter?.url1}</p>
            <p>{file?.frontmatter?.url2}</p>
          </div>
        );
      })}
    </main>
  );
}

export default Index;

export const pageQuery = graphql`
  {
    allMdx {
      nodes {
        id
        slug
        frontmatter {
          title
          url1
          url2
        }
        headings {
          value
          depth
        }
      }
    }
  }
`;
