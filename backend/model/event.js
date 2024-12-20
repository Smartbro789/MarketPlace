const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Введіть назву товару для події!"],
    },
    description:{
        type: String,
        required:[true,"Будь ласка, введіть опис товару події!"],
    },
    category:{
        type: String,
        required:[true,"Будь ласка, введіть категорію товару для події!"],
    },
    start_Date: {
        type: Date,
        required: true,
      },
      Finish_Date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        default: "В обробці",
      },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true,"Будь ласка, введіть ціну товару для події!"],
    },
    stock:{
        type: Number,
        required: [true,"Будь ласка, введіть свій запас товарів для події!"],
    },
    images:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        },
    ],
    shopId:{
        type: String,
        required: true,
    },
    shop:{
        type: Object,
        required: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);