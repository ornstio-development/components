import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrnstioTableComponent } from 'components';
import { ExampleComponent } from '../../example.component';

export interface PeriodicElement {
  atomicNumber: number;
  element: string;
  symbol: string;
  etymology: string;
  selected?: boolean;
}

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['../../example.component.scss', './table-example.component.scss'],
})
export class TableExampleComponent extends ExampleComponent implements OnInit {
  apis = [
    {
      name: '@Input() dataSource: T[] | BehaviorSubject<T[]>',
      description: 'Data source for the table',
    },
    {
      name:
        '@Input() paginator: <a href="./data-table/paginator">OrnstioPaginatorComponent</a>',
      description: 'Attaches pagination to data table',
    },
    {
      name: '@Output() row: OrnstioRowDirective<T>',
      description: 'Emits when a user clicks a row',
    },
  ];

  rowApis = [
    {
      name: 'index: number',
      description: 'Access to the row index of the current filtered table',
    },
    {
      name: 'data: T',
      description: 'Access to the data contained in each row',
    },
  ];

  columnApis = [
    {
      name: 'context(let element = $implicit): T',
      description: 'Reference to data row element provided in data source',
    },
    {
      name: `context(let row = row): <a href="${location.href}">OrnstioRowDirective</a>`,
      description: `Reference to the column's data row`,
    },
    {
      name: '@Input() headerTemplate: TemplateRef<any>',
      description: 'For use with custom data table headers',
    },
    {
      name: '@Input() width: string',
      description: 'Sets the default width of the column',
    },
    {
      name: '@Input() name: string',
      description: 'Sets the column name if using default column',
    },
    {
      name: '@Input() property: string',
      description:
        'Sets the property of the data row to be used for filtering/sorting',
    },
    {
      name:
        '@Input() filter: boolean | (a: T, value: string, property?: string) => boolean',
      description:
        'Allows for custom filtering function to be applied to column',
    },
    {
      name: '@Input() sort: boolean | (a: T, b:T, property?: string) => number',
      description: 'Allows for custom sorting function to be applied to column',
    },
    {
      name: '@Input() resize: boolean',
      description: 'Allows the user to resize the columns',
    },
  ];

  @ViewChild(OrnstioTableComponent)
  table: OrnstioTableComponent<PeriodicElement>;

