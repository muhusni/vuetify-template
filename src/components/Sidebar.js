let menu = [
  {
    url: "/home",
    name: "Home",
    icon: "mdi-home",
    dropdown: false,
  },
  {
    url: "/perizinan",
    name: "Perizinan",
    icon: "mdi-file",
    dropdown: true,
    submenu: [
      {
        url: "/pengajuan",
        name: "Pengajuan",
        icon: "mdi-plus",
      },
      {
        url: "/browse",
        name: "Browse",
        icon: "mdi-magnify",
      },
    ],
  },
];
export default menu;
