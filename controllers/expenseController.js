const Users=require('../models/expense')


exports.postDetails = (req, res, next) => {
    let data = req.body;
    console.log("Received data:", data); // Log received data for debugging


    Users.create({
        name: data.name,
        email: data.email,
        password: data.password
    })
    .then(result => {
        console.log("users added:", result); // Log created expense for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error adding user", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};

const login= (req,res) =>  {
    const {email,password}=req.body;
    if(isstringvalid(emmail) || isstringvalid(password)){
        return res.status(400).json({message:"email or password is missing", success: false})
    }
    console.log(password);
    Users.findAll({where : {email}}).then(user =>{
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,response){
                if(err){
                    console.log(err);
                    return res.json({success:false,message:"something went wrong"})
                }
                if(response){
                    console.log(JSON.stringify(user));
                    const jwttoken=generateAcessToken(user[0].id)
                    res.status(200).json({success: true, message:"user logged in successfully"})
                }
                else{
                    return res.status(400).json({token:jwttoken,status:false, message: "password is incorrect"})
                }
            })
           
        }
        else{
            return res.status(400).json({status:false, message: "user does not exit"})
        }
    }).catch(err =>{
        res.status(500).json({message:err, success: false})
    })
}
