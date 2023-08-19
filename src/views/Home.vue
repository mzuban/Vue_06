<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <Croppa
            ref="croppa"
            :width="400"
            :height="400"
            placeholder="Upload image..."
            v-model="imageReference"
          ></Croppa>
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

//cards = [
// {description: "Naslov 1",time: "an hour ago",url: "https://picsum.photos/id/1/400/400"},
// {description: "Naslov 2", : "1 day ago",url: "https://picsum.photos/id/2/400/400"},
// {description: "Naslov 3",time: "2 days ago",url: "https://picsum.photos/id/3/400/400"},
// {description: "Naslov 4",time: "3 days ago",url: "https://picsum.photos/id/4/400/400"},];

export default {
  name: "home",
  data() {
    return {
      cards: [],
      store,
      newImageDescription: "",
      newImageUrl: "",
      imageReference: null,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
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
</style>
