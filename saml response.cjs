const { create } = require('xmlbuilder2');
const samlp = require('samlp');

// Create a SAML response with a specific status code
function createSAMLResponse(statusCode) {
    const response = samlp({
        issuer: 'https://trial-4751654.okta.com/app/trial-4751654_samldemo_1/exkbg77o4tzquRMEw697/sso/saml',
        destination: 'http://localhost:5000/login',
        cert: 'MIIDqjCCApKgAwIBAgIGAY2cGMB4MA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxFjAUBgNVBAMMDXRyaWFsLTQ3NTE2NTQxHDAaBgkqhkiG9w0B CQEWDWluZm9Ab2t0YS5jb20wHhcNMjQwMjEyMDY1MzQ0WhcNMzQwMjEyMDY1NDQ0WjCBlTELMAkG A1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTAL BgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRYwFAYDVQQDDA10cmlhbC00NzUxNjU0 MRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEAk0qcxttTrxgfzu1yr1V6CP0h1TM359wHzQJQG9Xs/CgdTJGDX/7Z3gKPxhqP2ULKnNde Q8TLAAF8WhROsnA5g55gW+YBcxvY2hJ1+nhoQ/4dI0FteV5i1lJmScKZxmPT0RrBnMKvr9Kfy5ZG bwCVJ9bq15qAeweh7yfzOHVSn65wXCT9Aq9FFO4UWYyxDDBipZZ66Ey+77YN70JejTablUj0GJUk Gy9OmcXtc1EE2PV+RShTrixAKPgA3BgD6zNxujattVzvi/tnsIg94xCmEsQvuaKiKa5oZkafOFSs TZnyE9ow/lfSfwZ9nvyxElhY5Pob0ShGRtly/SQKAYNAywIDAQABMA0GCSqGSIb3DQEBCwUAA4IB AQBr5iCiHEwgQo80U/Q32bM+gI7RKrYsyhZJJyGn06wrEebx3o0OBAvTKlq7mBJmRDUCbIQV8n4s +5NAPk4X7aTgQMszXyrVXq6NwB1hvrG09IMxQWnSXYZ+m9TTDJuGk0zCX/sTpTPgjtEqGGPimB1t ZWzWhC8jMNemzBCIOF2Uv34FVuKOjmcKKXNOunig3Sn+x7JP2uByc800s1CNCljonc2RjZe6l7QC yBS5svo6tAbNWLnB7X6gJiobE0hC4z6s339UL0FOwqh8y+wp4l8hV9/EETDVKWWHIeJUqxGNmvUv xUKNvBNcDv4/vMZiEhDhC32kunJwDHgRObghJVBy',
        key: 'your-key',
    });

    return response({
        status: statusCode,
    });
}

// Example usage
const statusCode = 'urn:oasis:names:tc:SAML:2.0:status:Success'; // Use appropriate status code
const samlResponse = createSAMLResponse(statusCode);
console.log(samlResponse);