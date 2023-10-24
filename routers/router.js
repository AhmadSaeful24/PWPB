const express = require("express");
const router = express.Router();
const multer = require("multer");
const { login, register, registrasi, auth, Logout } = require("../controller/auth");
const {
  getMarket,
  tambahJenis,
  getBarang,
  tambahBarang,
  tambahTransaksi,
  hapusJenis,
  hapusBarang,
  cancel,
  editJenis,
  shop,
  transaksi,
} = require("../controller/market");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/// Get
router.get("/", getMarket);
router.get("/register", register);
router.get("/pilih/:id", getBarang);
router.get("/hapusJenis/:id", hapusJenis);
router.get("/hapusBarang/:id", hapusBarang);
router.get("/shop/:id", shop);
router.get("/login", login);
router.get("/getMarket", getMarket);
router.get("/logout", Logout);
router.get("/transaksi", transaksi);
/// Post
router.post("/tambahTransaksi", tambahTransaksi);
router.post("/cancelTransaksi", cancel);
router.post("/editJenis", editJenis);
router.post("/tambahBarang", upload.single("photo"), tambahBarang);
router.post("/auth", auth);
router.post("/tambahJenis", tambahJenis);
router.post("/registrasi", registrasi);

module.exports = router;