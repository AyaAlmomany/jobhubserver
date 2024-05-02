const User= require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
const admin =require('firebase-admin');


module.exports={
    createUser: async(req,res)=>{
        const user=req.body;

        try{
            await admin.auth().getUserByEmail(user.email); 
            console.log(user.email)
            return res.status(400).json({
                message:"User already exists"
            });
           
        }
        catch(error){
            if(error.code ==='auth/user-not-found'){
                try{
                    //firebase user
                    const userResponse =await admin.auth().createUser({
                        email:user.email,
                        password:user.password,
                        emailVerified: false,
                        disabled: false,
                    })

                    console.log(userResponse.uid);

                    const newUser= await new User({
                        uid:userResponse.uid,
                        username:user.username,
                        email: user.email,    //req.user.password
                        password: CryptoJS.AES.encrypt(user.password,process.env.SECRET).toString(),
                    })
                    console.log(userResponse.uid);
                    console.log(newUser.password);
                    // await newUser.save();
                    //  console.log(userResponse.uid);
                    //  res.status(201).json({status:true})
                    try {
                        await newUser.save();
                        res.status(201).json({ status: true });
                    } catch (error) {
                        console.error("Error saving user:", error);
                        if (error.code === 11000) {
                            // Duplicate key error (e.g., username or email already exists)
                            res.status(400).json({ error: "Username or email already exists" });
                        } else {
                            res.status(500).json({error:error.message});
                        }
                    }
                    
                    
                }
                catch(error){
                    res.status(500).json({error:error.message});
                }
            }
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }, '-__v -createdAt -updatedAt -skills -email');
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }
    
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET); //  
            //console.log(decryptedPassword);
            const plainPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
            console.log(plainPassword);
            if (plainPassword !== req.body.password) {
                 
                return res.status(400).json({
                    message: "Invalid password ///"

                });
            }
    
            const userToken = jwt.sign({
                uid: user.uid, ///
                isAdmin: user.isAdmin,
                isAgent: user.isAgent
            }, process.env.JWT_SEC, { expiresIn: '21d' });
    
            const { password, isAdmin, ...others } = user._doc;
            res.status(200).json({ ...others, userToken });
        }  catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "An error occurred while logging into the account" });
        }
        
        
    },};
