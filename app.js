const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
// const bodyParser = require('body-parser');
const multer = require('multer');
const { initializeApp } = require('firebase/app')
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');


const firebaseConfig = {
    apiKey: "AIzaSyA0COBBgIAfBVL8-GRsCf0BtX2mBYDTquE",
    authDomain: "imageuploader-2f153.firebaseapp.com",
    projectId: "imageuploader-2f153",
    storageBucket: "imageuploader-2f153.appspot.com",
    messagingSenderId: "893075429124",
    appId: "1:893075429124:web:4bcbe5d55df1f7c491e251",
    measurementId: "G-1RSBZ2YR82",
    storageBucket: "imageuploader-2f153.appspot.com"
}

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.static("public"));


initializeApp(firebaseConfig);

const storage = getStorage();



router.get('/', (req, res) => {
    res.sendFile(path.join('public' + '/index.html'));
});


//add the router
app.use('/', router);


const storageConf = multer.memoryStorage({
filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    // console.log("file", file)

        const ext = file.originalname.split('.').pop();
    // console.log(ar);
    // const ext = ar[ar.length - 1];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});


const upload = multer({ storage: storageConf });


app.post('/upload-image', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    const storageRef = ref(storage, 'images/' + req.file.originalname);
    const metadata = {
        contentType: req.file.mimetype
    };
    uploadBytes(storageRef, req.file.buffer, metadata).then(
        (uploadResult) => {
            getDownloadURL(storageRef, 'images/' + req.file.originalname).then((url) => {
                res.send({ url: url, message: uploadResult });
            })
        }
        
    );
});




app.listen(process.env.PORT || 3000);
console.log('Running at Port 3000');

// module.exports = app;
// module.exports.handler = serverless(app)