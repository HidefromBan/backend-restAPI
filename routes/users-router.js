const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req,res) => {
    const users = [];
    const {size} = req.query;
    const limit = size || 10;

    for (let index = 0; index < limit; index++) {
      users.push({
          userId : faker.string.uuid(),
          username : faker.internet.userName(),
          email : faker.internet.email(),
          avatar: faker.image.avatar(),
          password: faker.internet.password(),
        }
      )
    }
    res.json(users)
})

router.get('/:id', (req,res) => {
  const {id} = req.params;
  res.json({
    id,
    user:faker.internet.userName(),
  })
});




module.exports = router;
