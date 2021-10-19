
const SomeApp = {
    data() {
      return {
        "books": []
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

        fetchOfferData(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/offer/?books=' + s.title)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postNewOffer(evt) {
          this.offerForm.studentId = this.selectedStudent.id;        
          console.log("Posting:", this.offerForm);
          // alert("Posting!");
  
          fetch('api/offer/create.php', {
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
              
              // reset the form
              this.offerForm = {};
            });
        }
    },

    created() {
        this.fetchBooksData();
    }
  
}
  
  Vue.createApp(SomeApp).mount('#offerApp');