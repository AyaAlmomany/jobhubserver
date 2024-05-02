const Job =require("../models/Job");

module.exports={
    createJob:async(req,res)=>{
        const newJob=new Job(req.body);

        try{
            await newJob.save();
            res.status(201).json({status: true,message: "Job created successfully."});
        }
        catch(error){
            res.status(500).json(error);
        }
    }  ,
    updateJob: async(req,res)=>{
        const jobId=req.params.id;
        const updated=req.body;
        try{
            const updatedJob=await Job.findByIdAndUpdate(jobId,updated,{new:true});
            if(!updatedJob){
                return res.status(404).json({status:false,message:"Job not found"});
            }
            res.status(200).json({status:true,message:"Job updated successfully. "})
        }
        catch(error){
            res.status(500).json(error);
        }
    },

    deletJob: async(req,res) => {
        const jobId =req.params.id;
        try{
            await Job.findByIdAndDelete(jobId);
            res.status(200).json({status:true, message:"Job deleted successfully."})
        }
        catch(error){
            res.status(500).json(error);
        }
    },

    getJob: async(req,res)=>{
        const jobId =req.params.id;
        try{
            const job= await Job.findById({_id:jobId},{createdAt:0,updatedAt:0,__V:0});

            res.status(200).json(job);
        } 
        catch(error){
            res.status(500).json(error);
        }
    },
    getAllJobs: async(req,res)=>{
       const recent =req.query.new;
       try{
        let jobs;
        if(recent){
            jobs=await Job.find({},{createdAt:0,updatedAt:0,__V:0}).sort({createdAt:-1}.limit(2));
        }
        else{
            jobs=await Job.find({},{createdAt:0,updatedAt:0,__V:0});   
        }
        res.status(200).json(jobs);
           }
       catch(error){
        res.status(500).json(error);
       }
    },
    searchJob: async(req,res)=>{
        try{
            const results =await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobsearch",
                        text: {
                          query: req.params.key,
                          path: 
                           ["title", "description", "requirements"] 
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(results);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    getAgentJobs :async(req,res)=>{
        const uid=req.params.uid;
        
        try{
            const agentJobs=await Job.find({agentID:uid},{__v:0,createdAt:0,updatedAt:0,}).sort({createdAt:-1});
            res.status(200).json(agentJobs);
        }
        catch(error){
            res.status(500).json(error.message);
        }
    },
};