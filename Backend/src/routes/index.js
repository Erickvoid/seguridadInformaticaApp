const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Backend Funcionando ⚙')
});

router.post('/register', async (req, res) => {
    const { userName,name,lastnamePaterno,lastnameMaterno,phoneNumber,password,addressCalle,addressColonia } = req.body;
    const newUser = new User({userName,name,lastnamePaterno,lastnameMaterno,phoneNumber,password,addressCalle,addressColonia});
     let userInUse = await User.findOne({userName})
     console.log(userInUse)    
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    const user = await User.findOne({userName});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/anotherURL', verifyToken, (req, res) => {
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
