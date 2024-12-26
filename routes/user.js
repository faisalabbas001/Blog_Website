const Router=require("express");
const User =require("../model/user")

const router=Router();


router.get("/signup",(req,res)=>{
    res.render("signup")
});


router.get("/signin",(req,res)=>{
    res.render("signin")
});



router.post("/signup",async(req,res)=>{
 const {fullName,email,password}=req.body;

 await User.create({
    fullName,
    email,
    password
 })

 return res.redirect("/")
})


 router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
 })



// router.post("/signin", async (req, res) => {

//     const { email, password } = req.body;
  
  
//     try {
//       const token = await User.matchPasswordandGenerateToken(email, password);
//       console.log("User successfully authenticated token  :", token);
  
//       // Redirect or perform additional actions
//       return res.cookie("token",token).redirect("/");
//     } catch (error) {
//      return res.render("signin",{
//       error:"incorrect Email and Password"
//      })
  
//     }
//   });
  


router.post("/signin",async(req,res)=>{
 
     const {email,password}=req.body;


     try {
        const token=await User.matchPasswordandGenerateToken(email,password);

         console.log("user data is that here",token)
         return res.cookie("token",token).redirect("/")
     } catch (error) {
        return res.render("signin",{
            error:"incorrect Email and passowrd"
        })
        
     }
    
   
     
})

module.exports=router