const jwt = require('jsonwebtoken');
const _JWTSECRET = process.env.JWTSECRET;

class Common {
    static resultOk(res, obj) {
        res.json({ data: obj });
    }
    static resultErr(res, obj) {
        res.status(500).json({ error: obj });
    }
    static resultNotFound(res, msg) {
        res.status(404).json({ message: msg ? msg : 'Not Found' });
    }
    static userAlreadyExists(res) {
        res.status(403).json({ message: 'User already exists.' });
    }

    static resultForbidden(res) {
        res.status(401).json({messaage: 'Forbidden'});
    }

    static tokenCheck( req, res, next ) {
        // check headers and get token
        console.log('Checking for token?!:', req.headers);
        // maker sure theres an authorization header in the first place to avoid a substr error
        if (!req.headers['authorization']) {
            console.log('No authorization header detected, therefore there cannot be a token. Returning forbidden.');
            return Common.resultForbidden(res);
        }
        const token = req.headers['authorization'].substr(7);

        // verify token
        jwt.verify(token, _JWTSECRET, (err, decoded) => {
            if(err) { 
                console.log('TOKEN FAIL!', err);
                return Common.resultForbidden(res);
            }

            if(decoded) { 
               console.log('Token pass:', decoded); 
               next();
           } else { console.log('token fail'); }
        })
   }
}

module.exports = Common;