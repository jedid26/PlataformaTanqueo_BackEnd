import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

import User from "../models/UserModel";

router.post('/registrar', async (req, res) => {

    try {
        const { name, username, idType, phone, date, lastName, email, idNumber, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const userCount = await User.countDocuments({ username });
        const emailCount = await User.countDocuments({ email });
        const idNumberCount = await User.countDocuments({ idNumber });
    
        if (!(userCount > 0)) {
            if (!(emailCount > 0)) {
                if (!(idNumberCount > 0)) {
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
                    return res.json({ msg: "Usuario Creado"}); 
                } else {
                    return res.json({ err: "El numero de identifiacion existe" })
                }
            } else {
                return res.json({ err: "El email ya existe" })
            }
        } else {
            return res.json({ err: "El usuario ya existe" })
        }
    } catch (error) {
        res.json({ err: "Error al crear usuario"});  
    } 
});

router.post('/ingresar', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await User.find({username: username}, {name: 1, username: 1, password: 1, rol: 1})
        if (!(userData.length > 0)) {
            return res.json({ err: "Datos Incorretos" })
        }

        const sies = await bcrypt.compare(password ,userData[0]['password']);

        if (!sies) {
            return res.json({ err: "Datos Incorretos"})
        }
        res.json({ msg: `Bienvedio ${userData[0]['name']}`, username: userData[0]['username'], id: userData[0]['_id'], rol: userData[0]['rol'] });
    } catch (error) {
        res.json({ err: "Algo salio mal"})   
    }
});

router.put('/actualizar', async (req, res) => {
    
    const { id, name, lastName, username, email } = req.body;

    const data = await User.findById(id);
    
    const nameDB = name ? name : data['name']; 
    const lastNameDB = lastName ? lastName : data['lastName'];
    const usernameDB = username ? username : data['username'];
    const emailDB = email ? email : data['email'];

    try {

        let userCount = 0;
        let emailCount = 0

        if (!(usernameDB == data['username'] || emailDB == data['email'])) {
            userCount = await User.countDocuments({ username: usernameDB });
            emailCount = await User.countDocuments({ email: emailDB });
        }


        if (!(userCount > 0)) {
            if (!(emailCount > 0)) { 
                await User.findByIdAndUpdate(id, {name: nameDB, lastName: lastNameDB, username: usernameDB, email: emailDB});
                return res.json({ msg: "Datos actualizados "})
            } else {
                return res.json({ err: "El email ya existe" })
            }
        } else {
            return res.json({ err: "El usuario ya existe" })
        }
    } catch (error) {
        res.json({ err: "Error al actualizar datos" })
    }

    console.log(nameDB);
    res.json({ msg: "Llego" }) 
});

router.delete('/eliminar', async (req, res) => {
    const { id } = req.body;
    try {
        await User.findByIdAndDelete(id);
        res.json({ msg: "Usuario Eliminado" })
    } catch (error) {
        res.json({ err: "Error al eliminar" })
    }   
});

module.exports = router;