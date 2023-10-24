var saldo = 500000;
const formatsaldo = (rupiah) => {
  return rupiah.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};
const transaksi = (id, harga, stock) => {
  console.log(id, harga, stock);
  const inputBarangId = document.getElementById("barang_id");
  inputBarangId.value = id;
  const inputHarga = document.getElementById("hargaBarang");
  inputHarga.value = harga;
  const inputStock = (document.getElementById("Stock").value = stock);

  console.log(id, harga, stock);
};
const total_harga = () => {
  const inputHarga = document.getElementById("hargaBarang").value;
  const jumlahInput = document.getElementById("jumlah");
  let jumlah = parseInt(jumlahInput.value);
  const stock = document.getElementById("Stock").value;
  const save1 = document.getElementById("save1");
  const alerto = document.getElementById("alert");
  const newStock = document.getElementById("new_Stock1");
  console.log(stock - jumlah);
  newStock.value = stock - jumlah;
  if (jumlah > stock) {
    // save1.style.display ='none'
    alert("stock kurang, Jumlah anda akan di maksimalkan sesuai stock");
    jumlahInput.value = stock;
    newStock.value = stock - jumlahInput.value;
    document.getElementById("total").value = inputHarga * jumlahInput.value;

    // alerto.innerHTML="stock kurang"
    // alerto.style.color="red"
  } else {
    save1.style.display = "block";
    document.getElementById("total").value = inputHarga * jumlah;
    document.getElementById("new_stock").value = stock - jumlah;
  }
};
const bayar = (harga) => {
  if (confirm("Serius?") === true) {
    if (saldo < harga) {
      alert("Jangan Memaksakan Beli");
    } else {
      saldo = saldo - harga;
      document.getElementById("saldo").innerHTML = formatsaldo(saldo);
    }
  }
};

const cancel = (newStock, jumlah, idBarang, idtransaksi) => {
  console.log(newStock, jumlah, idBarang, idtransaksi);
  document.getElementById("barang_id2").value = idBarang;
  document.getElementById("id_transaksi").value = idtransaksi;
  document.getElementById("stockBaru").value = eval(newStock) + eval(jumlah);
};
const validasi_modal1 = () => {
  const harga = document.getElementById("harga").value;
  const save = document.getElementById("save");
  const namaBarang = document.getElementById("barang");
  save.style.display = "none";
  console.log(harga);

  if (namaBarang.value.length >= 3) {
    if (harga % 500 == 0) {
      if (harga.length >= 3) {
        save.style.display = "block";
      }
    } else {
      alert("masukan harga dengan benar");
      save.style.display = "none";
    }
  } else {
    alert("masukan data dengan benar");
    save.style.display = "none";
  }
};
