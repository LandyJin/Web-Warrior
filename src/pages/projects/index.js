import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/layout'
import * as styles from "../../styles/projects.module.css"
import { GatsbyImage } from 'gatsby-plugin-image';  

export default function Projects({ data }) {
  console.log(data)
  const projects = data.projects.nodes
  const contact = data.contact.siteMetadata.contact
  return (
      <Layout>
            <div className={styles.portfolio}>
                <h2>Portfolio</h2>
                <h3>Projects & Website I've created</h3>
                <div className={styles.projects}>
                  {projects.map(project => (
                    <Link to={"/projects/" + project.frontmatter.slug} key={project.id}>
                      <div>
                        <GatsbyImage image={project.frontmatter.thumb.childImageSharp.gatsbyImageData} alt="banner"/>
                        <h3>{project.frontmatter.title}</h3>
                        <p>{project.frontmatter.stack}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <p>Email me at {contact}</p>
            </div>
      </Layout>
  )
}

// Export page query
export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      nodes {
        id
        frontmatter {
          slug
          stack
          title
          date
          thumb {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`