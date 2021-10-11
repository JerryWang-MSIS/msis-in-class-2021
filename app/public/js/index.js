
const Offer = {
  data() {
    return {
      "students": [],
      "selectedStudent": null,
      "offers": []
    }
  },

      computed: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        }
      },

  methods:{
       selectStudent(s) {
           if (s == this.selectedStudent) {
               return;
           }
           this.selectedStudent = s;
           this.offers = [];
           this.fetchOfferData(s));
       },

      fetchStudentData() {
          fetch('/api/student/')
          .then( response => response.json())
          .then( (parsedJson) => {
              console.log(parsedJson);
              this.students = parsedJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      }
  },

  created() {
      this.fetchStudentData();
  }
}

//   computed: {},
//   methods: {
//       prettyData(d) {
//           return dayjs(d)
//           .format('D MMM YYYY')
//       },
//       prettyDollar(n) {
//           const d = new Intl.NumberFormat("en-US").format(n);
//           return "$ " + d;
//       },
//       selectStudent(s) {
//           if (s == this.selectedStudent) {
//               return;
//           }
//           this.selectedStudent = s;
//           this.offers = [];
//           this.fetchOfferData(this.selectedStudent);
//       }

         fetchOfferData(s) {
             console.log("Fetching offer data for ", s);
             fetch('/api/offer/?student=' + s.id)
             .then( response => response.json() )
             .then( (parsedJson) => {
                 console.log(parsedJson);
                 this.offers = parsedJson;
             })
             .catch( (error) => {
                 console.error(error);
             })
       }
   },

   created() {
       this.fetchStudentData();
   }

}

 Vue.createApp(SomeApp).mount('#offerApp');  
