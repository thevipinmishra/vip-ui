function photo(inner: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">${inner}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const ridge = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d9a6"/><stop offset="1" stop-color="#d0714b"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><circle cx="870" cy="250" r="88" fill="#fff3d8" opacity="0.92"/><path d="M0 660 250 430 430 620 640 470 850 660 1030 520 1200 690V900H0Z" fill="#6f4a38"/><path d="M0 780 300 630 520 750 780 610 990 760 1200 670V900H0Z" fill="#3d2c25"/>',
);

const tide = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c6e7e8"/><stop offset="1" stop-color="#2f8f9d"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><path d="M0 520Q300 470 600 520T1200 520V900H0Z" fill="#1f6f7c"/><path d="M0 640Q280 590 560 640T1200 640V900H0Z" fill="#17545e"/><path d="M120 560 230 470 330 560 260 620 160 620Z" fill="#3a4a4a"/><path d="M860 640 970 540 1080 640 1010 710 900 710Z" fill="#42544f"/><circle cx="600" cy="330" r="70" fill="#f4fbf8" opacity="0.75"/>',
);

const face = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7eff7"/><stop offset="1" stop-color="#a8bccd"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><path d="M0 780 260 360 430 620 620 250 820 640 990 420 1200 780V900H0Z" fill="#7e93a8"/><path d="M620 250 700 470 560 470Z" fill="#f7fbff"/><path d="M260 360 340 540 190 540Z" fill="#f7fbff"/><path d="M990 420 1050 560 930 560Z" fill="#eef5fb"/><path d="M0 800Q300 740 600 800T1200 800V900H0Z" fill="#dfe8f0"/>',
);

const dunes = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4e2bd"/><stop offset="1" stop-color="#e0b579"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><path d="M0 560Q260 420 560 540T1200 500V900H0Z" fill="#d9a86c"/><path d="M0 700Q300 600 620 700T1200 660V900H0Z" fill="#b8834a"/><path d="M0 820Q300 760 620 820T1200 790V900H0Z" fill="#8a5f36"/><path d="M240 700Q300 660 360 700T480 700" fill="none" stroke="#6f4a29" stroke-width="4" opacity="0.5"/>',
);

const forest = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4ecd9"/><stop offset="1" stop-color="#a9c19a"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><path d="M0 560Q300 470 600 540T1200 500V900H0Z" fill="#7f9d74"/><path d="M90 720 170 470 250 720Z M230 740 330 400 430 740Z M760 730 850 450 940 730Z M900 760 1010 380 1120 760Z" fill="#3f5e43"/><path d="M380 760 470 520 560 760Z M560 770 640 560 720 770Z M1060 780 1140 560 1220 780Z" fill="#2f4a35"/><path d="M0 760Q300 700 600 760T1200 750V900H0Z" fill="#26392b"/>',
);

const lake = photo(
  '<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3f6e"/><stop offset="0.55" stop-color="#c9847a"/><stop offset="1" stop-color="#f1c59a"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d79a86"/><stop offset="1" stop-color="#3a3d63"/></linearGradient></defs><rect width="1200" height="900" fill="url(#a)"/><circle cx="600" cy="560" r="96" fill="#fbe2c4"/><path d="M0 560 180 470 330 540 470 450 600 530 760 440 930 530 1080 470 1200 520V600H0Z" fill="#2c2e4f"/><rect y="600" width="1200" height="300" fill="url(#b)"/><path d="M520 640H680M550 680H650M570 720H630" stroke="#fbe2c4" stroke-width="6" stroke-linecap="round" opacity="0.6"/>',
);

export interface Photo {
  id: string;
  name: string;
  alt: string;
  caption: string;
  src: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  {
    id: "ridge",
    name: "Ridge at first light",
    alt: "A dark mountain ridge in front of a warm sunrise.",
    caption: "First light on the north ridge, 06:12",
    src: ridge,
    width: 1200,
    height: 900,
  },
  {
    id: "tide",
    name: "Tide pools",
    alt: "Turquoise tide pools between dark rocks.",
    caption: "Low tide at the point, 11:40",
    src: tide,
    width: 1200,
    height: 900,
  },
  {
    id: "face",
    name: "The north face",
    alt: "Snow-covered peaks under a pale sky.",
    caption: "The north face after the storm",
    src: face,
    width: 1200,
    height: 900,
  },
  {
    id: "dunes",
    name: "Dunes after rain",
    alt: "Ochre dunes with dark bands of wet sand.",
    caption: "Dunes after the rain, 17:05",
    src: dunes,
    width: 1200,
    height: 900,
  },
  {
    id: "forest",
    name: "Pine valley",
    alt: "Rows of dark pines below a soft green hillside.",
    caption: "The pine valley trail, 09:30",
    src: forest,
    width: 1200,
    height: 900,
  },
  {
    id: "lake",
    name: "Lake at dusk",
    alt: "A low sun over a still lake between dark hills.",
    caption: "Dusk on the lake, 19:48",
    src: lake,
    width: 1200,
    height: 900,
  },
];
