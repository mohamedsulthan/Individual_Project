var express = require('express');
var router = express.Router();
const JobData = require("../models/controllers/JobData")
const ApplicationData = require("../models/controllers/ApplicationData")

router.get('/JobData', JobData.getjobdata)
router.get('/JobDataAll', JobData.getalljobdata)
router.post('/authentication', JobData.authentication)
router.post('/registerjobdata', JobData.registerjob)
router.post('/Deletedata', JobData.Deletedata)
router.post('/jobApplication', ApplicationData.register)
router.post('/appliedmail', ApplicationData.apppliedmail)

module.exports = router;
