<template>
    <div>
        <div id="tool-btns" class="flex-row">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="showAddRss">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>Add new RSS feed</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="grey" v-bind="attrs" v-on="on">
                        <v-icon>mdi-upload</v-icon>
                    </v-btn>
                </template>
                <span>Upload OPML file</span>
            </v-tooltip>
            <v-tooltip bottom v-if="rssList.length > 0">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="downloadOPML">
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </template>
                <span>Download OPML file</span>
            </v-tooltip>
        </div>
        <v-list shaped>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(rssItem) in rssList" :key="rssItem.Feed.Id">
                    <!-- rss name -->
                    <v-list-item-content @click="getFeedPosts(rssItem.Feed.Id)">
                        <v-list-item-title
                                v-text="rssItem.Feed.Name"
                                :class="{ unread: rssItem.ExistUnread }">
                        </v-list-item-title>
                    </v-list-item-content>

                    <!-- action buttons -->
                    <v-list-item-action :class="{ unread: rssItem.ExistUnread }">
                        {{ rssItem.ArticlesCount }}
                    </v-list-item-action>
                    <v-list-item-action @click="showEditRss(rssItem.Feed)">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="grey lighten-1" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Update RSS name</span>
                        </v-tooltip>
                    </v-list-item-action>
                    <v-list-item-action @click="showDeleteRss(rssItem.Feed)">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="grey lighten-1" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remove RSS feed</span>
                        </v-tooltip>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <!-- add dialog-->
        <v-dialog v-model="addDialog" max-width="390">
            <v-card>
                <v-card-title class="headline">
                    Add new RSS feed
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="newRssUrl" label="RSS url" outlined></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="addDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="addNewRss">
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- edit dialog-->
        <v-dialog v-model="editDialog" max-width="390">
            <v-card>
                <v-card-title class="headline">
                    Edit RSS name
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="newRssName" label="RSS url" outlined></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="editDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="editRss">
                        Update
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- delete dialog-->
        <v-dialog v-model="deleteDialog" max-width="390">
            <v-card>
                <v-card-title class="headline">
                    Delete {{ deleteRssName }}?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="deleteDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="deleteRss">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    data: () => {
        return {
            selectedItem: -1,
            addDialog: false,
            editDialog: false,
            deleteDialog: false,
            newRssUrl: null,
            newRssName: null,
            deleteRssName: null,
            rssIdForUpdate: null,
            rssIdForDelete: null,
        };
    },
    async beforeMount() {
        if (this.rssList.length !== 0) {
            return
        }

        await this.loadRss();
    },
    computed: {
        ...mapGetters('rss', {
            rssList:'rssList',
        }),
    },
    methods: {
        ...mapActions('rss', {
            loadRss: 'loadRss',
            addRss: 'addRss',
            updateRss: 'updateRss',
            removeRss: 'removeRss',
            downloadOPML: 'downloadOPML',
        }),
        ...mapActions('article', {
            getArticles: 'getArticles',
        }),
        getFeedPosts(rssId) {
            this.getArticles({rssId, page: 1})
        },
        showAddRss() {
            this.addDialog = true
        },
        showEditRss(feed) {
            this.newRssName = feed.Name
            this.rssIdForUpdate = feed.Id
            this.editDialog = true
        },
        showDeleteRss(feed) {
            this.deleteRssName = feed.Name
            this.rssIdForDelete = feed.Id
            this.deleteDialog = true
        },
        async addNewRss() {
            if (!this.newRssUrl) {
                return
            }

            await this.addRss(this.newRssUrl)
            this.addDialog = false
            this.newRssUrl = null
        },
        async editRss() {
            if (!this.newRssName) {
                return
            }

            await this.updateRss({ name: this.newRssName, id: this.rssIdForUpdate })

            this.editDialog = false
            this.newRssName = null
            this.rssIdForUpdate = null
        },
        async deleteRss() {
            await this.removeRss(this.rssIdForDelete)

            this.deleteDialog = false
            this.deleteRssName = null
            this.rssIdForDelete = null
        },
        uploadOPML() {

        },
    }
};
</script>

<style>
#tool-btns {
    margin: 10px;
}
.unread {
    font-weight: bold !important;
}
</style>