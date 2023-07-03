    const express = require('express');
    const cors = require('cors');
    const app = express();
    const bcrypt = require('bcryptjs');
    const User = require('./models/User')
    const mongoose = require('mongoose');
    const jwt = require("jsonwebtoken");
    const cookieParser = require('cookie-parser');
    const multer = require('multer');
    const uploadMiddleware = multer({dest:'uploads/'})
    const fs = require('fs');
    const Post = require('./models/Post')

    const salt = bcrypt.genSaltSync(15);
    const secret = "ate64qweg363qged";

    app.use(cors({credentials:true, origin:'http://localhost:3000'}));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/uploads",express.static(__dirname+"/uploads"));
    mongoose.connect('mongodb+srv://blogger:blogger123@cluster0.oneeghi.mongodb.net/?retryWrites=true&w=majority')

    app.post('/Register', async(req, res)=>{
        const {username, password} = req.body;
        try{
            const userDoc = await User.create({
                username,
                password:bcrypt.hashSync(password, salt),
            })
            res.json(userDoc);
        }catch(error){
            res.status(400).json(error);
        }
    })

    app.post('/Login', async(req, res)=>{
        const {username, password} = req.body;
        try{
            const userDoc = await User.findOne({username});
            if(userDoc){
                console.log("userDOCC: "+userDoc);
                const passwordok = bcrypt.compareSync(password, userDoc.password);
                if(passwordok){
                    //user should be logged in
                    //we need to set up a session for this:
                    jwt.sign({username, id:userDoc._id}, secret,{}, (err, token)=>{
                        if(err) throw err;
                        res.cookie('token', token).json({
                            id: userDoc._id,
                            username,
                        });
                    })
                }else{
                    res.status(400).json("Incorrect username or password.");
                }
            }else{
                res.status(400).json("Incorrect username or password");
            }
        }catch(err){
            alert(err);
        }
    })

    app.get('/profile', (req, res)=>{
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, (err, info)=>{
            if(err) throw err;
            res.json(info);
        });
    });

    app.post("/logout", (req, res)=>{
        res.cookie("token", "").json("ok");
    })

    app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
      
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err,info) => {
          if (err) throw err;
          const {title,summary,content} = req.body;
          const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
          });
          res.json(postDoc);
        });
      
      });

      /* app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
        let newPath = null;
        if (req.file) {
          const {originalname,path} = req.file;
          const parts = originalname.split('.');
          const ext = parts[parts.length - 1];
          newPath = path+'.'+ext;
          fs.renameSync(path, newPath);
        }
      
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err,info) => {
          if (err) throw err;
          const {id,title,summary,content} = req.body;
          const postDoc = await Post.findById(id);
          const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
          if (!isAuthor) {
            return res.status(400).json('you are not the author');
          }
          await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
          });
      
          res.json(postDoc);
        });
      
      }); */

    /* app.post('/post', uploadMiddleware.single('file'), async(req,res)=>{

        //for adding the extension'.png'or others, in the image file getting saved in the uploads directory in api folder.
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newpath = path+"."+ext
        fs.renameSync(path, newpath);

        //create post

    }) */

    app.get('/post', async(req,res)=>{
        const posts = await Post.find();
        res.json(await Post.find()
                .populate("author",['username'])
                .sort({createdAt:-1})
                .limit(30)
        
        );
    })

    app.get("/post/:id",async(req, res)=>{
        const {id} = req.params
        const postDoc = await Post.findById(id);
        res.json(postDoc);
    })
    

    app.listen(4000);

//username: blogger
//password: blogger123

//connection string: mongodb+srv://blogger:<password>@cluster0.oneeghi.mongodb.net/?retryWrites=true&w=majority
// replace <password> with teh password: blogger123
