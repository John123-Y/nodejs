exports.getPost = async(req, res) => {
    const {page} = req.query;
    const postsPerPage = 10;

    try{

        let pageNum = 0
        if (page <=1){
            pageNum = 0
        } else{
            pageNum = page- 1
        }

        const  result = await Post.find().sort({createdAt: -1}).skip(pageNum * postsPerPage).limit(postsPerPage).populate({
            path:'userId',
        select:'email',


        });
        res.status(200).json({success:true, message:'posts', data:result})
        
    } catch(error){
        console.log(error)
    }

};


exports.singlePost = async(req, res) => {
    const {_id} = req.query;
    const postsPerPage = 10;

    try{

       

        const  result = await Post.findOne({_id})
        .populate({
            path:'userId',
        select:'email',


        });

        if (!existingUser){
            return res.status(404).json({success:false, message:'Post completely unavailable'})
         }
         else{
        res.status(200).json({success:true, message:'single-posts', data:result})
         }


    } catch(error){
        console.log(error)
    }

};



exports.createPost = async(req,res)=>{
    const{title,description} = req.body;
    const{userId} = req.user;


    try{
        const {error, value} = createPostSchema.validate({

        
        title,
        description,
        userId,
         });
         if(error){
            return res.status(401).json({success:false, message: error.details[0].message});
         }

         const result = await post.create({
            title,description,userId,
         });

         return res.status(201).json({success:true, message: 'created', data:result});

    } catch(error){
        consol.log(error);
    }
};


exports.updatePost = async(req,res)=>{
    const {_id} = req.query;
    const{title,description} = req.body;
    const{userId} = req.user;


    try{
        const {error, value} = createPostSchema.validate({

        
        title,
        description,
        userId,
         });
         if(error){
            return res.status(401).json({success:false, message: error.details[0].message});
         }

         const existingPost = await Post.findOne({_id})
         if (!existingUser){
            return res.status(404).json({success:false, message:'Post completely unavailable'})
         }

         if (existingPost.userId.toString( === userId)){
            
            return res.status(403).json({success:false, message:' Unauthorized'})
         }
         
         existingPost.title = title;
         existingPost.Description = description;

         const result = await existingPost.save()
         return res.status(200).json({success:true, message: 'Updated', data:result});

    } catch(error){
        console.log(error);
    }
};

exports.deletePost = async(req,res)=>{
    const {_id} = req.query;
    const{userId} = req.user;


         if (!existingUser){
            return res.status(404).json({success:false, message:'Post already unavailable'})
         }

         if (existingPost.userId.toString( === userId)){
            
            return res.status(403).json({success:false, message:' Unauthorized'})
         }
         
         
         await post.deleteOne({_id});
         return res.status(200).json({success:true, message: 'deleted'});

    } catch(error){
        console.log(error);
    }

