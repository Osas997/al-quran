const cardSurat = document.querySelector(".card-surat")
async function GantiUI() {
    const daftarSurat = await getSurat()
    gantiUiSurat(daftarSurat);
}

GantiUI()

//dark mode
const toggle = document.getElementById("dark")
const iconMode = document.querySelector(".scale")
toggle.addEventListener("change",() => {
    if(toggle.checked){
        localStorage.setItem("darkmode" , "dark")
        document.documentElement.classList.add('dark-mode')
        iconMode.classList.add("text-light")
        iconMode.innerHTML = logoSun()
    }else{
        localStorage.removeItem("darkmode")
        document.documentElement.classList.remove('dark-mode')
        iconMode.classList.remove("text-light")
        iconMode.innerHTML = logoMoon()
    } 
})

if(localStorage.getItem("darkmode")){
    document.documentElement.classList.add('dark-mode')
    toggle.checked = true;
    iconMode.classList.add("text-light")
    iconMode.innerHTML = logoSun()
}else{
    document.documentElement.classList.remove('dark-mode')
    toggle.checked = false;
    iconMode.classList.remove("text-light")
    iconMode.innerHTML = logoMoon()
}

function terakhirDibaca () {
    const suratTerakhir = localStorage.getItem("surat")
    if(suratTerakhir){
        location.href = `surat.html?suratnomor=${suratTerakhir}`
        localStorage.setItem("p","p")
    }else{
        alert("anda belum menambahkan terakhir dibaca")
    }
}

function getSurat () {
    return fetch('https://equran.id/api/surat')
    .then(Response => Response.json())
    .then(datas => datas )
}

function gantiUiSurat(daftarSurat) {
    let surat = '';
    daftarSurat.map(e => surat += UICard(e))
    cardSurat.innerHTML = surat
} 


function UICard (surat) {
    return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="card mb-3 color-bg-gray card-ket" onclick="location.href='surat.html?suratnomor=${surat.nomor}'">
            <div class="card-body">
            <h5 class="card-title fs-6 fw-semibold"><span>${surat.nomor}. </span>${surat.nama_latin}</h5>
                <div class="float-end">
                    <h6 class=" card-subtitle mb-2 text-muted text-end fs-4 pt-3 pe-3">${surat.nama}</h6>
                    <h6 class="card-text fs-6 fs-6">${surat.arti}</h6>
                </div>
            </div>
        </div>
    </div>
    `
}

function logoSun () {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high"
        viewBox="0 0 16 16">
        <path
            d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
    `
}

function logoMoon () {
    return`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-moon-fill" viewBox="0 0 16 16">
                        <path
                        d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    </svg>
    `
}
