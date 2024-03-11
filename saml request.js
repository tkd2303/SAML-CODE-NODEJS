const { create } = require('xmlbuilder2');

// Construct the SAML authentication request XML
const samlRequest = create({
    'samlp:AuthnRequest': {
        '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
        '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '@ID': '_' + Math.random().toString(36).substr(2, 9),
        '@Version': '2.0',
        '@IssueInstant': new Date().toISOString(),
        '@Destination': 'https://trial-4751654.okta.com/app/trial-4751654_samldemo_1/exkbg77o4tzquRMEw697/sso/saml',
        '@AssertionConsumerServiceURL': 'YOUR_ASSERTION_CONSUMER_SERVICE_URL',
        '@ProtocolBinding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        'saml:Issuer': 'http://www.okta.com/exkbg77o4tzquRMEw697',
    }
}).end({ prettyPrint: true });

console.log(samlRequest);