<template>
<v-card>
    <v-card-title>
        {{ reference }}
    </v-card-title>
    <v-card-title>
        <v-spacer> </v-spacer>
        <v-text-field v-for="item in localList.filters" v-bind:key="item.source" v-on:keyup="load" v-model="item.search" append-icon="search" :label="item.text" single-line hide-details></v-text-field>

    </v-card-title>
    <v-data-table 
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :headers="localList.fields" 
        :items="desserts" :search="search" :loading="loading" select-all v-model="selected" item-key="id" class="elevation-1">
        <v-progress-linear slot="progress" height="1" indeterminate></v-progress-linear>
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
                <v-icon class="mr-2">
                    edit
                </v-icon>
                <v-icon>
                    delete
                </v-icon>
            </td>
        </template>

     <template slot="pageText" slot-scope="props">
      Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
    </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>

        <template slot="no-data">
            <v-alert :value="nodata" color="error" icon="warning">
                Sorry, nothing to display here :(
            </v-alert>
        </template>
    </v-data-table>
    <div class="text-xs-center">
        <v-pagination v-model="pagination.pageIndex" circle :length="total" :total-visible="7"></v-pagination>
    </div>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
export default {
    watch: {
        "pagination.pageIndex" (pageIndex) {
            this.load()
        },
        "pagination.rowsPerPage" () {
            this.load()
        },
        "pagination.sortBy" () {
            this.load()
        },
        "pagination.descending" () {
            this.load()
        }
    },
    created() {
        this.$data.localList.fields = this.list.fields.map(field => ({
            ...field,
            value: field.source
        }))

        this.$data.datasource = this.dataSource()
        this.$data.localList.filters = this.$data.localList.fields.filter(
            field => !!field.filter
        )

        this.$data.localList.fields.push({
            text: "Actions",
            value: "action",
            sortable: false
        })

        this.load()
    },
    props: ["list", "dataSource", "reference"],
    data() {
        return {
            nodata: false,
            loading: true,
            search: "",
            localList: {
                filters: [],
                fields: []
            },
            desserts: [],
            selected: [],
            datasource: null,
            total: 10,
            loadTimeout: null,
            pagination: {
                offset: 0,
                pageIndex: 1,
                rowsPerPage: 5,
                sortBy: "",
                descending: true,
                totalItems: 1000
            }
        }
    },
    methods: {
        load() {
            this.$data.loading = true
            this.$data.pagination.offset =
                (this.$data.pagination.pageIndex - 1) *
                this.$data.pagination.rowsPerPage

            clearTimeout(this.$data.loadTimeout)
            this.$data.loadTimeout = setTimeout(() => {

                this.datasource.GET_LIST(
                    this.reference, {
                        ...this.$data.pagination,
                        filters: this.$data.localList.filters
                            .filter(item => !!item.search)
                            .reduce((acc, item) => {
                                acc[item.source] = item.search
                                return acc
                            }, {})
                    },
                    response => {
                        this.$data.desserts = response.data
                        this.$data.total = response.total / this.pagination.rowsPerPage
                        this.$data.loading = false
                        if (this.$data.desserts.length === 0) {
                            this.$data.nodata = true
                        }
                    }
                )
            }, 200)
        }
    }
}
</script>
