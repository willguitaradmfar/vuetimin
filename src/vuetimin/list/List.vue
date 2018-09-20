<template>
<v-card>
    <v-dialog v-model="dialogFilter.open" width="300">
        <v-card>
            <v-card-text>
                <!-- <v-text-field :autofocus="true" v-model="dialogFilter.field.search" @keyup.enter="okDialogFilter" prepend-icon="filter_list" :label="dialogFilter.field ? dialogFilter.field.text || dialogFilter.field.source : ''"></v-text-field> -->
              <DiscoveryFilter @enter="okDialogFilter" :item="dialogFilter.field" :data="dialogFilter.field" ></DiscoveryFilter>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-toolbar card>
        <v-btn color="info" fab small :to="'/' + reference" @click="hasFilter = !hasFilter">
            <v-icon>filter_list</v-icon>
        </v-btn>
        <v-toolbar-title>{{reference}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" :to="'/' + reference + '/new'" fab small v-if="_new">
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
                    <span slot="activator">{{ props.header.text || props.header.source }}</span>
                    <span>{{ props.header.text || props.header.source }}</span>
                </v-tooltip>
            </template>

            <template slot="items" slot-scope="props">
                <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                </td>

                <td v-for="item in localList.fields" v-bind:key="item.text || item.source" v-if="item.value !== 'action'">
                  <DiscoveryField :item="item" :data="props.item" ></DiscoveryField>
                </td>

                <td>
                    <router-link :to="'/' + reference + '/' + props.item.id + '/edit'" tag="button" v-if="edit">
                        <v-icon>edit</v-icon>
                    </router-link>
                    <router-link :to="'/' + reference + '/' + props.item.id + '/show'" tag="button" v-if="show">
                        <v-icon>visibility</v-icon>
                    </router-link>

                    <a @click="props.expanded = 'edit'" v-if="editExpand">
                      <v-icon>edit</v-icon>
                    </a>
               
                    <a @click="props.expanded = 'show'" v-if="showExpand">
                      <v-icon>visibility</v-icon>
                    </a>
                    
                </td>
            </template>

            <template slot="expand" slot-scope="props">
              <Show 
                v-if="props.expanded === 'show'" 
                :closeFn="() => props.expanded = undefined"
                :editFn="() => props.expanded = 'edit'" 
                :dataSource="dataSource" 
                :reference="reference" 
                :show="showExpand"
                :edit="editExpand"
                :params="{id: props.item.id}"></Show>

              <Edit 
                v-if="props.expanded === 'edit'"
                :closeFn="() => props.expanded = undefined"
                :showFn="() => props.expanded = 'show'"
                :dataSource="dataSource" 
                :reference="reference" 
                :show="showExpand" 
                :edit="editExpand" 
                :params="{id: props.item.id}"></Edit>
            
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
import Show from "./Show";
import Edit from "./Edit";
import DiscoveryField from "../discovery/fields/DiscoveryField";
import DiscoveryFilter from "../discovery/filters/DiscoveryFilter";

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
      this.setStateFilter();
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
  props: [
    "list",
    "edit",
    "show",
    "new",
    "dataSource",
    "reference",
    "showExpand",
    "editExpand"
  ],
  computed: {
    _new() {
      return this.new;
    },
    defaultChipsFilter() {
      return [];
    },
    defaultPagination() {
      return {
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
      };
    }
  },
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
      chipsFilter: this.defaultChipsFilter,

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
      pagination: this.defaultPagination
    };
  },

  components: {
    Show,
    Edit,
    DiscoveryField,
    DiscoveryFilter
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
      localStorage.setItem(
        `${this.reference}.list.filter`,
        JSON.stringify(this.chipsFilter)
      );
      localStorage.setItem(
        `${this.reference}.list.pagination`,
        JSON.stringify({
          ...this.pagination,
          offset: 0
        })
      );

      console.log(this.pagination);

      /**
       * BASE64
       */
      const stateURL = btoa(
        JSON.stringify({
          filter: this.chipsFilter,
          pagination: {
            ...this.pagination,
            offset: 0
          }
        })
      );

      if (stateURL.length > 2083) {
        alert("limit de caractere maior que " + 2083);
      }

      this.$router.replace({ query: { stateURL } });
    },

    /**
     * RECUPERA O ESTADO DO FILTRO
     */
    getStateFilter() {
      const KEY_LIST_FILTER = `${this.reference}.list.filter`;
      const KEY_LIST_PAGINATION = `${this.reference}.list.pagination`;

      if (localStorage.getItem(KEY_LIST_FILTER)) {
        this.$data.chipsFilter = JSON.parse(
          localStorage.getItem(KEY_LIST_FILTER) || "[]"
        );
      } else {
        this.$data.chipsFilter = this.defaultChipsFilter;
      }

      if (localStorage.getItem(KEY_LIST_PAGINATION)) {
        this.$data.pagination = JSON.parse(
          localStorage.getItem(KEY_LIST_PAGINATION) || "{}"
        );
      } else {
        this.$data.pagination = {
          ...this.$data.pagination,
          ...this.defaultPagination
        };
      }

      if (
        !localStorage.getItem(KEY_LIST_FILTER) ||
        !localStorage.getItem(KEY_LIST_PAGINATION)
      ) {
        this.setStateFilter();
      }

      if (this.$route.query && this.$route.query.stateURL) {
        /**
         * BASE64
         */
        let json = atob(this.$route.query.stateURL);

        let stateURL = JSON.parse(json);

        /**
         * ATUALIZA VARIAVEL SE TEM STATE URL
         */
        this.$data.chipsFilter = stateURL.filter;

        this.$data.pagination = stateURL.pagination;

        this.setStateFilter();
      }
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
