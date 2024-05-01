const express = require('express');
const User = require('../models/User');
const Skills = require('../models/Skills');
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
module.exports = {
    updateUser: async (req, res) => {
        try { //req.params.id
            console.log(req.params.id);
            await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({ status: true });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
     deleteUser : async (req, res) => {
        try {
            const userId = req.params.id;
            console.log("User ID:", userId); //
            await User.findByIdAndDelete(userId);
            res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "An error occurred while deleting the user" });
        }
    },
    

    getUser: async (req, res) => {
        const { username } = req.body; // Extract the username from the request body

        try {
            // Find the user by username
            const profile = await User.findOne({ username });
    
            if (!profile) {
                // If no user is found with the specified username
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Extract user data excluding sensitive fields
            const {email,password, createdAt, updatedAt, __v, ...userData } = profile._doc;
    
            // Respond with the user data
            res.status(200).json(userData);}
            catch (error) {
            res.status(500).json({ error: error });
        }
    },

    //////
 addSkills : async (req, res) => {
    const newSkill = new Skills({ userId: req.user.uid, skill: req.body.skill });
    try {
        await newSkill.save();
        await User.findOneAndUpdate({ id: req.user.uid }, { $set: { skills: true } }, { new: true });
        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    getSkills: async (req, res) => {
        const userId = req.user.uid; //

        try {
            const skills = await Skills.find({ userId: userId }, { createdAt: 0, updatedAt: 0, __v: 0 });
            if (skills.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(skills);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    deleteSkills: async (req, res) => {
        const id = req.params.id;
        try {
            console.log(id);
           // await Skills.findByIdAndDelete(id);
           const deletedSkill = await Skills.findByIdAndDelete(id);

        if (!deletedSkill) {
            // If no skill was found with the provided ID
            return res.status(404).json({ error: 'Skill not found' });
        }
            res.status(200).json({ status: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    addAgent: async(req,res)=>{
        const newAgent=new Agent({
            // userId:req.body.id, // from me not sure
            uid:req.body.uid,
            working_hrs:req.body.working_hrs,
            hq_address:req.body.hq_address,
            company:req.body.company
        })
        try{
            await newAgent.save();
            await User.findByIdAndUpdate(req.user.id,{$set: {agent:true}})
            res.status(200).json({status:true})
        }
        catch(error){
            res.status(500).json({ error: error });
        }
    },

    updateAgent: async(req,res)=>{
        const id= req.params.id;
        try{
            console.log(id)
            // await newAgent.save();
            // Agent is empty in db ???
            const updatedAgent=await Agent.findByIdAndUpdate(id,{
                working_hrs:req.body.working_hrs,
                hq_address:req.body.hq_address,
                company:req.body.company
            },{new:true});
            if(!updatedAgent){
                return res.status(404).json({status:false,message:"Agent not found"})
            }
            res.status(200).json({status:true})
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },
    getAgent:async(req,res)=>{
        try{
            const agentData=await Agent.find({uid:req.params.uid},{createdAt:0,updatedAt:0,__v:0});
            const agent =agentData[0];
            res.status(200).json(agent);
        }
        catch(error){
            res.status(500).json({error:error.message})
        }
    },
    getAgents:async(req,res)=>{
        try{
           const agents=await User.aggregate([
            {$match:{isAgent:true}},
            {$sample:{size:7}},
            {
                $project:{
                    _id:0,
                    username:1,
                    profile:1,
                    uid:1
                }
            }
           ]);
           console.log(agents)
            res.status(200).json(agents);
        }
        catch(error){
            res.status(500).json({error:error.message})
        }
    },
};