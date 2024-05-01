const router =require("express").Router();
const applyController=require("../controllers/applyController");
const {verifyAndAuth}=require('../middleware/verifyToken')
// route handlers
router.post('/',verifyAndAuth,applyController.apply); 

router.get('/',verifyAndAuth,applyController.getApplied);


module.exports=router;
