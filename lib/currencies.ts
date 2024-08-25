export const orderedCurrencies = [
    "USD", "EUR", "CNY", "JPY", "GBP", "AUD", "CAD", "CHF", "NZD", "SEK",
    "KRW", "SGD", "RUB", "INR", "HKD", "MXN", "NOK", "DKK", "PLN", "BRL",
    "TRY", "ZAR", "SAR", "ILS", "MYR", "TWD", "BND", "PHP", "HUF", "RSD",
    "CZK", "BAM", "COP", "CLP", "THB", "QAR", "UAH", "KWD", "NAD", "MUR",
    "MVR", "EGP", "IDR", "PEN", "RWF", "GHS", "GEL", "GIP", "MZN", "MDL",
    "GMD", "DZD", "KZT", "LKR", "UGX", "VND", "TND", "KGS", "WST", "SZL",
    "XAF", "XOF", "XPF", "XCD", "XRP", "MRO", "MGA", "SDG", "MNT", "MOP",
    "BBD", "BZD", "KMF", "STN", "SVC", "SLL", "LSL", "AFN", "GNF", "MMK",
    "MWK", "TZS", "HTG", "NIO", "ETB", "SCR", "ERN", "FJD", "CLF", "GTQ",
    "KYD", "JMD", "IQD", "DOP", "YER", "BHD", "ANG", "JOD", "LYD", "BIF",
    "PYG", "AOA", "BYN", "TJS", "TMT", "TOP", "TTD", "UYU", "UZS", "VES",
    "VUV", "AED", "ALL", "AMD", "AZN", "ARS", "BDT", "BGN", "BOB", "BSD",
    "BTN", "CDF", "CRC", "CVE", "DJF", "FKP", "GYD", "HNL", "HRK", "IRR",
    "ISK", "KES", "KHR", "LAK", "LBP", "LRD", "MAD", "MKD", "NGN", "NPR",
    "OMR", "PAB", "PKR", "RON", "SHP", "SOS", "SRD", "ZMW",
  ];
  
  interface CurrencyDetails {
    currency_name: string;
    currency_code: string;
    currency_symbol: string;
    countries: string[];
  }
  
  export const detailedCurrencies: Record<string, CurrencyDetails> = {
    AED: {
      currency_name: "United Arab Emirates Dirham",
      currency_code: "AED",
      currency_symbol: "د.إ",
      countries: ["United Arab Emirates"],
    },
    AFN: {
      currency_name: "Afghan Afghani",
      currency_code: "AFN",
      currency_symbol: "؋",
      countries: ["Afghanistan"],
    },
    ALL: {
      currency_name: "Albanian Lek",
      currency_code: "ALL",
      currency_symbol: "L",
      countries: ["Albania"],
    },
    AMD: {
      currency_name: "Armenian Dram",
      currency_code: "AMD",
      currency_symbol: "֏",
      countries: ["Armenia"],
    },
    ANG: {
      currency_name: "Netherlands Antillean Guilder",
      currency_code: "ANG",
      currency_symbol: "ƒ",
      countries: ["Curaçao", "Sint Maarten"],
    },
    AOA: {
      currency_name: "Angolan Kwanza",
      currency_code: "AOA",
      currency_symbol: "Kz",
      countries: ["Angola"],
    },
    ARS: {
      currency_name: "Argentine Peso",
      currency_code: "ARS",
      currency_symbol: "$",
      countries: ["Argentina"],
    },
    AUD: {
      currency_name: "Australian Dollar",
      currency_code: "AUD",
      currency_symbol: "$",
      countries: [
        "Australia",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Heard Island and McDonald Islands",
        "Kiribati",
        "Nauru",
        "Norfolk Island",
        "Tuvalu",
      ],
    },
    AZN: {
      currency_name: "Azerbaijani Manat",
      currency_code: "AZN",
      currency_symbol: "₼",
      countries: ["Azerbaijan"],
    },
    BAM: {
      currency_name: "Bosnia and Herzegovina Convertible Mark",
      currency_code: "BAM",
      currency_symbol: "KM",
      countries: ["Bosnia and Herzegovina"],
    },
    BBD: {
      currency_name: "Barbadian Dollar",
      currency_code: "BBD",
      currency_symbol: "$",
      countries: ["Barbados"],
    },
    BDT: {
      currency_name: "Bangladeshi Taka",
      currency_code: "BDT",
      currency_symbol: "৳",
      countries: ["Bangladesh"],
    },
    BGN: {
      currency_name: "Bulgarian Lev",
      currency_code: "BGN",
      currency_symbol: "лв",
      countries: ["Bulgaria"],
    },
    BHD: {
      currency_name: "Bahraini Dinar",
      currency_code: "BHD",
      currency_symbol: ".د.ب",
      countries: ["Bahrain"],
    },
    BIF: {
      currency_name: "Burundian Franc",
      currency_code: "BIF",
      currency_symbol: "FBu",
      countries: ["Burundi"],
    },
    BND: {
      currency_name: "Brunei Dollar",
      currency_code: "BND",
      currency_symbol: "$",
      countries: ["Brunei"],
    },
    BOB: {
      currency_name: "Bolivian Boliviano",
      currency_code: "BOB",
      currency_symbol: "Bs.",
      countries: ["Bolivia"],
    },
    BRL: {
      currency_name: "Brazilian Real",
      currency_code: "BRL",
      currency_symbol: "R$",
      countries: ["Brazil"],
    },
    BSD: {
      currency_name: "Bahamian Dollar",
      currency_code: "BSD",
      currency_symbol: "$",
      countries: ["Bahamas"],
    },
    BTN: {
      currency_name: "Bhutanese Ngultrum",
      currency_code: "BTN",
      currency_symbol: "Nu.",
      countries: ["Bhutan"],
    },
    BYN: {
      currency_name: "Belarusian Ruble",
      currency_code: "BYN",
      currency_symbol: "Br",
      countries: ["Belarus"],
    },
    BZD: {
      currency_name: "Belize Dollar",
      currency_code: "BZD",
      currency_symbol: "$",
      countries: ["Belize"],
    },
    CAD: {
      currency_name: "Canadian Dollar",
      currency_code: "CAD",
      currency_symbol: "$",
      countries: ["Canada"],
    },
    CDF: {
      currency_name: "Congolese Franc",
      currency_code: "CDF",
      currency_symbol: "FC",
      countries: ["Democratic Republic of the Congo"],
    },
    CHF: {
      currency_name: "Swiss Franc",
      currency_code: "CHF",
      currency_symbol: "Fr.",
      countries: ["Switzerland", "Liechtenstein"],
    },
    CLF: {
      currency_name: "Unidad de Fomento",
      currency_code: "CLF",
      currency_symbol: "UF",
      countries: ["Chile"],
    },
    CLP: {
      currency_name: "Chilean Peso",
      currency_code: "CLP",
      currency_symbol: "$",
      countries: ["Chile"],
    },
    CNY: {
      currency_name: "Chinese Yuan",
      currency_code: "CNY",
      currency_symbol: "¥",
      countries: ["China"],
    },
    COP: {
      currency_name: "Colombian Peso",
      currency_code: "COP",
      currency_symbol: "$",
      countries: ["Colombia"],
    },
    CRC: {
      currency_name: "Costa Rican Colón",
      currency_code: "CRC",
      currency_symbol: "₡",
      countries: ["Costa Rica"],
    },
    CVE: {
      currency_name: "Cape Verdean Escudo",
      currency_code: "CVE",
      currency_symbol: "$",
      countries: ["Cape Verde"],
    },
    CZK: {
      currency_name: "Czech Koruna",
      currency_code: "CZK",
      currency_symbol: "Kč",
      countries: ["Czech Republic"],
    },
    DJF: {
      currency_name: "Djiboutian Franc",
      currency_code: "DJF",
      currency_symbol: "Fdj",
      countries: ["Djibouti"],
    },
    DKK: {
      currency_name: "Danish Krone",
      currency_code: "DKK",
      currency_symbol: "kr",
      countries: ["Denmark", "Faroe Islands", "Greenland"],
    },
    DOP: {
      currency_name: "Dominican Peso",
      currency_code: "DOP",
      currency_symbol: "$",
      countries: ["Dominican Republic"],
    },
    DZD: {
      currency_name: "Algerian Dinar",
      currency_code: "DZD",
      currency_symbol: "د.ج",
      countries: ["Algeria"],
    },
    EGP: {
      currency_name: "Egyptian Pound",
      currency_code: "EGP",
      currency_symbol: "£",
      countries: ["Egypt"],
    },
    ERN: {
      currency_name: "Eritrean Nakfa",
      currency_code: "ERN",
      currency_symbol: "Nfk",
      countries: ["Eritrea"],
    },
    ETB: {
      currency_name: "Ethiopian Birr",
      currency_code: "ETB",
      currency_symbol: "Br",
      countries: ["Ethiopia"],
    },
    EUR: {
      currency_name: "Euro",
      currency_code: "EUR",
      currency_symbol: "€",
      countries: [
        "Austria",
        "Belgium",
        "Cyprus",
        "Estonia",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Ireland",
        "Italy",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Netherlands",
        "Portugal",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Andorra",
        "Kosovo",
        "Monaco",
        "Montenegro",
        "San Marino",
        "Vatican City",
      ],
    },
    FJD: {
      currency_name: "Fijian Dollar",
      currency_code: "FJD",
      currency_symbol: "$",
      countries: ["Fiji"],
    },
    FKP: {
      currency_name: "Falkland Islands Pound",
      currency_code: "FKP",
      currency_symbol: "£",
      countries: ["Falkland Islands"],
    },
    GBP: {
      currency_name: "British Pound Sterling",
      currency_code: "GBP",
      currency_symbol: "£",
      countries: [
        "United Kingdom",
        "Isle of Man",
        "Channel Islands",
        "British Indian Ocean Territory",
      ],
    },
    GEL: {
      currency_name: "Georgian Lari",
      currency_code: "GEL",
      currency_symbol: "₾",
      countries: ["Georgia"],
    },
    GHS: {
      currency_name: "Ghanaian Cedi",
      currency_code: "GHS",
      currency_symbol: "₵",
      countries: ["Ghana"],
    },
    GIP: {
      currency_name: "Gibraltar Pound",
      currency_code: "GIP",
      currency_symbol: "£",
      countries: ["Gibraltar"],
    },
    GMD: {
      currency_name: "Gambian Dalasi",
      currency_code: "GMD",
      currency_symbol: "D",
      countries: ["Gambia"],
    },
    GNF: {
      currency_name: "Guinean Franc",
      currency_code: "GNF",
      currency_symbol: "FG",
      countries: ["Guinea"],
    },
    GTQ: {
      currency_name: "Guatemalan Quetzal",
      currency_code: "GTQ",
      currency_symbol: "Q",
      countries: ["Guatemala"],
    },
    GYD: {
      currency_name: "Guyanese Dollar",
      currency_code: "GYD",
      currency_symbol: "$",
      countries: ["Guyana"],
    },
    HKD: {
      currency_name: "Hong Kong Dollar",
      currency_code: "HKD",
      currency_symbol: "$",
      countries: ["Hong Kong", "Macau"],
    },
    HNL: {
      currency_name: "Honduran Lempira",
      currency_code: "HNL",
      currency_symbol: "L",
      countries: ["Honduras"],
    },
    HRK: {
      currency_name: "Croatian Kuna",
      currency_code: "HRK",
      currency_symbol: "kn",
      countries: ["Croatia"],
    },
    HTG: {
      currency_name: "Haitian Gourde",
      currency_code: "HTG",
      currency_symbol: "G",
      countries: ["Haiti"],
    },
    HUF: {
      currency_name: "Hungarian Forint",
      currency_code: "HUF",
      currency_symbol: "Ft",
      countries: ["Hungary"],
    },
    IDR: {
      currency_name: "Indonesian Rupiah",
      currency_code: "IDR",
      currency_symbol: "Rp",
      countries: ["Indonesia"],
    },
    ILS: {
      currency_name: "Israeli New Shekel",
      currency_code: "ILS",
      currency_symbol: "₪",
      countries: ["Palestinian territories"],
    },
    INR: {
      currency_name: "Indian Rupee",
      currency_code: "INR",
      currency_symbol: "₹",
      countries: ["India", "Bhutan"],
    },
    IQD: {
      currency_name: "Iraqi Dinar",
      currency_code: "IQD",
      currency_symbol: "ع.د",
      countries: ["Iraq"],
    },
    IRR: {
      currency_name: "Iranian Rial",
      currency_code: "IRR",
      currency_symbol: "﷼",
      countries: ["Iran"],
    },
    ISK: {
      currency_name: "Icelandic Króna",
      currency_code: "ISK",
      currency_symbol: "kr",
      countries: ["Iceland"],
    },
    JMD: {
      currency_name: "Jamaican Dollar",
      currency_code: "JMD",
      currency_symbol: "$",
      countries: ["Jamaica"],
    },
    JOD: {
      currency_name: "Jordanian Dinar",
      currency_code: "JOD",
      currency_symbol: "د.ا",
      countries: ["Jordan"],
    },
    JPY: {
      currency_name: "Japanese Yen",
      currency_code: "JPY",
      currency_symbol: "¥",
      countries: ["Japan"],
    },
    KES: {
      currency_name: "Kenyan Shilling",
      currency_code: "KES",
      currency_symbol: "Sh",
      countries: ["Kenya"],
    },
    KGS: {
      currency_name: "Kyrgyzstani Som",
      currency_code: "KGS",
      currency_symbol: "с",
      countries: ["Kyrgyzstan"],
    },
    KHR: {
      currency_name: "Cambodian Riel",
      currency_code: "KHR",
      currency_symbol: "៛",
      countries: ["Cambodia"],
    },
    KMF: {
      currency_name: "Comorian Franc",
      currency_code: "KMF",
      currency_symbol: "CF",
      countries: ["Comoros"],
    },
    KRW: {
      currency_name: "South Korean Won",
      currency_code: "KRW",
      currency_symbol: "₩",
      countries: ["South Korea"],
    },
    KWD: {
      currency_name: "Kuwaiti Dinar",
      currency_code: "KWD",
      currency_symbol: "د.ك",
      countries: ["Kuwait"],
    },
    KYD: {
      currency_name: "Cayman Islands Dollar",
      currency_code: "KYD",
      currency_symbol: "$",
      countries: ["Cayman Islands"],
    },
    KZT: {
      currency_name: "Kazakhstani Tenge",
      currency_code: "KZT",
      currency_symbol: "₸",
      countries: ["Kazakhstan"],
    },
    LAK: {
      currency_name: "Lao Kip",
      currency_code: "LAK",
      currency_symbol: "₭",
      countries: ["Laos"],
    },
    LBP: {
      currency_name: "Lebanese Pound",
      currency_code: "LBP",
      currency_symbol: "ل.ل",
      countries: ["Lebanon"],
    },
    LKR: {
      currency_name: "Sri Lankan Rupee",
      currency_code: "LKR",
      currency_symbol: "Rs",
      countries: ["Sri Lanka"],
    },
    LRD: {
      currency_name: "Liberian Dollar",
      currency_code: "LRD",
      currency_symbol: "$",
      countries: ["Liberia"],
    },
    LSL: {
      currency_name: "Lesotho Loti",
      currency_code: "LSL",
      currency_symbol: "L",
      countries: ["Lesotho"],
    },
    LYD: {
      currency_name: "Libyan Dinar",
      currency_code: "LYD",
      currency_symbol: "ل.د",
      countries: ["Libya"],
    },
    MAD: {
      currency_name: "Moroccan Dirham",
      currency_code: "MAD",
      currency_symbol: "د.م.",
      countries: ["Morocco", "Western Sahara"],
    },
    MDL: {
      currency_name: "Moldovan Leu",
      currency_code: "MDL",
      currency_symbol: "L",
      countries: ["Moldova"],
    },
    MGA: {
      currency_name: "Malagasy Ariary",
      currency_code: "MGA",
      currency_symbol: "Ar",
      countries: ["Madagascar"],
    },
    MKD: {
      currency_name: "Macedonian Denar",
      currency_code: "MKD",
      currency_symbol: "ден",
      countries: ["North Macedonia"],
    },
    MMK: {
      currency_name: "Myanmar Kyat",
      currency_code: "MMK",
      currency_symbol: "K",
      countries: ["Myanmar"],
    },
    MNT: {
      currency_name: "Mongolian Tögrög",
      currency_code: "MNT",
      currency_symbol: "₮",
      countries: ["Mongolia"],
    },
    MOP: {
      currency_name: "Macanese Pataca",
      currency_code: "MOP",
      currency_symbol: "P",
      countries: ["Macau"],
    },
  
    MRO: {
      currency_name: "Mauritanian Ouguiya",
      currency_code: "MRO",
      currency_symbol: "UM",
      countries: ["Mauritania"],
    },
    MUR: {
      currency_name: "Mauritian Rupee",
      currency_code: "MUR",
      currency_symbol: "₨",
      countries: ["Mauritius"],
    },
    MVR: {
      currency_name: "Maldivian Rufiyaa",
      currency_code: "MVR",
      currency_symbol: "Rf",
      countries: ["Maldives"],
    },
    MWK: {
      currency_name: "Malawian Kwacha",
      currency_code: "MWK",
      currency_symbol: "MK",
      countries: ["Malawi"],
    },
    MXN: {
      currency_name: "Mexican Peso",
      currency_code: "MXN",
      currency_symbol: "$",
      countries: ["Mexico"],
    },
    MYR: {
      currency_name: "Malaysian Ringgit",
      currency_code: "MYR",
      currency_symbol: "RM",
      countries: ["Malaysia"],
    },
    MZN: {
      currency_name: "Mozambican Metical",
      currency_code: "MZN",
      currency_symbol: "MT",
      countries: ["Mozambique"],
    },
    NAD: {
      currency_name: "Namibian Dollar",
      currency_code: "NAD",
      currency_symbol: "$",
      countries: ["Namibia"],
    },
    NGN: {
      currency_name: "Nigerian Naira",
      currency_code: "NGN",
      currency_symbol: "₦",
      countries: ["Nigeria"],
    },
    NIO: {
      currency_name: "Nicaraguan Córdoba",
      currency_code: "NIO",
      currency_symbol: "C$",
      countries: ["Nicaragua"],
    },
    NOK: {
      currency_name: "Norwegian Krone",
      currency_code: "NOK",
      currency_symbol: "kr",
      countries: ["Norway"],
    },
    NPR: {
      currency_name: "Nepalese Rupee",
      currency_code: "NPR",
      currency_symbol: "Rs",
      countries: ["Nepal"],
    },
    NZD: {
      currency_name: "New Zealand Dollar",
      currency_code: "NZD",
      currency_symbol: "$",
      countries: ["New Zealand"],
    },
    OMR: {
      currency_name: "Omani Rial",
      currency_code: "OMR",
      currency_symbol: "ر.ع.",
      countries: ["Oman"],
    },
    PAB: {
      currency_name: "Panamanian Balboa",
      currency_code: "PAB",
      currency_symbol: "B/.",
      countries: ["Panama"],
    },
    PEN: {
      currency_name: "Peruvian Sol",
      currency_code: "PEN",
      currency_symbol: "S/.",
      countries: ["Peru"],
    },
    PHP: {
      currency_name: "Philippine Peso",
      currency_code: "PHP",
      currency_symbol: "₱",
      countries: ["Philippines"],
    },
    PKR: {
      currency_name: "Pakistani Rupee",
      currency_code: "PKR",
      currency_symbol: "₨",
      countries: ["Pakistan"],
    },
    PLN: {
      currency_name: "Polish Zloty",
      currency_code: "PLN",
      currency_symbol: "zł",
      countries: ["Poland"],
    },
    PYG: {
      currency_name: "Paraguayan Guarani",
      currency_code: "PYG",
      currency_symbol: "₲",
      countries: ["Paraguay"],
    },
    QAR: {
      currency_name: "Qatari Rial",
      currency_code: "QAR",
      currency_symbol: "ر.ق",
      countries: ["Qatar"],
    },
    RON: {
      currency_name: "Romanian Leu",
      currency_code: "RON",
      currency_symbol: "lei",
      countries: ["Romania"],
    },
    RSD: {
      currency_name: "Serbian Dinar",
      currency_code: "RSD",
      currency_symbol: "дин.",
      countries: ["Serbia"],
    },
    RUB: {
      currency_name: "Russian Ruble",
      currency_code: "RUB",
      currency_symbol: "₽",
      countries: ["Russia"],
    },
    RWF: {
      currency_name: "Rwandan Franc",
      currency_code: "RWF",
      currency_symbol: "FRw",
      countries: ["Rwanda"],
    },
    SAR: {
      currency_name: "Saudi Riyal",
      currency_code: "SAR",
      currency_symbol: "ر.س",
      countries: ["Saudi Arabia"],
    },
    SCR: {
      currency_name: "Seychellois Rupee",
      currency_code: "SCR",
      currency_symbol: "₨",
      countries: ["Seychelles"],
    },
    SDG: {
      currency_name: "Sudanese Pound",
      currency_code: "SDG",
      currency_symbol: "ج.س.",
      countries: ["Sudan"],
    },
    SEK: {
      currency_name: "Swedish Krona",
      currency_code: "SEK",
      currency_symbol: "kr",
      countries: ["Sweden"],
    },
    SGD: {
      currency_name: "Singapore Dollar",
      currency_code: "SGD",
      currency_symbol: "$",
      countries: ["Singapore"],
    },
    SHP: {
      currency_name: "Saint Helena Pound",
      currency_code: "SHP",
      currency_symbol: "£",
      countries: ["Saint Helena"],
    },
    SLL: {
      currency_name: "Sierra Leonean Leone",
      currency_code: "SLL",
      currency_symbol: "Le",
      countries: ["Sierra Leone"],
    },
    SOS: {
      currency_name: "Somali Shilling",
      currency_code: "SOS",
      currency_symbol: "Sh",
      countries: ["Somalia"],
    },
    SRD: {
      currency_name: "Surinamese Dollar",
      currency_code: "SRD",
      currency_symbol: "$",
      countries: ["Suriname"],
    },
    STN: {
      currency_name: "São Tomé and Príncipe Dobra",
      currency_code: "STN",
      currency_symbol: "Db",
      countries: ["São Tomé and Príncipe"],
    },
    SVC: {
      currency_name: "Salvadoran Colón",
      currency_code: "SVC",
      currency_symbol: "₡",
      countries: ["El Salvador"],
    },
    SZL: {
      currency_name: "Swazi Lilangeni",
      currency_code: "SZL",
      currency_symbol: "E",
      countries: ["Eswatini"],
    },
    THB: {
      currency_name: "Thai Baht",
      currency_code: "THB",
      currency_symbol: "฿",
      countries: ["Thailand"],
    },
    TJS: {
      currency_name: "Tajikistani Somoni",
      currency_code: "TJS",
      currency_symbol: "SM",
      countries: ["Tajikistan"],
    },
    TMT: {
      currency_name: "Turkmenistani Manat",
      currency_code: "TMT",
      currency_symbol: "m",
      countries: ["Turkmenistan"],
    },
    TND: {
      currency_name: "Tunisian Dinar",
      currency_code: "TND",
      currency_symbol: "د.ت",
      countries: ["Tunisia"],
    },
    TOP: {
      currency_name: "Tongan Paʻanga",
      currency_code: "TOP",
      currency_symbol: "T$",
      countries: ["Tonga"],
    },
    TRY: {
      currency_name: "Turkish Lira",
      currency_code: "TRY",
      currency_symbol: "₺",
      countries: ["Turkey"],
    },
    TTD: {
      currency_name: "Trinidad and Tobago Dollar",
      currency_code: "TTD",
      currency_symbol: "$",
      countries: ["Trinidad and Tobago"],
    },
    TWD: {
      currency_name: "New Taiwan Dollar",
      currency_code: "TWD",
      currency_symbol: "NT$",
      countries: ["Taiwan"],
    },
    TZS: {
      currency_name: "Tanzanian Shilling",
      currency_code: "TZS",
      currency_symbol: "TSh",
      countries: ["Tanzania"],
    },
    UAH: {
      currency_name: "Ukrainian Hryvnia",
      currency_code: "UAH",
      currency_symbol: "₴",
      countries: ["Ukraine"],
    },
    UGX: {
      currency_name: "Ugandan Shilling",
      currency_code: "UGX",
      currency_symbol: "USh",
      countries: ["Uganda"],
    },
    USD: {
      currency_name: "United States Dollar",
      currency_code: "USD",
      currency_symbol: "$",
      countries: [
        "United States",
        "Ecuador",
        "El Salvador",
        "Marshall Islands",
        "Micronesia",
        "Palau",
        "Zimbabwe",
      ],
    },
    UYU: {
      currency_name: "Uruguayan Peso",
      currency_code: "UYU",
      currency_symbol: "$",
      countries: ["Uruguay"],
    },
    UZS: {
      currency_name: "Uzbekistani Som",
      currency_code: "UZS",
      currency_symbol: "лв",
      countries: ["Uzbekistan"],
    },
    VES: {
      currency_name: "Venezuelan Bolívar",
      currency_code: "VES",
      currency_symbol: "Bs.S",
      countries: ["Venezuela"],
    },
    VND: {
      currency_name: "Vietnamese Dong",
      currency_code: "VND",
      currency_symbol: "₫",
      countries: ["Vietnam"],
    },
    VUV: {
      currency_name: "Vanuatu Vatu",
      currency_code: "VUV",
      currency_symbol: "Vt",
      countries: ["Vanuatu"],
    },
    WST: {
      currency_name: "Samoan Tala",
      currency_code: "WST",
      currency_symbol: "WS$",
      countries: ["Samoa"],
    },
    XAF: {
      currency_name: "Central African CFA Franc",
      currency_code: "XAF",
      currency_symbol: "FCFA",
      countries: [
        "Cameroon",
        "Central African Republic",
        "Chad",
        "Congo",
        "Equatorial Guinea",
        "Gabon",
      ],
    },
    XCD: {
      currency_name: "East Caribbean Dollar",
      currency_code: "XCD",
      currency_symbol: "$",
      countries: [
        "Antigua and Barbuda",
        "Dominica",
        "Grenada",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
      ],
    },
    XOF: {
      currency_name: "West African CFA Franc",
      currency_code: "XOF",
      currency_symbol: "CFA",
      countries: [
        "Benin",
        "Burkina Faso",
        "Ivory Coast",
        "Guinea-Bissau",
        "Mali",
        "Niger",
        "Senegal",
        "Togo",
      ],
    },
    XPF: {
      currency_name: "CFP Franc",
      currency_code: "XPF",
      currency_symbol: "₣",
      countries: ["French Polynesia", "New Caledonia", "Wallis and Futuna"],
    },
    XRP: {
      currency_name: "XRP",
      currency_code: "XRP",
      currency_symbol: "XRP",
      countries: ["International"],
    },
    YER: {
      currency_name: "Yemeni Rial",
      currency_code: "YER",
      currency_symbol: "ر.ي",
      countries: ["Yemen"],
    },
    ZAR: {
      currency_name: "South African Rand",
      currency_code: "ZAR",
      currency_symbol: "R",
      countries: ["South Africa"],
    },
    ZMW: {
      currency_name: "Zambian Kwacha",
      currency_code: "ZMW",
      currency_symbol: "ZK",
      countries: ["Zambia"],
    },
  };