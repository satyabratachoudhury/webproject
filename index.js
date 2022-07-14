const express= require("express");
const mongoose=require('mongoose');

//load the model
const Todo=require('./model/todo');



const app=express();

const port=process.env.PORT||27017;






//mongo db connection
mongoose.connect("mongodb://localhost:27017/abc",{useNewUrlParser:true});

mongoose.connection
    .once("open", () => console.log("connected"))
    .on("error", error =>{
        console.log("your error",error)
    });




//middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Handle form Post
app.post('/' , async(req,res) =>{
console.log(req.body)
      const text=  req.body.text.trim();
  if(text ===''){
    return res.redirect('/');
  }
  let newTodo=new Todo({
    text
  })
  await newTodo.save();
  res.redirect('/');
})




//index route  

app.get("/",async(req,res)=>{

    //get todos
    const todos=await Todo.find({}).sort('date');
    res.render("index",{todos});
});

//Delete Method

app.get("/:id/delete",async(req,res)=>{

    //get todos
    const todos=await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
});


//About route  

app.get("/about",(req,res)=>{

    res.render("about");
});




app.listen(port, ()=>{
    console.log("server is live",port);
});

