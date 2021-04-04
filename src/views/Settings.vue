<template>
    <v-main>
        <v-list class="d-flex justify-center">
            <v-list-item-group>
                <!-- Rss enabled -->
                <v-list-item @click="settings.RssEnabled = !settings.RssEnabled">
                    <template>
                        <v-list-item-action>
                            <v-switch v-model="settings.RssEnabled"></v-switch>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Enable RSS</v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>

                <!-- Rss settings -->
                <span v-if="settings.RssEnabled">
                    <v-list-item @click="settings.ShowBookmarkButton = !settings.ShowBookmarkButton">
                        <template>
                            <v-list-item-action>
                                <v-switch v-model="settings.ShowBookmarkButton"></v-switch>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>Show Bookmark Button</v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                    <v-list-item @click="settings.ShowLinkButton = !settings.ShowLinkButton">
                        <template>
                            <v-list-item-action>
                                <v-switch v-model="settings.ShowLinkButton"></v-switch>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>Show Link Button</v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                    <v-list-item @click="settings.ShowReadButton = !settings.ShowReadButton">
                        <template>
                            <v-list-item-action>
                                <v-switch v-model="settings.ShowReadButton"></v-switch>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>Show Read Button</v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                </span>

                <!-- Twitter enabled -->
                <v-list-item @click="settings.TwitterEnabled = !settings.TwitterEnabled">
                    <template>
                        <v-list-item-action>
                            <v-switch v-model="settings.TwitterEnabled"></v-switch>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Enable Twitter</v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>

                <!-- Twitter name -->
                <span v-if="settings.TwitterEnabled">
                    <br>
                    <v-text-field
                            v-model="settings.TwitterName"
                            label="Twitter Name"
                            outlined
                            clearable
                    ></v-text-field>
                </span>

                <v-list-item @click="settings.VkNewsEnabled = !settings.VkNewsEnabled">
                    <template>
                        <v-list-item-action>
                            <v-switch v-model="settings.VkNewsEnabled"></v-switch>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Enable Vk</v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <!-- Save btn -->
        <br>
        <v-btn
                id="save-btn"
                class="d-flex justify-center"
                color="primary"
                elevation="2"
                @click="setSettings(settings)">
            Save
        </v-btn>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Settings",
    beforeMount() {
        this.getSettings()
    },
    computed: {
        ...mapGetters('user', {
            settings: 'settings',
        }),
    },
    methods: {
        ...mapActions('user', {
            getSettings: 'getSettings',
            setSettings: 'setSettings',
        }),
    },
}
</script>

<style scoped>
#settings-content {
    width: 300px;
}
#save-btn {
    width: 300px;
    margin: auto;
}
</style>