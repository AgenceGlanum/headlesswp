import React from 'react'
import GravityForm from 'react-gravity-form'

import { variables } from '../common/variables'
import Seo from '../components/seo'
import Layout from '../layout'

const ContactPage = ({ data, location }) => {
    return (
        <Layout location={location}>
            <h1>Page de contact</h1>
            <GravityForm
                backendUrl={variables.restGFormURL}
                formID="1"
                populatedFields={{ parameterName: 'Value' }}
                jumpToConfirmation={false} // optional, default is equal to true
            />
        </Layout>
    )
}

export const Head = () => <Seo title="Contact" />

export default ContactPage
