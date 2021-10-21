
const SomeApp = {
    data() {
      return {
        "books": [],
        offerbooks: {},
        offerForm: {}
      }
    },

    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBooks(s) {
            if (s == this.selectedBooks) {
                return;
            }
            this.selectedBooks = s;
            this.offers = [];
            this.fetchBooksData(this.selectedBooks);
        },

        fetchBooksData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },


        // The following code is taken from Professor Gregory's lecture. Changes have been made to reflect Books and functions.

        postNewOffer(evt) {     
          console.log("Posting:", this.offerForm);
          // alert("Posting!");
  
          fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.offers = json;
            
          });
      }
    },

    created() {
        this.fetchBooksData();
    }
  
    }
  
  Vue.createApp(SomeApp).mount('#offerApp');