const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/billing'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`; 
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`); 
    }
});

const upload = multer({ storage });

// GET 
router.get('/',  billingController.getAllBillingRecordsAdmin);

router.get('/bill_user', authenticateToken, billingController.getAllBillingRecordsUser);

// POST 
router.post('/',  upload.single('img_bill'), authenticateToken,billingController.createBillingRecord);

// PUT (เพิ่ม endpoint นี้)
router.put('/:order_id', billingController.updateBillingStatus);


// DELETE 
router.delete('/:order_id', billingController.deleteBillingRecord);

module.exports = router;
