const router =require("express").Router();
const jobController=require("../controllers/jobController");
// route handlers
router.post('/',jobController.createJob); 

router.get('/',jobController.getAllJobs);

router.get('/search/:key',jobController.searchJob);

router.get('/:id',jobController.getJob); 

router.put('/:id',jobController.updateJob);

router.delete('/:id',jobController.deletJob);

router.get('/agent/:uid',jobController.getAgentJobs);



module.exports=router;