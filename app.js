// niz objekata od kojih svaki predstavlja jedno pitanje
// u realnoj aplikaciji, dobili bi ga u JSON formatu (AJAX pozivom ka serveru)
const pitanja = [
    {
      // tekst pitanja
      pitanje: "Ko je osnivač kompanije <em>Apple</em>?", 
      // ponudjeni odgovori
      odgovori: {
        a: "Bil Gejts",
        b: "Ilon Mask",
        c: "Stiv Džobs"
      },
      // koji on ponudjenih odgovora je tacan
      tacanOdgovor: "c"
    },
    {
      pitanje: "Kako se zvala prva programerka? Jedan progamski jezik nosi njeno ime.",
      odgovori: {
        a: "Ada Bajron",
        b: "Karmen Elektra",
        c: "Java Script"
      },
      tacanOdgovor: "a"
    },
    {
      pitanje: "Kako se zove čuveni naučnik o kome govori film <em>The Immitation Game?</em> ",
      odgovori: {
        a: "Nikola Tesla",
        b: "Alen Tjuring",
        c: "Tomas Edison"
      },
      tacanOdgovor: "b"
    },

    /*          DOMACI            */
    {
       pitanje: "Na osnovu imena kog naučnika je izveden naziv algoritmi?</em> ",
       odgovori: {
          a: "Alen Tjuring",
          b: "Al-Jazari",
          c: "Al-Khwarizmi"
      },
        tacanOdgovor: "c"
    },
    {
        pitanje: "Kako se naziva Tjuringova mašina za dešifrovanje njemačke Enigme?</em> ",
        odgovori: {
           a: "Bomba",
           b: "Tjuringova mašina",
           c: "ENIAC"
       },
         tacanOdgovor: "a"
     },
     {
        pitanje: "Koliko ima generacija računara?</em> ",
        odgovori: {
           a: "4",
           b: "3",
           c: "5"
       },
         tacanOdgovor: "c"
     }
     /*          DOMACi     */

];

const kvizDiv = document.getElementById('kviz'); // div za prikaz pitanja i ponudjenih odgovora
const rezultatDiv = document.getElementById('rezultat'); // div za prikaz rezultata
const zavrsiBtn = document.getElementById('zavrsi'); // dugme za zavrsavanje kviza

/*               DOMACI       */
const tajmerDiv = document.getElementsByClassName("timer"); // div za prikaz tajmera
/*               DOMACI         */


// metod koji se poziva da bi se prikazala pitanja i ponudjeni odgovori
function pokreniKviz(){
  // niz koji popunjavamo tekstom pitanja i ponudjenim odgovorima
  // niz ce sadrzati HTML elemente
  const output = [];
  // prolazimo petljom kroz sve elemente niza pitanja
  // uzimamo pitanje koje je aktuelno u trenutnoj iteraciji i njegov indeks
  pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
    // niz koji cemo popuniti odgovorima na trenutno pitanje
    const odgovori = []; 
    // petlja koja prolazi svim odgovorima trenutnog pitanja
    for(slovo in trenutnoPitanje.odgovori){
      // u niz odgovora dodajemo HTML kod za prikaz ponudjenog odgovora
      // inputi za odgovor na isto pitanje moraju imati isti name atribut
      // odradjujemo da svaki od njih ima name="odogovor"+indeks_trenutnog_pitanja
      // na taj nacin ce svi ponudjeni odgovori na pitanje sa indeksom 1 imati name="odgovor1"
      // vrijednost odgovora je upravo ono slovo pod kojim je on i ponudjen
      // tekst je oblika: " a : tekst_odgovora "
      odgovori.push(
        `<label>
          <input type="radio" name="odgovor${pitanjeInd}" value="${slovo}" >
          ${slovo} : ${trenutnoPitanje.odgovori[slovo]}
          </label>`
      );
    }
    // na kraju u output niz koji sadrzi sva pitanja i ponudjene odgovore dodajemo trenutno
    // trenutnoPitanje.pitanje je tekst pitanja
    // funkcija join od niza pravi string
    output.push(
      `
        <div class="pitanje">${trenutnoPitanje.pitanje}</div>
        <div class="odgovori"> ${odgovori.join('')} </div>
      `
    );
  });
  // na kraju popunjavamo div za prikaz pitanja i odgovora
  kvizDiv.innerHTML = output.join('');
}
// funkcija koja se poziva na klik dugmeta za zavrsavanje kviza
// provjerava koliko je igrac imao tacnih odgovora
function prikaziRezultat(){
  // na samom pocetku nije imao tacnih odgovora
  let brTacnih = 0;
  const listaPitanja = document.querySelectorAll(".pitanje")
  // prolazimo kroz globalni niz svih pitanja
  // tu poredimo odgovor koji je igrac dao na to pitanja sa tacnim odgovorom pitanja 
  pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
    // selektor koji trazi cekirani input na trenutno pitanje
    const selektor = `input[name=odgovor${pitanjeInd}]:checked`;
    // igrac je odgovorio ono sto je vrijednost cekiranog input-a (radio button-a)
    const odgovoreno = (document.querySelector(selektor) || {} ).value;

    // ako je ono sto je igrac odgovorio jednako tacnom odgovoru na trenutno pitanje
    // to znaci da je igrac tacno odgovorio i povecavamo ukupan broj tacnih odgovora
    
    if(odgovoreno === trenutnoPitanje.tacanOdgovor){
      brTacnih = brTacnih + 1;

      /*       DOMACI       */
      listaPitanja[pitanjeInd].style.color = "green"
    }else {
        listaPitanja[pitanjeInd].style.color = "red"  
    } /*       DOMACI       */


  });
  // na kraju samo popunjavamo div za prikaz rezultata
  rezultatDiv.innerHTML = `rezultat: <h3>${brTacnih} od ${pitanja.length}</h3>`; 
}
// na ucitavanje stranice, pozivamo metod za prikaz(pocetak) kviza
pokreniKviz();


/*          DOMACI         */
zavrsiBtn.addEventListener('click', function(){
  countdown(-1);
}); 

function countdown(x) {
  timeLeftDisplay = document.querySelector("#time-left")
  timeLeft = x;

  setInterval(function(){
    timeLeft = timeLeft - 1;
    if (timeLeft < 0) {
      clearInterval(timeLeft = 0)
      prikaziRezultat()
      tajmerDiv[0].remove();
    }
    timeLeftDisplay.innerHTML = timeLeft;
  },1000)
}

document.addEventListener("DOMContentLoaded", countdown(60))
/*           DOMACI          */