const router = require("express").Router();
const User = require("../model/user");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
///////////////////////////////////////////

/**
 * @route POST api/register
 * @desc Registers user and return User object and token
 * @access Public
 */
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      gender,
      about,
      country,
      language,
      game,
    } = req.body;
    const user = new User({
      name,
      email,
      password,
      dob,
      gender,
      about,
      country,
      language,
      game,
    });
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).json({ data: { user, token } });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

module.exports = router;
