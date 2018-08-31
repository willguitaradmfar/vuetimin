<template>
<v-card>
    <v-dialog v-model="dialog" max-width="550">
        <v-card>
            <v-card-title class="headline">Remover ?</v-card-title>

            <v-card-text>Deseja remover esse registro ?</v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="secondary darken-1" flat="flat" @click="dialog = false">
                    Cancelar
                </v-btn>

                <v-btn color="primary darken-1" flat="flat" @click="remove">
                    Sim
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar card>
        <v-btn color="info" fab small :to="'/' + reference">
            <v-icon>reply</v-icon>
        </v-btn>
        <v-toolbar-title>{{reference}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn :loading="loading" color="info" fab small @click="load">
            <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn color="warning" :to="'/' + reference + '/' + id + '/edit'" fab small>
            <v-icon>create</v-icon>
        </v-btn>
        <v-btn color="error" fab small @click="dialog = true" :loading="removing">
            <v-icon>delete</v-icon>
        </v-btn>

    </v-toolbar>
    <v-card-text>
        <v-container>
            <v-text-field :disabled="true" v-for="item in localList.fields" v-bind:key="item.source" v-model="data[item.source]" :counter="10" :label="item.text" required></v-text-field>
        </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="true" color="success">
            Save
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import axios from "axios";

export default {
    props: ["show", "dataSource", "reference"],
    watch: {},
    data: () => ({
        id: 0,
        data: {},
        loading: true,
        removing: false,
        datasource: null,
        dialog: false,
        localList: {
            fields: []
        }
    }),
    created() {
        this.load();
    },
    methods: {
        load() {
            this.$data.id = this.$route.params.id;

            this.$data.datasource = this.dataSource();

            this.$data.localList.fields = this.show.fields.map(field => ({
                ...field,
                value: field.source
            }));

            this.$data.loading = true;

            this.datasource.GET_ONE(
                this.reference, {
                    ...this.$route.params
                },
                response => {
                    this.$data.data = response;
                    this.$data.loading = false;
                }
            );
        },
        remove() {
            this.$data.removing = true
            this.$data.dialog = false
            this.datasource.DELETE(
                this.reference, {
                    id: this.id
                },
                response => {
                    this.$data.removing = false
                    this.$router.push(`/${this.reference}`);
                }
            );
        }
    }
};
</script>
