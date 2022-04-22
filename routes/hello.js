const express = require('express');
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'YDSmb3cJtfKhM_ZpsptRbDCE_r8r-CDrnvwKocKeF7gI',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/17a8e5b1-10e2-43d6-8533-00cf335fd628',
});



router.get('/', (req, res, next) => {
  var data = {
    title: 'Watson Speech to Text',
    content: '※音声ファイルを選んでください'
  };
  res.render('hello', data);
});

/*
router.post('/upload', upload.single('file'), function (req, res) {
  res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
  filename = req.file.originalname;
  console.log(filename)
})
*/

router.post('/post', (req, res, next) => {
var msg = req.body['message'];
  const recognizeParams = {
    audio: fs.createReadStream('momotarou.mp3'),
    contentType: 'audio/mp3',
    model: 'ja-JP_NarrowbandModel',
  //  wordAlternativesThreshold: 0.9,
    keywords: ['桃', '男'],
    keywordsThreshold: 0.5,
  };

  speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
  for (r of speechRecognitionResults.result.results){
    console.log(r.alternatives[0].transcript);
    msg = msg + r.alternatives[0].transcript;
    };
    var data = {
        title: 'Text',
        content: msg
      };
  res.render('hello2', data) 
  }
  
  )
   
});

module.exports = router;
