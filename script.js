document.getElementById("nutriForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let berat = parseFloat(document.getElementById("berat").value);
  let tinggi = parseFloat(document.getElementById("tinggi").value);
  let usia = parseInt(document.getElementById("usia").value);
  let gender = document.getElementById("gender").value;
  let aktivitas = parseFloat(document.getElementById("aktivitas").value);
  let riwayat = document.getElementById("riwayat").value;
  let pola = document.getElementById("pola").value;

  // 1. Hitung IMT
  let tinggi_m = tinggi / 100;
  let imt = berat / (tinggi_m ** 2);

  // 2. Kategori IMT Asia
  let kategoriIMT = "";
  if (imt < 18.5) kategoriIMT = "Kurus";
  else if (imt < 23) kategoriIMT = "Normal";
  else if (imt < 25) kategoriIMT = "Overweight";
  else kategoriIMT = "Obesitas";

  // 3. Hitung KEB (BMR)
  let keb = 0;
  if (gender === "laki-laki") {
    keb = 66.5 + (13.8 * berat) + (5 * tinggi) - (6.8 * usia);
  } else {
    keb = 665 + (9.6 * berat) + (1.8 * tinggi) - (4.7 * usia);
  }

  // 4. Hitung TDEE
  let tdee = keb * aktivitas;

  // 6. Skor IMT
  let skor_imt = 0;
  if (imt < 23) skor_imt = 0;
  else if (imt < 25) skor_imt = 1;
  else if (imt < 30) skor_imt = 2;
  else skor_imt = 3;

  // 7. Skor Aktivitas
  let skor_aktivitas = 0;
  if (aktivitas >= 1.55) skor_aktivitas = 0;
  else if (aktivitas == 1.375) skor_aktivitas = 1;
  else skor_aktivitas = 2;

  // 8. Skor Faktor Lain
  let skor_usia = usia >= 45 ? 2 : 0;
  let skor_riwayat = riwayat === "ada" ? 2 : 0;
  let skor_pola = pola === "tidak" ? 1 : 0;

  // 9. Total Skor
  let skor_total = skor_usia + skor_imt + skor_aktivitas + skor_riwayat + skor_pola;

  // 10. Risiko Diabetes
  let risiko = "";
  if (skor_total <= 2) risiko = "Rendah";
  else if (skor_total <= 5) risiko = "Meningkat";
  else risiko = "Tinggi";

  // OUTPUT
  document.getElementById("hasil").innerHTML = `
    <h3>Hasil Analisis</h3>
    <p>IMT: ${imt.toFixed(2)} (${kategoriIMT})</p>
    <p>KEB (BMR): ${keb.toFixed(2)} kkal</p>
    <p>TDEE: ${tdee.toFixed(2)} kkal</p>
    <p>Skor Total: ${skor_total}</p>
    <p><b>Risiko Diabetes: ${risiko}</b></p>
  `;
});