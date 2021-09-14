let express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
let app = express();

//set up view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get("/", function (req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals()
    })
});

app.post('/settings', function (req, res) {

    settingsBill.setSettings({
        callCost: req.body.smsCost,
        smsCost: req.body.callCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    })
    res.redirect('/')
});

app.post('/action', function (req, res) {

    settingsBill.recordAction(req.body.actionType)
    res.redirect('/')
})

app.get('/actions', function (req, res) {

})

app.get('/actions/:type', function (req, res) {

})

const PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})