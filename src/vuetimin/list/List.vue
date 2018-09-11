<template>
<v-card>
    <v-dialog v-model="dialogFilter.open" width="300">
        <v-card>
            <v-card-text>
                <v-text-field :autofocus="true" v-model="dialogFilter.field.search" @keyup.enter="okDialogFilter" prepend-icon="filter_list" :label="dialogFilter.field ? dialogFilter.field.text : ''"></v-text-field>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-toolbar card>
        <v-btn color="info" fab small :to="'/' + reference" @click="hasFilter = !hasFilter">
            <v-icon>filter_list</v-icon>
        </v-btn>
        <v-toolbar-title>{{reference}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" :to="'/' + reference + '/new'" fab small>
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn :loading="loading" color="info" fab small @click="load">
            <v-icon>refresh</v-icon>
        </v-btn>
    </v-toolbar>

    <v-toolbar v-if="hasFilter" card>
        <v-combobox v-model="chipsFilter" @input="openFilter" :items="localListFilter.fields"  :autofocus="true" label="Filter" hide-selected chips clearable solo multiple>
            <template slot="selection" slot-scope="data">
                <v-chip 
                :selected="data.selected"
                close
                @input="removeItemFilter(data.item)">
                    <v-avatar color="info">
                        <v-btn color="warning" fab small :style="{ cursor: 'pointer'}" @click="openFilter(data.item)">
                            <v-icon color="white" :style="{ cursor: 'pointer'}">create</v-icon>
                        </v-btn>
                    </v-avatar>
                    <strong>{{ data.item.text || data.item.source }}</strong> 
                    <span v-if="data.item.search">({{ data.item.search }})</span>
                </v-chip>
            </template>

            <template slot="item" slot-scope="{ index, item, parent }">
                {{item.text || item.source}} 
                <span v-if="item.search">({{ item.search }})</span>
            </template>
        </v-combobox>
    </v-toolbar>

    <v-card-text>
        <v-data-table :pagination.sync="pagination" :total-items="total" :headers="localList.fields" :items="dataList" :loading="loading" select-all v-model="selected" item-key="id" class="elevation-1">
            <v-progress-linear slot="progress" height="2" indeterminate></v-progress-linear>
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                    <span slot="activator">{{ props.header.text }}</span>
                    <span>{{ props.header.text }}</span>
                </v-tooltip>
            </template>

            <template slot="items" slot-scope="props">
                <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                </td>

                <td v-for="item in localList.fields" v-bind:key="item.source" v-if="item.value !== 'action'">{{ props.item[item.source] }}</td>

                <td>
                    <router-link :to="'/' + reference + '/' + props.item.id + '/edit'" tag="button">
                        <v-icon>edit</v-icon>
                    </router-link>
                    <router-link :to="'/' + reference + '/' + props.item.id + '/show'" tag="button">
                        <v-icon>visibility</v-icon>
                    </router-link>
                </td>
            </template>

            <template slot="pageText" slot-scope="props">
                Linhas {{ props.pageStart }} - {{ props.pageStop }} de {{ total }}. Página: {{pagination.page}}
            </template>

            <div class="text-xs-center" slot="no-results">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <template slot="no-data">
                <v-alert :value="nodata" color="error" icon="warning">
                    Sorry, nothing to display here :(
                </v-alert>
            </template>
        </v-data-table>
    </v-card-text>
    <v-snackbar v-model="snackbar" color="error" :bottom="true" :multi-line="true" :timeout="7000">
        {{ snackbarText }}
        <v-btn color="white" flat @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
export default {
  watch: {
    /**
     * ESCUTA A MUDANÇA DA VARIAVEL DE CONFIGURAÇÃO DE FILTRO
     */
    chipsFilter() {
      this.setStateFilter();
    },

    /**
     * ESCUTA CAMPOS CONFIGURADOS
     */
    "list.fields"() {
      this.init();
      this.load();
    },

    /**
     * ESCUTA ALTERAÇÃO DE PAGINAS
     */
    "pagination.page"() {
      this.load();
    },

    /**
     * ESCUTA A ALTERAÇÃO DE QUANTIDADE POR PAGINA
     */
    "pagination.rowsPerPage"() {
      this.load();
    },

    /**
     * ESCUTA A ALTERAÇÃO DE CAMPO ORDENAVEL
     */
    "pagination.sortBy"() {
      this.setStateFilter();
      this.load();
    },

    /**
     * ESCUTA A ALTERAÇÃO DE SENTIDO DE PAGINAÇÃO
     */
    "pagination.descending"() {
      this.setStateFilter();
      this.load();
    }
  },

  /**
   * INICIA O CICLO DE VIDA
   */
  created() {
    this.init();
  },
  /**
   * PROPRIEDADE RECEBIDAS POR PARAMETROS
   */
  props: ["list", "dataSource", "reference"],
  data() {
    return {
      /**
       * CONTROLA O ESTADO DO DIALOG
       */
      dialogFilter: {
        open: false,
        field: {}
      },

      /**
       * MENSAGEM DE NOTIFICAÇÃO
       * CONTROLE DE VISIBILIDADE
       */
      snackbarText: "",
      snackbar: false,

      /**
       * CONTROLA A MENSAGEM DE DATATABLE SEM DADOS
       */
      nodata: false,

      /**
       * CONTROLA SE TEM FILTRO
       */
      hasFilter: false,

      /**
       * FILTRO SELECIONADO PELO USUÁROP
       */
      chipsFilter: [],

      /**
       * CONTROLA SE O DATATABLE ESTÁ CARREGANDO
       */
      loading: true,

      /**
       * FILTRO DISPONÍVEL PARA O FILTRO
       */
      localListFilter: {
        fields: []
      },

      /**
       * LISTA DE CAMPOS DISPONIVEIS NA TABELA
       */
      localList: {
        fields: []
      },

      /**
       * ARMAZENAMENTO DOS DADOS
       */
      dataList: [],

      /**
       * DADOS SELECIONADOS PARA AÇÃO MULTIPLAS
       */
      selected: [],

      /**
       * OBJETO DE DAO, DATA ACCESS OBJECT
       */
      datasource: null,

      /**
       * TOTAL DE REGISTRO
       */
      total: 10,

      /**
       * CONTROLE DE TIMEOUT
       */
      loadTimeout: null,

      /**
       * CONTROLE DE PAGINAÇÃO
       */
      pagination: {
        /**
         * CURSOR DE PAGINAÇÃO
         */
        offset: 0,

        /**
         * TOTAL DE REGISTRO POR PÁGINA
         */
        rowsPerPage: 10,

        /**
         * COLUNA DE ORDENAÇÃO
         */
        sortBy: "",

        /**
         * SENTIDO DA ORDENAÇÃO
         */
        descending: true
      }
    };
  },

  methods: {
    /**
     * INICIA E TRATA OS FILTROS
     */
    init() {
      this.getStateFilter();

      this.$data.hasFilter = !!this.$data.chipsFilter.length;

      this.$data.dataList = [];

      this.$data.localList.fields = this.list.fields.map(field => ({
        ...field,
        value: field.source
      }));

      this.$data.datasource = this.dataSource();
      this.$data.localListFilter.fields = this.$data.localList.fields.filter(
        field => !!field.filter
      );

      this.$data.localList.fields.push({
        text: "Actions",
        value: "action",
        sortable: false
      });
      this.load();
    },

    /**
     * SETA OESTADO DO FILTRO
     */
    setStateFilter() {
      localStorage.setItem("list.filter", JSON.stringify(this.chipsFilter));
      localStorage.setItem(
        "list.sort",
        JSON.stringify(this.pagination)
      );
      //   const searchParams = new URLSearchParams(location.hash.substring(location.hash.indexOf('?')+1));
      //   searchParams.set('filter', encodeURIComponent(JSON.stringify(this.chipsFilter)))
      //   location.hash = searchParams.toString()
    },

    /**
     * RECUPERA O ESTADO DO FILTRO
     */
    getStateFilter() {
      this.$data.chipsFilter = JSON.parse(
        localStorage.getItem("list.filter") || "[]"
      );

      this.$data.pagination = JSON.parse(
        localStorage.getItem("list.sort") || "{}"
      );
      // const searchParams = new URLSearchParams(location.hash);
      // this.$data.chipsFilter = JSON.parse(searchParams.get('filter') || '[]')
    },

    /**
     * CONFIRMA O FILTRO DIALOG
     */
    okDialogFilter() {
      this.$data.dialogFilter.open = false;
      this.setStateFilter();
      this.load();
    },

    /**
     * ABRE O FILTRO DIALOG
     */
    openFilter(selected) {
      // console.log(JSON.stringify(selected, null, '\t'))
      console.log(JSON.stringify(this.chipsFilter, null, "\t"));
      if (selected.length !== undefined) {
        if (selected.length == 0 || selected[selected.length - 1].search) {
          this.load();
          return;
        }
      }

      this.$data.dialogFilter.open = true;
      this.$data.dialogFilter.field = selected.length
        ? selected[selected.length - 1]
        : selected;
    },
    /**
     * REMOVE UM ITEM DOS FILTROS ADICIONADOS
     */
    removeItemFilter(item) {
      this.$data.chipsFilter = this.$data.chipsFilter.filter(
        _item => item.source !== _item.source
      );
      this.setStateFilter();
      this.load();
    },

    /**
     * CARREGA DADOS DE ACORDO COM FILTRO, PAGINAÇÃO E ORDENAÇÃO
     */
    load() {
      this.$data.pagination.offset =
        (this.$data.pagination.page - 1) * this.$data.pagination.rowsPerPage;

      clearTimeout(this.$data.loadTimeout);

      this.$data.loadTimeout = setTimeout(() => {
        this.$data.loading = true;

        this.datasource.GET_LIST(
          this.reference,
          {
            ...this.$data.pagination,
            filters: this.$data.chipsFilter
              .filter(item => !!item.search)
              .reduce((acc, item) => {
                acc[item.source] = item.search;
                return acc;
              }, {})
          },
          (err, response) => {
            if (err) {
              this.$data.snackbarText = err.message;
              this.$data.loading = false;
              this.$data.dataList = [];
              this.$data.nodata = true;
              this.$data.total = 0;
              return (this.$data.snackbar = true);
            }

            this.$data.dataList = response.data;
            this.$data.total = parseInt(response.total || "0");
            this.$data.loading = false;
            if (this.$data.dataList.length === 0) {
              this.$data.nodata = true;
            }
          }
        );
      }, 200);
    }
  }
};
</script>
