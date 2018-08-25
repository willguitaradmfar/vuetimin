<template>
<Admin :auth="auth" :dataSource="dataSource" :resources="resources" />
</template>

<script>
import Admin from "./vuetimin/Admin";

export default {
    data() {
        return {
            resources: [{
                    reference: "hahahaj",
                    list: {
                        fields: [{
                                text: "(100g serving)",
                                align: "left",
                                sortable: true,
                                source: "name"
                            },
                            {
                                text: "NNN",
                                source: "nnn",
                                filter: true
                            },
                            {
                                text: "Calories",
                                source: "calories"
                            },
                            {
                                text: "Fat (g)",
                                source: "fat",
                                filter: true
                            },
                            {
                                text: "Carbs (g)",
                                source: "carbs"
                            },
                            {
                                text: "Protein (g)",
                                source: "protein",
                                filter: true
                            },
                            {
                                text: "Iron (%)",
                                source: "iron"
                            }
                        ]
                    }
                }
            ]
        };
    },

    methods: {
        dataSource() {
            const endpoint = "http://localhost:3000/api";
            return {
                GET_LIST(reference, args, cb) {
                    console.log(`GET_LIST ${endpoint}/${reference}?${JSON.stringify(args)}`);
                    console.log(args);

                    return setTimeout(() => {
                        cb({
                            total: 20000,
                            data: Array.apply(null, {
                                length: args.rowsPerPage
                            }).map(_ => ({
                                id: Math.round(Math.random() * 200000),
                                value: false,
                                name: "Frozen Yogurt",
                                calories: Math.round(Math.random() * 200),
                                nnn: "teste",
                                fat: Math.round(Math.random() * 10),
                                carbs: Math.round(Math.random() * 50),
                                protein: Math.round(Math.random() * 5),
                                iron: "1%"
                            }))
                        });
                    }, 1000 * 1);
                },
                GET_ONE(reference, args) {
                    console.log(`GET_ONE ${endpoint}/${reference}`);
                },
                CREATE(reference, args) {
                    console.log(`CREATE ${endpoint}/${reference}`);
                },
                UPDATE(reference, args) {
                    console.log(`UPDATE ${endpoint}/${reference}`);
                },
                DELETE(reference, args) {
                    console.log(`DELETE ${endpoint}/${reference}`);
                }
            };
        },
        auth({
            username,
            password
        }) {
            if (localStorage.getItem("token") == "true") {
                return true;
            }

            if (username === "will" && password === "123") {
                localStorage.setItem("token", "true");

                return true;
            }

            return false;
        }
    },

    computed: {
        Homee() {
            return this.Home;
        }
    },
    components: {
        Admin
    }
};
</script>
