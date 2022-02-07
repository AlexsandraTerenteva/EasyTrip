/* eslint-disable class-methods-use-this */
const { Tag } = require('../db/models');

class TagController {
  async allTags(req, res) {
    // const allTag = 123;
    const allTag = await Tag.findAll();
    res.render('tags', { tags: allTag });
  }

  async addTags(req, res) {
    const { titleTag, bodyTag } = req.body;
    await Tag.create({ title: titleTag, body: bodyTag });
    res.redirect('/');
  }
}

module.exports = TagController;
