function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector(`button[onclick="showTab('${tab}')"]`).classList.add('active');
  document.getElementById(tab).classList.add('active');
}

document.getElementById("nutriForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let berat = parseFloat(document.getElementById("berat").value);
  let tinggi = parseFloat(document.getElementById("tinggi").value);
  let usia = parseInt(document.getElementById("usia").value);
  let gender = document.getElementById("gender").value;
  let aktivitas = parseFloat(document.getElementById("aktivitas").value);
  let riwayat = document.getElementById("riwayat").value;
  let pola = document.getElementById("pola").value;

  let tinggi_m = tinggi / 100;
  let imt = berat / (tinggi_m ** 2);

  let kategoriIMT = "";
  if (imt < 18.5) kategoriIMT = "Kurus";
  else if (imt < 23) kategoriIMT = "Normal";
  else if (imt < 25) kategoriIMT = "Overweight";
  else kategoriIMT = "Obesitas";

  let keb = gender === "laki-laki"
    ? 66.5 + (13.8 * berat) + (5 * tinggi) - (6.8 * usia)
    : 665 + (9.6 * berat) + (1.8 * tinggi) - (4.7 * usia);

  let tdee = keb * aktivitas;

  let skor_imt = imt < 23 ? 0 : imt < 25 ? 1 : imt < 30 ? 2 : 3;
  let skor_aktivitas = aktivitas >= 1.55 ? 0 : aktivitas == 1.375 ? 1 : 2;
  let skor_usia = usia >= 45 ? 2 : 0;
  let skor_riwayat = riwayat === "ada" ? 2 : 0;
  let skor_pola = pola === "tidak" ? 1 : 0;

  let skor_total = skor_usia + skor_imt + skor_aktivitas + skor_riwayat + skor_pola;

  let risiko = skor_total <= 2 ? "Rendah" : skor_total <= 5 ? "Meningkat" : "Tinggi";

  document.getElementById("hasil").innerHTML = `
    <h3>Hasil Analisis</h3>
    <p>IMT: ${imt.toFixed(2)} (${kategoriIMT})</p>
    <p>KEB: ${keb.toFixed(0)} kkal</p>
    <p>TDEE: ${tdee.toFixed(0)} kkal</p>
    <p><b>Risiko Diabetes: ${risiko}</b></p>
  `;
});