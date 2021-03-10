<template>
    <div class="container">
            <v-flex class="d-flex space-between mt-6"> 
                <v-skeleton-loader
                class="w-32"
                type="list-item"
                ></v-skeleton-loader>
                 <v-skeleton-loader
                class="w-8"
                type="list-item"
                ></v-skeleton-loader>
            </v-flex>
            <v-flex class="d-flex space-between mt-6"> 

                <v-skeleton-loader
                class="mx-auto mr-8 w-full"
                v-for="i in 5"
                :key="i"
                type="card"
                ></v-skeleton-loader>
            </v-flex>
        </div>
</template>