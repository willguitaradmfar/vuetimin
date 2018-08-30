<template>
<v-card>
    <v-toolbar card>
        <v-toolbar-title>{{reference}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn :color="isEditing ? 'red' : 'warning'" v-if="!isEditing" :to="'/' + reference + '/' + id + '/edit'" fab small @click="isEditing = !isEditing">
            <v-icon>create</v-icon>
        </v-btn>
        <v-btn :color="isEditing ? 'red' : 'warning'" v-if="isEditing" :to="'/' + reference + '/' + id + '/show'" fab small @click="isEditing = !isEditing">
            <v-icon>close</v-icon>
        </v-btn>
        <v-btn color=" darken-3" fab small :to="'/' + reference">
            <v-icon>reply</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-text>
        <v-progress-linear v-if="loading" height="2" indeterminate></v-progress-linear>
        <v-container>
            <v-text-field :disabled="!isEditing" v-for="item in localList.fields" v-bind:key="item.source" v-model="data[item.source]" :counter="10" :label="item.text" required></v-text-field>
        </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">
            Save
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import axios from "axios";

export default {
    props: ["show", "edit", "dataSource", "reference"],
    watch: {
        "isEditing" () {
            this.load()
        }
    },
    data: () => ({
        id: 0,
        mode: 'show',
        data: {},
        loading: true,
        isEditing: false,
        datasource: null,
        localList: {
            fields: []
        }
    }),
    created() {
        this.load()
    },
    methods: {

        load() {
            this.$data.id = this.$route.params.id
            this.$data.mode = this.$route.params.mode

            if (this.mode === 'edit') {
                this.$data.isEditing = true
            }

            this.$data.datasource = this.dataSource()

            if (this.mode === 'show') {
                this.$data.localList.fields = this.show.fields.map(field => ({
                    ...field,
                    value: field.source
                }))
            }

            if (this.mode === 'edit') {
                this.$data.localList.fields = this.edit.fields.map(field => ({
                    ...field,
                    value: field.source
                }))
            }

            if (Object.keys(this.$data.data).length) return

            this.$data.loading = true

            this.datasource.GET_ONE(
                this.reference, {
                    ...this.$route.params
                },
                response => {
                    this.$data.data = response
                    this.$data.loading = false
                }
            )
        },
        save() {
            this.isEditing = !this.isEditing
            this.$data.data = {}
            this.$router.push(`/${this.reference}/${this.id}/show`)
        }
    }
};
</script>
