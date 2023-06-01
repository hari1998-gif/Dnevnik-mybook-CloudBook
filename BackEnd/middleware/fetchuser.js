const jwt = require("jsonwebtoken");
const JWT_TOKEN = "HariIsAGoodBoy$#";


const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: 'Invalid token'});
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        console.log(data);
        req.id = data.id;

        console.log(req.id)
        next();
    } catch (error) {
        res.status(401).send({error: 'Invalid token'});
    }


}

module.exports = fetchuser;