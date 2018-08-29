<template>
<v-card>
    <v-card-title>
        {{ reference }}
    </v-card-title>
    <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-for="item in localList.fields" v-bind:key="item.source" v-model="name" :rules="nameRules" :counter="10" :label="item.text" required></v-text-field>
            
            <v-btn :disabled="!valid" @click="submit">
                submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
    </v-card-text>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import axios from "axios";

export default {
    props: ["show", "dataSource", "reference"],
    data: () => ({
        valid: true,
        name: "",
        nameRules: [
            v => !!v || "Name is required",
            v => (v && v.length <= 10) || "Name must be less than 10 characters"
        ],
        email: "",
        emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        select: null,
        items: ["Item 1", "Item 2", "Item 3", "Item 4"],
        checkbox: false,
        dataList: [],
        localList: {
            fields: []
        }
    }),
    created() {
        this.init()
    },
    methods: {
        init() {
            this.$data.dataList = []

            this.$data.localList.fields = this.show.fields.map(field => ({
                ...field,
                value: field.source
            }))

            
        },
        submit() {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post("/api/submit", {
                    name: this.name,
                    email: this.email,
                    select: this.select,
                    checkbox: this.checkbox
                });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
</script>
