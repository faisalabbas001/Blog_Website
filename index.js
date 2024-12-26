const express=require("express");
const app=express();
const path=require("path")
const PORT=8081;
const ConnectedDataBase=require("./connection");
const UserRoutes=require("./routes/user")
const cookieparser=require("cookie-parser");
const BlogRoutes=require("./routes/blog")
const checkForAuthentication=require("./middleware/auth");
const blogSchema=require("./model/blog")


ConnectedDataBase("mongodb://localhost:27017/FinalBlog").then(()=>{
console.log("DataBase has been connected  ")
})

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());

app.use(express.static(path.resolve("./public")))

app.use(cookieparser());
app.use(checkForAuthentication("token"))
// const allblogs=await Blog.find({})
// res.render("home",{
//     user:req.user,
//     blog:allblogs
// })

app.get("/",async(req,res)=>{
    const allblogs=await blogSchema.find({})

    res.render("home",{
        user:req.user,
        blog:allblogs
    })
})


    app.use("/user",UserRoutes)
    app.use("/addBlog",BlogRoutes)
   

    
app.listen(PORT,()=>{
    console.log(`the port has been running ${PORT}`)
})
