// export class Rez{
//     klijent: String;
//     br_mesta: Number;
//     email: String;
//     kontakt: String;
//     dodatni_info: String;
//     status: String
// }

export class PlaninskaTura{
    _id: string;
    idF: string; //id firme koja radi turu
    kor_ime: string; //kor_ime firme koja radi turu
    nazivP: string; //naziv firme koja radi turu
    naslov: string;
    opis: string;
    program: string;
    saveti: string;
    cena: number;
    ukljuceno: string;
    nije_ukljuceno: string;
    napomene: string;
    lokacija: string; //u smislu planine
    datum_OD: string;
    datum_DO: string;
    hint_reci: string;
    slike: Array<string>;
    br_dana: number;
    rezervacije: Array<string>
}