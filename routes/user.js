const router =require("express").Router();
const {verifyToken, verifyAndAuth,verifyAgent}=require('../middleware/verifyToken')///
const userController=require("../controllers/userController");
//   const userController=require("../controllers/userController");
// route handlers
router.put('/:id',verifyAndAuth,userController.updateUser); //

router.get('/users/',verifyAndAuth,userController.getUser);


router.delete('/:id',verifyAndAuth,userController.deleteUser);  //


router.post('/users/skills',verifyAndAuth,userController.addSkills);


router.get('/users/skills',verifyAndAuth,userController.getSkills);


router.delete('/users/skills/:id',verifyAndAuth,userController.deleteSkills);


router.post('/users/agents',verifyAndAuth,userController.addAgent);

router.put('/users/agents/:id',verifyAndAuth,userController.updateAgent);

router.get('/users/agents/:uid',verifyAndAuth,userController.getAgent);

router.get('/users/agents',verifyAndAuth,userController.getAgents);


module.exports=router;