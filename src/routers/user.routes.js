import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

import User from "../models/UserModel"

router.get('/registrar', async (req, res) => {
    res.send("Get pa")
})

router.post('/registrar', async (req, res) => {
    const { name, username, idType, phone, date, lastName, email, idNumber, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = new User({
        name,
        username,
        idType,
        phone,
        date,
        lastName,
        email,
        idNumber,
        password: passwordHash
    });
    await user.save();
    res.json({ msg: "Usuario Creado"});  
});

router.get('/ingresar', async (req, res) => {
    res.json({ msg: "id" })
})

router.post('/ingresar', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    let datosCorrectos = false;

    const userData = await User.find({username: username}, {password: 1})
    if (!(userData.length > 0)) {
        return res.json({ msg: "Datos Incorretos" })
    }

    const sies = await bcrypt.compare(password ,userData[0]['password']);

    if (!sies) {
        return res.json({ msg: "Datos Incorretos"})
    }

    res.json({ datosCorrectos: true ,msg: "Bienvenido ;)", username: username, id: userData._id});
})

module.exports = router;