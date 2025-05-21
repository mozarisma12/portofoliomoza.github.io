const soalContainer = document.getElementById("soal");
const jawabanContainer = document.getElementById("jawaban");
const submitButton = document.getElementById("submit");
const timerContainer = document.getElementById("timer");
const skorContainer = document.getElementById("skor");
const nomorSoalContainer = document.getElementById("nomor-soal");
const hasilContainer = document.getElementById("hasil");

const pertanyaan = [
    {
        soal: "Apa ibu kota Indonesia?",
        jawaban: ["Jakarta", "Surabaya", "Bandung", "Medan"],
        jawabanBenar: "Jakarta",
    },
    {
        soal: "Apa ibu kota Jepang?",
        jawaban: ["Hiroshima", "Tokyo", "Kyoto", "Nagasaki"],
        jawabanBenar: "Tokyo",
    },
    {
        soal: "Siapa Presiden pertama Indonesia?",
        jawaban: ["Bj.Habibie", "Soeharto", "Ir.Soekarno", "Jokowi"],
        jawabanBenar: "Ir.Soekarno",
    },
    {
        soal:"Pada tanggal berapakah Hari Lahir Pancasila diperingati?",
        jawaban: ["17 Agustus", "1 Maret", "1 Juni", "1 Desember"],
        jawabanBenar: "1 Juni",
    },
    {
        soal: "Pulau Komodo terletak di?",
        jawaban: ["Bali", "NTT", "NTB", "Jawa Timur"],
        jawabanBenar: "NTT",
    },
    {
        soal: "Apa nama mata uang dari negara Thailand?",
        jawaban: ["Won", "Rupiah", "Dollar", "Baht"],
        jawabanBenar: "Baht",
    }

];

let skor = 0;
let soalSaatIni = 0;
let timer = 30;
let timerInterval;

function tampilkanSoal() {
    if (soalSaatIni >= pertanyaan.length) {
        tampilkanHasil();
        return;
    }

    const soal = pertanyaan[soalSaatIni];
    soalContainer.textContent = soal.soal;

    nomorSoalContainer.textContent = `Soal: ${soalSaatIni + 1} / ${pertanyaan.length}`;
    skorContainer.textContent = `Skor: ${skor}`;

    jawabanContainer.innerHTML = "";
    soal.jawaban.forEach((jawaban) => {
        const tombol = document.createElement("button");
        tombol.textContent = jawaban;
        tombol.addEventListener("click", () => cekJawaban(jawaban));
        jawabanContainer.appendChild(tombol);
    });

    timer = 30;
    timerContainer.textContent = `Waktu: ${timer} detik`;
    clearInterval(timerInterval);
    startTimer();
}

function cekJawaban(jawaban) {
    const soal = pertanyaan[soalSaatIni];
    if (jawaban === soal.jawabanBenar) {
        skor++;
    }

    soalSaatIni++;
    clearInterval(timerInterval);
    tampilkanSoal();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerContainer.textContent = `Waktu: ${timer} detik`;

        if (timer === 0) {
            clearInterval(timerInterval);
            soalSaatIni++;
            tampilkanSoal();
        }
    }, 1000);
}

function tampilkanHasil() {
    soalContainer.style.display = "none";
    jawabanContainer.style.display = "none";
    timerContainer.style.display = "none";
    nomorSoalContainer.style.display = "none";
    skorContainer.style.display = "none";
    submitButton.style.display = "none";

    const totalSoal = pertanyaan.length;
    const nilai = Math.round((skor / totalSoal) * 100);

    hasilContainer.innerHTML = `
        <p>Skor Anda: ${skor} dari ${totalSoal}</p>
        <p>Nilai Akhir: ${nilai}</p>
    `;
}

tampilkanSoal();