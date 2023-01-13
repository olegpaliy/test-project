const express = require("express");
const FileRepository = require("../app/filerepository");
const router = express.Router();
const path = require("path");

const repository = new FileRepository(
  path.join(process.cwd(), "accounts.json")
);

router.get("/", async (req, res) => {
  const accounts = await repository.read();
  res.send(accounts);
});

router.put("/:id", async (req, res) => {
  const accounts = await repository.read();
  const id = req.params.id;
  const body = req.body;
  const index = accounts.findIndex((item) => item.id === id);
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  accounts[index] = body;
  await repository.update(accounts);
  res.send(body);
});

router.post("/", async (req, res) => {
  const accounts = await repository.read();
  const id = Date.now().toString();
  const body = req.body;
  const accountsToSave = [...accounts, { ...body, id }];
  await repository.update(accountsToSave);
  res.send({ ...body, id });
});

router.delete("/:id", async (req, res) => {
  const accounts = await repository.read();
  const id = req.params.id;
  const updateAccounts = accounts.filter((item) => item.id !== id);
  await repository.update(updateAccounts);
  res.send(updateAccounts);
});

router.get("/:id", async (req, res) => {
  const accounts = await repository.read();
  const id = req.params.id;
  const account = accounts.find((item) => item.id === id);
  res.send(account);
});

module.exports = router;
