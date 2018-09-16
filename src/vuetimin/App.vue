<template>
<v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
        <v-list dense>
            <template v-for="item in items">
                <v-layout v-if="item.heading" :key="item.heading" row align-center>
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-flex>
                </v-layout>
                <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>
                              <router-link :to="item.to">
                                {{ item.text }}
                              </router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="(child, i) in item.children" :key="i">
                        <v-list-tile-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <router-link :to="item.to">
                                {{ item.text }}
                              </router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
                <v-list-tile v-else :key="item.text">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <router-link :to="item.to">
                                {{ item.text }}
                              </router-link>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">Google Contacts</span>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
            <v-avatar size="20px" tile>
                <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
            </v-avatar>
        </v-btn>
    </v-toolbar>
    <v-content>
        <router-view/>
    </v-content>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
        <v-icon>add</v-icon>
    </v-btn>
</v-app>
</template>

<script>
import List from "./list/List";

import Show from "./list/Show";

import Edit from "./list/Edit";

import New from "./list/New";

import About from "../views/About.vue";

export default {
  name: "App",
  created() {
    const routes = [];

    for (let resource of this.$attrs.resources) {
      if (resource.list) {
        routes.push({
          path: `/${resource.reference}`,
          name: resource.reference,
          component: List,
          props: {
            ...resource,
            dataSource: this.$attrs.dataSource
          }
        });
      }

      if (resource.show) {
        routes.push({
          path: `/${resource.reference}/:id/show`,
          name: resource.reference,
          component: Show,
          props: {
            ...resource,
            dataSource: this.$attrs.dataSource
          }
        });
      }

      if (resource.edit) {
        routes.push({
          path: `/${resource.reference}/:id/edit`,
          name: resource.reference,
          component: Edit,
          props: {
            ...resource,
            dataSource: this.$attrs.dataSource
          }
        });
      }

      if (resource.new) {
        routes.push({
          path: `/${resource.reference}/new`,
          name: resource.reference,
          component: New,
          props: {
            ...resource,
            dataSource: this.$attrs.dataSource
          }
        });
      }
    }

    this.$router.addRoutes(routes);
  },
  data() {
    return {
      dialog: false,
      drawer: null,
      items: this.$attrs.resources.map(menu => ({
        icon: "content_copy",
        text: menu.reference,
        to: `/${menu.reference}`
      }))
    };
  },
  props: {
    source: String
  }
};
</script>
