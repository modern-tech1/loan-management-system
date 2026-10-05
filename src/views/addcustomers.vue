```vue
<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <!-- Registration Card -->
        <div class="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

            <!-- Header -->
            <div class="bg-blue-600 px-8 py-6">
                <h2 class="text-2xl font-bold text-white">
                    Customer Registration
                </h2>

                <p class="text-blue-100 text-sm mt-1">
                    Register a new customer and their product information
                </p>
            </div>


            <!-- Form -->
            <form @submit.prevent="send" class="p-8">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <!-- Customer Name -->
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Customer Name
                        </label>

                        <input
                            type="text"
                            v-model="form.name"
                            placeholder="Enter customer name"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                            required
                        />
                    </div>


                    <!-- Telephone -->
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Telephone
                        </label>

                        <input
                            type="tel"
                            v-model="form.telephone"
                            placeholder="Enter telephone number"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                            required
                        />
                    </div>

                    <!-- id card -->
                    <div>
                     <label
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            ID CARD
                        </label>

                        <input
                            type="number"
                            v-model="form.id_card"
                            placeholder="Enter Id Card"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                            required
                        />
                        </div>

                    <!-- Address -->
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Address
                        </label>

                        <input
                            type="text"
                            v-model="form.address"
                            placeholder="Enter customer address"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                            required
                        />
                    </div>


                   </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">

                    <button
                        type="button"
                        @click="resetForm"
                        class="px-6 py-3 rounded-lg border border-gray-300
                               text-gray-700 font-semibold
                               hover:bg-gray-100 transition"
                    >
                        Clear
                    </button>

                    <button
                        type="submit"
                        class="px-8 py-3 rounded-lg bg-blue-600
                               text-white font-semibold
                               hover:bg-blue-700
                               focus:ring-4 focus:ring-blue-200
                               transition shadow-md"
                    >
                        Register Customer
                    </button>

                </div>

            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {

    data() {
        return {
            form: {
                name: "",
                telephone: "",
                id_card: "",
                address: ""
            }
        };
    },

    methods: {

        async send() {

            try {

                const res = await axios.post(
                    "http://localhost:3000/insert",
                    this.form
                );

                console.log("Data inserted:", res.data);

                alert("Customer registered successfully!");

                this.resetForm();

            } catch (error) {

                console.log("Insert failed:", error);

                alert("Failed to register customer.");

            }
        },


        resetForm() {

            this.form = {
                name: "",
                telephone: "",
                address: "",
                products: "",
                price: ""
            };

        }

    }
};
</script>
```
