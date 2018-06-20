export default {
  name: 'DashboardNimda',

  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    }

    /*
    function removeItemFromArr( arr, item ) {
    return arr.filter( function( e ) {
        return e !== item;
    } );
};

var newFoo = removeItemFromArr( foo, 'thumb-2' );

    items: [
      {
        name: 'Frozen Yogurt',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Ice cream sandwich',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Eclair',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Cupcake',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Gingerbread',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Jelly bean',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Lollipop',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Honeycomb',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'Donut',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      },
      {
        name: 'KitKat',
        aprtr: 159,
        dfrncial: 6.0,
        be: 24,
        t2: 4.0,
        t5: 87,
        t10: 90,
        sl: 1
      }
    ]
  */
  }),

  created: function () {
    this.traerTransacciones()
  },

  computed: {
    transacciones: function () {
      return this.$store.state.transacciones.transaccionesStore
    }
  },

  methods: {
    traerTransacciones: async function () {
      await this.$store.dispatch('listTransacciones')
    }
  }

}
