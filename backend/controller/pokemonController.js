const Pokemon = require("../db/models").Pokemon;

class PokemonController {
  async index(req, res, next) {
    try {
      const user = await Pokemon.findAll();
      res.send(200, user);
      return next();
    } catch (err) {
      return response.status(401).json({ message: "Missing or invalid token" });
    }
  }
  async create(req, res, next) {
    //return value 0 or 1 (50%)
    let getProbabilitasValue = Math.floor(Math.random() * 2);
    try {
      if (getProbabilitasValue === 1) {
        const check = await Pokemon.findAll({
          where: {
            name: req.body.name,
          },
        });
        if (check.length > 0) {
          return res.json({ message: "You have this pokemon!" });
        } else {
          const user = await Pokemon.create(req.body);
          res.status(200).json({ enable: true, data: user });
          return next();
        }
      } else {
        return res
          .status(200)
          .json({ enable: false, message: "You are not lucky!" });
      }
    } catch (err) {
      return res.status(401).json({ message: "please chech your fields!" });
    }
  }

  async update(req, res, next) {
    const name = req.query.name;
    const { nickName } = req.body;
    try {
      const check = await Pokemon.findAll({
        where: {
          name: name,
        },
      });
      if (check.length > 0) {
        const item = await Pokemon.update(
          {
            nickName: nickName,
          },
          {
            where: {
              name: name,
            },
          }
        );
        res.status(200).json({ enable: true, data: item });
        return next();
      } else {
        return res
          .status(200)
          .json({ enable: false, message: "You don't have this pokemon!" });
      }
    } catch (err) {
      return res.status(400).json({ message: "cannot update!" });
    }
  }

  async rename(req, res, next) {
    const name = req.query.name;
    const newName = req.body.name;
    //return value 0 - 10
    let fiboNumber = fibonacci(10);
    try {
      const check = await Pokemon.findOne({
        where: {
          name: name,
        },
      });
      if (check) {
        let newData = {};
        let mergeData = Object.assign(newData, check);
        let getName = mergeData.dataValues.name.split("-");
        let newName = `${getName[0] + "-"}
            ${
              mergeData.dataValues.updateNumber === null
                ? fiboNumber[0]
                : fiboNumber[mergeData.dataValues.updateNumber + 1]
            }`;
        let removeSpace = newName.replace(/ /g, "");
        let finalName = removeSpace.replace(/\n/g, "");
        const item = await Pokemon.update(
          {
            name: finalName,
            updateNumber:
              mergeData.dataValues.updateNumber === null
                ? 0
                : mergeData.dataValues.updateNumber + 1,
          },
          {
            where: {
              name: name,
            },
          }
        );
        res.status(200).json({ enable: true, data: item });
        return next();
      } else {
        return res
          .status(200)
          .json({ enable: false, message: "You don't have this pokemon!" });
      }
    } catch (err) {
      return res.status(400).json({ message: "cannot update!" });
    }
  }

  async delete(req, res, next) {
    const name = req.query.name;
    //return value 0 - 10
    let getProbabilitasValue = Math.floor(Math.random() * 9);
    try {
      let isPrimeNumber = checkPrimeNumber(getProbabilitasValue);
      if (isPrimeNumber === true) {
        const isDestroy = await Pokemon.destroy({
          where: { name: name },
        });
        if (!isDestroy) {
          res
            .status(404)
            .json({ message: "Pokemon with the given name was not found." });
        }
        res
          .status(200)
          .json({ enable: true, message: "Pokemon has been deleted." });
      } else {
        return res
          .status(200)
          .json({ enable: false, message: "You are not lucky!" });
      }
    } catch (err) {
      return res.status(400).json({ message: "cannot delete!" });
    }
  }
}

checkPrimeNumber = (n) => {
  if (n <= 1) return false;
  if (n === 2) return true;
  let flag = true;
  for (let i = 3; i < n; i += 2) {
    if (n % i == 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

fibonacci = (num) => {
  let newFibo = [];
  let n1 = 0,
    n2 = 1,
    nextTerm;
  for (let i = 1; i <= num; i++) {
    newFibo.push(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
  }
  return newFibo;
};

module.exports = new PokemonController();
