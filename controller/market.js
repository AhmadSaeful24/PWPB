const db = require("../connect");

const getMarket = (req, res) => {
  const sql = "SELECT * FROM jenisbarang";
  db.query(sql, (error, result) => {
    jenisbarang = result;
    if (error) throw error;
    // Jika terdapat user yang login atau terdapat data pada session
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (error, result) => {
        if (error) throw error;
        const user = result[0];
        res.render("jenisbarang", { jenis: jenisbarang, user: user });
      });
    } else {
      res.render("jenisbarang", { jenis: jenisbarang, user: "" });
    }
    // const jenisbarang = JSON.parse(JSON.stringify(result))
  });
};

const tambahJenis = (req, res) => {
  const sql = `INSERT INTO jenisbarang(JenisBarang) VALUES ('${req.body.Jenis}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const getBarang = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const barang = JSON.parse(JSON.stringify(result));
    const sql2 = `SELECT * FROM barang INNER JOIN transaksi ON barang.id_barang = transaksi.id_barang `;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      const transaksi = JSON.parse(JSON.stringify(result));
      const sql3 = `SELECT SUM (total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang =barang.id_barang`;
      db.query(sql3, (error, result3) => {
        if (error) throw error;
        total = result3;

        const uang = (rupiah) => {
          return rupiah.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          });
        };
        if (req.session.user) {
          const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
          db.query(sql, (error, result) => {
            if (error) throw error;
            const user = result[0];
            res.render("barang", { barang, id, uang, transaksi, user: user });
          });
        } else {
          res.render("barang", { barang, id, uang, transaksi, user: "" });
        }
      });
    });
  });
};

const tambahBarang = (req, res) => {
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO barang(Id_JenisBarang, Nama_barang, harga, new_stock ,image) VALUES ('${req.body.Id_barang}', '${req.body.barang}', '${req.body.harga}', '${req.body.new_Stock}', '${image}') `;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const transaksi = (req, res) => {
  const id = req.params.id;
  const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
  const sqlUser = `SELECT * FROM user WHERE id_user = ${req.session.user.id}`;
  db.query(sql2, (error, result2) => {
    if (error) throw error;
    const transaksi = result2;

    const sql3 = `SELECT SUM(total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
    db.query(sql3, (error, result3) => {
      db.query(sqlUser, (err, resultUser) => {
        const user = resultUser[0];
        const total = result3;
        const uang = (rupiah) => {
          return rupiah.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          });
        };
        res.render("transaksi", {
          transaksi,
          id,
          total,
          uang,
          saldo: user.saldo,
        });
      });
    });
  });
};

const tambahTransaksi = (req, res) => {
  if (req.session.user) {
    const jumlah = req.body.jumlah;
    const total = req.body.total;
    const sql = `INSERT INTO transaksi(id_barang, jumlah, total_harga, id_user, status) VALUES ('${req.body.barang_id}', '${jumlah}', '${total}', '${req.session.user.id}', '0')`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      const sql2 = `UPDATE barang SET new_stock = '${req.body.new_Stock1}' WHERE id_barang = '${req.body.barang_id}' `;
      db.query(sql2, (error, result) => {
        if (error) throw error;
        res.redirect("back");
      });
    });
  } else {
    res.render("login", {
      pesan: "anda harus login",
      clas: "danger",
      username: "",
    });
  }
};

const hapusJenis = (req, res) => {
  const sql = `DELETE FROM jenisbarang WHERE Id_JenisBarang = '${req.params.id}'`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const hapusBarang = (req, res) => {
  const sql = `DELETE FROM barang WHERE id_barang = '${req.params.id}'`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const cancel = (req, res) => {
  const sql = `UPDATE barang SET new_stock ='${req.body.stockBaru}' WHERE id_barang = '${req.body.barang_id2}'`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const sql2 = `DELETE FROM transaksi WHERE id_transaksi = '${req.body.id_transaksi}'`;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      res.redirect("back");
    });
  });
};

const editJenis = (req, res) => {
  const sql = `UPDATE jenisbarang SET JenisBarang = '${req.body.JenisBarang}' WHERE id_JenisBarang = ${req.body.id_JenisBarang}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const shop = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const barang = JSON.parse(JSON.stringify(result));
    const sql2 = `SELECT * FROM barang INNER JOIN transaksi ON barang.id_barang = transaksi.id_barang `;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      const transaksi = JSON.parse(JSON.stringify(result));
      const sql3 = `SELECT SUM (total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang =barang.id_barang`;
      db.query(sql3, (error, result3) => {
        if (error) throw error;
        total = result3;

        const uang = (rupiah) => {
          return rupiah.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          });
        };
        res.render("shop", { barang, id, uang, transaksi });
      });
    });
  });
};

module.exports = {
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
};
