<template>
<v-card>
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
        <v-combobox v-model="chipsFilter" :items="itemsFilter" label="Filter" chips clearable prepend-icon="filter_list" solo multiple>
            <template slot="selection" slot-scope="data">
                <v-chip :selected="data.selected" close @input="remove(data.item)">
                    <strong>{{ data.item }}</strong>
                </v-chip>
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
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
export default {
    watch: {
        "list.fields" () {
            this.init()
            this.load()
        },
        "pagination.page" () {
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
        this.init()
    },
    props: ["list", "dataSource", "reference"],
    data() {
        return {
            nodata: false,
            hasFilter: false,
            chipsFilter: [],
            itemsFilter:['name++'],
            loading: true,
            localList: {
                filters: [],
                fields: []
            },
            dataList: [],
            selected: [],
            datasource: null,
            total: 10,
            loadTimeout: null,
            pagination: {
                offset: 0,
                rowsPerPage: 10,
                sortBy: "",
                descending: true
            }
        }
    },
    methods: {
        init() {
            this.$data.dataList = []

            this.$data.localList.fields = this.list.fields.map(field => ({
                ...field,
                value: field.source
            }))

            this.$data.datasource = this.dataSource()
            this.$data.localList.filters = this.$data.localList.fields.filter(field => !!field.filter)

            this.$data.localList.fields.push({
                text: "Actions",
                value: "action",
                sortable: false
            })
            this.load()
        },

        filter() {
            this.pagination.page = 1
            this.load()
        },
        load() {
            this.$data.pagination.offset = ((this.$data.pagination.page - 1) * this.$data.pagination.rowsPerPage)

            clearTimeout(this.$data.loadTimeout)

            this.$data.loadTimeout = setTimeout(() => {

                this.$data.loading = true

                this.datasource.GET_LIST(
                    this.reference, {
                        ...this.$data.pagination,
                        filters: this
                            .$data
                            .localList
                            .filters
                            .filter(item => !!item.search)
                            .reduce((acc, item) => {
                                acc[item.source] = item.search
                                return acc
                            }, {})
                    },
                    response => {
                        this.$data.dataList = response.data
                        this.$data.total = parseInt(response.total || '0')
                        this.$data.loading = false
                        if (this.$data.dataList.length === 0) {
                            this.$data.nodata = true
                        }
                    }
                )
            }, 200)
        }
    }
}
</script>
