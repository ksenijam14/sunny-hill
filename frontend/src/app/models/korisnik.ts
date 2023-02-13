import { DetaljiFirme } from "./detaljiFirme";
import { PlaninskaTura } from "./planinskaTura";

export class Korisnik{
    _id: string;
    ime_prezime: string;
    kor_ime: string;
    lozinka: string;
    telefon: string;
    email: string
    nazivP: string;
    drzava: string;
    planina: string;
    adresaP: string;
    PIB: string;
    maticni: string;
    status: string; //samo za firme, kupci odmah postaju aktivni cim se registruju
    slika: string; //firme ce imati naslovnu sliku, ne i kupci
    tip: string; //kupac, firma - hotel, ski, plan_drustvo 
    kategorija: string; //popunjeno samo za firme, nece se navesti pri inicijalnoj registraciji, vec kasnije   
    detalji_skole: Array<DetaljiFirme>;
    detalji_tura: Array<PlaninskaTura>;
    detalji_hotela: Array<DetaljiFirme>;
    detaljiFirme: Array<DetaljiFirme>;

}