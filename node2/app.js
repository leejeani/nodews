require('dotenv').config();
const express=require('express');
const session = require('express-session');
const MemoryStore = require("memorystore")(session);

const passport = require("passport"),
LocalStrategy = require("passport-local").Strategy;


const app = express();
const cors = require("cors");
app.use(cors());

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
const port = process.env.SERVER_PORT || 3000;

var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');

const link1 = require('./routes/link1');
const link2 = require('./routes/link2');
const link3 = require('./routes/link3');


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

// Passport를 이용한 로그인 처리 ---------------------------------------------------------------------------------------

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (req, user, done) {
    console.log('serializeUser'+user);
    done(null, user.id);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (req, id, done) {
    console.log('deserializeUser'+id);
    done(null, id);
});

// local login 전략을 세우는 함수
// client에서 전송되는 변수의 이름이 각각 id, pw이므로 
// usernameField, passwordField에서 해당 변수의 값을 받음
// 이후부터는 username, password에 각각 전송받은 값이 전달됨
// 위에서 만든 login 함수로 id, pw가 유효한지 검출
// 여기서 로그인에 성공하면 위의 passport.serializeUser 함수로 이동

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "pwd",
        },
        function (username, password, done) {
            console.log('--------------------------'+username);
            console.log('--------------------------'+password);

            conn = db_connect.getConnection();
            conn.query(db_sql.cust_select_one, [username], (err, row, fields) => {
            
                if(err) throw err;
                
                let result = 0;
                console.log('--------------------------'+row[0]['pwd']);

                if(row[0] == undefined){
                    return done(null, false, { message: "Login Fail " });
                }else if(row[0]['pwd'] != password){
                    return done(null, false, { message: "Login Fail " });
                }else{
                    return done(null, { id: username });
                }

            });

        }
    )
);

// login 요청이 들어왔을 때 성공시 / 로, 실패시 /login 으로 리다이렉트
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/loginerror",
    })
);

// Passport를 이용한 로그인 처리 끝---------------------------------------------------------------------------------------


app.get('/', (req,res)=>{
    let loginid;
    console.log('/:'+req.user);

    if (req.user){
        loginid  = req.user;
    } 
    console.log(loginid);
    if (loginid !== undefined) {
        res.render('index', { loginid:loginid });
    } else {
        res.render('index');
    }
})
app.get('/login', (req,res)=>{
    res.render('index',{
        center:'login'
    })
})
app.get('/loginerror', (req,res)=>{
    res.render('index',{
        center:'loginerror'
    })
})
app.get('/register', (req,res)=>{
    res.render('index',{
        center:'register'
    })
})
app.post('/register', (req,res)=>{
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;

    let values = [id,pwd,name];
    conn = db_connect.getConnection();
    conn.query(db_sql.cust_insert, values, (e, result, fields) => {
        if(e){
            res.render('index',{
                center:'registerfail'
            }); 
        }else{
            res.render('index',{
                center:'login'
            }); 
        }
        
        db_connect.close(conn);
    });

})
app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

// 화면 별 Router 등록
app.use('/link1', link1);
app.use('/link2', link2);
app.use('/link3', link3);

// Server 가동
app.listen(port,()=>{
    console.log(`server start port:${port}`)
})
