<template>
  <v-card class="mx-auto" max-width="1000">
    <v-card-title>Perekaman Baru</v-card-title>
    <v-card-subtitle>Pengajuan PPFTZ-01 Barang Pindahan</v-card-subtitle>
    <v-card-text>
      <v-stepper v-model="e1" alt-labels flat elevation="0">
        <!-- Label -->
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Data Pengajuan
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Data Barang
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> Lampiran</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4"> Name of step 3 </v-stepper-step>
        </v-stepper-header>

        <!-- Form step -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat class="mb-12">
              <v-form ref="form" @submit.prevent="submit">
                <v-container class="">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="nama_pemohon"
                        :rules="[rules.required]"
                        label="Nama Pemohon"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="identitas_pemohon"
                        :rules="[rules.required, rules.ktp]"
                        :counter="16"
                        label="Identitas Pemohon (No. KTP)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-textarea
                    name="input-7-4"
                    label="Alamat Pemohon"
                    :rules="[rules.required]"
                    v-model="alamat_pemohon"
                    flat
                  ></v-textarea>
                  <v-switch
                    v-model="fl_ppjk"
                    label="Menggunakan PPJK?"
                    color="primary"
                    :value="true"
                    hide-details
                  ></v-switch>
                  <v-spacer></v-spacer>
                  <transition name="fade" mode="in-out">
                    <div v-if="fl_ppjk">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="nama_ppjk"
                            :rules="[rules.required]"
                            label="Nama PPJK"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="identitas_ppjk"
                            :rules="[rules.required, rules.ktp]"
                            :counter="16"
                            label="Identitas PPJK (No. KTP)"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </transition>
                  <v-spacer></v-spacer>
                  <v-select
                    :items="moda_angkutan_items"
                    v-model="moda_angkutan"
                    item-text="moda"
                    item-value="id"
                    label="Cara Pengangkutan"
                    :rules="[rules.required]"
                  ></v-select>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="Pelabuhan Muat"
                        v-model="pelabuhan_muat"
                        :items="pelabuhan_items"
                        item-text="nama_pelabuhan"
                        item-value="id_pelabuhan"
                        :rules="[rules.required, rules.pelabuhan]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="Pelabuhan Bongkar"
                        v-model="pelabuhan_bongkar"
                        :items="pelabuhan_items"
                        item-text="nama_pelabuhan"
                        item-value="id_pelabuhan"
                        :rules="[rules.required, rules.pelabuhan]"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-form ref="form2">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    type="number"
                    label="Jumlah Kemasan"
                    v-model="jumlah_kemasan"
                    :rules="[rules.required, rules.kemasan]"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-autocomplete
                    label="Jenis Kemasan"
                    v-model="jenis_kemasan"
                    :items="kemasan_items"
                    :item-text="
                      (item) => `${item.id_kemasan} - ${item.kemasan}`
                    "
                    item-value="id_kemasan"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    type="number"
                    label="Berat (KG)"
                    v-model="berat"
                    :rules="[rules.required]"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <div class="py-3">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon> Tambah Barang
                  </v-btn>
                </template>

                <v-card>
                  <v-form ref="formBarang">
                    <v-card-title class="text-h5 text--white">
                      Tambah barang
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        label="Uraian Barang"
                        v-model="nama_barang"
                        :rules="[rules.required]"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Jumlah Barang"
                        v-model="jumlah_barang"
                        type="number"
                        :rules="[rules.required]"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Satuan Barang"
                        v-model="satuan_barang"
                        :rules="[rules.required]"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Nilai Barang"
                        type="number"
                        v-model="nilai_barang"
                        :rules="[rules.required]"
                      >
                      </v-text-field>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="tambahBarang">
                        <v-icon>mdi-plus</v-icon> Tambah
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
            <v-spacer></v-spacer>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nama Barang</th>
                    <th class="text-left">Jumlah Barang</th>
                    <th class="text-left">Nilai Barang</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in barang" :key="item.nama_barang">
                    <td>{{ item.nama_barang }}</td>
                    <td>{{ `${item.jumlah_barang} ${item.satuan_barang}` }}</td>
                    <td>{{ item.nilai_barang }}</td>
                    <td class="text-xs-left">
                      <v-btn icon @click="removeBarang(item)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <div>
        <v-btn class="" text @click="back()" v-if="e1 > 1">
          <v-icon right dark>mdi-arrow-left</v-icon>
          &nbsp;Back
        </v-btn>
      </div>
      <div>
        <v-btn text @click="next()" v-if="e1 < 4">
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      isEditing: true,
      valid: false,
      dialog: false,
      nama_pemohon: "",
      identitas_pemohon: "",
      alamat_pemohon: "",
      fl_ppjk: false,
      nama_ppjk: "",
      identitas_ppjk: "",
      alamat_ppjk: "",
      moda_angkutan: "",
      pelabuhan_muat: "",
      pelabuhan_bongkar: "",
      jumlah_kemasan: "",
      jenis_kemasan: "",
      berat: "",
      barang: [],
      rules: {
        required: (value) => !!value || "Required.",
        ktp: (value) => value.length === 16 || "Nomor KTP harus 16 digit",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        emailMatch: () => `The email and password you entered don't match`,
        pelabuhan: () =>
          this.pelabuhan_muat !== this.pelabuhan_bongkar ||
          "Pelabuhan muat dan bongkar tidak boleh sama",
        kemasan: (v) =>
          v == this.barang.length ||
          "Jumlah Kemasan tidak sama dengan Data Barang",
      },
      email: "",
      // isian modal
      nama_barang: "",
      jumlah_barang: "",
      satuan_barang: "",
      nilai_barang: "",
      //referensi
      moda_angkutan_items: [
        { id: 1, moda: "Angkutan Laut" },
        { id: 2, moda: "Angkutan Udara" },
      ],
      pelabuhan_items: [
        { id_pelabuhan: "IDBTH", nama_pelabuhan: "Hang Nadim" },
        { id_pelabuhan: "IDBTU", nama_pelabuhan: "Batu Ampar" },
      ],
      kemasan_items: [{ id_kemasan: "PK", kemasan: "Package" }],
    };
  },
  create() {
    window.onbeforeunload = () => alert('Are you sure you want to leave?')
  },
  methods: {
    next() {
      var form = null;
      if (this.e1 == 1) {
        form = this.$refs.form.validate();
      } else if (this.e1 == 2) {
        form = this.$refs.form2.validate();
      } else if (this.e1 == 3) {
        this.e1++;
        return;
      }
      if (form) {
        this.e1++;
      }
    },
    back() {
      this.e1--;
    },
    tambahBarang() {
      this.barang.push({
        nama_barang: this.nama_barang,
        jumlah_barang: this.jumlah_barang,
        satuan_barang: this.satuan_barang,
        nilai_barang: this.nilai_barang,
      });
      this.$refs.formBarang.reset();
      this.dialog = false;
    },
    removeBarang(id) {
      this.barang.splice(id, 1);
    },
  },
  computed: {
    itemsKemasan: (items) => `${items.id_kemasan} - ${items.kemasan}`,
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  },
  beforeMount() {
    window.addEventListener("beforeunload", event => {
      if (!this.isEditing) return
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ""
    })
  }
};
</script>
