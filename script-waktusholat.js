const kotaSelect = document.getElementById("kota")

const subuh = document.getElementById("subuh")
const dzuhur = document.getElementById("dzuhur")
const ashar = document.getElementById("ashar")
const maghrib = document.getElementById("maghrib")
const isya = document.getElementById("isya")

const lokasi = document.getElementById("lokasi")

const tableBody = document.getElementById("jadwal-body")

const loading = document.getElementById("loading")
const error = document.getElementById("error")

const tahun = 2026
const bulan = 3

// API MY QURAN
async function ambilJadwal(idKota){

loading.textContent = "Memuat data..."
error.textContent = ""
tableBody.innerHTML = ""

try{

const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${idKota}/${tahun}/${bulan}`)

const data = await response.json()

const jadwal = data.data.jadwal

// update nakot
lokasi.textContent = data.data.lokasi

// tampilkan
renderTable(jadwal)
tampilkanHariIni(jadwal)

loading.textContent = ""

}catch(e){

loading.textContent = ""
error.textContent = "Gagal memuat data"

}

}


// JADWAL HARI INI
function tampilkanHariIni(jadwal){

const today = new Date().toISOString().split("T")[0]

const hariIni = jadwal.find(j => j.date === today)

subuh.textContent = hariIni.subuh
dzuhur.textContent = hariIni.dzuhur
ashar.textContent = hariIni.ashar
maghrib.textContent = hariIni.maghrib
isya.textContent = hariIni.isya

}


// TABEL
function renderTable(jadwal){

const today = new Date().toISOString().split("T")[0]

jadwal.forEach(item => {

const tr = document.createElement("tr")

if(item.date === today){
tr.classList.add("today")
}

tr.innerHTML = `
<td>${item.tanggal}</td>
<td>${item.imsak}</td>
<td>${item.subuh}</td>
<td>${item.dzuhur}</td>
<td>${item.ashar}</td>
<td>${item.maghrib}</td>
<td>${item.isya}</td>
`

tableBody.appendChild(tr)

})

}


// DROPDOWN

kotaSelect.addEventListener("change", function(){

ambilJadwal(kotaSelect.value)

})

ambilJadwal(kotaSelect.value)