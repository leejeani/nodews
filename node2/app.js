require('dotenv').config();
const express=require('express');
const session = require('express-session');
const MemoryStore = require("memorystore")(session);

const app = express();

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
const port = process.env.SERVER_PORT || 3000;

const link1 = require('./routes/link1');
const link2 = require('./routes/link2');
const link3 = require('./routes/link3');

let logincheck = 0;

nunjucks.configure('views',{
    express:app,
})

app.set('view engine', 'html');//
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public'));

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
    
        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        })
    })
);


app.use('/link1', link1);
app.use('/link2', link2);
app.use('/link3', link3);

app.get('/check', (req,res)=>{
    const loginid = req.session.loginid;
    console.log(loginid);
    if (loginid !== undefined) {
        res.render('index', { loginid:loginid, center:req.query.center });
    } else {
        res.render('index', {center:req.query.center});
    }
    //res.render('index')
})

app.get('/', (req,res)=>{
    const loginid = req.session.loginid;
    console.log(loginid);
    if (loginid !== undefined) {
        res.render('index', { loginid:loginid });
    } else {
        res.render('index');
    }
    //res.render('index')
})
app.get('/login', (req,res)=>{
    res.render('index',{
        center:'login'
    })
})
app.get('/logout', (req,res)=>{
    req.session.destroy();
    logincheck = 0;
    res.redirect('/');
})
app.post('/loginimpl', (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.pswd);

    const { id, pswd } = req.body; 
    
    
    if(id == 'qqqq' && pswd == '1111'){
        console.log(req.session);
        req.session.loginid = id;  
        logincheck = 1;      
        res.redirect('/')
    }else{
        res.render('index',{
            center:'loginerror'
        })
    }
    

})

app.listen(port,()=>{
    console.log(`server start port:${port}`)
})
