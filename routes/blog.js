const Router = require("express");
const multer  = require('multer');
const path=require("path");
const blogSchema=require("../model/blog");
const Comment=require("../model/comment")

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve('./public/uploads/'))
    },
    filename: function (req, file, cb) {
    
      const fileName=`${Date.now()}- ${file.originalname}`;
      cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })
  router.get("/",(req,res)=>{
    return res.render('addBlog',{
        user:req.user
    })})
 

  router.get("/:id",async(req,res)=>{
    const blog=await blogSchema.findById(req.params.id).populate("createdBy");
 const comments=await Comment.findById(req.params.id).populate("createdBy");

     return res.render("blog",{
       user:req.user,
       blog,
       comments
     })

  })


   router.post('/comments/:id',async (req,res)=>{
     await Comment.create({
      content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.body._id
      
     })
     return res.redirect(`/addBlog/${req.params.id}`)
   })


 router.delete("/:id",async(req,res)=>{
  try {  
    const blogId = req.params.id; 
    const deletedBlog = await blogSchema.findByIdAndDelete(blogId);  
  

    if (!deletedBlog) {  
      return res.status(404).send("Blog not found"); 
    }  

    return res.redirect("/")

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
 })


  // outer.get("/:id",async (req,res)=>{
  //   const blog=await Blog.findById(req.params.id).populate("createdBy");
  //   const comments= await Comment.findById(req.params._id).populate("createdBy")
  //   console.log("blog test",blog)
  //   console.log("blog test",comments)
  //   return res.render("blog",{
  //     user:req.user,
  //     blog
  //   })
  
  // })
  




  router.post("/",upload.single("coverImage"),async (req,res)=>{
    const {title,body}=req.body;
    const blog=await blogSchema.create({
      title,  
      body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
  
    })
    return  res.redirect("/")

  })






 router.get("/",(req,res)=>{
    res.render("addBlog")
 })

module.exports = router;