  data: PeriodicElement[] = [
    {
      atomicNumber: 1,
      symbol: `H`,
      element: `Hydrogen`,
      etymology: `Greek elements hydro- and -gen, 'water-forming'`,
    },
    {
      atomicNumber: 2,
      symbol: `He`,
      element: `Helium`,
      etymology: `Greek hḗlios, 'sun'`,
    },
    {
      atomicNumber: 3,
      symbol: `Li`,
      element: `Lithium`,
      etymology: `Greek líthos, 'stone'`,
    },
    {
      atomicNumber: 4,
      symbol: `Be`,
      element: `Beryllium`,
      etymology: `Beryl, a mineral (ultimately from the name of Belur in southern India[citation needed])`,
    },
    {
      atomicNumber: 5,
      symbol: `B`,
      element: `Boron`,
      etymology: `Borax, a mineral (from Arabic bawraq)`,
    },
    {
      atomicNumber: 6,
      symbol: `C`,
      element: `Carbon`,
      etymology: `Latin carbo, 'coal'`,
    },
    {
      atomicNumber: 7,
      symbol: `N`,
      element: `Nitrogen`,
      etymology: `Greek nítron and -gen, 'niter-forming'`,
    },
    {
      atomicNumber: 8,
      symbol: `O`,
      element: `Oxygen`,
      etymology: `Greek oxy- and -gen, 'acid-forming'`,
    },
    {
      atomicNumber: 9,
      symbol: `F`,
      element: `Fluorine`,
      etymology: `Latin fluere, 'to flow'`,
    },
    {
      atomicNumber: 10,
      symbol: `Ne`,
      element: `Neon`,
      etymology: `Greek néon, 'new'`,
    },
    {
      atomicNumber: 11,
      symbol: `Na`,
      element: `Sodium`,
      etymology: `English (from medieval Latin) soda (the symbol Na is derived from New Latin natrium, coined from German Natron, 'natron')`,
    },
    {
      atomicNumber: 12,
      symbol: `Mg`,
      element: `Magnesium`,
      etymology: `Magnesia, a district of Eastern Thessaly in Greece`,
    },
    {
      atomicNumber: 13,
      symbol: `Al`,
      element: `Aluminium`,
      etymology: `alumina, from Latin alumen (gen. aluminis), 'bitter salt, alum'`,
    },
    {
      atomicNumber: 14,
      symbol: `Si`,
      element: `Silicon`,
      etymology: `Latin silex, 'flint' (originally silicium)`,
    },
    {
      atomicNumber: 15,
      symbol: `P`,
      element: `Phosphorus`,
      etymology: `Greek phōsphóros, 'light-bearing'`,
    },
    {
      atomicNumber: 16,
      symbol: `S`,
      element: `Sulfur`,
      etymology: `Latin sulphur, 'brimstone'`,
    },
    {
      atomicNumber: 17,
      symbol: `Cl`,
      element: `Chlorine`,
      etymology: `Greek chlōrós, 'greenish yellow'`,
    },
    {
      atomicNumber: 18,
      symbol: `Ar`,
      element: `Argon`,
      etymology: `Greek argós, 'idle' (because of its inertness)`,
    },
    {
      atomicNumber: 19,
      symbol: `K`,
      element: `Potassium`,
      etymology: `New Latin potassa, 'potash', iself from pot and ash (the symbol K is derived from Latin kalium)`,
    },
    {
      atomicNumber: 20,
      symbol: `Ca`,
      element: `Calcium`,
      etymology: `Latin calx, 'lime'`,
    },
    {
      atomicNumber: 21,
      symbol: `Sc`,
      element: `Scandium`,
      etymology: `Latin Scandia, 'Scandinavia'`,
    },
    {
      atomicNumber: 22,
      symbol: `Ti`,
      element: `Titanium`,
      etymology: `Titans, the sons of the Earth goddess of Greek mythology`,
    },
    {
      atomicNumber: 23,
      symbol: `V`,
      element: `Vanadium`,
      etymology: `Vanadis, an Old Norse name for the Scandinavian goddess Freyja`,
    },
    {
      atomicNumber: 24,
      symbol: `Cr`,
      element: `Chromium`,
      etymology: `Greek chróma, 'colour'`,
    },
    {
      atomicNumber: 25,
      symbol: `Mn`,
      element: `Manganese`,
      etymology: `Corrupted from magnesia negra; see Magnesium`,
    },
    {
      atomicNumber: 26,
      symbol: `Fe`,
      element: `Iron`,
      etymology: `English word (the symbol Fe is derived from Latin ferrum)`,
    },
    {
      atomicNumber: 27,
      symbol: `Co`,
      element: `Cobalt`,
      etymology: `German Kobold, 'goblin'`,
    },
    {
      atomicNumber: 28,
      symbol: `Ni`,
      element: `Nickel`,
      etymology: `Nickel, a mischievous sprite of German miner mythology`,
    },
    {
      atomicNumber: 29,
      symbol: `Cu`,
      element: `Copper`,
      etymology: `English word, from Latin cuprum, from Ancient Greek Kýpros 'Cyprus'`,
    },
    {
      atomicNumber: 30,
      symbol: `Zn`,
      element: `Zinc`,
      etymology: `Most likely from German Zinke, 'prong' or 'tooth', though some suggest Persian sang, 'stone'`,
    },
    {
      atomicNumber: 31,
      symbol: `Ga`,
      element: `Gallium`,
      etymology: `Latin Gallia, 'France'`,
    },
    {
      atomicNumber: 32,
      symbol: `Ge`,
      element: `Germanium`,
      etymology: `Latin Germania, 'Germany'`,
    },
    {
      atomicNumber: 33,
      symbol: `As`,
      element: `Arsenic`,
      etymology: `French arsenic, from Greek arsenikón 'yellow arsenic' (influenced by arsenikós, 'masculine' or 'virile'), from a West Asian wanderword ultimately from Old Iranian *zarniya-ka, 'golden'`,
    },
    {
      atomicNumber: 34,
      symbol: `Se`,
      element: `Selenium`,
      etymology: `Greek selḗnē, 'moon'`,
    },
    {
      atomicNumber: 35,
      symbol: `Br`,
      element: `Bromine`,
      etymology: `Greek brômos, 'stench'`,
    },
    {
      atomicNumber: 36,
      symbol: `Kr`,
      element: `Krypton`,
      etymology: `Greek kryptós, 'hidden'`,
    },
    {
      atomicNumber: 37,
      symbol: `Rb`,
      element: `Rubidium`,
      etymology: `Latin rubidus, 'deep red'`,
    },
    {
      atomicNumber: 38,
      symbol: `Sr`,
      element: `Strontium`,
      etymology: `Strontian, a village in Scotland, where it was found`,
    },
    {
      atomicNumber: 39,
      symbol: `Y`,
      element: `Yttrium`,
      etymology: `Ytterby, Sweden, where it was found`,
    },
    {
      atomicNumber: 40,
      symbol: `Zr`,
      element: `Zirconium`,
      etymology: `Zircon, a mineral`,
    },
    {
      atomicNumber: 41,
      symbol: `Nb`,
      element: `Niobium`,
      etymology: `Niobe, daughter of king Tantalus from Greek mythology`,
    },
    {
      atomicNumber: 42,
      symbol: `Mo`,
      element: `Molybdenum`,
      etymology: `Greek molýbdaina, 'piece of lead', from mólybdos, 'lead', due to confusion with lead ore galena (PbS)`,
    },
    {
      atomicNumber: 43,
      symbol: `Tc`,
      element: `Technetium`,
      etymology: `Greek tekhnētós, 'artificial'`,
    },
    {
      atomicNumber: 44,
      symbol: `Ru`,
      element: `Ruthenium`,
      etymology: `New Latin Ruthenia, 'Russia'`,
    },
    {
      atomicNumber: 45,
      symbol: `Rh`,
      element: `Rhodium`,
      etymology: `Greek rhodóeis, 'rose-coloured', from rhódon, 'rose'`,
    },
    {
      atomicNumber: 46,
      symbol: `Pd`,
      element: `Palladium`,
      etymology: `Asteroid Pallas, considered a planet at the time`,
    },
    {
      atomicNumber: 47,
      symbol: `Ag`,
      element: `Silver`,
      etymology: `English word (The symbol is derived from Latin argentum)`,
    },
    {
      atomicNumber: 48,
      symbol: `Cd`,
      element: `Cadmium`,
      etymology: `New Latin cadmia, from King Kadmos`,
    },
    {
      atomicNumber: 49,
      symbol: `In`,
      element: `Indium`,
      etymology: `Latin indicum, 'indigo' (colour found in its spectrum)`,
    },
    {
      atomicNumber: 50,
      symbol: `Sn`,
      element: `Tin`,
      etymology: `English word (The symbol is derived from Latin stannum)`,
    },
    {
      atomicNumber: 51,
      symbol: `Sb`,
      element: `Antimony`,
      etymology: `Latin antimonium, the origin of which is uncertain: folk etymologies suggest it is derived from Greek antí ('against') + mónos ('alone'), or Old French anti-moine, 'Monk's bane', but it could plausibly be from or related to Arabic ʾiṯmid, 'antimony', reformatted as a Latin word. (The symbol is derived from Latin stibium 'stibnite'.)`,
    },
    {
      atomicNumber: 52,
      symbol: `Te`,
      element: `Tellurium`,
      etymology: `Latin tellus, 'the ground, Earth'`,
    },
    {
      atomicNumber: 53,
      symbol: `I`,
      element: `Iodine`,
      etymology: `French iode, from Greek ioeidḗs, 'violet'`,
    },
    {
      atomicNumber: 54,
      symbol: `Xe`,
      element: `Xenon`,
      etymology: `Greek xénon, neuter form of xénos 'strange'`,
    },
    {
      atomicNumber: 55,
      symbol: `Cs`,
      element: `Caesium`,
      etymology: `Latin caesius, 'sky-blue'`,
    },
    {
      atomicNumber: 56,
      symbol: `Ba`,
      element: `Barium`,
      etymology: `Greek barýs, 'heavy'`,
    },
    {
      atomicNumber: 57,
      symbol: `La`,
      element: `Lanthanum`,
      etymology: `Greek lanthánein, 'to lie hidden'`,
    },
    {
      atomicNumber: 58,
      symbol: `Ce`,
      element: `Cerium`,
      etymology: `Dwarf planet Ceres, considered a planet at the time it was discovered`,
    },
    {
      atomicNumber: 59,
      symbol: `Pr`,
      element: `Praseodymium`,
      etymology: `Greek prásios dídymos, 'green twin'`,
    },
    {
      atomicNumber: 60,
      symbol: `Nd`,
      element: `Neodymium`,
      etymology: `Greek néos dídymos, 'new twin'`,
    },
    {
      atomicNumber: 61,
      symbol: `Pm`,
      element: `Promethium`,
      etymology: `Prometheus of Greek mythology`,
    },
    {
      atomicNumber: 62,
      symbol: `Sm`,
      element: `Samarium`,
      etymology: `Samarskite, a mineral named after Colonel Vasili Samarsky-Bykhovets, Russian mine official`,
    },
    {
      atomicNumber: 63,
      symbol: `Eu`,
      element: `Europium`,
      etymology: `Europe`,
    },
    {
      atomicNumber: 64,
      symbol: `Gd`,
      element: `Gadolinium`,
      etymology: `Gadolinite, a mineral named after Johan Gadolin, Finnish chemist, physicist and mineralogist`,
    },
    {
      atomicNumber: 65,
      symbol: `Tb`,
      element: `Terbium`,
      etymology: `Ytterby, Sweden, where it was found`,
    },
    {
      atomicNumber: 66,
      symbol: `Dy`,
      element: `Dysprosium`,
      etymology: `Greek dysprósitos, 'hard to get'`,
    },
    {
      atomicNumber: 67,
      symbol: `Ho`,
      element: `Holmium`,
      etymology: `New Latin Holmia, 'Stockholm'`,
    },
    {
      atomicNumber: 68,
      symbol: `Er`,
      element: `Erbium`,
      etymology: `Ytterby, Sweden, where it was found`,
    },
    {
      atomicNumber: 69,
      symbol: `Tm`,
      element: `Thulium`,
      etymology: `Thule, the ancient name for an unclear northern location`,
    },
    {
      atomicNumber: 70,
      symbol: `Yb`,
      element: `Ytterbium`,
      etymology: `Ytterby, Sweden, where it was found`,
    },
    {
      atomicNumber: 71,
      symbol: `Lu`,
      element: `Lutetium`,
      etymology: `Latin Lutetia, 'Paris'`,
    },
    {
      atomicNumber: 72,
      symbol: `Hf`,
      element: `Hafnium`,
      etymology: `New Latin Hafnia, 'Copenhagen' (from Danish havn, 'harbour')`,
    },
    {
      atomicNumber: 73,
      symbol: `Ta`,
      element: `Tantalum`,
      etymology: `King Tantalus, father of Niobe from Greek mythology`,
    },
    {
      atomicNumber: 74,
      symbol: `W`,
      element: `Tungsten`,
      etymology: `Swedish tung sten, 'heavy stone' (The symbol W is from Wolfram, a name used for the element in many languages, originally from Middle High German wolf-rahm (wolf's foam) describing the mineral wolframite)[7]`,
    },
    {
      atomicNumber: 75,
      symbol: `Re`,
      element: `Rhenium`,
      etymology: `Latin Rhenus, 'the Rhine'`,
    },
    {
      atomicNumber: 76,
      symbol: `Os`,
      element: `Osmium`,
      etymology: `Greek osmḗ, 'smell'`,
    },
    {
      atomicNumber: 77,
      symbol: `Ir`,
      element: `Iridium`,
      etymology: `Iris, the Greek goddess of the rainbow`,
    },
    {
      atomicNumber: 78,
      symbol: `Pt`,
      element: `Platinum`,
      etymology: `Spanish platina, 'little silver', from plata 'silver'`,
    },
    {
      atomicNumber: 79,
      symbol: `Au`,
      element: `Gold`,
      etymology: `English word (the symbol Au is derived from Latin aurum)`,
    },
    {
      atomicNumber: 80,
      symbol: `Hg`,
      element: `Mercury`,
      etymology: `Mercury, Roman god of commerce, communication, and luck, known for his speed and mobility (the symbol Hg derives from the element's Latin name hydrargyrum, from Greek hydrárgyros, 'water-silver')`,
    },
    {
      atomicNumber: 81,
      symbol: `Tl`,
      element: `Thallium`,
      etymology: `Greek thallós, 'green shoot or twig'`,
    },
    {
      atomicNumber: 82,
      symbol: `Pb`,
      element: `Lead`,
      etymology: `English word (the symbol Pb is derived from Latin plumbum)`,
    },
    {
      atomicNumber: 83,
      symbol: `Bi`,
      element: `Bismuth`,
      etymology: `German Wismut, from weiß Masse 'white mass', unless from Arabic`,
    },
    {
      atomicNumber: 84,
      symbol: `Po`,
      element: `Polonium`,
      etymology: `Latin Polonia, 'Poland' (the home country of Marie Curie)`,
    },
    {
      atomicNumber: 85,
      symbol: `At`,
      element: `Astatine`,
      etymology: `Greek ástatos, 'unstable'`,
    },
    {
      atomicNumber: 86,
      symbol: `Rn`,
      element: `Radon`,
      etymology: `Radium emanation, originally the name of the isotope Radon-222.`,
    },
    {
      atomicNumber: 87,
      symbol: `Fr`,
      element: `Francium`,
      etymology: `France`,
    },
    {
      atomicNumber: 88,
      symbol: `Ra`,
      element: `Radium`,
      etymology: `French radium, from Latin radius, 'ray'`,
    },
    {
      atomicNumber: 89,
      symbol: `Ac`,
      element: `Actinium`,
      etymology: `Greek aktís, 'ray'`,
    },
    {
      atomicNumber: 90,
      symbol: `Th`,
      element: `Thorium`,
      etymology: `Thor, the Scandinavian god of thunder`,
    },
    {
      atomicNumber: 91,
      symbol: `Pa`,
      element: `Protactinium`,
      etymology: `Proto- (from Greek prôtos, 'first, before') + actinium, since actinium is produced through the radioactive decay of protactinium`,
    },
    {
      atomicNumber: 92,
      symbol: `U`,
      element: `Uranium`,
      etymology: `Uranus, the seventh planet in the Solar System`,
    },
    {
      atomicNumber: 93,
      symbol: `Np`,
      element: `Neptunium`,
      etymology: `Neptune, the eighth planet in the Solar System`,
    },
    {
      atomicNumber: 94,
      symbol: `Pu`,
      element: `Plutonium`,
      etymology: `Dwarf planet Pluto, considered the ninth planet in the Solar System at the time it was discovered`,
    },
    {
      atomicNumber: 95,
      symbol: `Am`,
      element: `Americium`,
      etymology: `The Americas, as the element was first synthesised on the continent, by analogy with europium`,
    },
    {
      atomicNumber: 96,
      symbol: `Cm`,
      element: `Curium`,
      etymology: `Pierre Curie and Marie Curie, French physicists and chemists`,
    },
    {
      atomicNumber: 97,
      symbol: `Bk`,
      element: `Berkelium`,
      etymology: `Berkeley, California, where the element was first synthesised, by analogy with terbium`,
    },
    {
      atomicNumber: 98,
      symbol: `Cf`,
      element: `Californium`,
      etymology: `California, where the element was first synthesised`,
    },
    {
      atomicNumber: 99,
      symbol: `Es`,
      element: `Einsteinium`,
      etymology: `Albert Einstein, German physicist`,
    },
    {
      atomicNumber: 100,
      symbol: `Fm`,
      element: `Fermium`,
      etymology: `Enrico Fermi, Italian physicist`,
    },
    {
      atomicNumber: 101,
      symbol: `Md`,
      element: `Mendelevium`,
      etymology: `Dmitri Mendeleev, Russian chemist and inventor who proposed the periodic table`,
    },
    {
      atomicNumber: 102,
      symbol: `No`,
      element: `Nobelium`,
      etymology: `Alfred Nobel, Swedish chemist and engineer`,
    },
    {
      atomicNumber: 103,
      symbol: `Lr`,
      element: `Lawrencium`,
      etymology: `Ernest Lawrence, American physicist`,
    },
    {
      atomicNumber: 104,
      symbol: `Rf`,
      element: `Rutherfordium`,
      etymology: `Ernest Rutherford, chemist and physicist from New Zealand`,
    },
    {
      atomicNumber: 105,
      symbol: `Db`,
      element: `Dubnium`,
      etymology: `Dubna, Russia, where the Joint Institute for Nuclear Research is located`,
    },
    {
      atomicNumber: 106,
      symbol: `Sg`,
      element: `Seaborgium`,
      etymology: `Glenn T. Seaborg, American chemist`,
    },
    {
      atomicNumber: 107,
      symbol: `Bh`,
      element: `Bohrium`,
      etymology: `Niels Bohr, Danish physicist`,
    },
    {
      atomicNumber: 108,
      symbol: `Hs`,
      element: `Hassium`,
      etymology: `New Latin Hassia, 'Hesse' (a state in Germany)`,
    },
    {
      atomicNumber: 109,
      symbol: `Mt`,
      element: `Meitnerium`,
      etymology: `Lise Meitner, Austrian physicist`,
    },
    {
      atomicNumber: 110,
      symbol: `Ds`,
      element: `Darmstadtium`,
      etymology: `Darmstadt, Germany, where the element was first synthesised`,
    },
    {
      atomicNumber: 111,
      symbol: `Rg`,
      element: `Roentgenium`,
      etymology: `Wilhelm Conrad Röntgen, German physicist`,
    },
    {
      atomicNumber: 112,
      symbol: `Cn`,
      element: `Copernicium`,
      etymology: `Nicolaus Copernicus, Polish astronomer`,
    },
    {
      atomicNumber: 113,
      symbol: `Nh`,
      element: `Nihonium`,
      etymology: `Japanese Nihon, 'Japan' (where the element was first synthesised)`,
    },
    {
      atomicNumber: 114,
      symbol: `Fl`,
      element: `Flerovium`,
      etymology: `Flerov Laboratory of Nuclear Reactions, part of JINR, where the element was synthesised; itself named after Georgy Flyorov, Russian physicist`,
    },
    {
      atomicNumber: 115,
      symbol: `Mc`,
      element: `Moscovium`,
      etymology: `Moscow Oblast, Russia, where the element was first synthesised`,
    },
    {
      atomicNumber: 116,
      symbol: `Lv`,
      element: `Livermorium`,
      etymology: `Lawrence Livermore National Laboratory in Livermore, California, which collaborated with JINR on its synthesis`,
    },
    {
      atomicNumber: 117,
      symbol: `Ts`,
      element: `Tennessine`,
      etymology: `Tennessee, United States (where Oak Ridge National Laboratory is located)`,
    },
    {
      atomicNumber: 118,
      symbol: `Og`,
      element: `Oganesson`,
      etymology: `Yuri Oganessian, Russian-born Armenian physicist`,
    },
  ];

  pageSizes = [5, 10, 25, 100];

  sort = (
    a: PeriodicElement,
    b: PeriodicElement,
    property?: string
  ): number => {
    return new Intl.Collator([], { numeric: true }).compare(
      a[property],
      b[property]
    );
  };

  filter = (a: PeriodicElement, value: string, property?: string): boolean => {
    return !value || a[property]?.search(new RegExp(value, 'i')) > -1;
  };

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}

  selectAll(value: boolean): void {
    this.table.filteredData.forEach((f) => (f.selected = value));
  }
}
