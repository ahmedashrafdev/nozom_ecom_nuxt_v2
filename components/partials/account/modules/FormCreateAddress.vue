<template lang="html">
    
    <form class="ps-form--edit-address">
        <div class="mb-10" v-if="msg">
            <span class="error" v-if="typeof msg == 'string'">{{msg}}</span>
        </div>
        <div class="ps-form__header">
            <h3>Billing address</h3>
        </div>
        <div class="ps-form__content">
            <div class="form-group">
                <label> Street<sup>*</sup> </label>
                <input type="text" v-model="form.Street" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.Street">
                     <ul>
                        <li class="error" v-for="err in msg.Street">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label> Building Number <sup>*</sup> </label>
                <input type="text" v-model="form.BuildingNo" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.BuildingNo">
                     <ul>
                        <li class="error" v-for="err in msg.BuildingNo">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label> Row number <sup>*</sup> </label>
                <input type="text" v-model="form.RowNo" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.RowNo">
                     <ul>
                        <li class="error" v-for="err in msg.RowNo">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label>
                    Flat Number
                </label>
                <input type="text"  v-model="form.FlatNo" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.FlatNo">
                     <ul>
                        <li class="error" v-for="err in msg.FlatNo">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label>
                    Remark
                </label>
                <input type="text"  v-model="form.Remark" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.Remark">
                     <ul>
                        <li class="error" v-for="err in msg.Remark">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label>
                    Phone
                </label>
                <select class="form-control"  v-model="form.PhSerial">
                    <option disabled selected>Select Phone</option>
                    <option v-for="phone in $auth.user.phones" :key="phone.id" :value="phone.id">{{phone.phone}}</option>
                </select>
                 <div  class="err-list" v-if="msg.PhSerial">
                     <ul>
                        <li class="error" v-for="err in msg.PhSerial">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label>
                    Section
                </label>
                <select class="form-control" @change="getAreas()" v-model="selectedSection">
                    <option disabled selected>Select section</option>
                    <option v-for="section in sections" :key="section.id" :value="section.id">{{section.AreaName}}</option>
                </select>
            </div>
             <div class="form-group" v-show="areas.length > 0">
                <label>
                    Area
                </label>
                <select class="form-control" v-model="form.AreaNo">
                    <option selected disabled>Select area</option>
                    <option v-for="area in areas" :key="area.id" :value="area.id">{{area.AreaName}}</option>
                </select>
                 <div  class="err-list" v-if="msg.AreaNo">
                     <ul>
                        <li class="error" v-for="err in msg.AreaNo">
                            {{err}}
                        </li>
                    </ul>
                </div>

            </div>
             <div class="form-group">
                <v-checkbox
                    color="success"
                    v-model="form.Main"
                    label="Main Address"
                />
            </div>
            <div class="form-group submit">
                <button class="ps-btn" v-if="isLoading">Loading ...</button>
                <button class="ps-btn" @click.prevent="attachAddress()" v-else>Save Address</button>
            </div>
        </div>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Createeee',
    computed: {
        ...mapGetters({
            sections: 'user/sections',
            areas: 'user/areas',
        })
    },
    data(){
        return {
            form : {
                BuildingNo : "",
                RowNo : "",
                FlatNo : "",
                Street : "",
                Remark : "",
                Main : 1,
                AreaNo : 2,
                PhSerial : 1
            },
            selectedSection:null,
            isLoading:false,
            msg:"",
        }
    },
    methods:{
        attachAddress() {
                    this.isLoading = true
                    // console.log(this.form)
            this.$store.dispatch('user/attachAddress', this.form)
                .then(res=>{
                    this.isLoading = false
                    this.$emit('created' , res.id) 
                })
                .catch(e => {
                    this.msg = e
                    this.isLoading = false
                });
        },
        getAreas(){
            const id = this.selectedSection
            if(id){
                this.$store.dispatch('user/getAreas' , id)
                    .then(()=>{
                        console.log(this.areas)
                    });
                return
            }
            this.$store.dispatch('user/getSections')
            .then(()=>{
                console.log(this.sections)
            });
        }
    },
    created(){
        this.getAreas()
        this.$store.commit('user/setAreas' , [])
    }
}
</script>
