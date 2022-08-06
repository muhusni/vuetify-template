import Vue from "vue";
import VueRouter from "vue-router";

//Menu
import Container from "@/components/TheContainer";
import Home from "@/views/Home";
// import Browse from "@/views/Browse";
import About from "@/views/About";
import Login from "@/views/Login";

// Barang Pindahan
import BrowsePindahan from "@/views/barang-pindahan/Browse";
import PerekamanPindahan from "@/views/barang-pindahan/Perekaman";

// Perizinan
import PengajuanPerizinan from "@/views/perizinan/PengajuanPerizinan";
import DetailPengajuanPerizinan from "@/views/perizinan/DetailPengajuanPerizinan";
import BrowsePerizinan from "@/views/perizinan/BrowsePerizinan";
import DetailBrowsePerizinan from '@/views/perizinan/DetailBrowsePerizinan';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Home",
    component: Container,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/about",
        name: "About",
        component: About,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/perizinan",
    name: "Perizinan",
    component: Container,
    children: [
      {
        path: "/pengajuan",
        name: "Pengajuan",
        component: PengajuanPerizinan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/pengajuan/:id",
        name: "Pengajuan",
        component: DetailPengajuanPerizinan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/browse",
        name: "Pengajuan",
        component: BrowsePerizinan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/browse/:id",
        name: "Detail Perizinan",
        component: DetailBrowsePerizinan,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/barang-pindahan",
    redirect: "/barang-pindahan/browse",
    component: Container,
    name: "Barang Pindahan",
    children: [
      {
        path: "/barang-pindahan/browse",
        name: "Barang Pindahan",
        component: BrowsePindahan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/barang-pindahan/rekam",
        name: "Perekaman Barang Pindahan",
        component: PerekamanPindahan,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      unrequiredAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
