const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 5000;

const hljss = require('highlight.js')

// const config = require('./config/connectDB')
// const dbConfig = process.env.NODE_ENV === "production" ? config.heroku : config.local;
// const db = mysql.createConnection(dbConfig)

const creds = require('./creds.json')

const db = mysql.createConnection({
  host: creds.host,
  user: creds.user,
  password: creds.password,
  database: creds.database
})


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'rlatjdwls',
//   //add db name after creating db through route.
//   database: 'snippetsaver',
// });

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
  // if (err) {
  //   throw err;
  // }
  // console.log('mySQL DB connected');
});

//to use express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//to use files in public-dir
app.use(express.static('public'));
//to handle server requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//main page
// app.get('/', (req, res) => {
//   res.render('landingPage')
// });
app.get('/', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS snippetsaver';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);
    res.render('landingPage');
  });
});

app.get('/main', (req, res) => {
  db.query('SELECT * FROM snippets', (err, data) => {
    if (err) {
      throw err;
    }
    // console.log(data);
    res.render('index', { snippets: data });
  });
});

//create newSnippet

app.post('/createSnippet', (req, res) => {
  db.query(
    {
      sql:
        'INSERT INTO snippets (title, language, description, snippet) values (?, ?, ?, ?)',
      values: [
        req.body.title,
        req.body.language,
        req.body.description,
        req.body.snippet,
      ],
    },
    (err, data) => {
      if (err) throw err;
      // res.json(data)
      // res.render('index', {snippets: data})
    }
  );
});

//route to show(post) selected content to view area
app.post('/api/:id', (req, res) => {
  db.query(`SELECT * FROM snippets WHERE id=${req.params.id}`, (err, data) => {
    // if (err) throw err;
    res.json(data);
  });
});

//delete route
app.delete('/api/delete/:id', (req, res) => {
  db.query(`DELETE FROM snippets WHERE id=${req.params.id}`, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

// update route
app.put('/api/update', (req, res) => {
  db.query(
    'UPDATE snippets SET title = ?, language = ?, description = ?, snippet = ? WHERE ?',
    [
      req.body.title,
      req.body.language,
      req.body.description,
      req.body.snippet,
      {
        id: req.body.id,
      },
    ],
    (err, data) => {
      if (err) throw err;
      res.json(data);
    }
  );
});
// app.post('/api/update', (req, res)=>{
//   db.query(
//     `UPDATE snippets SET title=${req.body.title}, language=${req.body.language}, description=${req.body.description}, snippet=${req.body.snippet} WHERE id=${req.body.id}`, (err, data)=>{
//       if(err) throw err;
//       res.json(data);
//     }
//   )
// })

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
