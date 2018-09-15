<template>
<v-card>
    <v-toolbar card>
        <v-btn color="info" fab small :to="'/' + reference">
            <v-icon>reply</v-icon>
        </v-btn>
        <v-toolbar-title>{{reference}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" :to="'/' + reference" fab small>
            <v-icon>close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-text>
        <v-layout row wrap>
          <v-flex v-for="item in localList.fields" v-bind:key="item.source">
            <v-container>                
                <Discovery :loading="loading" :data="data" :item="item" />
            </v-container>
          </v-flex>
        </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" color="success" @click="save">
            Save
        </v-btn>
    </v-card-actions>
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

import Discovery from "../fields/Discovery";

export default {
    props: ["new", "dataSource", "reference"],
    watch: {},
    data: () => ({
        snackbarText: '',
        snackbar: false,
        data: {},
        loading: false,
        datasource: null,
        localList: {
            fields: []
        }
    }),
    created() {
        this.load();
    },
    components: {
        Discovery
    },
    methods: {
        load() {

            this.$data.datasource = this.dataSource();

            this.$data.localList.fields = this.new.fields.map(field => ({
                ...field,
                value: field.source
            }));

        },
        save() {
            this.$data.loading = true;
            this.datasource.CREATE(
                this.reference, {
                    data: this.localList.fields.reduce((acc, item) => {
                        acc[item.source] = this.data[item.source];
                        return acc;
                    }, {})
                },
                (err, response) => {
                    if (err) {
                        this.$data.snackbarText = err.message
                        this.$data.loading = false
                        return this.$data.snackbar = true
                    }
                    this.$router.push(`/${this.reference}/${response.id}/show`);
                }
            );
        }
    }
};
</script>
