const express = require('express');

const initStatic = app => {
  app.use(express.static(path.join(__dirname, '../public')));
};

module.exports = initStatic;
