import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";


const router = express.Router();


router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Check your Email or password" });
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, Result: result });
    });
});

router.post('/addcategory', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true });
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.post('/adduser', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, error: "No file uploaded" });
    }

    const sql = `INSERT INTO user (name, email, password, address, contactNumber, salary, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ status: false, error: "Error hashing password" });

        const values = [
            req.body.name,
            req.body.email,
            hash, // Use the hashed password here
            req.body.address,
            req.body.contactNumber,
            req.body.salary,
            req.file.filename,
            req.body.category_id
        ];

        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ status: false, error: "Error inserting user" });
            }
            console.log("User inserted successfully");
            return res.json({ status: true });
        })
    })
})

router.get('/users', (req, res) => {
    const sql = "SELECT * FROM user";
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, Result: result });
    })
})

router.get('/user/:id',(req, res)=> {
    const id=req.params.id;
    const sql = "SELECT * FROM user WHERE id =?";
    con.query(sql, [id],(err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, Result: result });
    })
})

router.put('/edituser/:id',(req,res) =>{
    const id= req.params.id;
    const sql=`UPDATE user SET name = ?, email = ?, category_id = ?, contactNumber = ?, address = ?, salary = ? WHERE id = ?`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.category_id,
        req.body.contactNumber,
        req.body.address,
        req.body.salary,
        id // <-- Don't forget to include the ID
    ];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err });
        return res.json({ status: true, Result: result });
    });
})
    
router.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM user WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err });
        return res.json({ status: true, Result: result });
    });
});



export { router as adminRouter };
