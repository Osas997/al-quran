async function gantiUI () {
    try{
        const ketSurat = document.querySelector(".ket-surat");
        const dataSurat = await getSurat()
        const datasSurat = UiSurat(dataSurat)        
        ketSurat.innerHTML = datasSurat;
        isiSurat()
    }catch(e) {
        document.body.innerHTML = e;
        if(localStorage.getItem("darkmode")){
            document.body.style.color = 'white'
        }else{
            document.body.style.color = 'black'
        }
    }
}

gantiUI()

//dark
if(localStorage.getItem("darkmode")){
    document.documentElement.classList.add('dark-mode')
    // toggle.checked = true;
}else{
    document.documentElement.classList.remove('dark-mode')
    // toggle.checked = false;
}

// dapatakan url
function getUrl () {
    const pageUrl = window.location.search.substring(12);
    return pageUrl;
}

// DAPATKAN JSON SURAT
function getSurat () {
    return fetch ('https://equran.id/api/surat/' + getUrl())
    .then(Response => Response.json())
    .then(Response => {
        if (Response.length ==  114 || Response.status == false) {
            throw new Error ("404 ERROR")
        }return Response;
})
}

//ISI CARD SURAT
const jmlAyat = document.querySelector(".isi-ayat")
async function isiSurat () {
        const isiSurat = await getSurat();
        const isiSuratLengakap = isiSurat.ayat;
        const suratSebelumnya = isiSurat.surat_sebelumnya;
        const suratBerikutnya = isiSurat.surat_selanjutnya;
        const surat = document.querySelector('.isi-surat')
        let Ui = '';
        let cardUiAyat = ''
        isiSuratLengakap.map(a => {
            Ui += UiIsiSurat(a)
            cardUiAyat += UIAyat(a)
        })
        surat.innerHTML = Ui;
        jmlAyat.innerHTML = cardUiAyat;
        terakhirDibaca()
        nextAndPrevious(suratSebelumnya,suratBerikutnya)
        Collapse()
        // console.log(isiSurat)
    }
    

    //terakhir dibaca
    async function terakhirDibaca() {
        const btnDibaca = document.querySelectorAll(".btn-terakhir")
        const alertBerhasil = document.querySelectorAll(".alert-berhasil")

        btnDibaca.forEach(e =>{
        e.addEventListener("click", function () {
            const dataId = this.dataset
            localStorage.setItem("ayat", dataId.ayat)
            localStorage.setItem("surat", dataId.surat)
            // console.log()
            // console.log(dataId.id)
            alertBerhasil.forEach(alert => {
                if(dataId.id == alert.dataset.id){
                    alert.classList.add("show")
                    setTimeout(() => {
                        alert.classList.remove("show")
                    },3000)
                }
            })

        })
    })
    if(localStorage.getItem("ayat")){
        const suratLengkap = await getSurat();
        const ayatTerakhir = localStorage.getItem("ayat")
        const suratTerakhir = localStorage.getItem("surat")
        if(suratLengkap.status == true ){
            if(suratLengkap.nomor == suratTerakhir && localStorage.getItem("p")){
                location.href = `#${ayatTerakhir}`
                localStorage.removeItem("p")
            }
        }   
    }
}

//collapse
function Collapse () {
    const btnCollapse = document.querySelectorAll("#collapse-btn")
    const collapseContent = document.querySelectorAll(".collapse-content")
        btnCollapse.forEach(e => {
            e.addEventListener("click", function () {
                const tmbl = this.dataset.id;
                collapseContent.forEach(p => {
                    const id = p.dataset.id;
                    if (tmbl == id) p.classList.toggle("show");
                })
            })
        })
}


// next and previous
function nextAndPrevious (suratSel , suratBer) {
    const sebelumnyaCard = document.querySelector('.sebelumnya')
    const berikutnyaCard = document.querySelector('.berikutnya')
    const sebelumnyaContainer = document.querySelector('.sebelumnya-container')
    const berikutnyaContainer = document.querySelector('.berikutnya-container')
    
    suratSel == false ? sebelumnyaContainer.style.display = "none" : sebelumnyaContainer.style.display = "block"
    suratBer == false ? berikutnyaContainer.style.display = "none" : berikutnyaContainer.style.display = "block"
    sebelumnyaCard.innerHTML = sebelumnya(suratSel);
    berikutnyaCard.innerHTML = berikutnya(suratBer);
}

//list ayat
jmlAyat.addEventListener("change",() =>{
    const value = jmlAyat.value
    location.href = `#${value}`
})



function UIAyat (i) {
    return `
    <option class"ops" value="${i.nomor}">${i.nomor}</option>
    `
}

function sebelumnya (surat) {
    return `
    <a href="surat.html?suratnomor=${surat.nomor}" class="btn bg-btn text-start btn-seb">Sebelumnya</a>
    <div class="text-center">
    <h5 class="font-bold mb-0 nama-surat-1">${surat.nama_latin}</h5>
    <h5 class="font-bold mb-0 nama-surat-1">${surat.jumlah_ayat} ayat</h5>
    </div>
    `
}
function berikutnya (surat) {
    return `
    <div class="text-center">
    <h5 class="font-bold mb-0 nama-surat">${surat.nama_latin}</h5>
    <h5 class="font-bold mb-0 nama-surat">${surat.jumlah_ayat} ayat</h5>
    </div>
    <a href="surat.html?suratnomor=${surat.nomor}" class="btn bg-btn text-start btn-ber">Berikutnya</a>
    `
}

function UiIsiSurat (a) {
    return `
    <div class="col-12 my-3">
            <div class="card color-bg-gray" id="${a.nomor}">
                <div class="card-body">
                        <div class="h6 mb-2">${a.nomor}</div>
                        <div class="arab text-end mb-4">${a.ar}</div>
                        <div class="fs-6 fw-normal mb-2">${a.tr}</div>
                    <div class="arab-idn fw-light">${a.idn}</div>  
                        <div class="mx-auto mt-3" style="width: 20px;">
                            <a class="nav-link" data-id="${a.nomor}" id="collapse-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-arrow-bar-down"
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                            </svg>
                            </a>
                        </div>
                        <div class="collapse-content mt-1 mb-0 d-pret" data-id="${a.nomor}">
        <div class="card card-body position-relative color-bg-gray d-flex card-collapse">
            <div data-id="${a.nomor}" data-surat="${a.surah}" data-ayat="${a.nomor}" class="btn-terakhir">
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" width="20" fill="currentColor"
                    class="bi bi-bookmark-check-fill emot" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                    <span class="ms-1 tambahkan">Tambahkan Ke Terakhir Membaca</span>
            </div>
            <div data-id="${a.nomor}"
                class="alert alert-success d-flex justify-content-center align-items-center alert-berhasil" role="alert"
                style="height: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" fill="currentColor"
                    class="me-2 bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                Berhasil Ditambahkan
            </div>
        </div>
                </div>
            </div>
    </div>
    `
}

function UiSurat (isi) {
return `
    <h4>${isi.nomor}. ${isi.nama_latin}</h4>
    <h6 class="text-muted">Tempat Turun : <span class="fw-bold text-uppercase">${isi.tempat_turun}</span></h6>
    <h6 class="text-muted">Arti : <span class="fw-bold">${isi.arti}</span></h6>
    <h6 class="text-muted mb-3">Jumlah Ayat : <span class="fw-bold">${isi.jumlah_ayat}</span></h6>
    <audio class="color-bg-gray" controls width="100%">
                <source src="${isi.audio}"
                    type="audio/mp3">
    </audio>
    `
}



