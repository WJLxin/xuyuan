const express=require("express");
const app=express();
const bodyparse=require("body-Parser")
const Db=require("./js/db-ysp.js");
const db=new Db("desiro");
app.use(bodyparse.urlencoded({extended:false}));
app.use(express.static("./"))
app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})
app.post("/add",function(req,res){
	var obj=req.body;
	obj.color=0;
	obj.time=new Date().getTime()+"";
	db.count("xxx",{cont:obj.cont},function(err,data){
		if (data==0) {
			db.insertOne("xxx",obj,function(err1){
				if (err1) {
					res.send("添加失败")
				} else{
					res.send("添加成功")
				}
			})
		}else{
			res.send("愿望重复")
		}
	})
})
app.get("/getdata",function(req,res){
	var obj={
		query:{},
		limit:8
	};

	db.find("xxx",obj,function(err,data){
		if (err) {
			res.send("渲染失败")
		} else{
			res.send(data)
		}
	})
})
app.post("/colo",function(req,res){
	var obj=req.body;
	db.findById("xxx",obj.id,function(err,data){
		if (err) {
			res.send("渲染失败")
		} else{
			data.color=data.color?0:1;
			db.updateById("xxx",obj.id,data,function(err){
				if (err) {
					res.send("变色失败")
				}else{
					res.send("变色成功")
				}
					
			})
		}
	})
})
app.post("/del",function(req,res){
	var obj=req.body;
	db.deleteById("xxx",obj.id,function(err){
		if (err) {
			res.send("删除失败")
		} else{
			res.send("删除成功")
		}
	})
})

app.listen(8080,function(){
	console.log("服务已开启")
})