const Like = require('../models/like');
const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    let likeable;
    let deleted = false;
    try{
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id ).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
    
        let exist = await Like.findOne({
            user : req.user._id,
            likeable : req.query.id,
            onModel : req.query.type,
        });
    
        if(exist){
            likeable.likes.pull(exist._id);
            likeable.save();
            exist.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user : req.user._id,
                onModel: req.query.type,
                likeable : req.query.id,
                
            });
            likeable.likes.push(newLike._id);
            likeable.save();
    
        }
    
        return res.json('200',  {
            message :"Request Succesfull",
            data : {
                deleted : deleted
            }
        })
    }catch(error){
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
    

}