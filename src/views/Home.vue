<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <a
            style="border: 1px solid #000; padding: 5px; cursor: pointer"
            @click="showAllUploads"
            >Drag & Drop Image Here</a
          >
          <div style="margin-top: 10px"></div>
          <div v-for="(upload, index) in uploads" :key="index">
            <div v-if="upload.show">
              <my-upload
                field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="250"
                :height="250"
                url="/api/upload"
                :params="params"
                :headers="headers"
                img-format="png"
              ></my-upload>
            </div>
          </div>
          <img :src="imgDataUrl" />
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <instagram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-4">Sidebar</div>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import myUpload from "vue-image-crop-upload";

//cards = [
// {description: "Naslov 1",time: "an hour ago",url: "https://picsum.photos/id/1/400/400"},
// {description: "Naslov 2", : "1 day ago",url: "https://picsum.photos/id/2/400/400"},
// {description: "Naslov 3",time: "2 days ago",url: "https://picsum.photos/id/3/400/400"},
// {description: "Naslov 4",time: "3 days ago",url: "https://picsum.photos/id/4/400/400"},];

export default {
  props: {
    params: Object,
    headers: Object,
  },
  name: "home",
  data() {
    return {
      uploads: [
        { show: false },
        // Dodajte druge instance ovdje prema potrebi
      ],
      show: true,
      params: {
        token: "12321",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: "",
      cards: [],
      store,
      newImageDescription: "",
      newImageUrl: "",
      imageReference: null,
      params: {},
      headers: {},
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    showAllUploads() {
      this.uploads.forEach((upload) => {
        upload.show = true;
      });
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- Uspješno obrezivanje slike --------");
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- Uspješno otpremanje slike --------");
      console.log(jsonData);
      console.log("Polje: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- Neuspješno otpremanje slike --------");
      console.log(status);
      console.log("Polje: " + field);
    },
    getPosts() {
      console.log("firebase dohvat...");
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();
            console.log(data);

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
    postNewImage() {
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";

          this.getPosts();
          // Postavi show na true za sve instance
          this.uploads.forEach((upload) => {
            upload.show = true;
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  computed: {
    filteredCards() {
      // logika koja filtrira cards
      let termin = this.store.searchTerm;

      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    InstagramCard,
    "my-upload": myUpload,
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}
.card-owner {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}
.upload-frame {
  border: 2px dashed #ccc; // Stil okvira
  height: 150px; // Visina okvira (prilagodite prema potrebi)
  margin-top: 10px; // Razmak između okvira i opisa
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
