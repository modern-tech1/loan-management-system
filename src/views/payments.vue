<template>
    <div class="p-6 bg-gray-100 min-h-screen">

        <!-- Page title -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">
                CUSTOMER LIST
            </h2>

            <p class="text-gray-500">
                View all customers Loan
            </p>
        </div>

        <!-- Table container -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">

            <table class="w-full text-left border-collapse">

                <!-- Table header -->
                <thead class="bg-blue-600 text-white">

                    <tr>
                        <th class="px-6 py-4 font-semibold">
                            ID
                        </th>

                        <th class="px-6 py-4 font-semibold">
                            CUSTOMER NAME
                        </th>

                        <th class="px-6 py-4 font-semibold">
                            PHONE
                        </th>

                        <th class="px-6 py-4 font-semibold">
                            ID CARD
                        </th>

                        <th class="px-6 py-4 font-semibold">
                            ADDRESS
                        </th>
                        
                          <th class="px-6 py-4 font-semibold">
                            ACTION
                        </th>  
                    </tr>

                </thead>

                <!-- Table body -->
                <tbody>

                    <tr
                        v-for="item in items"
                        :key="item.id"
                        class="border-b border-gray-200 hover:bg-blue-50 transition"
                    >

                        <td class="px-6 py-4 text-gray-700 font-medium">
                            {{ item.id }}
                        </td>

                        <td class="px-6 py-4 text-gray-800 font-semibold">
                            {{ item.name }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ item.telephone }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ item.id_card }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ item.address }}
                        </td>

                         <td class="px-6 py-4 text-white font-bold">
                        <button class="bg-red-500 w-30 h-10 rounded-2xl" @click="dele(item.id)">DELETE</button>
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>
</template>
```

<script>
import axios from 'axios';
export default{
    data(){
        return{
            items:[]
        };
    },
    mounted(){
        axios
        .get("http://localhost:3000/getting")
        .then((res)=>{
            console.log("data selected",res.data);
            alert("data selected",res.data)
            this.items=res.data.message;
        })
        .catch((error)=>{
            console.log("data selected error",error);
            alert("selected error",error)
        })
    },
    methods:{
    dele(id){
            axios
            .delete(`http://localhost:3000/${id}`)
            .then((res)=>{
                alert("deleted");
                console.log("deleted",res.send);
               this.item = this.item.filter(item => item.id !== id);
                })
                .catch((error)=>{
                    console.log("deleted error",error);
                    alert("deleted error",error)
                
            })
        }
}
}
</script>