import { graphql } from 'gatsby'
import React from 'react'

import Seo from '../components/seo'
import Layout from '../layout'

const ContactPage = ({ data, location }) => {
    console.log(data)
    const formFields = data.wpGfForm.formFields.nodes
    return (
        <Layout location={location}>
            <h1>Page de contact</h1>
            <form action="">
                {formFields.length &&
                    formFields.map((element, index) => (
                        <label htmlFor={`${element.type}--${element.id}`} key={index}>
                            {element.label}
                            <input
                                type={element.type}
                                id={`${element.type}--${element.id}`}
                                data-id={element.id}
                                className={element.cssClass}
                                placeholder={element.placeholder}
                                required={element.isRequired}
                            />
                        </label>
                    ))}
            </form>
        </Layout>
    )
}

export const Head = () => <Seo title="Contact" />

export default ContactPage

export const pageQuery = graphql`
    query WpPosts {
        wpGfForm {
            formFields {
                nodes {
                    id
                    type
                    ... on WpTextField {
                        description
                        label
                        isRequired
                        placeholder
                        cssClass
                        labelPlacement
                        isPasswordInput
                    }
                }
            }
            id
        }
    }
`
