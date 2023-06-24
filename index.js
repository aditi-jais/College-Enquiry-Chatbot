const express = require('express');
const ejs = require('ejs')
const { dock, dockStart } = require('@nlpjs/basic');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/', (req, res) => {
  res.render('pages/front.ejs');
});
app.get('/front', (req, res) => {
  res.render('pages/front.ejs');
});
app.get('/location', (req, res) => {
  res.render('pages/location.ejs');
});
app.get('/jbot', (req, res) => {
  res.render('pages/jbot');
});

app.post('/process', async (req, res) => {
  try {
    const nlp = dock.get('nlp');
    const { message } = req.body;

    const result = await nlp.process(message);
    var response=result.answer;
    
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

(async () => {
  try {
    await dockStart();
    const nlp = dock.get('nlp');
    await nlp.train();
    console.log('NLP model trained successfully');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();








// const {dockStart} = require('@nlpjs/basic');

// (async()=> {
//   const dock = await dockStart();
//   const nlp = dock.get('nlp');
//   await nlp.train();
//   const result = await nlp.process('en','Tell me about the programs in Education.')
//   let response = result.answer;

//   console.log(response);
// })();





