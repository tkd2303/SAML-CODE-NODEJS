// app.js
const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const session = require('express-session');
const ejs = require('ejs');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// SAML Configuration
const samlConfig = {
    entryPoint: 'http://localhost:5000/login',
    issuer: 'http://www.okta.com/exkbg77o4tzquRMEw697',
    cert: 'MIIDqjCCApKgAwIBAgIGAY2cGMB4MA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxFjAUBgNVBAMMDXRyaWFsLTQ3NTE2NTQxHDAaBgkqhkiG9w0B CQEWDWluZm9Ab2t0YS5jb20wHhcNMjQwMjEyMDY1MzQ0WhcNMzQwMjEyMDY1NDQ0WjCBlTELMAkG A1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTAL BgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRYwFAYDVQQDDA10cmlhbC00NzUxNjU0 MRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEAk0qcxttTrxgfzu1yr1V6CP0h1TM359wHzQJQG9Xs/CgdTJGDX/7Z3gKPxhqP2ULKnNde Q8TLAAF8WhROsnA5g55gW+YBcxvY2hJ1+nhoQ/4dI0FteV5i1lJmScKZxmPT0RrBnMKvr9Kfy5ZG bwCVJ9bq15qAeweh7yfzOHVSn65wXCT9Aq9FFO4UWYyxDDBipZZ66Ey+77YN70JejTablUj0GJUk Gy9OmcXtc1EE2PV+RShTrixAKPgA3BgD6zNxujattVzvi/tnsIg94xCmEsQvuaKiKa5oZkafOFSs TZnyE9ow/lfSfwZ9nvyxElhY5Pob0ShGRtly/SQKAYNAywIDAQABMA0GCSqGSIb3DQEBCwUAA4IB AQBr5iCiHEwgQo80U/Q32bM+gI7RKrYsyhZJJyGn06wrEebx3o0OBAvTKlq7mBJmRDUCbIQV8n4s +5NAPk4X7aTgQMszXyrVXq6NwB1hvrG09IMxQWnSXYZ+m9TTDJuGk0zCX/sTpTPgjtEqGGPimB1t ZWzWhC8jMNemzBCIOF2Uv34FVuKOjmcKKXNOunig3Sn+x7JP2uByc800s1CNCljonc2RjZe6l7QC yBS5svo6tAbNWLnB7X6gJiobE0hC4z6s339UL0FOwqh8y+wp4l8hV9/EETDVKWWHIeJUqxGNmvUv xUKNvBNcDv4/vMZiEhDhC32kunJwDHgRObghJVBy'
};

// Passport SAML strategy
passport.use(new SamlStrategy(
    {
        callbackUrl: 'http://localhost:3000/login/callback',
        entryPoint: samlConfig.entryPoint,
        issuer: samlConfig.issuer,
        cert: samlConfig.cert
    },
    (profile, done) => {
        return done(null, profile);
    }
));

// Serialize user object to the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user object from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Login route
app.get('/login', passport.authenticate('saml'));

// Callback route
app.post('/login/callback', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Protected route
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('You are authenticated!');
    } else {
        res.redirect('/login');
    }
});

// Render login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
