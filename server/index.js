const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 8000;


app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/images/:product_id', createProxyMiddleware({ target: 'http://localhost:5000/', changeOrigin: true }));
app.use('/api/productreviews/reviews', createProxyMiddleware({ target: 'http://localhost:4000/', changeOrigin: true }));
app.use('/api/productoptions/:id', createProxyMiddleware({ target: 'http://localhost:3001/', changeOrigin: true }));

app.listen(port, ()=>{
  console.log(`Server is running at http://127.0.0.1:${port}`)
})
