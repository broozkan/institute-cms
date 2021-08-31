const express = require('express');
const app = express();
//
const homeRouter = require('./Routes/Home')
const postRouter = require('./Routes/RoutePost')
const userRouter = require('./Routes/User')
const pharmacyRouter = require('./Routes/RoutePharmacy')
const permissionRouter = require('./Routes/Permission')
const categoryRouter = require('./Routes/RouteCategory')
const fileRouter = require('./Routes/File')
const shortcutRouter = require('./Routes/Shortcut')
const sliderRouter = require('./Routes/Slider')
const commentRouter = require('./Routes/Comment')
const feedbackRouter = require('./Routes/Feedback')
const formRouter = require('./Routes/Form')
const sentinelPharmacyRouter = require('./Routes/RouteSentinelPharmacy')
const scraperRouter = require('./Routes/Scraper')
const educationVideoPlaylistRouter = require('./Routes/RouteEducationVideoPlaylist')
const closeExpirationRouter = require('./Routes/RouteCloseExpiration')
const announcementRouter = require('./Routes/RouteAnnouncement')
const notificationRouter = require('./Routes/RouteNotification')
const pdfRouter = require('./Routes/Pdf')


const cors = require('cors');

const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { permissionValidation } = require('./validation');

/* connect to db */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  console.log("Connected to db");
})
/* connect to db */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

app.use(express.static('/public'));

/* middlewares */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods',)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(express.json())

// parse application/x-www-form-urlencoded



app.use('/api_sivaseo/posts', postRouter);
app.use('/api_sivaseo/users', userRouter);
app.use('/api_sivaseo/permission', permissionRouter);
app.use('/api_sivaseo/pharmacies', pharmacyRouter);
app.use('/api_sivaseo/categories', categoryRouter);
app.use('/api_sivaseo/file', fileRouter);
app.use('/api_sivaseo/shortcut', shortcutRouter);
app.use('/api_sivaseo/slider', sliderRouter);
app.use('/api_sivaseo/comment', commentRouter);
app.use('/api_sivaseo/feedback', feedbackRouter);
app.use('/api_sivaseo/form', formRouter);
app.use('/api_sivaseo/', homeRouter);
app.use('/api_sivaseo/sentinelpharmacies', sentinelPharmacyRouter);
app.use('/api_sivaseo/scraper', scraperRouter);
app.use('/api_sivaseo/education-video-playlists', educationVideoPlaylistRouter);
app.use('/api_sivaseo/close-expirations', closeExpirationRouter);
app.use('/api_sivaseo/announcements', announcementRouter);
app.use('/api_sivaseo/notifications', notificationRouter);
app.use('/api_sivaseo/pdf', pdfRouter);





/* middlewares */



app.listen(process.env.PORT || 8000)
